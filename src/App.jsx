import * as React from "react";
import HomeScreen from "./screens/HomeScreen.jsx";
import AssistantScreen from "./screens/AssistantScreen.jsx";
import OtherTabScreen from "./screens/OtherTabScreen.jsx";
import { navigationItems } from "./data/mockData.js";

function App() {
  let [e, t] = (0, React.useState)(`home`),
    [n, r] = (0, React.useState)(`offer`);
  return (
    <main className={`prototype-shell`}>
      <section
        className={`phone`}
        aria-label={`Прототип мобильного банковского приложения`}
      >
        <div className={`status-bar`} aria-hidden={`true`}>
          <span>{`9:41`}</span>
          <span className={`status-icons`}>{`● ◔ ▰`}</span>
        </div>
        <div className={`app-viewport`}>
          {e === `home` ? (
            <HomeScreen
              onOpenAssistant={() => t(`assistant`)}
              isAssistantActive={n !== `offer`}
            />
          ) : e === `assistant` ? (
            <AssistantScreen
              view={n}
              onChangeView={r}
              onActivate={() => r(`overview`)}
            />
          ) : (
            <OtherTabScreen kind={e} />
          )}
        </div>
        <nav className={`bottom-nav`} aria-label={`Основная навигация`}>
          {navigationItems.map((n) => (
            <button
              className={e === n.id ? `nav-item active` : `nav-item`}
              onClick={() => t(n.id)}
              aria-current={e === n.id ? `page` : void 0}
              key={n.id}
            >
              <span className={`nav-icon`} aria-hidden={`true`}>
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
