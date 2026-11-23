import * as React from "react";
import FeatureRow from "../components/FeatureRow.jsx";
function OfferScreen({ onActivate: onActivate }) {
  return (
    <div className={"screen offer-screen"}>
      <header className={"simple-header"}>
        <div>
          <p className={"eyebrow"}>{"Новая возможность"}</p>
          <h1>{"AI-помощник"}</h1>
        </div>
        <span className={"ai-orb"} aria-hidden={"true"}>
          {"✦"}
        </span>
      </header>
      <section className={"offer-hero"}>
        <span className={"hero-orb"} aria-hidden={"true"}>
          {"✦"}
        </span>
        <p className={"offer-label"}>{"Ваш личный финансовый помощник"}</p>
        <h2>
          {"Разберётся с деньгами,"}
          <br />
          {"пока вы заняты жизнью"}
        </h2>
        <p>{"Анализирует ваши финансы и подсказывает, как ими управлять."}</p>
      </section>
      <div className={"feature-list"}>
        <FeatureRow
          icon={"◔"}
          title={"Анализ расходов"}
          text={"Покажет, куда уходят деньги"}
        />
        <FeatureRow
          icon={"◷"}
          title={"Напоминания"}
          text={"Поможет не пропустить платежи"}
        />
        <FeatureRow
          icon={"↗"}
          title={"Накопления"}
          text={"Подскажет, сколько можно отложить"}
        />
        <FeatureRow
          icon={"✦"}
          title={"Ответы на вопросы"}
          text={"Объяснит сложное простыми словами"}
        />
      </div>
      <div className={"offer-footer"}>
        <div className={"price-row"}>
          <span>
            <strong>{"30 дней бесплатно"}</strong>
            <small>{"затем 399 ₽ в месяц"}</small>
          </span>
          <span className={"price-badge"}>
            {"Отменить можно"}
            <br />
            {"в любой момент"}
          </span>
        </div>
        <button className={"primary-button"} onClick={onActivate}>
          {"Попробовать бесплатно"}
        </button>
        <p>{"Нажимая кнопку, вы соглашаетесь с условиями подписки"}</p>
      </div>
    </div>
  );
}
export default OfferScreen;
