import * as React from "react";
function FeatureRow({ icon: icon, title: title, text: text }) {
  return (
    <div className={"feature"}>
      <span aria-hidden={"true"}>{icon}</span>
      <div>
        <strong>{title}</strong>
        <small>{text}</small>
      </div>
      <i aria-hidden={"true"}>{"›"}</i>
    </div>
  );
}
export default FeatureRow;
