import * as React from "react";

function FeatureRow({ icon: e, title: t, text: n }) {
  return (
    <div className={`feature`}>
      <span aria-hidden={`true`}>{e}</span>
      <div>
        <strong>{t}</strong>
        <small>{n}</small>
      </div>
      <i aria-hidden={`true`}>{`›`}</i>
    </div>
  );
}

export default FeatureRow;
