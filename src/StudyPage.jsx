import { useEffect, useRef, useState } from "react";
import { Play, Pause, RotateCcw } from "lucide-react";
import { useLocalStorage, getTodayKey } from "../hooks/useLocalStorage";

function formatClock(totalSeconds) {
  const h = String(Math.floor(totalSeconds / 3600)).padStart(2, "0");
  const m = String(Math.floor((totalSeconds % 3600) / 60)).padStart(2, "0");
  const s = String(totalSeconds % 60).padStart(2, "0");
  return `${h}:${m}:${s}`;
}

export default function StudyPage() {
  const [studySeconds, setStudySeconds] = useLocalStorage(
    "jarvis_study_seconds",
    {}
  );
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef(null);

  const todayKey = getTodayKey();
  const todaySeconds = studySeconds[todayKey] || 0;

  // 1초마다 오늘 누적 공부 시간을 1씩 늘리고, 그 값을 바로
  // localStorage에도 저장합니다. (새로고침해도 누적 기록 유지)
  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setStudySeconds((prev) => {
          const key = getTodayKey();
          const current = prev[key] || 0;
          return { ...prev, [key]: current + 1 };
        });
      }, 1000);
    }
    return () => clearInterval(intervalRef.current);
  }, [isRunning, setStudySeconds]);

  function handleReset() {
    const confirmed = window.confirm(
      "오늘 누적된 공부 시간을 0으로 초기화할까요?"
    );
    if (!confirmed) return;
    setIsRunning(false);
    setStudySeconds((prev) => ({ ...prev, [todayKey]: 0 }));
  }

  return (
    <div className="page">
      <div className="page-header">
        <h1 className="page-title">공부 타이머</h1>
        <p className="page-subtitle">오늘 누적된 공부 시간을 기록해요</p>
      </div>

      <div className="card timer-card">
        <span className={`timer-status ${isRunning ? "running" : ""}`}>
          {isRunning ? "집중 중" : "멈춤"}
        </span>
        <div className="timer-display">{formatClock(todaySeconds)}</div>

        <div className="timer-controls">
          {!isRunning ? (
            <button
              className="btn btn-primary"
              onClick={() => setIsRunning(true)}
            >
              <Play size={16} />
              시작
            </button>
          ) : (
            <button
              className="btn btn-secondary"
              onClick={() => setIsRunning(false)}
            >
              <Pause size={16} />
              일시정지
            </button>
          )}
          <button className="btn btn-danger" onClick={handleReset}>
            <RotateCcw size={16} />
            초기화
          </button>
        </div>
      </div>

      <div className="card">
        <div className="card-title">안내</div>
        <p style={{ color: "var(--text-secondary)", fontSize: 14, margin: 0 }}>
          시작을 누르면 1초마다 시간이 쌓여요. 오늘 누적된 시간은 자동
          저장되어 앱을 닫았다 다시 열어도 유지돼요. (단, 타이머가
          "작동 중"이었는지 여부는 저장되지 않으므로, 새로고침 후에는 다시
          시작 버튼을 눌러야 해요.)
        </p>
      </div>
    </div>
  );
}
