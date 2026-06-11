import React from 'react';

export default function QuestMap({
  chapters,
  allLessons,
  progress,
  isLessonUnlocked,
  onSelectLesson,
}) {
  // Build a flat list with chapter dividers
  const nodes = [];
  let globalIndex = 0;

  chapters.forEach((chapter) => {
    // Add chapter header
    nodes.push({ type: 'chapter', chapter });

    chapter.lessons.forEach((lesson) => {
      const lessonIndex = globalIndex;
      const unlocked = isLessonUnlocked(lessonIndex);
      const lessonProgress = progress[lesson.id] || {};
      const completed =
        lessonProgress.easy > 0 &&
        lessonProgress.medium > 0 &&
        lessonProgress.hard > 0;
      const started =
        lessonProgress.easy > 0 ||
        lessonProgress.medium > 0 ||
        lessonProgress.hard > 0;

      nodes.push({
        type: 'lesson',
        lesson,
        lessonIndex,
        unlocked,
        completed,
        started,
        lessonProgress,
      });

      globalIndex++;
    });
  });

  return (
    <div className="quest-map">
      <div className="quest-path">
        {nodes.map((node, idx) => {
          if (node.type === 'chapter') {
            return (
              <div key={node.chapter.id} className="quest-chapter-header">
                <div className="chapter-badge">📚</div>
                <h2>{node.chapter.title}</h2>
              </div>
            );
          }

          const { lesson, unlocked, completed, started, lessonIndex } = node;
          // Zigzag: alternate left/right based on lesson index
          const side = lessonIndex % 2 === 0 ? 'left' : 'right';

          let statusEmoji = '🔒';
          let statusClass = 'locked';
          if (completed) {
            statusEmoji = '⭐';
            statusClass = 'completed';
          } else if (unlocked) {
            statusEmoji = '📝';
            statusClass = 'current';
          }

          return (
            <div
              key={lesson.id}
              id={`node-${lesson.id}`}
              className={`quest-node quest-node--${side} quest-node--${statusClass}`}
              onClick={() => unlocked && onSelectLesson(lesson)}
              role="button"
              tabIndex={unlocked ? 0 : -1}
              aria-label={`${lesson.title} - ${
                completed ? 'Đã hoàn thành' : unlocked ? 'Có thể học' : 'Chưa mở khóa'
              }`}
              onKeyDown={(e) => {
                if ((e.key === 'Enter' || e.key === ' ') && unlocked) {
                  onSelectLesson(lesson);
                }
              }}
            >
              {/* Connector line */}
              {lessonIndex > 0 && (
                <div className="quest-connector">
                  <svg viewBox="0 0 60 40" className="connector-svg">
                    <path
                      d={
                        side === 'left'
                          ? 'M50,0 Q30,20 10,40'
                          : 'M10,0 Q30,20 50,40'
                      }
                      fill="none"
                      stroke={completed ? '#FFD700' : unlocked ? '#4CAF50' : '#ccc'}
                      strokeWidth="3"
                      strokeDasharray={unlocked ? 'none' : '5,5'}
                    />
                  </svg>
                </div>
              )}

              <div className="quest-node-bubble">
                <span className="node-emoji">{statusEmoji}</span>
                <span className="node-number">Bài {lessonIndex + 1}</span>
              </div>

              <div className="quest-node-label">
                <span className="node-title">{lesson.title}</span>
                {/* Mini stars for completed levels */}
                {started && (
                  <div className="node-mini-stars">
                    <span className={node.lessonProgress.easy > 0 ? 'earned' : ''}>
                      {node.lessonProgress.easy > 0 ? '⭐' : '☆'}
                    </span>
                    <span className={node.lessonProgress.medium > 0 ? 'earned' : ''}>
                      {node.lessonProgress.medium > 0 ? '⭐' : '☆'}
                    </span>
                    <span className={node.lessonProgress.hard > 0 ? 'earned' : ''}>
                      {node.lessonProgress.hard > 0 ? '⭐' : '☆'}
                    </span>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
