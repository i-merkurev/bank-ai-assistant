import * as React from "react";

function OtherTabScreen({ kind: e }) {
  let t = e === `payments`;
  return (
    <div className={`screen placeholder-screen`}>
      <header className={`simple-header`}>
        <h1>{t ? `Платежи` : `Карты`}</h1>
      </header>
      {t ? (
        <>
          <div
            className={`search-mock`}
          >{`⌕\xA0\xA0 Найти услугу или получателя`}</div>
          <div className={`payment-grid`}>
            <button>
              <span>{`↗`}</span>
              {`По номеру телефона`}
            </button>
            <button>
              <span>{`▦`}</span>
              {`ЖКХ и интернет`}
            </button>
            <button>
              <span>{`₽`}</span>
              {`Между счетами`}
            </button>
            <button>
              <span>{`•••`}</span>
              {`Все платежи`}
            </button>
          </div>
          <div className={`placeholder-card compact-card`}>
            <span>{`◷`}</span>
            <h2>{`Ближайшие платежи`}</h2>
            <p>{`Интернет · завтра · 1 290 ₽`}</p>
          </div>
        </>
      ) : (
        <>
          <section className={`mini-bank-card`}>
            <span>{`СБ`}</span>
            <strong>{`124 850,26 ₽`}</strong>
            <small>{`•• 4821`}</small>
          </section>
          <div className={`placeholder-card compact-card`}>
            <span>{`▭`}</span>
            <h2>{`Основная карта`}</h2>
            <p>{`Действует до 08/29 · Visa`}</p>
          </div>
        </>
      )}
    </div>
  );
}

export default OtherTabScreen;
