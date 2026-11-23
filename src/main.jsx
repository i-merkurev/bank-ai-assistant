// Reconstructed from the published Netlify bundle of 17 Aug 2026.
// This retains the real app's interactions and text, but the original JSX
// component source was not available. Components use compiled jsx-runtime
// calls; refactor them into JSX only after verifying visual parity.
import * as React from "react";
import * as JSX from "react/jsx-runtime";
import { createRoot } from "react-dom/client";
import "./styles.css";

const f = React;
const p = JSX;
const d = { createRoot };

const navigationItems = [
    { id: `home`, label: `Главная`, icon: `⌂` },
    { id: `payments`, label: `Платежи`, icon: `₽` },
    { id: `cards`, label: `Карты`, icon: `▭` },
    { id: `assistant`, label: `AI-помощник`, icon: `✦` },
  ],
  transactions = [
    {
      icon: `П`,
      title: `Перекрёсток`,
      meta: `Продукты · сегодня`,
      amount: `−3 240 ₽`,
      tone: `green`,
    },
    {
      icon: `Я`,
      title: `Яндекс Go`,
      meta: `Транспорт · сегодня`,
      amount: `−780 ₽`,
      tone: `yellow`,
    },
    {
      icon: `₽`,
      title: `Зарплата`,
      meta: `Зачисление · 10 августа`,
      amount: `+184 000 ₽`,
      tone: `violet`,
    },
  ],
  services = [
    {
      id: `expenses`,
      icon: `◔`,
      title: `Расходы`,
      subtitle: `86 420 ₽ в августе`,
    },
    { id: `reminders`, icon: `◷`, title: `Платежи`, subtitle: `2 напоминания` },
    {
      id: `savings`,
      icon: `↗`,
      title: `Накопления`,
      subtitle: `Можно отложить 18 400 ₽`,
    },
    {
      id: `chat`,
      icon: `✦`,
      title: `Задать вопрос`,
      subtitle: `Спросите о финансах`,
    },
  ],
  suggestedQuestions = [
    `Сколько я потратил в этом месяце?`,
    `Как мне начать копить?`,
    `Хватит ли мне денег до зарплаты?`,
  ];
