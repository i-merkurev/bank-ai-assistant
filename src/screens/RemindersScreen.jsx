import * as React from "react";
import DetailHeader from "../components/DetailHeader.jsx";

function RemindersScreen({ onBack: e }) {
  let [t, n] = (0, React.useState)([!0, !0, !1]),
    [r, i] = (0, React.useState)(!1);
  return (
    <div className={`screen detail-screen`}>
      <DetailHeader title={`Напоминания`} onBack={e} action={`2 активных`} />
      <section className={`reminder-lead`}>
        <span>{`◷`}</span>
        <div>
          <strong>{`Ближайший платёж завтра`}</strong>
          <p>{`Домашний интернет · 1 290 ₽`}</p>
        </div>
      </section>
      <h2 className={`small-section-title`}>{`Регулярные платежи`}</h2>
      <div className={`reminder-list`}>
        {[
          {
            icon: `⌂`,
            title: `ЖКХ`,
            date: `20 августа`,
            amount: `7 840 ₽`,
          },
          {
            icon: `⌁`,
            title: `Домашний интернет`,
            date: `Завтра`,
            amount: `1 290 ₽`,
          },
          {
            icon: `▣`,
            title: `Кредитная карта`,
            date: `28 августа`,
            amount: `12 500 ₽`,
          },
        ].map((e, r) => (
          <div className={`reminder`} key={e.title}>
            <span>{e.icon}</span>
            <div>
              <strong>{e.title}</strong>
              <small>
                {e.date}
                {` · `}
                {e.amount}
              </small>
            </div>
            <button
              className={t[r] ? `toggle on` : `toggle`}
              onClick={() => n((e) => e.map((e, t) => (t === r ? !e : e)))}
              aria-label={`${t[r] ? `Выключить` : `Включить`} напоминание ${e.title}`}
              aria-pressed={t[r]}
            >
              <i />
            </button>
          </div>
        ))}
      </div>
      <button
        className={`secondary-button`}
        onClick={() => i(!0)}
      >{`＋ Добавить напоминание`}</button>
      {r && (
        <div className={`inline-notice`}>{`Новое напоминание добавлено`}</div>
      )}
      <section className={`ai-insight compact`}>
        <span aria-hidden={`true`}>{`✦`}</span>
        <div>
          <strong>{`Совет AI`}</strong>
          <p>{`Включите автоплатежи, чтобы не пропускать даты оплаты.`}</p>
        </div>
      </section>
    </div>
  );
}

export default RemindersScreen;
