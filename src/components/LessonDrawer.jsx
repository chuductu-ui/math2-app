import React from 'react';

export default function LessonDrawer({
  lesson,
  progress,
  onClose,
  onStartTheory,
  onStartQuiz,
}) {
  // Level unlock logic: Easy always available, Medium after Easy, Hard after Medium
  const easyUnlocked = true;
  const mediumUnlocked = (progress.easy || 0) > 0;
  const hardUnlocked = (progress.medium || 0) > 0;

  const levels = [
    {
      key: 'easy',
      label: 'Dễ',
      starsIcon: '⭐',
      unlocked: easyUnlocked,
      completed: (progress.easy || 0) > 0,
      earnedStars: progress.easy || 0,
    },
    {
      key: 'medium',
      label: 'Vừa',
      starsIcon: '⭐⭐',
      unlocked: mediumUnlocked,
      completed: (progress.medium || 0) > 0,
      earnedStars: progress.medium || 0,
    },
    {
      key: 'hard',
      label: 'Khó',
      starsIcon: '⭐⭐⭐',
      unlocked: hardUnlocked,
      completed: (progress.hard || 0) > 0,
      earnedStars: progress.hard || 0,
    },
  ];

  return (
    <>
      {/* Backdrop overlay */}
      <div className="drawer-overlay" onClick={onClose} />

      {/* Slide-up drawer */}
      <div className="lesson-drawer">
        <button className="drawer-close-btn" onClick={onClose} aria-label="Đóng">
          ✕
        </button>

        <div className="drawer-content">
          <h2 className="drawer-title">{lesson.title}</h2>
          <p className="drawer-description">{lesson.description}</p>

          {/* Theory button */}
          <button
            className="drawer-btn drawer-btn--theory"
            onClick={onStartTheory}
          >
            Lý thuyết 📖
          </button>

          {/* Difficulty level buttons */}
          <div className="drawer-levels">
            <h3 className="drawer-levels-title">Chọn mức độ:</h3>
            {levels.map((lvl) => (
              <button
                key={lvl.key}
                className={`drawer-btn drawer-btn--level drawer-btn--${lvl.key} ${
                  !lvl.unlocked ? 'drawer-btn--locked' : ''
                } ${lvl.completed ? 'drawer-btn--completed' : ''}`}
                onClick={() => lvl.unlocked && onStartQuiz(lvl.key)}
                disabled={!lvl.unlocked}
              >
                <span className="level-label">
                  {lvl.label} {lvl.starsIcon}
                </span>
                {!lvl.unlocked && <span className="level-lock">🔒</span>}
                {lvl.completed && (
                  <span className="level-earned">
                    {'⭐'.repeat(lvl.earnedStars)}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
