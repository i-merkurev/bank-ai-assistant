import * as React from "react";
import DetailHeader from "../components/DetailHeader.jsx";
import LegendItem from "../components/LegendItem.jsx";
function ExpensesScreen({ onBack: onBack }) {
  return (
    <div className={"screen detail-screen"}>
      <DetailHeader title={"Анализ расходов"} onBack={onBack} />
      <div className={"period-switch"}>
        <button>{"‹"}</button>
        <strong>{"Август 2026"}</strong>
        <button>{"›"}</button>
      </div>
      <section className={"expense-total"}>
        <p>{"Потрачено за месяц"}</p>
        <strong>{"86 420 ₽"}</strong>
        <span>{"↑ 12% к прошлому месяцу"}</span>
      </section>
      <section className={"expense-chart-card"}>
        <div className={"donut"} aria-label={"Диаграмма расходов"}>
          <span>
            <strong>{"86,4"}</strong>
            <small>{"тыс. ₽"}</small>
          </span>
        </div>
        <div className={"legend"}>
          <LegendItem
            color={"purple"}
            title={"Покупки"}
            value={"26 790 ₽ · 31%"}
          />
          <LegendItem
            color={"pink"}
            title={"Кафе и рестораны"}
            value={"15 560 ₽ · 18%"}
          />
          <LegendItem
            color={"orange"}
            title={"Продукты"}
            value={"13 830 ₽ · 16%"}
          />
          <LegendItem
            color={"blue"}
            title={"Транспорт"}
            value={"9 510 ₽ · 11%"}
          />
          <LegendItem
            color={"gray"}
            title={"Остальное"}
            value={"20 730 ₽ · 24%"}
          />
        </div>
      </section>
      <section className={"ai-insight"}>
        <span aria-hidden={"true"}>{"✦"}</span>
        <div>
          <strong>{"Рекомендация AI"}</strong>
          <p>
            {
              "Расходы на кафе выросли на 18%. Попробуйте сократить их на 10% – так вы сэкономите около 1 500 ₽."
            }
          </p>
        </div>
      </section>
    </div>
  );
}
export default ExpensesScreen;
