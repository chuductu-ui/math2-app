const STORAGE_KEY = 'math2_history';

/**
 * Get all quiz attempt history from localStorage.
 * @returns {Array} Array of attempt records
 */
export function getHistory() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

/**
 * Save a quiz attempt record to localStorage.
 * @param {{ lessonId: string, level: string, score: number, total: number, date: string }} attempt
 */
export function saveAttempt(attempt) {
  try {
    const history = getHistory();
    history.push({
      lessonId: attempt.lessonId,
      level: attempt.level,
      score: attempt.score,
      total: attempt.total,
      date: attempt.date || new Date().toISOString(),
    });
    localStorage.setItem(STORAGE_KEY, JSON.stringify(history));
  } catch {
    // Silently fail if localStorage is unavailable
  }
}

/**
 * Clear all quiz attempt history.
 */
export function clearHistory() {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch {
    // Silently fail
  }
}
