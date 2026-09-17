import { useState } from "react";
import Navigation from "./components/Navigation.jsx";
import Home from "./pages/Home.jsx";
import TodoPage from "./pages/TodoPage.jsx";
import NotesPage from "./pages/NotesPage.jsx";
import StudyPage from "./pages/StudyPage.jsx";
import ExercisePage from "./pages/ExercisePage.jsx";
import SettingsPage from "./pages/SettingsPage.jsx";







// 라우팅 라이브러리 없이, activePage라는 하나의 state로
// 어떤 페이지를 보여줄지 결정합니다. (초보자가 이해하기 쉬운 방식)
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
