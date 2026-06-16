import React, { useState, useEffect, useCallback, useRef } from 'react';
import { saveAttempt } from '../utils/storage';

/**
 * Shuffle an array (Fisher-Yates) and return a new array.
 */
function shuffleArray(arr) {
  const shuffled = [...arr];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export default function QuizSection({
  lesson,
  level,
  hearts,
  setHearts,
  onCompleted,
  onBack,
}) {
  const questions = lesson.exercises?.[level] || [];
  const [currentQ, setCurrentQ] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isCorrect, setIsCorrect] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [shuffledOptions, setShuffledOptions] = useState([]);
  const [resultCopied, setResultCopied] = useState(false);
  const timerRef = useRef(null);

  // Shuffle options for the current question
  useEffect(() => {
    if (currentQ < questions.length) {
      setShuffledOptions(shuffleArray(questions[currentQ].options));
    }
  }, [currentQ, questions]);

  // Cleanup timer on unmount
  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  const handleAnswer = useCallback(
    (answer) => {
      if (selectedAnswer !== null) return; // Prevent double-click

      const question = questions[currentQ];
      const correct = answer === question.correctAnswer;

      setSelectedAnswer(answer);
      setIsCorrect(correct);

      if (correct) {
        setScore((prev) => prev + 1);
      } else {
        const newHearts = hearts - 1;
        setHearts(newHearts);

        if (newHearts <= 0) {
          // Game over - delay to show the wrong answer feedback
          timerRef.current = setTimeout(() => {
            setGameOver(true);
          }, 1500);
          return;
        }
      }

      // Auto-advance after 2 seconds
      timerRef.current = setTimeout(() => {
        if (currentQ + 1 < questions.length) {
          setCurrentQ((prev) => prev + 1);
          setSelectedAnswer(null);
          setIsCorrect(null);
        } else {
          // Quiz finished
          setShowResult(true);
          const finalScore = correct ? score + 1 : score;
          onCompleted(finalScore, questions.length);
        }
      }, 2000);
    },
    [currentQ, hearts, questions, score, selectedAnswer, setHearts, onCompleted]
  );

  const handleCopyResult = () => {
    const starsEarned = score === questions.length ? 3 : score > 0 ? 1 : 0;
    const text = `🐸 Toán 2 Phiêu Lưu Ký\n📝 ${lesson.title}\n⭐ Mức: ${
      level === 'easy' ? 'Dễ' : level === 'medium' ? 'Vừa' : 'Khó'
    }\n✅ Điểm: ${score}/${questions.length}\n${'⭐'.repeat(starsEarned)} ${starsEarned} sao!`;

    navigator.clipboard.writeText(text).then(() => {
      setResultCopied(true);
      setTimeout(() => setResultCopied(false), 2000);
    }).catch(() => {
      // Fallback: just mark as copied anyway
      setResultCopied(true);
    });
  };

  const handleShareZalo = () => {
    const starsEarned = score === questions.length ? 3 : score > 0 ? 1 : 0;
    const text = `🐸 Toán 2 Phiêu Lưu Ký - ${lesson.title} | Mức: ${
      level === 'easy' ? 'Dễ' : level === 'medium' ? 'Vừa' : 'Khó'
    } | Điểm: ${score}/${questions.length} | ${'⭐'.repeat(starsEarned)}`;
    const url = `https://zalo.me/share?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
  };

  // --- Game Over screen ---
  if (gameOver) {
    return (
      <div className="quiz-section">
        <div className="game-over">
          <div className="game-over-emoji">💔</div>
          <h2 className="game-over-title">Hết trái tim!</h2>
          <p className="game-over-text" style={{ marginBottom: '24px' }}>
            Đừng buồn nhé! Hãy đọc lại lý thuyết để hồi phục trái tim và thử lại nào! 🐸
          </p>
          <button className="btn-back" onClick={onBack}>
            ← Quay lại bản đồ
          </button>
        </div>
      </div>
    );
  }

  // --- Results screen ---
  if (showResult) {
    const starsEarned = score === questions.length ? 3 : score > 0 ? 1 : 0;
    const levelLabel = level === 'easy' ? 'Dễ' : level === 'medium' ? 'Vừa' : 'Khó';

    return (
      <div className="quiz-section">
        <div className="results-screen">
          <div className="results-emoji">
            {score === questions.length ? '🎉' : score > 0 ? '👍' : '😢'}
          </div>
          <h2 className="results-title">Kết quả</h2>
          <p style={{ fontSize: '1.25rem', marginBottom: '8px', fontWeight: '800' }}>{lesson.title}</p>
          <p style={{ fontSize: '1.1rem', color: 'var(--color-text-light)', marginBottom: '24px' }}>Mức: {levelLabel}</p>

          <div className="score-text">
            {score}/{questions.length}
          </div>

          <div className="stars-display">
            {Array.from({ length: 3 }, (_, i) => (
              <span
                key={i}
                className={`star ${i < starsEarned ? 'earned' : 'empty'}`}
              >
                ⭐
              </span>
            ))}
          </div>
          <p style={{ fontSize: '1.2rem', fontWeight: '800', marginBottom: '32px' }}>
            {starsEarned === 3
              ? 'Xuất sắc! 🏆'
              : starsEarned === 1
              ? 'Tốt lắm! Cố gắng thêm nhé!'
              : 'Hãy thử lại nào!'}
          </p>

          <div className="result-actions">
            <button className="btn-copy" onClick={handleCopyResult}>
              {resultCopied ? '✅ Đã sao chép!' : '📋 Sao chép kết quả'}
            </button>
            <button className="btn-share" onClick={handleShareZalo}>
              💬 Chia sẻ Zalo
            </button>
            <button className="btn-retry" onClick={onBack}>
              ← Quay lại bản đồ
            </button>
          </div>
        </div>
      </div>
    );
  }

  // --- Quiz question screen ---
  const question = questions[currentQ];
  if (!question) {
    return (
      <div className="quiz-section">
        <p>Không có câu hỏi cho mức độ này.</p>
        <button className="btn-back" onClick={onBack}>
          ← Quay lại bản đồ
        </button>
      </div>
    );
  }

  const levelLabel = level === 'easy' ? 'Dễ ⭐' : level === 'medium' ? 'Vừa ⭐⭐' : 'Khó ⭐⭐⭐';

  return (
    <div className="quiz-section">
      {/* Quiz header */}
      <div className="quiz-header">
        <button className="btn-back" onClick={onBack}>
          ← Thoát
        </button>
        <span className="quiz-progress">
          Câu {currentQ + 1}/{questions.length}
        </span>
        <span className="quiz-progress" style={{ backgroundColor: 'var(--color-primary-bg)', color: 'var(--color-primary-dark)' }}>
          {levelLabel}
        </span>
      </div>

      {/* Progress bar */}
      <div className="quiz-progress-bar">
        <div
          className="fill"
          style={{ width: `${((currentQ + 1) / questions.length) * 100}%` }}
        />
      </div>

      {/* Question */}
      <div className="question-card">
        <h3 className="question-text">{question.question}</h3>

        {/* Answer options */}
        <div className="options-grid" style={{ marginTop: '24px' }}>
          {shuffledOptions.map((option, idx) => {
            let optionClass = 'option-btn';

            if (selectedAnswer !== null) {
              if (option === question.correctAnswer) {
                optionClass += ' correct';
              } else if (option === selectedAnswer && !isCorrect) {
                optionClass += ' wrong';
              } else {
                optionClass += ' disabled';
              }
            }

            return (
              <button
                key={idx}
                className={optionClass}
                onClick={() => handleAnswer(option)}
                disabled={selectedAnswer !== null}
              >
                <span className="option-letter" style={{ marginRight: '8px', color: 'var(--color-primary-dark)', fontWeight: '800' }}>
                  {String.fromCharCode(65 + idx)}.
                </span>
                <span className="option-text">{option}</span>
              </button>
            );
          })}
        </div>

        {/* Feedback */}
        {selectedAnswer !== null && (
          <div
            className={`explanation-box ${
              isCorrect ? 'correct' : 'wrong'
            }`}
          >
            <p className="explanation-header" style={{ fontWeight: '800', marginBottom: '8px' }}>
              {isCorrect ? '✅ Đúng rồi!' : '❌ Sai rồi!'}
            </p>
            <p className="explanation-text">{question.explanation}</p>
          </div>
        )}
      </div>
    </div>
  );
}
