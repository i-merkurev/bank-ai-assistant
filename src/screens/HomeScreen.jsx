import * as React from "react";
import { transactions } from "../data/mockData.js";
function HomeScreen({
  onOpenAssistant: onOpenAssistant,
  isAssistantActive: isAssistantActive,
}) {
  return (
    <div className={"screen home-screen"}>
      <header className={"topbar"}>
        <div>
          <p className={"eyebrow"}>{"Добрый вечер"}</p>
          <h1>{"Алексей"}</h1>
        </div>
        <button className={"avatar"} aria-label={"Открыть профиль"}>
          {"А"}
        </button>
      </header>
      <section className={"balance-card"} aria-label={"Баланс карты"}>
        <div className={"balance-row"}>
          <div>
            <p>{"Баланс"}</p>
            <strong>{"124 850,26 ₽"}</strong>
          </div>
          <span className={"brand-mark"}>{"RUB⌄"}</span>
        </div>
        <div className={"card-meta"}>
          <span>{"Личный счёт"}</span>
          <span>{"•• 4821"}</span>
        </div>
      </section>
      <div className={"quick-actions"} aria-label={"Быстрые действия"}>
        <button>
          <span>{"↗"}</span>
          {"Перевести"}
        </button>
        <button>
          <span>{"＋"}</span>
          {"Пополнить"}
        </button>
        <button>
          <span>{"▦"}</span>
          {"Оплатить"}
        </button>
        <button>
          <span>{"•••"}</span>
          {"Ещё"}
        </button>
      </div>
      <button className={"ai-promo"} onClick={onOpenAssistant}>
        <span className={"promo-spark"} aria-hidden={"true"}>
          {"✦"}
        </span>
        <span className={"promo-copy"}>
          <strong>
            {isAssistantActive
              ? "Ваш финансовый отчёт готов"
              : "Финансы под контролем с AI"}
          </strong>
          <small>
            {isAssistantActive
              ? "Расходы, платежи и советы в одном месте"
              : "Анализ расходов и персональные советы"}
          </small>
          <em>
            {isAssistantActive ? "Открыть помощника" : "Первый месяц бесплатно"}
          </em>
        </span>
        <span className={"promo-arrow"} aria-hidden={"true"}>
          {"›"}
        </span>
      </button>
      <section className={"operations"}>
        <div className={"section-heading"}>
          <h2>{"Последние операции"}</h2>
          <button>{"Все"}</button>
        </div>
        <div className={"transaction-list"}>
          {transactions.map((e) => (
            <div className={"transaction"} key={e.title}>
              <span className={`transaction-logo ${e.tone}`}>{e.icon}</span>
              <span className={"transaction-copy"}>
                <strong>{e.title}</strong>
                <small>{e.meta}</small>
              </span>
              <strong className={e.amount.startsWith("+") ? "income" : ""}>
                {e.amount}
              </strong>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
export default HomeScreen;
