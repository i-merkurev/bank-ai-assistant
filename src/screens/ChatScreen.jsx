import * as React from "react";
import DetailHeader from "../components/DetailHeader.jsx";
import { suggestedQuestions, getMockReply } from "../data/mockData.js";

function ChatScreen({ onBack: e }) {
  let [t, n] = (0, React.useState)(``),
    [r, i] = (0, React.useState)([
      {
        role: `assistant`,
        text: `Здравствуйте! Я ваш AI-помощник. Задайте вопрос о расходах, платежах или накоплениях.`,
      },
    ]),
    a = (e) => {
      let t = e.trim();
      t &&
        (i((e) => [
          ...e,
          {
            role: `user`,
            text: t,
          },
          {
            role: `assistant`,
            text: getMockReply(t),
          },
        ]),
        n(``));
    };
  return (
    <div className={`screen detail-screen chat-screen`}>
      <DetailHeader title={`Вопрос помощнику`} onBack={e} action={`AI`} />
      <div className={`chat-messages`} aria-live={`polite`}>
        {r.map((e, t) => (
          <div className={`message ${e.role}`} key={`${e.role}-${t}`}>
            {e.role === `assistant` && <span aria-hidden={`true`}>{`✦`}</span>}
            <p>{e.text}</p>
          </div>
        ))}
      </div>
      {r.length === 1 && (
        <div className={`question-chips`}>
          {suggestedQuestions.map((e) => (
            <button onClick={() => a(e)} key={e}>
              {e}
            </button>
          ))}
        </div>
      )}
      <form
        className={`chat-input`}
        onSubmit={(e) => {
          (e.preventDefault(), a(t));
        }}
      >
        <input
          value={t}
          onChange={(e) => n(e.target.value)}
          placeholder={`Спросите о своих финансах`}
          aria-label={`Вопрос AI-помощнику`}
        />
        <button type={`submit`} aria-label={`Отправить вопрос`}>{`↑`}</button>
      </form>
      <p
        className={`chat-disclaimer`}
      >{`AI может ошибаться. Проверяйте важную информацию.`}</p>
    </div>
  );
}

export default ChatScreen;
