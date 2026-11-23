import * as React from "react";
import DetailHeader from "../components/DetailHeader.jsx";

function SavingsScreen({ onBack: e }) {
  let [t, n] = (0, React.useState)(!1);
  return (
    <div className={`screen detail-screen`}>
      <DetailHeader title={`Накопления`} onBack={e} />
      <section className={`savings-hero`}>
        <p>{`Можно откладывать каждый месяц`}</p>
        <strong>{`18 400 ₽`}</strong>
        <small>{`10% от среднего дохода`}</small>
        <div className={`range-track`}>
          <i />
        </div>
        <div className={`range-labels`}>
          <span>{`9 200 ₽`}</span>
          <span>{`27 600 ₽`}</span>
        </div>
      </section>
      <section className={`goal-card`}>
        <div className={`goal-top`}>
          <span>{`Подушка безопасности`}</span>
          <strong>{`36%`}</strong>
        </div>
        <h2>
          {`216 000 ₽ `}
          <small>{`из 600 000 ₽`}</small>
        </h2>
        <div className={`progress`}>
          <i />
        </div>
        <p>{`При текущем темпе цель будет достигнута через 21 месяц.`}</p>
      </section>
      <section className={`ai-insight`}>
        <span aria-hidden={`true`}>{`✦`}</span>
        <div>
          <strong>{`Рекомендация AI`}</strong>
          <p>{`Откладывайте 10% дохода сразу после получения денег. Это поможет сформировать полезную привычку.`}</p>
        </div>
      </section>
      <button className={`primary-button`} onClick={() => n(!0)}>
        {t ? `План накоплений создан` : `Начать копить`}
      </button>
      {t && (
        <p
          className={`success-copy`}
        >{`Будем переводить 18 400 ₽ после каждого поступления зарплаты`}</p>
      )}
    </div>
  );
}

export default SavingsScreen;
