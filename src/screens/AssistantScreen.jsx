import * as React from "react";
import OfferScreen from "./OfferScreen.jsx";
import AssistantOverview from "./AssistantOverview.jsx";
import ExpensesScreen from "./ExpensesScreen.jsx";
import RemindersScreen from "./RemindersScreen.jsx";
import SavingsScreen from "./SavingsScreen.jsx";
import ChatScreen from "./ChatScreen.jsx";

function AssistantScreen({ view: e, onChangeView: t, onActivate: n }) {
  return e === `offer` ? (
    <OfferScreen onActivate={n} />
  ) : e === `expenses` ? (
    <ExpensesScreen onBack={() => t(`overview`)} />
  ) : e === `reminders` ? (
    <RemindersScreen onBack={() => t(`overview`)} />
  ) : e === `savings` ? (
    <SavingsScreen onBack={() => t(`overview`)} />
  ) : e === `chat` ? (
    <ChatScreen onBack={() => t(`overview`)} />
  ) : (
    <AssistantOverview onOpen={t} />
  );
}

export default AssistantScreen;
