import { useState } from "react";
import Navigation from "./Navigation.jsx";
import Home from "./Home.jsx";
import TodoPage from "./TodoPage.jsx";
import NotesPage from "./NotesPage.jsx";
import StudyPage from "./StudyPage.jsx";
import ExercisePage from "./ExercisePage.jsx";
import SettingsPage from "./SettingsPage.jsx";

export default function App() {
  const [activePage, setActivePage] = useState("home");

  function renderPage() {
    switch (activePage) {
      case "home":
        return <Home onNavigate={setActivePage} />;
      case "todo":
        return <TodoPage />;
      case "notes":
        return <NotesPage />;
      case "study":
        return <StudyPage />;
      case "exercise":
        return <ExercisePage />;
      case "settings":
        return <SettingsPage />;
      default:
        return <Home onNavigate={setActivePage} />;
    }
  }

  return (
    <div className="app-shell">
      <Navigation activePage={activePage} onNavigate={setActivePage} />
      <main className="app-main">{renderPage()}</main>
    </div>
  );
}
