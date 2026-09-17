import { useState } from "react";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { useLocalStorage } from "../hooks/useLocalStorage";

function formatDate(iso) {
  const d = new Date(iso);
  return `${d.getMonth() + 1}.${d.getDate()} ${String(d.getHours()).padStart(
    2,
    "0"
  )}:${String(d.getMinutes()).padStart(2, "0")}`;
}

export default function NotesPage() {
  const [notes, setNotes] = useLocalStorage("jarvis_notes", []);
  const [editingId, setEditingId] = useState(null); // null = 모달 닫힘, "new" = 새 메모
  const [draftTitle, setDraftTitle] = useState("");
  const [draftContent, setDraftContent] = useState("");

  function openNewNote() {
    setEditingId("new");
    setDraftTitle("");
    setDraftContent("");
  }

  function openEditNote(note) {
    setEditingId(note.id);
    setDraftTitle(note.title);
    setDraftContent(note.content);
  }

  function closeModal() {
    setEditingId(null);
  }

  function saveNote() {
    const title = draftTitle.trim() || "제목 없음";
    const content = draftContent.trim();

    if (editingId === "new") {
      const newNote = {
        id: Date.now(),
        title,
        content,
        updatedAt: new Date().toISOString(),
      };
      setNotes([newNote, ...notes]);
    } else {
      setNotes(
        notes.map((n) =>
          n.id === editingId
            ? { ...n, title, content, updatedAt: new Date().toISOString() }
            : n
        )
      );
    }
    closeModal();
  }

  function deleteNote(id) {
    setNotes(notes.filter((n) => n.id !== id));
  }

  return (
    <div className="page">
      <div className="page-header">
        <h1 className="page-title">메모</h1>
        <p className="page-subtitle">총 {notes.length}개의 메모</p>
      </div>

      <div className="input-row">
        <button className="btn btn-primary" onClick={openNewNote}>
          <Plus size={16} />
          새 메모
        </button>
      </div>

      {notes.length === 0 ? (
        <div className="empty-state">
          아직 메모가 없어요. "새 메모"를 눌러 작성해보세요.
        </div>
      ) : (
        <div className="notes-grid">
          {notes.map((note) => (
            <div key={note.id} className="card note-card">
              <div className="note-card-title">{note.title}</div>
              <div className="note-card-content">
                {note.content || "내용이 비어있어요"}
              </div>
              <div className="note-card-footer">
                <span className="note-card-date">
                  {formatDate(note.updatedAt)}
                </span>
                <div className="note-actions">
                  <button
                    className="btn btn-icon"
                    onClick={() => openEditNote(note)}
                    aria-label="수정"
                  >
                    <Pencil size={15} />
                  </button>
                  <button
                    className="btn btn-icon"
                    onClick={() => deleteNote(note.id)}
                    aria-label="삭제"
                  >
                    <Trash2 size={15} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {editingId !== null && (
        <div className="modal-backdrop" onClick={closeModal}>
          <div className="modal-card" onClick={(e) => e.stopPropagation()}>
            <div className="modal-title">
              {editingId === "new" ? "새 메모" : "메모 수정"}
            </div>
            <input
              className="text-input"
              placeholder="제목"
              value={draftTitle}
              onChange={(e) => setDraftTitle(e.target.value)}
              autoFocus
            />
            <textarea
              className="textarea-input"
              placeholder="내용을 입력하세요"
              value={draftContent}
              onChange={(e) => setDraftContent(e.target.value)}
            />
            <div className="modal-actions">
              <button className="btn btn-secondary" onClick={closeModal}>
                취소
              </button>
              <button className="btn btn-primary" onClick={saveNote}>
                저장
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
