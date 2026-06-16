import React from 'react';

export default function LessonDrawer({
  lesson,
  progress,
  onClose,
  onStartTheory,
  onStartQuiz,
}) {
  // Level unlock logic: all levels (Easy, Medium, Hard) are unlocked immediately
  const easyUnlocked = true;
  const mediumUnlocked = true;
  const hardUnlocked = true;

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

      {/* Slide-up drawer on mobile, centralized modal on tablet/iPad */}
      <div className="lesson-drawer">
        <div className="drawer-header">
          <span className="lesson-emoji">📝</span>
          <h3>{lesson.title}</h3>
          <button className="drawer-close" onClick={onClose} aria-label="Đóng">
            ✕
          </button>
        </div>

        <div className="drawer-body">
          <p className="drawer-description">{lesson.description}</p>

          {/* Theory button */}
          <button
            className="btn-theory"
            onClick={onStartTheory}
          >
            Lý thuyết <span className="btn-emoji">📖</span>
          </button>

          {/* Difficulty level buttons */}
          <h3 className="difficulty-label">Chọn mức độ:</h3>
          <div className="difficulty-buttons">
            {levels.map((lvl) => (
              <button
                key={lvl.key}
                className={`btn-${lvl.key} ${!lvl.unlocked ? 'btn-locked' : ''}`}
                onClick={() => lvl.unlocked && onStartQuiz(lvl.key)}
                disabled={!lvl.unlocked}
              >
                <span className="diff-emoji">
                  {!lvl.unlocked ? '🔒' : lvl.completed ? '⭐' : '📝'}
                </span>
                <span>{lvl.label}</span>
                {lvl.completed && (
                  <span className="diff-stars">
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
