/**
 * One-time AST migration of recovered jsx-runtime application to readable JSX modules.
 * Refuses to overwrite already modularized files.
 */
import fs from "node:fs";
import path from "node:path";
import { parse } from "@babel/parser";
import traverseModule from "@babel/traverse";
import generateModule from "@babel/generator";
import * as t from "@babel/types";

const traverse = traverseModule.default ?? traverseModule;
const generate = generateModule.default ?? generateModule;
const src = path.join(process.cwd(), "src");
if (fs.existsSync(path.join(src, "screens"))) {
  throw new Error("Refusing to overwrite the modularized source");
}
const ast = parse(fs.readFileSync(path.join(src, "main.jsx"), "utf8"), {
  sourceType: "module", plugins: ["jsx"]
});
function tagName(expr) {
  if (t.isIdentifier(expr)) return t.jsxIdentifier(expr.name);
  if (t.isMemberExpression(expr) && !expr.computed) {
    return t.jsxMemberExpression(tagName(expr.object), t.jsxIdentifier(expr.property.name));
  }
  throw new Error("Unexpected JSX tag " + expr.type);
}
function isRuntimeCall(node) {
  if (!t.isCallExpression(node)) return false;
  let callee = node.callee;
  if (t.isSequenceExpression(callee)) callee = callee.expressions.at(-1);
  return t.isMemberExpression(callee) && t.isIdentifier(callee.object, {name:"p"}) &&
    t.isIdentifier(callee.property) && ["jsx","jsxs"].includes(callee.property.name);
}
function asChild(node) {
  if (!node) return null;
  if (t.isJSXElement(node) || t.isJSXFragment(node)) return node;
  if (t.isSpreadElement(node)) return t.jsxSpreadChild(node.argument);
  return t.jsxExpressionContainer(node);
}
function runtimeToJSX(node) {
  const [tag, props, key] = node.arguments;
  const attrs = [];
  const children = [];
  if (props && !t.isNullLiteral(props)) {
    if (!t.isObjectExpression(props)) throw new Error("Unexpected JSX props " + props.type);
    for (const prop of props.properties) {
      if (t.isSpreadElement(prop)) {
        attrs.push(t.jsxSpreadAttribute(prop.argument)); continue;
      }
      if (!t.isObjectProperty(prop) || prop.computed) throw new Error("Unexpected property");
      const name = t.isIdentifier(prop.key) ? prop.key.name : prop.key.value;
      if (name === "children") {
        const elements = t.isArrayExpression(prop.value) ? prop.value.elements : [prop.value];
        for (const entry of elements) {
          const converted = asChild(entry);
          if (converted) children.push(converted);
        }
      } else {
        attrs.push(t.jsxAttribute(
          t.jsxIdentifier(name),
          t.isStringLiteral(prop.value) ? t.stringLiteral(prop.value.value) :
            t.jsxExpressionContainer(prop.value)
        ));
      }
    }
  }
  if (key) attrs.push(t.jsxAttribute(t.jsxIdentifier("key"), t.jsxExpressionContainer(key)));
  if (t.isMemberExpression(tag) && t.isIdentifier(tag.object, {name:"p"}) &&
      t.isIdentifier(tag.property, {name:"Fragment"})) {
    return t.jsxFragment(t.jsxOpeningFragment(), t.jsxClosingFragment(), children);
  }
  const name = t.isTemplateLiteral(tag) && tag.expressions.length===0 ?
    t.jsxIdentifier(tag.quasis[0].value.cooked) :
    t.isStringLiteral(tag) ? t.jsxIdentifier(tag.value) : tagName(tag);
  if (t.isJSXMemberExpression(name) && t.isJSXIdentifier(name.object, {name:"f"})) {
    name.object.name="React";
  }
  return t.jsxElement(
    t.jsxOpeningElement(name, attrs, children.length===0),
    children.length ? t.jsxClosingElement(t.cloneNode(name,true)) : null,
    children, children.length===0
  );
}
let count = 0;
traverse(ast, {
  CallExpression: { exit(p) {
    if (isRuntimeCall(p.node)) {
      p.replaceWith(runtimeToJSX(p.node));
      count++; p.skip();
    }
  }},
  MemberExpression(p) {
    if (t.isIdentifier(p.node.object,{name:"f"}) && t.isIdentifier(p.node.property,{name:"useState"})) {
      p.node.object.name = "React";
    }
  }
});
if (count < 100) throw new Error("Too few JSX conversions: " + count);
const decls=new Map(), funcs=new Map();
for (const stmt of ast.program.body) {
  if (t.isVariableDeclaration(stmt)) {
    for(const d of stmt.declarations) if(t.isIdentifier(d.id)) decls.set(d.id.name,d);
  } else if(t.isFunctionDeclaration(stmt)) funcs.set(stmt.id.name,stmt);
}
const fnNames=["App","HomeScreen","AssistantScreen","OfferScreen","FeatureRow",
  "AssistantOverview","DetailHeader","ExpensesScreen","LegendItem",
  "RemindersScreen","SavingsScreen","ChatScreen","getMockReply","OtherTabScreen"];
