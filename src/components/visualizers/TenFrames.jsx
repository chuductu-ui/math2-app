import { useState, useEffect, useCallback } from 'react';

const DOT_COLOR_1 = '#FF6B6B';
const DOT_COLOR_2 = '#4FC3F7';
const EMPTY_COLOR = '#E8E8E8';

export default function TenFrames({ config = {} }) {
  const maxValue = config.maxValue ?? 20;
  const mode = config.mode ?? 'add';

  const [num1, setNum1] = useState(config.defaultA ?? 9);
  const [num2, setNum2] = useState(config.defaultB ?? 5);
  const [step, setStep] = useState(0); 
  const [bridgeDots, setBridgeDots] = useState(0);

  const total = mode === 'add' ? num1 + num2 : num1 - num2;
  const isValid = mode === 'add' ? (num1 + num2) <= maxValue : num1 >= num2;
  const dotsToMove = mode === 'add' ? Math.min(10 - num1, num2) : 0;

  const reset = useCallback(() => {
    setStep(0);
    setBridgeDots(0);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      reset();
    }, 0);
    return () => clearTimeout(timer);
  }, [num1, num2, mode, reset]);

  const handleAnimate = () => {
    setStep(1);
    setTimeout(() => {
      if (mode === 'add' && num1 < 10 && num2 > 0) {
        setStep(2);
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
            backgroundColor: isFilled ? (isExtra ? DOT_COLOR_2 : color) : EMPTY_COLOR,
            transform: isFilled ? 'scale(1)' : 'scale(0.85)',
          }}
        >
          {isFilled && <div style={styles.dot}>●</div>}
        </div>
      );
    }

    return (
      <div style={styles.frameWrapper} data-testid="tenframe-element">
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
    <div style={styles.wrapper} data-testid="tenframe-visualizer">
      <h3 style={styles.title}>🔟 Khung Mười - Phép toán trực quan</h3>

      <div style={styles.inputsRow}>
        <input
          type="number"
          min="0"
          max="10"
          value={num1}
          onChange={(e) => setNum1(Math.max(0, Math.min(10, Number(e.target.value))))}
          style={styles.input}
          data-testid="input-a"
        />
        <span style={styles.operatorText}>{mode === 'add' ? '+' : '-'}</span>
        <input
          type="number"
          min="0"
          max="10"
          value={num2}
          onChange={(e) => setNum2(Math.max(0, Math.min(10, Number(e.target.value))))}
          style={styles.input}
          data-testid="input-b"
        />
        <button style={styles.animateBtn} onClick={handleAnimate} data-testid="btn-animate">
          Xem chuyển động! 🎬
        </button>
      </div>

      <div style={styles.framesContainer}>
        {renderFrame(num1, DOT_COLOR_1, `Khung 1 (Số ${num1})`, frame1Extra, 0)}
        {mode === 'add' 
          ? renderFrame(num2, DOT_COLOR_2, `Khung 2 (Số ${num2})`, 0, frame2Removed)
          : renderFrame(num1, DOT_COLOR_1, `Trừ đi ${num2}`, 0, num2)}
      </div>

      {step === 3 && isValid && (
        <div style={styles.resultBox} data-testid="result-box">
          Kết quả: {num1} {mode === 'add' ? '+' : '-'} {num2} = {total}
        </div>
      )}
    </div>
  );
}

const styles = {
  wrapper: { padding: '20px', backgroundColor: '#fff', borderRadius: '12px', border: '2px solid #ddd' },
  title: { textAlign: 'center', margin: '0 0 15px', color: '#E91E63' },
  inputsRow: { display: 'flex', justifyContent: 'center', gap: '10px', alignItems: 'center', marginBottom: '20px' },
  input: { width: '50px', padding: '6px', fontSize: '16px', textAlign: 'center' },
  operatorText: { fontSize: '20px', fontWeight: 'bold' },
  animateBtn: { padding: '6px 12px', backgroundColor: '#E91E63', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer' },
  framesContainer: { display: 'flex', gap: '20px', justifyContent: 'center', flexWrap: 'wrap' },
  frameWrapper: { display: 'flex', flexDirection: 'column', alignItems: 'center' },
  frameLabel: { fontWeight: 'bold', marginBottom: '6px' },
  frame: { display: 'flex', flexDirection: 'column', border: '2px solid #333', padding: '4px', borderRadius: '8px', backgroundColor: '#fafafa' },
  frameRow: { display: 'flex', gap: '4px', margin: '2px 0' },
  cell: { width: '24px', height: '24px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' },
  dot: { color: '#fff', fontSize: '14px' },
  frameCount: { fontSize: '18px', fontWeight: 'bold', marginTop: '6px' },
  resultBox: { textAlign: 'center', marginTop: '20px', fontSize: '24px', fontWeight: 'bold', color: '#E91E63' }
};
