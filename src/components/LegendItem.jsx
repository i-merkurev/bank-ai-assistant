import * as React from "react";
function LegendItem({ color: color, title: title, value: value }) {
  return (
    <div className={"legend-item"}>
      <i className={color} />
      <span>
        <strong>{title}</strong>
        <small>{value}</small>
      </span>
    </div>
  );
}
export default LegendItem;
