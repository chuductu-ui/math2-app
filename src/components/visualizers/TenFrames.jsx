import { useState, useEffect, useCallback, useRef } from 'react';

const DOT_COLOR_1 = '#FF6B6B';
const DOT_COLOR_2 = '#4FC3F7';
const EMPTY_COLOR = '#E8E8E8';

export default function TenFrames({ config = {} }) {
  const maxValue = config.maxValue ?? 20;

  const [num1, setNum1] = useState(config.defaultA ?? 9);
  const [num2, setNum2] = useState(config.defaultB ?? 5);
  const [mode, setMode] = useState(config.mode ?? 'add');
  
  // Steps:
  // For 'add': 0: initial, 1: show frames, 2: bridge (moving), 3: result
  // For 'subtract': 0: initial, 1: show frames, 2: sub from A2, 3: sub from A1, 4: result
  const [step, setStep] = useState(0); 
  const [bridgeDots, setBridgeDots] = useState(0);
  const [bridgeDots2, setBridgeDots2] = useState(0);

  // Timer refs to prevent memory leaks and race conditions
  const animationTimeoutRef = useRef(null);
  const animationIntervalRef = useRef(null);
  const subTimeoutRef = useRef(null);

  const total = mode === 'add' ? num1 + num2 : num1 - num2;
  const isValid = mode === 'add' ? (num1 + num2) <= maxValue : num1 >= num2;

  // Dots moving calculation
  const dotsToMove = mode === 'add'
    ? (num1 <= 10 ? Math.min(10 - num1, num2) : Math.min(20 - num1, num2))
    : 0;

  const clearAllTimers = useCallback(() => {
    if (animationTimeoutRef.current) {
      clearTimeout(animationTimeoutRef.current);
      animationTimeoutRef.current = null;
    }
    if (animationIntervalRef.current) {
      clearInterval(animationIntervalRef.current);
      animationIntervalRef.current = null;
    }
    if (subTimeoutRef.current) {
      clearTimeout(subTimeoutRef.current);
      subTimeoutRef.current = null;
    }
  }, []);

  const reset = useCallback(() => {
    clearAllTimers();
    setStep(0);
    setBridgeDots(0);
    setBridgeDots2(0);
  }, [clearAllTimers]);

  // Synchronous config-change detection using useEffect
  /* eslint-disable react-hooks/set-state-in-effect */
  useEffect(() => {
    setNum1(config.defaultA ?? 9);
    setNum2(config.defaultB ?? 5);
    setMode(config.mode ?? 'add');
    reset();
  }, [config.defaultA, config.defaultB, config.mode, reset]);
  /* eslint-enable react-hooks/set-state-in-effect */

  // Cleanup on unmount
  useEffect(() => {
    return () => clearAllTimers();
  }, [clearAllTimers]);

  const handleNum1Change = (val) => {
    setNum1(val);
    reset();
  };

  const handleNum2Change = (val) => {
    setNum2(val);
    reset();
  };

  const handleModeChange = (newMode) => {
    setMode(newMode);
    reset();
  };

  const handleAnimate = () => {
    if (!isValid || step > 0) return;
    clearAllTimers();
    setStep(1);

    if (mode === 'add') {
      animationTimeoutRef.current = setTimeout(() => {
        if (dotsToMove > 0) {
          setStep(2);
          let moved = 0;
          animationIntervalRef.current = setInterval(() => {
            moved++;
            setBridgeDots(moved);
            if (moved >= dotsToMove) {
              clearInterval(animationIntervalRef.current);
              animationIntervalRef.current = null;
              animationTimeoutRef.current = setTimeout(() => {
                setStep(3);
              }, 800);
            }
          }, 400);
        } else {
          setStep(3);
        }
      }, 600);
    } else {
      // Subtraction step-by-step
      const dotsToRemoveFromA2 = Math.min(Math.max(0, num1 - 10), num2);
      const dotsToRemoveFromA1 = num2 - dotsToRemoveFromA2;

      animationTimeoutRef.current = setTimeout(() => {
        if (dotsToRemoveFromA2 > 0) {
          setStep(2);
          let removed = 0;
          animationIntervalRef.current = setInterval(() => {
            removed++;
            setBridgeDots(removed);
            if (removed >= dotsToRemoveFromA2) {
              clearInterval(animationIntervalRef.current);
              animationIntervalRef.current = null;
              
              // Proceed to Stage 2: Subtraction from A1
              animationTimeoutRef.current = setTimeout(() => {
                if (dotsToRemoveFromA1 > 0) {
                  setStep(3);
                  let removed2 = 0;
                  animationIntervalRef.current = setInterval(() => {
                    removed2++;
                    setBridgeDots2(removed2);
                    if (removed2 >= dotsToRemoveFromA1) {
                      clearInterval(animationIntervalRef.current);
                      animationIntervalRef.current = null;
                      animationTimeoutRef.current = setTimeout(() => {
                        setStep(4);
                      }, 800);
                    }
                  }, 400);
                } else {
                  setStep(4);
                }
              }, 600);
            }
          }, 400);
        } else if (dotsToRemoveFromA1 > 0) {
          // No A2 dots to remove, directly go to Stage 2 (A1)
          setStep(3);
          let removed2 = 0;
          animationIntervalRef.current = setInterval(() => {
            removed2++;
            setBridgeDots2(removed2);
            if (removed2 >= dotsToRemoveFromA1) {
              clearInterval(animationIntervalRef.current);
              animationIntervalRef.current = null;
              animationTimeoutRef.current = setTimeout(() => {
                setStep(4);
              }, 800);
            }
          }, 400);
        } else {
          setStep(4);
        }
      }, 600);
    }
  };

  const renderFrame = (filledCount, color, label, extraDots = 0, removedDots = 0, isSubtraction = false) => {
    const cells = [];
    for (let i = 0; i < 10; i++) {
      const isInitialFilled = i < filledCount;
      const isExtraFilled = i >= filledCount && i < filledCount + extraDots;
      const isFilled = isInitialFilled || isExtraFilled;

      const isRemoved = isSubtraction && isInitialFilled && i >= (filledCount - removedDots);

      const bgColor = isFilled
        ? (isRemoved ? '#FFCDD2' : (isExtraFilled ? DOT_COLOR_2 : color))
        : EMPTY_COLOR;

      const cellContent = isFilled
        ? (isRemoved ? <div style={{ color: '#D32F2F', fontSize: '16px', fontWeight: 'bold' }}>✕</div> : <div style={styles.dot}>●</div>)
        : null;

      const cellStyle = isFilled
        ? (isRemoved ? { border: '2px solid #D32F2F', transform: 'scale(0.9)' } : { transform: 'scale(1)' })
        : { transform: 'scale(0.85)' };

      cells.push(
        <div
          key={i}
          style={{
            ...styles.cell,
            backgroundColor: bgColor,
            transition: 'all 0.3s ease',
            ...cellStyle,
          }}
        >
          {cellContent}
        </div>
      );
    }

    const displayCount = Math.max(0, filledCount + extraDots - removedDots);

    return (
      <div style={styles.frameWrapper} data-testid="tenframe-element">
        <div style={styles.frameLabel}>{label}</div>
        <div style={styles.frame}>
          <div style={styles.frameRow}>{cells.slice(0, 5)}</div>
          <div style={styles.frameRow}>{cells.slice(5, 10)}</div>
        </div>
        <div style={styles.frameCount}>{displayCount}</div>
      </div>
    );
  };

  const frame1Extra = (mode === 'add' && num1 <= 10 && step >= 2) ? bridgeDots : 0;
  const frame2Extra = (mode === 'add' && num1 > 10 && step >= 2) ? bridgeDots : 0;

  return (
    <div style={styles.wrapper} data-testid="tenframe-visualizer">
      <h3 style={styles.title}>🔟 Khung Mười - Phép toán trực quan</h3>

      {/* Mode toggle */}
      <div style={styles.modeToggle}>
        <button
          onClick={() => { handleModeChange('add'); }}
          style={{
            ...styles.modeBtn,
            backgroundColor: mode === 'add' ? '#52C41A' : '#f5f5f5',
            color: mode === 'add' ? '#fff' : '#888',
          }}
          data-testid="btn-mode-add"
        >
          ➕ Cộng
        </button>
        <button
          onClick={() => { handleModeChange('subtract'); }}
          style={{
            ...styles.modeBtn,
            backgroundColor: mode === 'subtract' ? '#E91E63' : '#f5f5f5',
            color: mode === 'subtract' ? '#fff' : '#888',
          }}
          data-testid="btn-mode-subtract"
        >
          ➖ Trừ
        </button>
      </div>

      {/* Inputs row */}
      <div style={styles.inputsRow}>
        <div style={styles.inputGroup}>
          <label style={styles.inputLabel}>Số hạng 1 / Số bị trừ</label>
          <input
            type="number"
            min="0"
            max="20"
            value={num1}
            onChange={(e) => handleNum1Change(Math.max(0, Math.min(20, Number(e.target.value))))}
            style={styles.input}
            data-testid="input-a"
          />
        </div>
        <span style={styles.operatorText}>{mode === 'add' ? '+' : '-'}</span>
        <div style={styles.inputGroup}>
          <label style={styles.inputLabel}>Số hạng 2 / Số trừ</label>
          <input
            type="number"
            min="0"
            max="10"
            value={num2}
            onChange={(e) => handleNum2Change(Math.max(0, Math.min(10, Number(e.target.value))))}
            style={styles.input}
            data-testid="input-b"
          />
        </div>
        <button 
          style={{
            ...styles.animateBtn,
            backgroundColor: isValid ? '#E91E63' : '#ccc',
            cursor: isValid ? 'pointer' : 'not-allowed'
          }} 
          onClick={handleAnimate} 
          disabled={!isValid || step > 0}
          data-testid="btn-animate"
        >
          {step > 0 ? 'Đang chạy... 🎬' : 'Xem chuyển động! 🎬'}
        </button>
        {step > 0 && (
          <button style={styles.resetBtn} onClick={reset} data-testid="btn-reset">
            🔄 Làm lại
          </button>
        )}
      </div>

      {/* Invalid input errors */}
      {!isValid && (
        <div style={styles.errorMsg} data-testid="error-msg">
          {mode === 'add'
            ? `⚠️ Tổng không được quá ${maxValue}!`
            : '⚠️ Số bị trừ phải lớn hơn hoặc bằng số trừ!'}
        </div>
      )}

      {/* Ten Frames display */}
      {step >= 1 && isValid && (
        <div style={styles.framesContainer}>
          {/* Frame A1 */}
          {renderFrame(
            Math.min(10, num1),
            DOT_COLOR_1,
            `Khung 1 (Số ${Math.min(10, num1)})`,
            frame1Extra,
            mode === 'subtract' ? (step === 2 ? 0 : step >= 3 ? bridgeDots2 : 0) : 0,
            mode === 'subtract'
          )}
          
          {/* Frame A2 (shown if num1 > 10 or mode is subtract) */}
          {(num1 > 10 || mode === 'subtract') && renderFrame(
            Math.max(0, num1 - 10),
            DOT_COLOR_1,
            `Khung 2 (Số ${Math.max(0, num1 - 10)})`,
            frame2Extra,
            mode === 'subtract' ? (step === 2 ? bridgeDots : step >= 3 ? Math.min(Math.max(0, num1 - 10), num2) : 0) : 0,
            mode === 'subtract'
          )}

          {/* Frame B */}
          {mode === 'add' && renderFrame(
            num2,
            DOT_COLOR_2,
            `Khung cộng (Số ${num2})`,
            0,
            step >= 2 ? bridgeDots : 0,
            false
          )}
        </div>
      )}

      {/* Educational Bridging Explanation Card */}
      {step >= 2 && isValid && (
        <div style={styles.bridgeExplain} data-testid="bridge-explain">
          {mode === 'add' ? (
            num1 < 10 && num1 + num2 > 10 ? (
              <>
                <div style={styles.bridgeArrow}>↗️ Di chuyển & Gộp</div>
                <div style={styles.bridgeText}>
                  Cần <strong>{dotsToMove}</strong> chấm nữa để khung 1 đủ <strong>10</strong>!
                </div>
                <div style={styles.bridgeFormula}>
                  Tách {num2} = {dotsToMove} + {num2 - dotsToMove}
                </div>
                <div style={styles.bridgeFormula}>
                  Ta có: {num1} + {dotsToMove} = 10
                </div>
                <div style={styles.bridgeFormula}>
                  → 10 + {num2 - dotsToMove} = <strong>{total}</strong>
                </div>
              </>
            ) : (
              <div style={styles.bridgeText}>
                Đang thực hiện phép cộng trực quan: {num1} + {num2} = <strong>{total}</strong>
              </div>
            )
          ) : (
            num1 > 10 && num2 > (num1 - 10) ? (
              <>
                <div style={styles.bridgeArrow}>↘️ Bớt & Tách</div>
                <div style={styles.bridgeText}>
                  Trừ đi <strong>{num1 - 10}</strong> ở khung 2 để còn <strong>10</strong>!
                </div>
                <div style={styles.bridgeFormula}>
                  Tách {num2} = {num1 - 10} + {num2 - (num1 - 10)}
                </div>
                <div style={styles.bridgeFormula}>
                  Ta có: {num1} - {num1 - 10} = 10
                </div>
                <div style={styles.bridgeFormula}>
                  → 10 - {num2 - (num1 - 10)} = <strong>{total}</strong>
                </div>
              </>
            ) : (
              <div style={styles.bridgeText}>
                Đang thực hiện phép trừ trực quan: {num1} - {num2} = <strong>{total}</strong>
              </div>
            )
          )}
        </div>
      )}

      {/* Final Result Celebration Box */}
      {((mode === 'add' && step === 3) || (mode === 'subtract' && step === 4)) && isValid && (
        <div style={styles.resultBox} data-testid="result-box">
          <div style={styles.resultStars}>⭐ ⭐ ⭐</div>
          <div style={styles.resultEq}>
            Kết quả: {num1} {mode === 'add' ? '+' : '-'} {num2} = <span style={styles.resultNum}>{total}</span>
          </div>
          <div style={styles.celebration}>🎉 Tuyệt vời! 🎉</div>
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
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
  },
  title: {
    textAlign: 'center',
    fontSize: '22px',
    color: '#E65100',
    margin: '0',
    fontWeight: '800',
  },
  modeToggle: {
    display: 'flex',
    gap: '10px',
    justifyContent: 'center',
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
  inputsRow: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '16px',
    flexWrap: 'wrap',
  },
  inputGroup: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '6px',
  },
  inputLabel: {
    fontSize: '12px',
    fontWeight: '700',
    color: '#666',
  },
  input: {
    width: '70px',
    padding: '8px',
    fontSize: '18px',
    fontWeight: '800',
    textAlign: 'center',
    borderRadius: '8px',
    border: '2px solid #FFB74D',
  },
  operatorText: {
    fontSize: '24px',
    fontWeight: '900',
    color: '#E65100',
    marginTop: '20px',
  },
  animateBtn: {
    padding: '10px 20px',
    color: '#fff',
    border: 'none',
    borderRadius: '20px',
    cursor: 'pointer',
    fontSize: '15px',
    fontWeight: '700',
    transition: 'all 0.3s',
    marginTop: '20px',
  },
  resetBtn: {
    padding: '10px 20px',
    backgroundColor: '#fff',
    color: '#666',
    border: '2px solid #ccc',
    borderRadius: '20px',
    cursor: 'pointer',
    fontSize: '15px',
    fontWeight: '700',
    transition: 'all 0.3s',
    marginTop: '20px',
  },
  errorMsg: {
    textAlign: 'center',
    color: '#FF4D4F',
    fontSize: '14px',
    fontWeight: '600',
  },
  framesContainer: {
    display: 'flex',
    gap: '20px',
    justifyContent: 'center',
    flexWrap: 'wrap',
    padding: '16px',
    background: '#fff',
    borderRadius: '16px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.06)',
  },
  frameWrapper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '6px',
  },
  frameLabel: {
    fontWeight: '700',
    fontSize: '14px',
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
    width: '32px',
    height: '32px',
    borderRadius: '8px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    border: '1px solid rgba(0,0,0,0.08)',
  },
  dot: {
    color: '#fff',
    fontSize: '18px',
  },
  frameCount: {
    fontSize: '18px',
    fontWeight: '800',
    color: '#333',
  },
  bridgeExplain: {
    alignSelf: 'center',
    textAlign: 'center',
    padding: '14px 20px',
    background: '#E3F2FD',
    borderRadius: '14px',
    border: '2px dashed #64B5F6',
    maxWidth: '400px',
    display: 'flex',
    flexDirection: 'column',
    gap: '4px',
  },
  bridgeArrow: {
    fontSize: '16px',
    fontWeight: '700',
    color: '#1976D2',
  },
  bridgeText: {
    fontSize: '14px',
    color: '#333',
    lineHeight: '1.4',
  },
  bridgeFormula: {
    fontSize: '15px',
    fontWeight: '700',
    color: '#E65100',
  },
  resultBox: {
    alignSelf: 'center',
    textAlign: 'center',
    padding: '18px 30px',
    background: 'linear-gradient(135deg, #E8F5E9, #C8E6C9)',
    borderRadius: '16px',
    border: '3px solid #66BB6A',
    width: '300px',
  },
  resultStars: {
    fontSize: '20px',
    marginBottom: '6px',
  },
  resultEq: {
    fontSize: '18px',
    fontWeight: '700',
    color: '#333',
  },
  resultNum: {
    fontSize: '28px',
    fontWeight: '900',
    color: '#2E7D32',
  },
  celebration: {
    fontSize: '16px',
    marginTop: '6px',
    fontWeight: '600',
    color: '#2E7D32',
  },
};
