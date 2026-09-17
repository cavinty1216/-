import { useState, useEffect } from "react";

// localStorage(브라우저에 데이터를 저장해주는 저장소)와 자동으로 동기화되는
// useState 입니다. 새로고침해도 데이터가 사라지지 않도록 해줍니다.
export function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    try {
      const saved = window.localStorage.getItem(key);
      return saved !== null ? JSON.parse(saved) : initialValue;
    } catch (error) {
      console.error(`localStorage 읽기 실패 (key: ${key})`, error);
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error(`localStorage 저장 실패 (key: ${key})`, error);
    }
  }, [key, value]);

  return [value, setValue];
}

// 오늘 날짜를 "YYYY-MM-DD" 형태의 문자열로 반환합니다.
// 여러 페이지(할 일, 공부, 운동)에서 "오늘 것만" 걸러낼 때 공통으로 사용합니다.
export function getTodayKey() {
  const now = new Date();
  const y = now.getFullYear();
  const m = String(now.getMonth() + 1).padStart(2, "0");
  const d = String(now.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}
