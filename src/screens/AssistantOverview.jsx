import * as React from "react";
import { services } from "../data/mockData.js";
function AssistantOverview({ onOpen: onOpen }) {
  return (
    <div className={"screen assistant-overview"}>
      <header className={"simple-header assistant-header"}>
        <div>
          <p className={"eyebrow"}>{"Пробный период · 30 дней"}</p>
          <h1>{"AI-помощник"}</h1>
        </div>
        <span className={"ai-orb"} aria-hidden={"true"}>
          {"✦"}
        </span>
      </header>
      <section className={"assistant-summary"}>
        <span className={"summary-spark"} aria-hidden={"true"}>
          {"✦"}
        </span>
        <div>
          <p>{"Я проанализировал ваши финансы"}</p>
          <h2>{"В августе расходы выросли на 12%"}</h2>
          <small>{"Больше всего денег ушло на покупки и кафе"}</small>
        </div>
      </section>
      <div className={"service-grid"}>
        {services.map((t) => (
          <button onClick={() => onOpen(t.id)} key={t.id}>
            <span className={"service-icon"} aria-hidden={"true"}>
              {t.icon}
            </span>
            <strong>{t.title}</strong>
            <small>{t.subtitle}</small>
            <i aria-hidden={"true"}>{"›"}</i>
          </button>
        ))}
      </div>
      <section className={"generic-tip"}>
        <div className={"tip-heading"}>
          <span>{"Совет дня"}</span>
          <i>{"AI"}</i>
        </div>
        <h3>{"Попробуйте меньше тратить на необязательные покупки"}</h3>
        <p>{"Это поможет улучшить ваше финансовое положение."}</p>
        <button onClick={() => onOpen("expenses")}>
          {"Посмотреть расходы"}
        </button>
      </section>
      <button className={"ask-strip"} onClick={() => onOpen("chat")}>
        <span aria-hidden={"true"}>{"✦"}</span>
        <span>
          <strong>{"Спросите AI-помощника"}</strong>
          <small>{"Например, как начать копить"}</small>
        </span>
        <i aria-hidden={"true"}>{"›"}</i>
      </button>
    </div>
  );
}
export default AssistantOverview;
