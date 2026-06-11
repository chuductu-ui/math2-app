import React, { useState } from 'react';

export default function TableOfContentsModal({
  chapters,
  progress,
  onSelectLesson,
  onClose,
}) {
  // Track which chapters are expanded (all expanded by default)
  const [expandedChapters, setExpandedChapters] = useState(() => {
    const initial = {};
    chapters.forEach((ch) => {
      initial[ch.id] = true;
    });
    return initial;
  });

  const toggleChapter = (chapterId) => {
    setExpandedChapters((prev) => ({
      ...prev,
      [chapterId]: !prev[chapterId],
    }));
  };

  const levelLabels = {
    easy: 'Dễ',
    medium: 'Vừa',
    hard: 'Khó',
  };

  return (
    <>
      <div className="modal-overlay" onClick={onClose} />
      <div className="modal toc-modal">
        <div className="modal-header">
          <h2>📖 Mục lục</h2>
          <button className="modal-close-btn" onClick={onClose} aria-label="Đóng">
            ✕
          </button>
        </div>

        <div className="modal-body">
          {chapters.map((chapter) => (
            <div key={chapter.id} className="toc-chapter">
              <button
                className="toc-chapter-header"
                onClick={() => toggleChapter(chapter.id)}
              >
                <span className="toc-chapter-arrow">
                  {expandedChapters[chapter.id] ? '▼' : '▶'}
                </span>
                <span className="toc-chapter-title">{chapter.title}</span>
              </button>

              {expandedChapters[chapter.id] && (
                <ul className="toc-lessons">
                  {chapter.lessons.map((lesson) => {
                    const lessonProgress = progress[lesson.id] || {};

                    return (
                      <li key={lesson.id} className="toc-lesson-item">
                        <button
                          className="toc-lesson-btn"
                          onClick={() => onSelectLesson(lesson)}
                        >
                          <span className="toc-lesson-title">{lesson.title}</span>
                          <div className="toc-lesson-badges">
                            {['easy', 'medium', 'hard'].map((lvl) => {
                              const stars = lessonProgress[lvl] || 0;
                              return (
                                <span
                                  key={lvl}
                                  className={`toc-badge ${
                                    stars > 0 ? 'toc-badge--done' : 'toc-badge--empty'
                                  }`}
                                  title={`${levelLabels[lvl]}: ${
                                    stars > 0 ? `${stars} sao` : 'Chưa làm'
                                  }`}
                                >
                                  {stars > 0 ? '⭐' : '○'}
                                </span>
                              );
                            })}
                          </div>
                        </button>
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
