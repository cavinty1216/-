import {
  Home,
  ListChecks,
  StickyNote,
  Timer,
  Dumbbell,
  Settings,
} from "lucide-react";

// 네비게이션 항목을 한 곳에서 관리합니다.
// id는 App.jsx의 activePage와 매칭되는 값입니다.
export const NAV_ITEMS = [
  { id: "home", label: "홈", icon: Home },
  { id: "todo", label: "할 일", icon: ListChecks },
  { id: "notes", label: "메모", icon: StickyNote },
  { id: "study", label: "공부", icon: Timer },
  { id: "exercise", label: "운동", icon: Dumbbell },
  { id: "settings", label: "설정", icon: Settings },
];

// PC/태블릿에서는 이 컴포넌트가 왼쪽 사이드바로 보이고,
// 모바일 화면(680px 이하)에서는 CSS(@media)가 자동으로
// 하단 네비게이션 모양으로 바꿔서 보여줍니다.
export default function Navigation({ activePage, onNavigate }) {
  return (
    <>
      <aside className="sidebar">
        <div className="sidebar-brand">
          <span className="sidebar-brand-dot" />
          <span className="sidebar-brand-text">JARVIS OS</span>
        </div>

        <nav className="sidebar-nav">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const isActive = activePage === item.id;
            return (
              <button
                key={item.id}
                className={`nav-item ${isActive ? "active" : ""}`}
                onClick={() => onNavigate(item.id)}
              >
                <Icon size={18} strokeWidth={2} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        <div className="sidebar-footer">v1.0 · 개인용 대시보드</div>
      </aside>

      <nav className="bottom-nav">
        {NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          const isActive = activePage === item.id;
          return (
            <button
              key={item.id}
              className={`bottom-nav-item ${isActive ? "active" : ""}`}
              onClick={() => onNavigate(item.id)}
            >
              <Icon size={20} strokeWidth={2} />
              {item.label}
            </button>
          );
        })}
      </nav>
    </>
  );
}
