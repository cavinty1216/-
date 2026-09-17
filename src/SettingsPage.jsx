import { useState } from "react";
import { Moon, Info, Trash2 } from "lucide-react";

const STORAGE_KEYS = [
  "jarvis_todos",
  "jarvis_notes",
  "jarvis_study_seconds",
  "jarvis_exercise",
];

export default function SettingsPage() {
  const [showConfirm, setShowConfirm] = useState(false);

  function resetAllData() {
    STORAGE_KEYS.forEach((key) => window.localStorage.removeItem(key));
    setShowConfirm(false);
    // 데이터를 지운 뒤 화면을 새로 불러와서 모든 페이지에 바로 반영합니다.
    window.location.reload();
  }

  return (
    <div className="page">
      <div className="page-header">
        <h1 className="page-title">설정</h1>
        <p className="page-subtitle">앱 정보와 데이터 관리</p>
      </div>

      <div className="card settings-section">
        <div className="settings-row">
          <div>
            <div className="settings-label">다크 모드</div>
            <div className="settings-desc">
              JARVIS OS는 항상 다크 테마로 표시돼요
            </div>
          </div>
          <Moon size={18} color="var(--accent-strong)" />
        </div>

        <div className="settings-row">
          <div>
            <div className="settings-label">앱 정보</div>
            <div className="settings-desc">JARVIS OS · v1.0 · 개인용 대시보드</div>
          </div>
          <Info size={18} color="var(--text-tertiary)" />
        </div>

        <div className="settings-row">
          <div>
            <div className="settings-label">데이터 저장 위치</div>
            <div className="settings-desc">
              이 브라우저의 localStorage에만 저장돼요 (서버 전송 없음)
            </div>
          </div>
        </div>
      </div>

      <div className="card settings-section">
        <div className="settings-row">
          <div>
            <div className="settings-label" style={{ color: "var(--danger)" }}>
              모든 데이터 초기화
            </div>
            <div className="settings-desc">
              할 일 · 메모 · 공부 기록 · 운동 기록이 모두 삭제돼요
            </div>
          </div>
          <button
            className="btn btn-danger"
            onClick={() => setShowConfirm(true)}
          >
            <Trash2 size={16} />
            초기화
          </button>
        </div>
      </div>

      {showConfirm && (
        <div
          className="modal-backdrop"
          onClick={() => setShowConfirm(false)}
        >
          <div className="modal-card" onClick={(e) => e.stopPropagation()}>
            <div className="modal-title">정말 초기화할까요?</div>
            <p style={{ color: "var(--text-secondary)", fontSize: 14, margin: 0 }}>
              이 작업은 되돌릴 수 없어요. 저장된 모든 할 일, 메모, 공부
              시간, 운동 기록이 영구적으로 삭제돼요.
            </p>
            <div className="modal-actions">
              <button
                className="btn btn-secondary"
                onClick={() => setShowConfirm(false)}
              >
                취소
              </button>
              <button className="btn btn-danger" onClick={resetAllData}>
                초기화할게요
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
