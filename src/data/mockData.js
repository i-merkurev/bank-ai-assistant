// Demo values and local keyword-based chat replies from deployed build.
export const navigationItems = [
  {
    id: `home`,
    label: `Главная`,
    icon: `⌂`,
  },
  {
    id: `payments`,
    label: `Платежи`,
    icon: `₽`,
  },
  {
    id: `cards`,
    label: `Карты`,
    icon: `▭`,
  },
  {
    id: `assistant`,
    label: `AI-помощник`,
    icon: `✦`,
  },
];
export const transactions = [
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
];
export const services = [
  {
    id: `expenses`,
    icon: `◔`,
    title: `Расходы`,
    subtitle: `86 420 ₽ в августе`,
  },
  {
    id: `reminders`,
    icon: `◷`,
    title: `Платежи`,
    subtitle: `2 напоминания`,
  },
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
];
export const suggestedQuestions = [
  `Сколько я потратил в этом месяце?`,
  `Как мне начать копить?`,
  `Хватит ли мне денег до зарплаты?`,
];
export function getMockReply(e) {
  let t = e.toLowerCase();
  return t.includes(`потрат`) || t.includes(`расход`)
    ? `В августе вы потратили 86 420 ₽ – на 12% больше, чем в прошлом месяце. Больше всего ушло на покупки, кафе и продукты.`
    : t.includes(`коп`) || t.includes(`отлож`) || t.includes(`накоп`)
      ? `Попробуйте откладывать 10% от каждого дохода. При среднем доходе 184 000 ₽ это составит 18 400 ₽ в месяц.`
      : t.includes(`зарплат`) || t.includes(`хватит`) || t.includes(`остат`)
        ? `Сейчас на счетах 124 850 ₽. Чтобы денег хватало дольше, составьте бюджет и сократите необязательные расходы.`
        : `Я проанализировал ваши операции. Контролируйте расходы, планируйте бюджет и старайтесь регулярно откладывать часть дохода.`;
}
