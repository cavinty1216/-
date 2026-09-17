import { useEffect, useState } from "react";
import { ListChecks, StickyNote, Timer, Dumbbell } from "lucide-react";
import { useLocalStorage, getTodayKey } from "../hooks/useLocalStorage";

const WEEKDAYS = ["일", "월", "화", "수", "목", "금", "토"];

function getGreeting(hour) {
  if (hour < 5) return "늦은 시간까지 고생이 많아요";
  if (hour < 12) return "좋은 아침이에요";
  if (hour < 18) return "오늘도 힘내고 있네요";
  if (hour < 22) return "저녁도 화이팅이에요";
  return "이제 슬슬 쉬어도 좋아요";
}

function formatSeconds(totalSeconds) {
  const h = Math.floor(totalSeconds / 3600);
  const m = Math.floor((totalSeconds % 3600) / 60);
  if (h > 0) return `${h}시간 ${m}분`;
  return `${m}분`;
}

export default function Home({ onNavigate }) {
  const [now, setNow] = useState(new Date());

  // 1초마다 시계를 갱신합니다. (실시간 시간 표시)
  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const [todos] = useLocalStorage("jarvis_todos", []);
  const [studySeconds] = useLocalStorage("jarvis_study_seconds", {});
  const [exerciseLogs] = useLocalStorage("jarvis_exercise", []);

  const todayKey = getTodayKey();
  const todayTodoCount = todos.filter(
    (t) => !t.done && t.createdAt === todayKey
  ).length;
  const todayStudySeconds = studySeconds[todayKey] || 0;
  const todayExerciseCount = exerciseLogs.filter(
    (e) => e.date === todayKey
  ).length;

  const hh = String(now.getHours()).padStart(2, "0");
  const mm = String(now.getMinutes()).padStart(2, "0");
  const ss = String(now.getSeconds()).padStart(2, "0");
  const dateLabel = `${now.getMonth() + 1}월 ${now.getDate()}일 ${
    WEEKDAYS[now.getDay()]
  }요일`;

  const shortcuts = [
    {
      id: "todo",
      label: "할 일 관리",
      desc: "오늘 할 일을 정리해요",
      icon: ListChecks,
      color: "#4ea8ff",
    },
    {
      id: "notes",
      label: "메모",
      desc: "생각을 기록해요",
      icon: StickyNote,
      color: "#f4c761",
    },
    {
      id: "study",
      label: "공부 타이머",
      desc: "집중 시간을 측정해요",
      icon: Timer,
      color: "#34d399",
    },
    {
      id: "exercise",
      label: "운동 기록",
      desc: "오늘의 운동을 남겨요",
      icon: Dumbbell,
      color: "#f87171",
    },
  ];

  return (
    <div className="page">
      <div className="home-greeting-card">
        <div className="home-greeting">{getGreeting(now.getHours())}</div>
        <div className="home-time">
          {hh}:{mm}:{ss}
        </div>
        <div className="home-date">{dateLabel}</div>
      </div>

      <div className="stat-grid">
        <div className="card stat-card">
          <div className="stat-icon">
            <ListChecks size={18} />
          </div>
          <div className="stat-value">{todayTodoCount}</div>
          <div className="stat-label">오늘 할 일</div>
        </div>
        <div className="card stat-card">
          <div className="stat-icon">
            <Timer size={18} />
          </div>
          <div className="stat-value">{formatSeconds(todayStudySeconds)}</div>
          <div className="stat-label">오늘 공부</div>
        </div>
        <div className="card stat-card">
          <div className="stat-icon">
            <Dumbbell size={18} />
          </div>
          <div className="stat-value">{todayExerciseCount}건</div>
          <div className="stat-label">오늘 운동</div>
        </div>
      </div>

      <div className="card-title">바로가기</div>
      <div className="shortcut-grid">
        {shortcuts.map((s) => {
          const Icon = s.icon;
          return (
            <div
              key={s.id}
              className="card shortcut-card"
              onClick={() => onNavigate(s.id)}
            >
              <div
                className="shortcut-icon"
                style={{
                  background: `${s.color}22`,
                  color: s.color,
                }}
              >
                <Icon size={20} />
              </div>
              <div>
                <div className="shortcut-label">{s.label}</div>
                <div className="shortcut-desc">{s.desc}</div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