function App() {
  let [e, t] = (0, f.useState)(`home`),
    [n, r] = (0, f.useState)(`offer`);
  return (0, p.jsx)(`main`, {
    className: `prototype-shell`,
    children: (0, p.jsxs)(`section`, {
      className: `phone`,
      "aria-label": `Прототип мобильного банковского приложения`,
      children: [
        (0, p.jsxs)(`div`, {
          className: `status-bar`,
          "aria-hidden": `true`,
          children: [
            (0, p.jsx)(`span`, { children: `9:41` }),
            (0, p.jsx)(`span`, {
              className: `status-icons`,
              children: `● ◔ ▰`,
            }),
          ],
        }),
        (0, p.jsx)(`div`, {
          className: `app-viewport`,
          children:
            e === `home`
              ? (0, p.jsx)(HomeScreen, {
                  onOpenAssistant: () => t(`assistant`),
                  isAssistantActive: n !== `offer`,
                })
              : e === `assistant`
                ? (0, p.jsx)(AssistantScreen, {
                    view: n,
                    onChangeView: r,
                    onActivate: () => r(`overview`),
                  })
                : (0, p.jsx)(OtherTabScreen, { kind: e }),
        }),
        (0, p.jsx)(`nav`, {
          className: `bottom-nav`,
          "aria-label": `Основная навигация`,
          children: navigationItems.map((n) =>
            (0, p.jsxs)(
              `button`,
              {
                className: e === n.id ? `nav-item active` : `nav-item`,
                onClick: () => t(n.id),
                "aria-current": e === n.id ? `page` : void 0,
                children: [
                  (0, p.jsx)(`span`, {
                    className: `nav-icon`,
                    "aria-hidden": `true`,
                    children: n.icon,
                  }),
                  (0, p.jsx)(`span`, { children: n.label }),
                ],
              },
              n.id,
            ),
          ),
        }),
      ],
    }),
  });
}
function HomeScreen({ onOpenAssistant: e, isAssistantActive: t }) {
  return (0, p.jsxs)(`div`, {
    className: `screen home-screen`,
    children: [
      (0, p.jsxs)(`header`, {
        className: `topbar`,
        children: [
          (0, p.jsxs)(`div`, {
            children: [
              (0, p.jsx)(`p`, {
                className: `eyebrow`,
                children: `Добрый вечер`,
              }),
              (0, p.jsx)(`h1`, { children: `Алексей` }),
            ],
          }),
          (0, p.jsx)(`button`, {
            className: `avatar`,
            "aria-label": `Открыть профиль`,
            children: `А`,
          }),
        ],
      }),
      (0, p.jsxs)(`section`, {
        className: `balance-card`,
        "aria-label": `Баланс карты`,
        children: [
          (0, p.jsxs)(`div`, {
            className: `balance-row`,
            children: [
              (0, p.jsxs)(`div`, {
                children: [
                  (0, p.jsx)(`p`, { children: `Баланс` }),
                  (0, p.jsx)(`strong`, { children: `124 850,26 ₽` }),
                ],
              }),
              (0, p.jsx)(`span`, { className: `brand-mark`, children: `RUB⌄` }),
            ],
          }),
          (0, p.jsxs)(`div`, {
            className: `card-meta`,
            children: [
              (0, p.jsx)(`span`, { children: `Личный счёт` }),
              (0, p.jsx)(`span`, { children: `•• 4821` }),
            ],
          }),
        ],
      }),
      (0, p.jsxs)(`div`, {
        className: `quick-actions`,
        "aria-label": `Быстрые действия`,
        children: [
          (0, p.jsxs)(`button`, {
            children: [(0, p.jsx)(`span`, { children: `↗` }), `Перевести`],
          }),
          (0, p.jsxs)(`button`, {
            children: [(0, p.jsx)(`span`, { children: `＋` }), `Пополнить`],
          }),
          (0, p.jsxs)(`button`, {
            children: [(0, p.jsx)(`span`, { children: `▦` }), `Оплатить`],
          }),
          (0, p.jsxs)(`button`, {
            children: [(0, p.jsx)(`span`, { children: `•••` }), `Ещё`],
          }),
        ],
      }),
      (0, p.jsxs)(`button`, {
        className: `ai-promo`,
        onClick: e,
        children: [
          (0, p.jsx)(`span`, {
            className: `promo-spark`,
            "aria-hidden": `true`,
            children: `✦`,
          }),
          (0, p.jsxs)(`span`, {
            className: `promo-copy`,
            children: [
              (0, p.jsx)(`strong`, {
                children: t
                  ? `Ваш финансовый отчёт готов`
                  : `Финансы под контролем с AI`,
              }),
              (0, p.jsx)(`small`, {
                children: t
                  ? `Расходы, платежи и советы в одном месте`
                  : `Анализ расходов и персональные советы`,
              }),
              (0, p.jsx)(`em`, {
                children: t ? `Открыть помощника` : `Первый месяц бесплатно`,
              }),
            ],
          }),
          (0, p.jsx)(`span`, {
            className: `promo-arrow`,
            "aria-hidden": `true`,
            children: `›`,
          }),
        ],
      }),
      (0, p.jsxs)(`section`, {
        className: `operations`,
        children: [
          (0, p.jsxs)(`div`, {
            className: `section-heading`,
            children: [
              (0, p.jsx)(`h2`, { children: `Последние операции` }),
              (0, p.jsx)(`button`, { children: `Все` }),
            ],
          }),
          (0, p.jsx)(`div`, {
            className: `transaction-list`,
            children: transactions.map((e) =>
              (0, p.jsxs)(
                `div`,
                {
                  className: `transaction`,
                  children: [
                    (0, p.jsx)(`span`, {
                      className: `transaction-logo ${e.tone}`,
                      children: e.icon,
                    }),
                    (0, p.jsxs)(`span`, {
                      className: `transaction-copy`,
                      children: [
                        (0, p.jsx)(`strong`, { children: e.title }),
                        (0, p.jsx)(`small`, { children: e.meta }),
                      ],
                    }),
                    (0, p.jsx)(`strong`, {
                      className: e.amount.startsWith(`+`) ? `income` : ``,
                      children: e.amount,
                    }),
                  ],
                },
                e.title,
              ),
            ),
          }),
        ],
      }),
    ],
  });
}
function AssistantScreen({ view: e, onChangeView: t, onActivate: n }) {
  return e === `offer`
    ? (0, p.jsx)(OfferScreen, { onActivate: n })
    : e === `expenses`
      ? (0, p.jsx)(ExpensesScreen, { onBack: () => t(`overview`) })
      : e === `reminders`
        ? (0, p.jsx)(RemindersScreen, { onBack: () => t(`overview`) })
        : e === `savings`
          ? (0, p.jsx)(SavingsScreen, { onBack: () => t(`overview`) })
          : e === `chat`
            ? (0, p.jsx)(ChatScreen, { onBack: () => t(`overview`) })
            : (0, p.jsx)(AssistantOverview, { onOpen: t });
}
function OfferScreen({ onActivate: e }) {
  return (0, p.jsxs)(`div`, {
    className: `screen offer-screen`,
    children: [
      (0, p.jsxs)(`header`, {
        className: `simple-header`,
        children: [
          (0, p.jsxs)(`div`, {
            children: [
              (0, p.jsx)(`p`, {
                className: `eyebrow`,
                children: `Новая возможность`,
              }),
              (0, p.jsx)(`h1`, { children: `AI-помощник` }),
            ],
          }),
          (0, p.jsx)(`span`, {
            className: `ai-orb`,
            "aria-hidden": `true`,
            children: `✦`,
          }),
        ],
      }),
      (0, p.jsxs)(`section`, {
        className: `offer-hero`,
        children: [
          (0, p.jsx)(`span`, {
            className: `hero-orb`,
            "aria-hidden": `true`,
            children: `✦`,
          }),
          (0, p.jsx)(`p`, {
            className: `offer-label`,
            children: `Ваш личный финансовый помощник`,
          }),
          (0, p.jsxs)(`h2`, {
            children: [
              `Разберётся с деньгами,`,
              (0, p.jsx)(`br`, {}),
              `пока вы заняты жизнью`,
            ],
          }),
          (0, p.jsx)(`p`, {
            children: `Анализирует ваши финансы и подсказывает, как ими управлять.`,
          }),
        ],
      }),
      (0, p.jsxs)(`div`, {
        className: `feature-list`,
        children: [
          (0, p.jsx)(FeatureRow, {
            icon: `◔`,
            title: `Анализ расходов`,
            text: `Покажет, куда уходят деньги`,
          }),
          (0, p.jsx)(FeatureRow, {
            icon: `◷`,
            title: `Напоминания`,
            text: `Поможет не пропустить платежи`,
          }),
          (0, p.jsx)(FeatureRow, {
            icon: `↗`,
            title: `Накопления`,
            text: `Подскажет, сколько можно отложить`,
          }),
          (0, p.jsx)(FeatureRow, {
            icon: `✦`,
            title: `Ответы на вопросы`,
            text: `Объяснит сложное простыми словами`,
          }),
        ],
      }),
      (0, p.jsxs)(`div`, {
        className: `offer-footer`,
        children: [
          (0, p.jsxs)(`div`, {
            className: `price-row`,
            children: [
              (0, p.jsxs)(`span`, {
                children: [
                  (0, p.jsx)(`strong`, {
                    children: `30 дней бесплатно`,
                  }),
                  (0, p.jsx)(`small`, { children: `затем 399 ₽ в месяц` }),
                ],
              }),
              (0, p.jsxs)(`span`, {
                className: `price-badge`,
                children: [
                  `Отменить можно`,
                  (0, p.jsx)(`br`, {}),
                  `в любой момент`,
                ],
              }),
            ],
          }),
          (0, p.jsx)(`button`, {
            className: `primary-button`,
            onClick: e,
            children: `Попробовать бесплатно`,
          }),
          (0, p.jsx)(`p`, {
            children: `Нажимая кнопку, вы соглашаетесь с условиями подписки`,
          }),
        ],
      }),
    ],
  });
}
function FeatureRow({ icon: e, title: t, text: n }) {
  return (0, p.jsxs)(`div`, {
    className: `feature`,
    children: [
      (0, p.jsx)(`span`, { "aria-hidden": `true`, children: e }),
      (0, p.jsxs)(`div`, {
        children: [
          (0, p.jsx)(`strong`, { children: t }),
          (0, p.jsx)(`small`, { children: n }),
        ],
      }),
      (0, p.jsx)(`i`, { "aria-hidden": `true`, children: `›` }),
    ],
  });
}
function AssistantOverview({ onOpen: e }) {
  return (0, p.jsxs)(`div`, {
    className: `screen assistant-overview`,
    children: [
      (0, p.jsxs)(`header`, {
        className: `simple-header assistant-header`,
        children: [
          (0, p.jsxs)(`div`, {
            children: [
              (0, p.jsx)(`p`, {
                className: `eyebrow`,
                children: `Пробный период · 30 дней`,
              }),
              (0, p.jsx)(`h1`, { children: `AI-помощник` }),
            ],
          }),
          (0, p.jsx)(`span`, {
            className: `ai-orb`,
            "aria-hidden": `true`,
            children: `✦`,
          }),
        ],
      }),
      (0, p.jsxs)(`section`, {
        className: `assistant-summary`,
        children: [
          (0, p.jsx)(`span`, {
            className: `summary-spark`,
            "aria-hidden": `true`,
            children: `✦`,
          }),
          (0, p.jsxs)(`div`, {
            children: [
              (0, p.jsx)(`p`, { children: `Я проанализировал ваши финансы` }),
              (0, p.jsx)(`h2`, {
                children: `В августе расходы выросли на 12%`,
              }),
              (0, p.jsx)(`small`, {
                children: `Больше всего денег ушло на покупки и кафе`,
              }),
            ],
          }),
        ],
      }),
      (0, p.jsx)(`div`, {
        className: `service-grid`,
        children: services.map((t) =>
          (0, p.jsxs)(
            `button`,
            {
              onClick: () => e(t.id),
              children: [
                (0, p.jsx)(`span`, {
                  className: `service-icon`,
                  "aria-hidden": `true`,
                  children: t.icon,
                }),
                (0, p.jsx)(`strong`, { children: t.title }),
                (0, p.jsx)(`small`, { children: t.subtitle }),
                (0, p.jsx)(`i`, { "aria-hidden": `true`, children: `›` }),
              ],
            },
            t.id,
          ),
        ),
      }),
      (0, p.jsxs)(`section`, {
        className: `generic-tip`,
        children: [
          (0, p.jsxs)(`div`, {
            className: `tip-heading`,
            children: [
              (0, p.jsx)(`span`, { children: `Совет дня` }),
              (0, p.jsx)(`i`, { children: `AI` }),
            ],
          }),
          (0, p.jsx)(`h3`, {
            children: `Попробуйте меньше тратить на необязательные покупки`,
          }),
          (0, p.jsx)(`p`, {
            children: `Это поможет улучшить ваше финансовое положение.`,
          }),
          (0, p.jsx)(`button`, {
            onClick: () => e(`expenses`),
            children: `Посмотреть расходы`,
          }),
        ],
      }),
      (0, p.jsxs)(`button`, {
        className: `ask-strip`,
        onClick: () => e(`chat`),
        children: [
          (0, p.jsx)(`span`, { "aria-hidden": `true`, children: `✦` }),
          (0, p.jsxs)(`span`, {
            children: [
              (0, p.jsx)(`strong`, {
                children: `Спросите AI-помощника`,
              }),
              (0, p.jsx)(`small`, { children: `Например, как начать копить` }),
            ],
          }),
          (0, p.jsx)(`i`, { "aria-hidden": `true`, children: `›` }),
        ],
      }),
    ],
  });
}
function DetailHeader({ title: e, onBack: t, action: n }) {
  return (0, p.jsxs)(`header`, {
    className: `sub-header`,
    children: [
      (0, p.jsx)(`button`, {
        onClick: t,
        "aria-label": `Назад`,
        children: `‹`,
      }),
      (0, p.jsx)(`h1`, { children: e }),
      (0, p.jsx)(`span`, { children: n ?? `` }),
    ],
  });
}
function ExpensesScreen({ onBack: e }) {
  return (0, p.jsxs)(`div`, {
    className: `screen detail-screen`,
    children: [
      (0, p.jsx)(DetailHeader, { title: `Анализ расходов`, onBack: e }),
      (0, p.jsxs)(`div`, {
        className: `period-switch`,
        children: [
          (0, p.jsx)(`button`, { children: `‹` }),
          (0, p.jsx)(`strong`, { children: `Август 2026` }),
          (0, p.jsx)(`button`, { children: `›` }),
        ],
      }),
      (0, p.jsxs)(`section`, {
        className: `expense-total`,
        children: [
          (0, p.jsx)(`p`, { children: `Потрачено за месяц` }),
          (0, p.jsx)(`strong`, { children: `86 420 ₽` }),
          (0, p.jsx)(`span`, { children: `↑ 12% к прошлому месяцу` }),
        ],
      }),
      (0, p.jsxs)(`section`, {
        className: `expense-chart-card`,
        children: [
          (0, p.jsx)(`div`, {
            className: `donut`,
            "aria-label": `Диаграмма расходов`,
            children: (0, p.jsxs)(`span`, {
              children: [
                (0, p.jsx)(`strong`, { children: `86,4` }),
                (0, p.jsx)(`small`, { children: `тыс. ₽` }),
              ],
            }),
          }),
          (0, p.jsxs)(`div`, {
            className: `legend`,
            children: [
              (0, p.jsx)(LegendItem, {
                color: `purple`,
                title: `Покупки`,
                value: `26 790 ₽ · 31%`,
              }),
              (0, p.jsx)(LegendItem, {
                color: `pink`,
                title: `Кафе и рестораны`,
                value: `15 560 ₽ · 18%`,
              }),
              (0, p.jsx)(LegendItem, {
                color: `orange`,
                title: `Продукты`,
                value: `13 830 ₽ · 16%`,
              }),
              (0, p.jsx)(LegendItem, {
                color: `blue`,
                title: `Транспорт`,
                value: `9 510 ₽ · 11%`,
              }),
              (0, p.jsx)(LegendItem, {
                color: `gray`,
                title: `Остальное`,
                value: `20 730 ₽ · 24%`,
              }),
            ],
          }),
        ],
      }),
      (0, p.jsxs)(`section`, {
        className: `ai-insight`,
        children: [
          (0, p.jsx)(`span`, { "aria-hidden": `true`, children: `✦` }),
          (0, p.jsxs)(`div`, {
            children: [
              (0, p.jsx)(`strong`, { children: `Рекомендация AI` }),
              (0, p.jsx)(`p`, {
                children: `Расходы на кафе выросли на 18%. Попробуйте сократить их на 10% – так вы сэкономите около 1 500 ₽.`,
              }),
            ],
          }),
        ],
      }),
    ],
  });
}
function LegendItem({ color: e, title: t, value: n }) {
  return (0, p.jsxs)(`div`, {
    className: `legend-item`,
    children: [
      (0, p.jsx)(`i`, { className: e }),
      (0, p.jsxs)(`span`, {
        children: [
          (0, p.jsx)(`strong`, { children: t }),
          (0, p.jsx)(`small`, { children: n }),
        ],
      }),
    ],
  });
}
function RemindersScreen({ onBack: e }) {
  let [t, n] = (0, f.useState)([!0, !0, !1]),
    [r, i] = (0, f.useState)(!1);
  return (0, p.jsxs)(`div`, {
    className: `screen detail-screen`,
    children: [
      (0, p.jsx)(DetailHeader, {
        title: `Напоминания`,
        onBack: e,
        action: `2 активных`,
      }),
      (0, p.jsxs)(`section`, {
        className: `reminder-lead`,
        children: [
          (0, p.jsx)(`span`, { children: `◷` }),
          (0, p.jsxs)(`div`, {
            children: [
              (0, p.jsx)(`strong`, {
                children: `Ближайший платёж завтра`,
              }),
              (0, p.jsx)(`p`, { children: `Домашний интернет · 1 290 ₽` }),
            ],
          }),
        ],
      }),
      (0, p.jsx)(`h2`, {
        className: `small-section-title`,
        children: `Регулярные платежи`,
      }),
      (0, p.jsx)(`div`, {
        className: `reminder-list`,
        children: [
          { icon: `⌂`, title: `ЖКХ`, date: `20 августа`, amount: `7 840 ₽` },
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
        ].map((e, r) =>
          (0, p.jsxs)(
            `div`,
            {
              className: `reminder`,
              children: [
                (0, p.jsx)(`span`, { children: e.icon }),
                (0, p.jsxs)(`div`, {
                  children: [
                    (0, p.jsx)(`strong`, { children: e.title }),
                    (0, p.jsxs)(`small`, {
                      children: [e.date, ` · `, e.amount],
                    }),
                  ],
                }),
                (0, p.jsx)(`button`, {
                  className: t[r] ? `toggle on` : `toggle`,
                  onClick: () => n((e) => e.map((e, t) => (t === r ? !e : e))),
                  "aria-label": `${t[r] ? `Выключить` : `Включить`} напоминание ${e.title}`,
                  "aria-pressed": t[r],
                  children: (0, p.jsx)(`i`, {}),
                }),
              ],
            },
            e.title,
          ),
        ),
      }),
      (0, p.jsx)(`button`, {
        className: `secondary-button`,
        onClick: () => i(!0),
        children: `＋ Добавить напоминание`,
      }),
      r &&
        (0, p.jsx)(`div`, {
          className: `inline-notice`,
          children: `Новое напоминание добавлено`,
        }),
      (0, p.jsxs)(`section`, {
        className: `ai-insight compact`,
        children: [
          (0, p.jsx)(`span`, { "aria-hidden": `true`, children: `✦` }),
          (0, p.jsxs)(`div`, {
            children: [
              (0, p.jsx)(`strong`, { children: `Совет AI` }),
              (0, p.jsx)(`p`, {
                children: `Включите автоплатежи, чтобы не пропускать даты оплаты.`,
              }),
            ],
          }),
        ],
      }),
    ],
  });
}
function SavingsScreen({ onBack: e }) {
  let [t, n] = (0, f.useState)(!1);
  return (0, p.jsxs)(`div`, {
    className: `screen detail-screen`,
    children: [
      (0, p.jsx)(DetailHeader, { title: `Накопления`, onBack: e }),
      (0, p.jsxs)(`section`, {
        className: `savings-hero`,
        children: [
          (0, p.jsx)(`p`, { children: `Можно откладывать каждый месяц` }),
          (0, p.jsx)(`strong`, { children: `18 400 ₽` }),
          (0, p.jsx)(`small`, { children: `10% от среднего дохода` }),
          (0, p.jsx)(`div`, {
            className: `range-track`,
            children: (0, p.jsx)(`i`, {}),
          }),
          (0, p.jsxs)(`div`, {
            className: `range-labels`,
            children: [
              (0, p.jsx)(`span`, { children: `9 200 ₽` }),
              (0, p.jsx)(`span`, { children: `27 600 ₽` }),
            ],
          }),
        ],
      }),
      (0, p.jsxs)(`section`, {
        className: `goal-card`,
        children: [
          (0, p.jsxs)(`div`, {
            className: `goal-top`,
            children: [
              (0, p.jsx)(`span`, { children: `Подушка безопасности` }),
              (0, p.jsx)(`strong`, { children: `36%` }),
            ],
          }),
          (0, p.jsxs)(`h2`, {
            children: [
              `216 000 ₽ `,
              (0, p.jsx)(`small`, { children: `из 600 000 ₽` }),
            ],
          }),
          (0, p.jsx)(`div`, {
            className: `progress`,
            children: (0, p.jsx)(`i`, {}),
          }),
          (0, p.jsx)(`p`, {
            children: `При текущем темпе цель будет достигнута через 21 месяц.`,
          }),
        ],
      }),
      (0, p.jsxs)(`section`, {
        className: `ai-insight`,
        children: [
          (0, p.jsx)(`span`, { "aria-hidden": `true`, children: `✦` }),
          (0, p.jsxs)(`div`, {
            children: [
              (0, p.jsx)(`strong`, { children: `Рекомендация AI` }),
              (0, p.jsx)(`p`, {
                children: `Откладывайте 10% дохода сразу после получения денег. Это поможет сформировать полезную привычку.`,
              }),
            ],
          }),
        ],
      }),
      (0, p.jsx)(`button`, {
        className: `primary-button`,
        onClick: () => n(!0),
        children: t ? `План накоплений создан` : `Начать копить`,
      }),
      t &&
        (0, p.jsx)(`p`, {
          className: `success-copy`,
          children: `Будем переводить 18 400 ₽ после каждого поступления зарплаты`,
        }),
    ],
  });
}
function ChatScreen({ onBack: e }) {
  let [t, n] = (0, f.useState)(``),
    [r, i] = (0, f.useState)([
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
          { role: `user`, text: t },
          { role: `assistant`, text: getMockReply(t) },
        ]),
        n(``));
    };
  return (0, p.jsxs)(`div`, {
    className: `screen detail-screen chat-screen`,
    children: [
      (0, p.jsx)(DetailHeader, {
        title: `Вопрос помощнику`,
        onBack: e,
        action: `AI`,
      }),
      (0, p.jsx)(`div`, {
        className: `chat-messages`,
        "aria-live": `polite`,
        children: r.map((e, t) =>
          (0, p.jsxs)(
            `div`,
            {
              className: `message ${e.role}`,
              children: [
                e.role === `assistant` &&
                  (0, p.jsx)(`span`, { "aria-hidden": `true`, children: `✦` }),
                (0, p.jsx)(`p`, { children: e.text }),
              ],
            },
            `${e.role}-${t}`,
          ),
        ),
      }),
      r.length === 1 &&
        (0, p.jsx)(`div`, {
          className: `question-chips`,
          children: suggestedQuestions.map((e) =>
            (0, p.jsx)(`button`, { onClick: () => a(e), children: e }, e),
          ),
        }),
      (0, p.jsxs)(`form`, {
        className: `chat-input`,
        onSubmit: (e) => {
          (e.preventDefault(), a(t));
        },
        children: [
          (0, p.jsx)(`input`, {
            value: t,
            onChange: (e) => n(e.target.value),
            placeholder: `Спросите о своих финансах`,
            "aria-label": `Вопрос AI-помощнику`,
          }),
          (0, p.jsx)(`button`, {
            type: `submit`,
            "aria-label": `Отправить вопрос`,
            children: `↑`,
          }),
        ],
      }),
      (0, p.jsx)(`p`, {
        className: `chat-disclaimer`,
        children: `AI может ошибаться. Проверяйте важную информацию.`,
      }),
    ],
  });
}
function getMockReply(e) {
  let t = e.toLowerCase();
  return t.includes(`потрат`) || t.includes(`расход`)
    ? `В августе вы потратили 86 420 ₽ – на 12% больше, чем в прошлом месяце. Больше всего ушло на покупки, кафе и продукты.`
    : t.includes(`коп`) || t.includes(`отлож`) || t.includes(`накоп`)
      ? `Попробуйте откладывать 10% от каждого дохода. При среднем доходе 184 000 ₽ это составит 18 400 ₽ в месяц.`
      : t.includes(`зарплат`) || t.includes(`хватит`) || t.includes(`остат`)
        ? `Сейчас на счетах 124 850 ₽. Чтобы денег хватало дольше, составьте бюджет и сократите необязательные расходы.`
        : `Я проанализировал ваши операции. Контролируйте расходы, планируйте бюджет и старайтесь регулярно откладывать часть дохода.`;
}
function OtherTabScreen({ kind: e }) {
  let t = e === `payments`;
  return (0, p.jsxs)(`div`, {
    className: `screen placeholder-screen`,
    children: [
      (0, p.jsx)(`header`, {
        className: `simple-header`,
        children: (0, p.jsx)(`h1`, { children: t ? `Платежи` : `Карты` }),
      }),
      t
        ? (0, p.jsxs)(p.Fragment, {
            children: [
              (0, p.jsx)(`div`, {
                className: `search-mock`,
                children: `⌕\xA0\xA0 Найти услугу или получателя`,
              }),
              (0, p.jsxs)(`div`, {
                className: `payment-grid`,
                children: [
                  (0, p.jsxs)(`button`, {
                    children: [
                      (0, p.jsx)(`span`, { children: `↗` }),
                      `По номеру телефона`,
                    ],
                  }),
                  (0, p.jsxs)(`button`, {
                    children: [
                      (0, p.jsx)(`span`, { children: `▦` }),
                      `ЖКХ и интернет`,
                    ],
                  }),
                  (0, p.jsxs)(`button`, {
                    children: [
                      (0, p.jsx)(`span`, { children: `₽` }),
                      `Между счетами`,
                    ],
                  }),
                  (0, p.jsxs)(`button`, {
                    children: [
                      (0, p.jsx)(`span`, { children: `•••` }),
                      `Все платежи`,
                    ],
                  }),
                ],
              }),
              (0, p.jsxs)(`div`, {
                className: `placeholder-card compact-card`,
                children: [
                  (0, p.jsx)(`span`, { children: `◷` }),
                  (0, p.jsx)(`h2`, { children: `Ближайшие платежи` }),
                  (0, p.jsx)(`p`, { children: `Интернет · завтра · 1 290 ₽` }),
                ],
              }),
            ],
          })
        : (0, p.jsxs)(p.Fragment, {
            children: [
              (0, p.jsxs)(`section`, {
                className: `mini-bank-card`,
                children: [
                  (0, p.jsx)(`span`, { children: `СБ` }),
                  (0, p.jsx)(`strong`, { children: `124 850,26 ₽` }),
                  (0, p.jsx)(`small`, { children: `•• 4821` }),
                ],
              }),
              (0, p.jsxs)(`div`, {
                className: `placeholder-card compact-card`,
                children: [
                  (0, p.jsx)(`span`, { children: `▭` }),
                  (0, p.jsx)(`h2`, { children: `Основная карта` }),
                  (0, p.jsx)(`p`, { children: `Действует до 08/29 · Visa` }),
                ],
              }),
            ],
          }),
    ],
  });
}
(0, d.createRoot)(document.getElementById(`root`)).render(
  (0, p.jsx)(f.StrictMode, { children: (0, p.jsx)(App, {}) }),
);
