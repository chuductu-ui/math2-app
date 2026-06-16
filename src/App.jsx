import React, { useState, useEffect, useCallback } from 'react';
import QuestMap from './components/QuestMap';
import LessonDrawer from './components/LessonDrawer';
import TheorySection from './components/TheorySection';
import QuizSection from './components/QuizSection';
import HistoryModal from './components/HistoryModal';
import TableOfContentsModal from './components/TableOfContentsModal';
import { getHistory, saveAttempt } from './utils/storage';

const MAX_HEARTS = 5;

export default function App() {
  // --- Data & loading ---
  const [curriculum, setCurriculum] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // --- Game state ---
  const [stars, setStars] = useState(0);
  const [hearts, setHearts] = useState(MAX_HEARTS);
  const [selectedLesson, setSelectedLesson] = useState(null);
  const [currentView, setCurrentView] = useState('map'); // map | theory | quiz
  const [quizLevel, setQuizLevel] = useState(null); // easy | medium | hard

  // progress: { [lessonId]: { easy: bestScore, medium: bestScore, hard: bestScore } }
  const [progress, setProgress] = useState(() => {
    try {
      const saved = localStorage.getItem('math2_progress');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  const [historyList, setHistoryList] = useState([]);
  const [showHistory, setShowHistory] = useState(false);
  const [showToc, setShowToc] = useState(false);

  // --- Fetch lessons ---
  useEffect(() => {
    fetch('./lessons.json')
      .then((res) => {
        if (!res.ok) throw new Error('Không tải được dữ liệu bài học');
        return res.json();
      })
      .then((data) => {
        setCurriculum(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  // --- Persist progress ---
  useEffect(() => {
    localStorage.setItem('math2_progress', JSON.stringify(progress));
  }, [progress]);

  // --- Load history ---
  useEffect(() => {
    setHistoryList(getHistory());
  }, [showHistory]);

  // --- Flatten lessons for quest map ---
  const allLessons = curriculum
    ? curriculum.chapters.flatMap((ch) => ch.lessons)
    : [];

  // --- Check if a lesson is unlocked ---
  const isLessonUnlocked = useCallback(
    () => true,
    []
  );

  // --- Handlers ---
  const handleSelectLesson = (lesson) => {
    setSelectedLesson(lesson);
  };

  const handleCloseDrawer = () => {
    setSelectedLesson(null);
  };

  const handleStartTheory = () => {
    setCurrentView('theory');
  };

  const handleStartQuiz = (level) => {
    setQuizLevel(level);
    setCurrentView('quiz');
    setSelectedLesson(null); // close drawer
  };

  const handleBackToMap = () => {
    setCurrentView('map');
    setSelectedLesson(null);
    setQuizLevel(null);
  };

  const recoverHearts = () => {
    setHearts((prev) => Math.min(prev + 2, MAX_HEARTS));
  };

  const handleLevelCompleted = (lessonId, level, score, total) => {
    const starsEarned = score === total ? 3 : score > 0 ? 1 : 0;

    // Update progress (keep best score)
    setProgress((prev) => {
      const lessonProgress = prev[lessonId] || { easy: 0, medium: 0, hard: 0 };
      const currentBest = lessonProgress[level] || 0;
      if (starsEarned > currentBest) {
        return {
          ...prev,
          [lessonId]: {
            ...lessonProgress,
            [level]: starsEarned,
          },
        };
      }
      return prev;
    });

    // Update total stars
    setStars((prev) => prev + starsEarned);

    // Save attempt to history
    saveAttempt({
      lessonId,
      level,
      score,
      total,
      date: new Date().toISOString(),
    });
  };

  const handleSelectLessonFromToc = (lesson) => {
    setShowToc(false);
    setSelectedLesson(lesson);
    // Scroll to the node
    setTimeout(() => {
      const node = document.getElementById(`node-${lesson.id}`);
      if (node) {
        node.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }, 100);
  };

  // --- Compute total stars from progress ---
  const totalStars = Object.values(progress).reduce((sum, lp) => {
    return sum + (lp.easy || 0) + (lp.medium || 0) + (lp.hard || 0);
  }, 0);

  // --- Render ---
  if (loading) {
    return (
      <div className="app-loading">
        <div className="loading-spinner">🐸</div>
        <p>Đang tải bài học...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="app-error">
        <div className="error-icon">😢</div>
        <h2>Ôi không!</h2>
        <p>{error}</p>
        <button onClick={() => window.location.reload()}>Thử lại</button>
      </div>
    );
  }

  return (
    <div className="app">
      {/* ===== HEADER ===== */}
      <header className="app-header">
        <div className="header-left">
          <span className="mascot">🐸</span>
          <h1 className="app-title">Toán 2 Phiêu Lưu Ký</h1>
        </div>
        <div className="header-center">
          <span className="student-name">Bé</span>
        </div>
        <div className="header-right">
          <span className="hearts-display">
            {Array.from({ length: MAX_HEARTS }, (_, i) => (
              <span key={i} className={i < hearts ? 'heart active' : 'heart empty'}>
                {i < hearts ? '❤️' : '🤍'}
              </span>
            ))}
          </span>
          <span className="stars-display">⭐ {totalStars}</span>
          <button
            className="header-btn toc-btn"
            onClick={() => setShowToc(true)}
            title="Mục lục"
          >
            📖
          </button>
          <button
            className="header-btn history-btn"
            onClick={() => setShowHistory(true)}
            title="Lịch sử"
          >
            📊
          </button>
        </div>
      </header>

      {/* ===== MAIN CONTENT ===== */}
      <main className="app-main">
        {currentView === 'map' && (
          <QuestMap
            chapters={curriculum.chapters}
            allLessons={allLessons}
            progress={progress}
            isLessonUnlocked={isLessonUnlocked}
            onSelectLesson={handleSelectLesson}
          />
        )}

        {currentView === 'theory' && selectedLesson && (
          <TheorySection
            lesson={selectedLesson}
            onBack={handleBackToMap}
            recoverHearts={recoverHearts}
            hearts={hearts}
            maxHearts={MAX_HEARTS}
          />
        )}

        {currentView === 'quiz' && selectedLesson && quizLevel && (
          <QuizSection
            lesson={selectedLesson}
            level={quizLevel}
            hearts={hearts}
            setHearts={setHearts}
            onCompleted={(score, total) =>
              handleLevelCompleted(selectedLesson.id, quizLevel, score, total)
            }
            onBack={handleBackToMap}
          />
        )}
      </main>

      {/* ===== LESSON DRAWER ===== */}
      {currentView === 'map' && selectedLesson && (
        <LessonDrawer
          lesson={selectedLesson}
          progress={progress[selectedLesson.id] || {}}
          onClose={handleCloseDrawer}
          onStartTheory={handleStartTheory}
          onStartQuiz={handleStartQuiz}
        />
      )}

      {/* ===== MODALS ===== */}
      {showHistory && (
        <HistoryModal
          history={historyList}
          allLessons={allLessons}
          onClose={() => setShowHistory(false)}
        />
      )}

      {showToc && (
        <TableOfContentsModal
          chapters={curriculum.chapters}
          progress={progress}
          onSelectLesson={handleSelectLessonFromToc}
          onClose={() => setShowToc(false)}
        />
      )}
    </div>
  );
}
