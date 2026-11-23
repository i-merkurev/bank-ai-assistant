import * as React from "react";
import OfferScreen from "./OfferScreen.jsx";
import AssistantOverview from "./AssistantOverview.jsx";
import ExpensesScreen from "./ExpensesScreen.jsx";
import RemindersScreen from "./RemindersScreen.jsx";
import SavingsScreen from "./SavingsScreen.jsx";
import ChatScreen from "./ChatScreen.jsx";
function AssistantScreen({
  view: view,
  onChangeView: onChangeView,
  onActivate: onActivate,
}) {
  return view === "offer" ? (
    <OfferScreen onActivate={onActivate} />
  ) : view === "expenses" ? (
    <ExpensesScreen onBack={() => onChangeView("overview")} />
  ) : view === "reminders" ? (
    <RemindersScreen onBack={() => onChangeView("overview")} />
  ) : view === "savings" ? (
    <SavingsScreen onBack={() => onChangeView("overview")} />
  ) : view === "chat" ? (
    <ChatScreen onBack={() => onChangeView("overview")} />
  ) : (
    <AssistantOverview onOpen={onChangeView} />
  );
}
export default AssistantScreen;
