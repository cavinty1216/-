import { useState } from "react";
import { Plus, Trash2, Check } from "lucide-react";
import { useLocalStorage, getTodayKey } from "../hooks/useLocalStorage";

export default function TodoPage() {
  const [todos, setTodos] = useLocalStorage("jarvis_todos", []);
  const [input, setInput] = useState("");

  function addTodo() {
    const text = input.trim();
    if (!text) return; // 빈 값은 추가하지 않음
    const newTodo = {
      id: Date.now(), // 간단한 고유 id (현재 시간의 밀리초)
      text,
      done: false,
      createdAt: getTodayKey(),
    };
    setTodos([newTodo, ...todos]);
    setInput("");
  }

  function toggleTodo(id) {
    setTodos(
      todos.map((t) => (t.id === id ? { ...t, done: !t.done } : t))
    );
  }

  function deleteTodo(id) {
    setTodos(todos.filter((t) => t.id !== id));
  }

  function handleKeyDown(e) {
    if (e.key === "Enter") addTodo();
  }

  const activeTodos = todos.filter((t) => !t.done);
  const doneTodos = todos.filter((t) => t.done);

  return (
    <div className="page">
      <div className="page-header">
        <h1 className="page-title">할 일</h1>
        <p className="page-subtitle">
          진행 중 {activeTodos.length}개 · 완료 {doneTodos.length}개
        </p>
      </div>

      <div className="input-row">
        <input
          className="text-input"
          placeholder="할 일을 입력하고 Enter를 누르세요"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button className="btn btn-primary" onClick={addTodo}>
          <Plus size={16} />
          추가
        </button>
      </div>

      {todos.length === 0 ? (
        <div className="empty-state">
          아직 할 일이 없어요. 위에서 첫 할 일을 추가해보세요.
        </div>
      ) : (
        <div className="list">
          {[...activeTodos, ...doneTodos].map((todo) => (
            <div
              key={todo.id}
              className={`list-item ${todo.done ? "done" : ""}`}
            >
              <button
                className={`checkbox ${todo.done ? "checked" : ""}`}
                onClick={() => toggleTodo(todo.id)}
                aria-label="완료 체크"
              >
                {todo.done && <Check size={14} strokeWidth={3} />}
              </button>
              <span
                className={`list-item-text ${todo.done ? "done" : ""}`}
              >
                {todo.text}
              </span>
              <button
                className="btn btn-icon"
                onClick={() => deleteTodo(todo.id)}
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
