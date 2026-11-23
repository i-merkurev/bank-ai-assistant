import * as React from "react";

function LegendItem({ color: e, title: t, value: n }) {
  return (
    <div className={`legend-item`}>
      <i className={e} />
      <span>
        <strong>{t}</strong>
        <small>{n}</small>
      </span>
    </div>
  );
}

export default LegendItem;
