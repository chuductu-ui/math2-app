
export default function HistoryModal({ history, allLessons, onClose }) {
  // Build a lookup for lesson titles
  const lessonTitleMap = {};
  allLessons.forEach((l) => {
    lessonTitleMap[l.id] = l.title;
  });

  const levelLabels = {
    easy: 'Dễ ⭐',
    medium: 'Vừa ⭐⭐',
    hard: 'Khó ⭐⭐⭐',
  };

  // Show most recent first
  const sortedHistory = [...history].reverse();

  return (
    <>
      <div className="modal-overlay" onClick={onClose} />
      <div className="modal history-modal">
        <div className="modal-header">
          <h2>📊 Lịch sử làm bài</h2>
          <button className="modal-close" onClick={onClose} aria-label="Đóng">
            ✕
          </button>
        </div>

        <div className="modal-body">
          {sortedHistory.length === 0 ? (
            <div className="history-empty">
              <span className="empty-icon">📝</span>
              <p>Chưa có lịch sử</p>
              <p className="empty-sub">Hãy làm bài tập để xem kết quả ở đây nhé!</p>
            </div>
          ) : (
            <ul className="history-list">
              {sortedHistory.map((entry, idx) => {
                const dateStr = new Date(entry.date).toLocaleDateString('vi-VN', {
                  day: '2-digit',
                  month: '2-digit',
                  year: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit',
                });

                return (
                  <li key={idx} className="history-item">
                    <div className="history-item-top">
                      <span className="history-lesson-title">
                        {lessonTitleMap[entry.lessonId] || entry.lessonId}
                      </span>
                      <span className="history-level-badge">
                        {levelLabels[entry.level] || entry.level}
                      </span>
                    </div>
                    <div className="history-item-bottom">
                      <span className="history-score">
                        ✅ {entry.score}/{entry.total}
                      </span>
                      <span className="history-date">🕐 {dateStr}</span>
                    </div>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </div>
    </>
  );
}
