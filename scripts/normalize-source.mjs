/** One-time readable binding names and simple strings for recovered React modules.
 * Scope-aware Babel rename keeps event handler and nested callback bindings intact.
 */
import fs from "node:fs";
import path from "node:path";
import { parse } from "@babel/parser";
import traverseModule from "@babel/traverse";
import generatorModule from "@babel/generator";
import * as t from "@babel/types";

const traverse = traverseModule.default ?? traverseModule;
const generate = generatorModule.default ?? generatorModule;
const root = path.join(process.cwd(), "src");
const mappings = {
  "App.jsx": { App: { e:"activeTab", t:"setActiveTab", n:"assistantView", r:"setAssistantView" } },
  "screens/HomeScreen.jsx": { HomeScreen: {e:"onOpenAssistant", t:"isAssistantActive"} },
  "screens/AssistantScreen.jsx": { AssistantScreen: {e:"view",t:"onChangeView",n:"onActivate"} },
  "screens/OfferScreen.jsx": { OfferScreen: {e:"onActivate"} },
  "screens/AssistantOverview.jsx": { AssistantOverview: {e:"onOpen"} },
  "screens/ExpensesScreen.jsx": { ExpensesScreen: {e:"onBack"} },
  "screens/RemindersScreen.jsx": {
    RemindersScreen: {e:"onBack",t:"enabledReminders",n:"setEnabledReminders",r:"noticeVisible",i:"setNoticeVisible"}
  },
  "screens/SavingsScreen.jsx": { SavingsScreen: {e:"onBack",t:"started",n:"setStarted"} },
  "screens/ChatScreen.jsx": {
    ChatScreen: {e:"onBack",t:"draft",n:"setDraft",r:"messages",i:"setMessages",a:"sendQuestion"}
  },
  "screens/OtherTabScreen.jsx": { OtherTabScreen: {e:"kind",t:"isPayments"} },
  "components/FeatureRow.jsx": { FeatureRow: {e:"icon",t:"title",n:"text"} },
  "components/DetailHeader.jsx": { DetailHeader: {e:"title",t:"onBack",n:"action"} },
  "components/LegendItem.jsx": { LegendItem: {e:"color",t:"title",n:"value"} },
  "data/mockData.js": {getMockReply: {e:"question",t:"normalizedQuestion"}}
};
let modifications = 0;
for (const [relative, functions] of Object.entries(mappings)) {
  const file=path.join(root,relative);
  const ast=parse(fs.readFileSync(file,"utf8"),{sourceType:"module",plugins:["jsx"]});
  traverse(ast,{
    FunctionDeclaration(p) {
      const renames=functions[p.node.id?.name];
      if(!renames)return;
      for(const [from,to] of Object.entries(renames)) {
        if(p.scope.hasOwnBinding(from)) {
          p.scope.rename(from,to);
          modifications++;
        }
      }
    },
    CallExpression(p) {
      const c=p.node.callee;
      if(t.isSequenceExpression(c)&&c.expressions.length===2&&
        t.isNumericLiteral(c.expressions[0],{value:0})&&
        t.isMemberExpression(c.expressions[1])&&
        t.isIdentifier(c.expressions[1].object,{name:"React"})&&
        t.isIdentifier(c.expressions[1].property,{name:"useState"})) {
        p.node.callee=c.expressions[1];
        modifications++;
      }
    },
    TemplateLiteral(p) {
      if(p.node.expressions.length===0 && !p.parentPath.isTaggedTemplateExpression()) {
        p.replaceWith(t.stringLiteral(p.node.quasis[0].value.cooked));
        modifications++;
      }
    }
  });
  fs.writeFileSync(file,generate(ast,{comments:true,jsescOption:{minimal:true}}).code+"\n");
}
console.log("Normalized",modifications,"bindings, state calls and literal strings.");
