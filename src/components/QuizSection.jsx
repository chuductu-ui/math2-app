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
        <div className="quiz-gameover">
          <div className="gameover-icon">💔</div>
          <h2>Hết trái tim!</h2>
          <p>Đừng buồn nhé! Hãy đọc lại lý thuyết để hồi phục trái tim và thử lại nào! 🐸</p>
          <button className="quiz-btn quiz-btn--back" onClick={onBack}>
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
        <div className="quiz-result">
          <div className="result-emoji">
            {score === questions.length ? '🎉' : score > 0 ? '👍' : '😢'}
          </div>
          <h2>Kết quả</h2>
          <p className="result-lesson">{lesson.title}</p>
          <p className="result-level">Mức: {levelLabel}</p>

          <div className="result-score">
            <span className="score-number">
              {score}/{questions.length}
            </span>
          </div>

          <div className="result-stars">
            {'⭐'.repeat(starsEarned)}
            {'☆'.repeat(3 - starsEarned)}
          </div>
          <p className="result-stars-text">
            {starsEarned === 3
              ? 'Xuất sắc! 🏆'
              : starsEarned === 1
              ? 'Tốt lắm! Cố gắng thêm nhé!'
              : 'Hãy thử lại nào!'}
          </p>

          <div className="result-actions">
            <button className="quiz-btn quiz-btn--copy" onClick={handleCopyResult}>
              {resultCopied ? '✅ Đã sao chép!' : '📋 Sao chép kết quả'}
            </button>
            <button className="quiz-btn quiz-btn--zalo" onClick={handleShareZalo}>
              💬 Chia sẻ Zalo
            </button>
            <button className="quiz-btn quiz-btn--back" onClick={onBack}>
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
        <button className="quiz-btn quiz-btn--back" onClick={onBack}>
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
        <button className="quiz-back-btn" onClick={onBack}>
          ← Thoát
        </button>
        <span className="quiz-counter">
          Q {currentQ + 1}/{questions.length}
        </span>
        <span className="quiz-level-badge">{levelLabel}</span>
      </div>

      {/* Progress bar */}
      <div className="quiz-progress-bar">
        <div
          className="quiz-progress-fill"
          style={{ width: `${((currentQ + 1) / questions.length) * 100}%` }}
        />
      </div>

      {/* Question */}
      <div className="quiz-question-card">
        <h3 className="quiz-question-text">{question.question}</h3>

        {/* Answer options */}
        <div className="quiz-options">
          {shuffledOptions.map((option, idx) => {
            let optionClass = 'quiz-option';

            if (selectedAnswer !== null) {
              if (option === question.correctAnswer) {
                optionClass += ' quiz-option--correct';
              } else if (option === selectedAnswer && !isCorrect) {
                optionClass += ' quiz-option--wrong';
              } else {
                optionClass += ' quiz-option--disabled';
              }
            }

            return (
              <button
                key={idx}
                className={optionClass}
                onClick={() => handleAnswer(option)}
                disabled={selectedAnswer !== null}
              >
                <span className="option-letter">
                  {String.fromCharCode(65 + idx)}
                </span>
                <span className="option-text">{option}</span>
              </button>
            );
          })}
        </div>

        {/* Feedback */}
        {selectedAnswer !== null && (
          <div
            className={`quiz-feedback ${
              isCorrect ? 'quiz-feedback--correct' : 'quiz-feedback--wrong'
            }`}
          >
            <p className="feedback-status">
              {isCorrect ? '✅ Đúng rồi!' : '❌ Sai rồi!'}
            </p>
            <p className="feedback-explanation">{question.explanation}</p>
          </div>
        )}
      </div>
    </div>
  );
}
