import * as React from "react";
import HomeScreen from "./screens/HomeScreen.jsx";
import AssistantScreen from "./screens/AssistantScreen.jsx";
import OtherTabScreen from "./screens/OtherTabScreen.jsx";
import { navigationItems } from "./data/mockData.js";
function App() {
  let [activeTab, setActiveTab] = React.useState("home"),
    [assistantView, setAssistantView] = React.useState("offer");
  return (
    <main className={"prototype-shell"}>
      <section
        className={"phone"}
        aria-label={"Прототип мобильного банковского приложения"}
      >
        <div className={"status-bar"} aria-hidden={"true"}>
          <span>{"9:41"}</span>
          <span className={"status-icons"}>{"● ◔ ▰"}</span>
        </div>
        <div className={"app-viewport"}>
          {activeTab === "home" ? (
            <HomeScreen
              onOpenAssistant={() => setActiveTab("assistant")}
              isAssistantActive={assistantView !== "offer"}
            />
          ) : activeTab === "assistant" ? (
            <AssistantScreen
              view={assistantView}
              onChangeView={setAssistantView}
              onActivate={() => setAssistantView("overview")}
            />
          ) : (
            <OtherTabScreen kind={activeTab} />
          )}
        </div>
        <nav className={"bottom-nav"} aria-label={"Основная навигация"}>
          {navigationItems.map((n) => (
            <button
              className={activeTab === n.id ? "nav-item active" : "nav-item"}
              onClick={() => setActiveTab(n.id)}
              aria-current={activeTab === n.id ? "page" : void 0}
              key={n.id}
            >
              <span className={"nav-icon"} aria-hidden={"true"}>
                {n.icon}
              </span>
              <span>{n.label}</span>
            </button>
          ))}
        </nav>
      </section>
    </main>
  );
}
export default App;