for(const n of fnNames) if(!funcs.has(n)) throw new Error("Missing function: "+n);
for(const n of ["navigationItems","transactions","services","suggestedQuestions"])
  if(!decls.has(n)) throw new Error("Missing data: "+n);
const print=nodes=>generate(t.file(t.program(nodes)),{comments:true,jsescOption:{minimal:true}}).code+"\n";
const write=(relative,contents)=>{
  const filename=path.join(src,relative);
  fs.mkdirSync(path.dirname(filename),{recursive:true});
  fs.writeFileSync(filename,contents,"utf8");
};
const imp=deps=>Object.entries(deps).map(([source,value])=>
  value.default ? 'import '+value.default+' from "'+source+'";' :
    'import { '+value.named.join(", ")+' } from "'+source+'";'
).join("\n");
function emit(relative,names,deps={}) {
  const imports=imp(deps);
  write(relative,'import * as React from "react";\n'+imports+"\n\n"+
    print(names.map(n=>funcs.get(n)))+"\nexport default "+names[0]+";\n");
}
const data=["navigationItems","transactions","services","suggestedQuestions"].map(n=>
  t.exportNamedDeclaration(t.variableDeclaration("const",[decls.get(n)]),[])
);
data.push(t.exportNamedDeclaration(funcs.get("getMockReply"),[]));
write("data/mockData.js","// Demo values and local keyword-based chat replies from deployed build.\n"+print(data));
emit("screens/HomeScreen.jsx",["HomeScreen"],{"../data/mockData.js":{named:["transactions"]}});
emit("screens/AssistantScreen.jsx",["AssistantScreen"],{
  "./OfferScreen.jsx":{default:"OfferScreen"},
  "./AssistantOverview.jsx":{default:"AssistantOverview"},
  "./ExpensesScreen.jsx":{default:"ExpensesScreen"},
  "./RemindersScreen.jsx":{default:"RemindersScreen"},
  "./SavingsScreen.jsx":{default:"SavingsScreen"},
  "./ChatScreen.jsx":{default:"ChatScreen"}
});
emit("screens/OfferScreen.jsx",["OfferScreen"],{"../components/FeatureRow.jsx":{default:"FeatureRow"}});
emit("screens/AssistantOverview.jsx",["AssistantOverview"],{"../data/mockData.js":{named:["services"]}});
emit("screens/ExpensesScreen.jsx",["ExpensesScreen"],{
  "../components/DetailHeader.jsx":{default:"DetailHeader"},
  "../components/LegendItem.jsx":{default:"LegendItem"}
});
emit("screens/RemindersScreen.jsx",["RemindersScreen"],{"../components/DetailHeader.jsx":{default:"DetailHeader"}});
emit("screens/SavingsScreen.jsx",["SavingsScreen"],{"../components/DetailHeader.jsx":{default:"DetailHeader"}});
emit("screens/ChatScreen.jsx",["ChatScreen"],{
  "../components/DetailHeader.jsx":{default:"DetailHeader"},
  "../data/mockData.js":{named:["suggestedQuestions","getMockReply"]}
});
emit("screens/OtherTabScreen.jsx",["OtherTabScreen"]);
for(const n of ["FeatureRow","DetailHeader","LegendItem"]) emit("components/"+n+".jsx",[n]);
emit("App.jsx",["App"],{
  "./screens/HomeScreen.jsx":{default:"HomeScreen"},
  "./screens/AssistantScreen.jsx":{default:"AssistantScreen"},
  "./screens/OtherTabScreen.jsx":{default:"OtherTabScreen"},
  "./data/mockData.js":{named:["navigationItems"]}
});
write("main.jsx",[
  'import * as React from "react";',
  'import { createRoot } from "react-dom/client";',
  'import App from "./App.jsx";',
  'import "./styles.css";',
  '',
  'createRoot(document.getElementById("root")).render(',
  '  <React.StrictMode><App /></React.StrictMode>',
  ');',
  ''
].join("\n"));
console.log("Converted "+count+" JSX runtime calls; wrote 15+ source modules.");
