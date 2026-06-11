import { useState, useEffect, useCallback } from 'react';

const DOT_COLOR_1 = '#FF6B6B';
const DOT_COLOR_2 = '#4FC3F7';
const EMPTY_COLOR = '#E8E8E8';

export default function TenFrameVisualizer({ config = {} }) {
  const maxValue = config.maxValue ?? 20;
  const defaultMode = config.mode ?? 'add';

  const [num1, setNum1] = useState(config.defaultA ?? 7);
  const [num2, setNum2] = useState(config.defaultB ?? 5);
  const [mode, setMode] = useState(defaultMode);
  const [step, setStep] = useState(0); // 0: initial, 1: show frames, 2: bridge, 3: result
  const [bridgeDots, setBridgeDots] = useState(0);

  const total = mode === 'add' ? num1 + num2 : num1 - num2;
  const isValid = mode === 'add'
    ? (num1 + num2) <= maxValue
    : num1 >= num2;

  // How many dots move from frame2 to frame1 to 'make 10'
  const dotsToMove = mode === 'add' ? Math.min(10 - num1, num2) : 0;

  const reset = useCallback(() => {
    setStep(0);
    setBridgeDots(0);
  }, []);

  useEffect(() => {
    reset();
  }, [num1, num2, mode, reset]);

  const handleAnimate = () => {
    setStep(1);
    setTimeout(() => {
      if (mode === 'add' && num1 < 10 && num2 > 0) {
        setStep(2);
        // Animate dots moving one by one
        let moved = 0;
        const interval = setInterval(() => {
          moved++;
          setBridgeDots(moved);
          if (moved >= dotsToMove) {
            clearInterval(interval);
            setTimeout(() => setStep(3), 800);
          }
        }, 400);
      } else {
        setTimeout(() => setStep(3), 600);
      }
    }, 600);
  };

  const renderFrame = (filledCount, color, label, extraDots = 0, removedDots = 0) => {
    const adjustedFilled = Math.max(0, Math.min(10, filledCount + extraDots - removedDots));
    const cells = [];
    for (let i = 0; i < 10; i++) {
      const isFilled = i < adjustedFilled;
      const isExtra = i >= filledCount && i < filledCount + extraDots;
      cells.push(
        <div
          key={i}
          style={{
            ...styles.cell,
            backgroundColor: isFilled
              ? (isExtra ? DOT_COLOR_2 : color)
              : EMPTY_COLOR,
            transform: isFilled ? 'scale(1)' : 'scale(0.85)',
            transition: `all 0.3s ease ${i * 0.05}s`,
            boxShadow: isFilled ? `0 3px 8px ${color}40` : 'none',
          }}
        >
          {isFilled && (
            <div style={styles.dot}>●</div>
          )}
        </div>
      );
    }

    return (
      <div style={styles.frameWrapper}>
        <div style={styles.frameLabel}>{label}</div>
        <div style={styles.frame}>
          <div style={styles.frameRow}>{cells.slice(0, 5)}</div>
          <div style={styles.frameRow}>{cells.slice(5, 10)}</div>
        </div>
        <div style={styles.frameCount}>{adjustedFilled}</div>
      </div>
    );
  };

  const frame1Extra = step >= 2 ? bridgeDots : 0;
  const frame2Removed = step >= 2 ? bridgeDots : 0;

  return (
    <div style={styles.wrapper}>
      <h3 style={styles.title}>🔟 Khung Mười - Tách & Gộp</h3>

      {/* Mode toggle */}
      <div style={styles.modeToggle}>
        <button
          onClick={() => setMode('add')}
          style={{
            ...styles.modeBtn,
            backgroundColor: mode === 'add' ? '#52C41A' : '#f5f5f5',
            color: mode === 'add' ? '#fff' : '#888',
          }}
        >
          ➕ Cộng
        </button>
        <button
          onClick={() => setMode('subtract')}
          style={{
            ...styles.modeBtn,
            backgroundColor: mode === 'subtract' ? '#FF6B6B' : '#f5f5f5',
            color: mode === 'subtract' ? '#fff' : '#888',
          }}
        >
          ➖ Trừ
        </button>
      </div>

      {/* Number inputs */}
      <div style={styles.inputRow}>
        <div style={styles.inputGroup}>
          <label style={styles.inputLabel}>Số 1</label>
          <div style={styles.inputControls}>
            <button style={styles.adjBtn} onClick={() => setNum1(Math.max(1, num1 - 1))}>−</button>
            <span style={styles.numDisplay}>{num1}</span>
            <button style={styles.adjBtn} onClick={() => setNum1(Math.min(10, num1 + 1))}>+</button>
          </div>
        </div>
        <span style={styles.opSign}>{mode === 'add' ? '+' : '−'}</span>
        <div style={styles.inputGroup}>
          <label style={styles.inputLabel}>Số 2</label>
          <div style={styles.inputControls}>
            <button style={styles.adjBtn} onClick={() => setNum2(Math.max(1, num2 - 1))}>−</button>
            <span style={styles.numDisplay}>{num2}</span>
            <button style={styles.adjBtn} onClick={() => setNum2(Math.min(10, num2 + 1))}>+</button>
          </div>
        </div>
      </div>

      {!isValid && (
        <div style={styles.errorMsg}>
          {mode === 'add'
            ? `⚠️ Tổng không được quá ${maxValue}!`
            : '⚠️ Số thứ nhất phải lớn hơn hoặc bằng số thứ hai!'}
        </div>
      )}

      {/* Animate button */}
      <button
        onClick={handleAnimate}
        disabled={!isValid || step > 0}
        style={{
          ...styles.animBtn,
          opacity: isValid && step === 0 ? 1 : 0.5,
          cursor: isValid && step === 0 ? 'pointer' : 'not-allowed',
        }}
      >
        🐸 {step === 0 ? 'Xem cách tính!' : 'Đang tính...'}
      </button>

      {/* Reset button */}
      {step > 0 && (
        <button onClick={reset} style={styles.resetBtn}>
          🔄 Làm lại
        </button>
      )}

      {/* Ten Frames */}
      {step >= 1 && (
        <div style={styles.framesArea}>
          <div style={styles.framesRow}>
            {renderFrame(num1, DOT_COLOR_1, 'Khung 1', frame1Extra, 0)}
            {renderFrame(num2, DOT_COLOR_2, 'Khung 2', 0, frame2Removed)}
          </div>

          {/* Bridge explanation */}
          {step >= 2 && mode === 'add' && num1 < 10 && (
            <div style={{
              ...styles.bridgeExplain,
              opacity: step >= 2 ? 1 : 0,
              transition: 'opacity 0.5s ease',
            }}>
              <div style={styles.bridgeArrow}>↗️ Di chuyển</div>
              <div style={styles.bridgeText}>
                Cần <strong>{dotsToMove}</strong> chấm nữa để khung 1 đủ <strong>10</strong>!
              </div>
              <div style={styles.bridgeFormula}>
                {num1} + {dotsToMove} = 10, còn lại {num2 - dotsToMove}
              </div>
              <div style={styles.bridgeFormula}>
                → 10 + {num2 - dotsToMove} = <strong>{total}</strong>
              </div>
            </div>
          )}

          {/* Result */}
          {step >= 3 && (
            <div style={styles.resultBox}>
              <div style={styles.resultStars}>⭐ ⭐ ⭐</div>
              <div style={styles.resultEq}>
                {num1} {mode === 'add' ? '+' : '−'} {num2} = {' '}
                <span style={styles.resultNum}>{total}</span>
              </div>
              <div style={styles.celebration}>🎉 Tuyệt vời! 🎉</div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

const styles = {
  wrapper: {
    padding: '20px',
    background: 'linear-gradient(135deg, #FFF3E0 0%, #E8F5E9 100%)',
    borderRadius: '20px',
    border: '3px solid #FFB74D',
    maxWidth: '100%',
    boxSizing: 'border-box',
  },
  title: {
    textAlign: 'center',
    fontSize: '22px',
    color: '#E65100',
    marginBottom: '16px',
    fontWeight: '800',
  },
  modeToggle: {
    display: 'flex',
    gap: '10px',
    justifyContent: 'center',
    marginBottom: '16px',
  },
  modeBtn: {
    padding: '10px 22px',
    borderRadius: '25px',
    border: 'none',
    fontSize: '15px',
    fontWeight: '700',
    cursor: 'pointer',
    transition: 'all 0.3s',
  },
  inputRow: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '16px',
    marginBottom: '16px',
    flexWrap: 'wrap',
  },
  inputGroup: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '6px',
  },
  inputLabel: {
    fontSize: '14px',
    fontWeight: '700',
    color: '#666',
  },
  inputControls: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  },
  adjBtn: {
    width: '40px',
    height: '40px',
    borderRadius: '50%',
    border: '2px solid #ddd',
    background: '#fff',
    fontSize: '22px',
    fontWeight: '700',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#333',
  },
  numDisplay: {
    fontSize: '32px',
    fontWeight: '900',
    color: '#1565C0',
    width: '50px',
    textAlign: 'center',
  },
  opSign: {
    fontSize: '32px',
    fontWeight: '900',
    color: '#FF6B6B',
    marginTop: '18px',
  },
  errorMsg: {
    textAlign: 'center',
    color: '#FF4D4F',
    fontSize: '14px',
    fontWeight: '600',
    marginBottom: '12px',
  },
  animBtn: {
    display: 'block',
    margin: '0 auto 12px',
    padding: '14px 36px',
    borderRadius: '30px',
    border: 'none',
    background: 'linear-gradient(135deg, #FF9800, #FFB74D)',
    color: '#fff',
    fontSize: '18px',
    fontWeight: '800',
    cursor: 'pointer',
    boxShadow: '0 4px 12px rgba(255, 152, 0, 0.4)',
    transition: 'all 0.3s',
  },
  resetBtn: {
    display: 'block',
    margin: '0 auto 16px',
    padding: '8px 20px',
    borderRadius: '20px',
    border: '2px solid #ccc',
    background: '#fff',
    fontSize: '14px',
    fontWeight: '600',
    cursor: 'pointer',
    color: '#666',
  },
  framesArea: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '16px',
    padding: '16px',
    background: '#fff',
    borderRadius: '16px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.06)',
  },
  framesRow: {
    display: 'flex',
    gap: '24px',
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
  frameWrapper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '8px',
  },
  frameLabel: {
    fontSize: '15px',
    fontWeight: '700',
    color: '#555',
  },
  frame: {
    display: 'flex',
    flexDirection: 'column',
    gap: '4px',
    padding: '8px',
    background: '#FFFDE7',
    borderRadius: '12px',
    border: '3px solid #FFD54F',
  },
  frameRow: {
    display: 'flex',
    gap: '4px',
  },
  cell: {
    width: '40px',
    height: '40px',
    borderRadius: '10px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    border: '2px solid rgba(0,0,0,0.08)',
  },
  dot: {
    fontSize: '22px',
    color: '#fff',
    fontWeight: '700',
  },
  frameCount: {
    fontSize: '20px',
    fontWeight: '800',
    color: '#333',
  },
  bridgeExplain: {
    textAlign: 'center',
    padding: '14px 20px',
    background: '#E3F2FD',
    borderRadius: '14px',
    border: '2px dashed #64B5F6',
    maxWidth: '360px',
  },
  bridgeArrow: {
    fontSize: '18px',
    fontWeight: '700',
    color: '#1976D2',
    marginBottom: '6px',
  },
  bridgeText: {
    fontSize: '15px',
    color: '#333',
    lineHeight: '1.5',
    marginBottom: '6px',
  },
  bridgeFormula: {
    fontSize: '16px',
    fontWeight: '700',
    color: '#E65100',
    lineHeight: '1.6',
  },
  resultBox: {
    textAlign: 'center',
    padding: '18px 30px',
    background: 'linear-gradient(135deg, #E8F5E9, #C8E6C9)',
    borderRadius: '16px',
    border: '3px solid #66BB6A',
  },
  resultStars: {
    fontSize: '22px',
    marginBottom: '6px',
  },
  resultEq: {
    fontSize: '26px',
    fontWeight: '800',
    color: '#333',
  },
  resultNum: {
    fontSize: '36px',
    fontWeight: '900',
    color: '#2E7D32',
  },
  celebration: {
    fontSize: '18px',
    marginTop: '6px',
  },
};
