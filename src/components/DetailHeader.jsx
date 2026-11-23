import * as React from "react";
function DetailHeader({ title: title, onBack: onBack, action: action }) {
  return (
    <header className={"sub-header"}>
      <button onClick={onBack} aria-label={"Назад"}>
        {"‹"}
      </button>
      <h1>{title}</h1>
      <span>{action ?? ""}</span>
    </header>
  );
}
export default DetailHeader;
