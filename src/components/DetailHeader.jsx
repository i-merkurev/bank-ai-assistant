import * as React from "react";

function DetailHeader({ title: e, onBack: t, action: n }) {
  return (
    <header className={`sub-header`}>
      <button onClick={t} aria-label={`Назад`}>{`‹`}</button>
      <h1>{e}</h1>
      <span>{n ?? ``}</span>
    </header>
  );
}

export default DetailHeader;
