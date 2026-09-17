import { useState } from "react";
import { Plus, Trash2, Dumbbell } from "lucide-react";
import { useLocalStorage, getTodayKey } from "../hooks/useLocalStorage";

export default function ExercisePage() {
  const [logs, setLogs] = useLocalStorage("jarvis_exercise", []);
  const [type, setType] = useState("");
  const [detail, setDetail] = useState("");

  const todayKey = getTodayKey();
  const todayLogs = logs.filter((l) => l.date === todayKey);

  function addLog() {
    const trimmedType = type.trim();
    const trimmedDetail = detail.trim();
    if (!trimmedType || !trimmedDetail) return; // 둘 다 입력해야 추가

    const newLog = {
      id: Date.now(),
      type: trimmedType,
      detail: trimmedDetail, // 예: "30분", "3세트 x 15회"
      date: todayKey,
    };
    setLogs([newLog, ...logs]);
    setType("");
    setDetail("");
  }

  function deleteLog(id) {
    setLogs(logs.filter((l) => l.id !== id));
  }

  function handleKeyDown(e) {
    if (e.key === "Enter") addLog();
  }

  return (
    <div className="page">
      <div className="page-header">
        <h1 className="page-title">운동 기록</h1>
        <p className="page-subtitle">오늘 {todayLogs.length}건 기록됨</p>
      </div>

      <div className="exercise-form">
        <input
          className="text-input"
          placeholder="운동 종류 (예: 러닝, 스쿼트)"
          value={type}
          onChange={(e) => setType(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <input
          className="text-input"
          placeholder="시간 또는 횟수 (예: 30분, 3세트 x 15회)"
          value={detail}
          onChange={(e) => setDetail(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button className="btn btn-primary" onClick={addLog}>
          <Plus size={16} />
          추가
        </button>
      </div>

      {todayLogs.length === 0 ? (
        <div className="empty-state">
          오늘 기록된 운동이 없어요. 위에서 추가해보세요.
        </div>
      ) : (
        <div className="list">
          {todayLogs.map((log) => (
            <div key={log.id} className="list-item">
              <div
                className="stat-icon"
                style={{ width: 32, height: 32, flexShrink: 0 }}
              >
                <Dumbbell size={16} />
              </div>
              <span className="list-item-text">
                <strong>{log.type}</strong>
                <span className="list-item-meta"> · {log.detail}</span>
              </span>
              <button
                className="btn btn-icon"
                onClick={() => deleteLog(log.id)}
                aria-label="삭제"
              >
                <Trash2 size={16} />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
