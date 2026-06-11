import { useState, useEffect, useCallback } from 'react';

export default function ColumnAddition({ config = {} }) {
  const defaultMode = config.mode ?? 'add';
  const showCarry = config.carry !== false;
  const maxVal = config.maxValue ?? 99;

  const [num1, setNum1] = useState(config.defaultA ?? 47);
  const [num2, setNum2] = useState(config.defaultB ?? 35);
  const [mode, setMode] = useState(defaultMode);
  const [step, setStep] = useState(0);
  // Steps: 0=input, 1=show columns, 2=ones digit, 3=tens digit, 4=result

  const d1Ones = num1 % 10;
  const d1Tens = Math.floor(num1 / 10);
  const d2Ones = num2 % 10;
  const d2Tens = Math.floor(num2 / 10);

  // Addition
  const onesSum = d1Ones + d2Ones;
  const hasCarry = onesSum >= 10;
  const onesResult = onesSum % 10;
  const carry = hasCarry ? 1 : 0;
  const tensSum = d1Tens + d2Tens + carry;
  const addResult = num1 + num2;

  // Subtraction
  const onesDiff = d1Ones - d2Ones;
  const hasBorrow = onesDiff < 0;
  const onesSubResult = hasBorrow ? (d1Ones + 10 - d2Ones) : onesDiff;
  const borrow = hasBorrow ? 1 : 0;
  const tensSubResult = d1Tens - d2Tens - borrow;
  const subResult = num1 - num2;

  const isValid = mode === 'add' ? addResult <= (maxVal < 100 ? maxVal : 999) : num1 >= num2;
  const result = mode === 'add' ? addResult : subResult;

  const reset = useCallback(() => setStep(0), []);

  useEffect(() => {
    reset();
  }, [num1, num2, mode, reset]);

  const handleSolve = () => {
    setStep(1);
    let s = 1;
    const timer = setInterval(() => {
      s++;
      setStep(s);
      if (s >= 4) clearInterval(timer);
    }, 1200);
  };

  const renderDigitBox = (digit, highlight, color, label) => (
    <div style={{
      ...styles.digitBox,
      backgroundColor: highlight ? color : '#fff',
      color: highlight ? '#fff' : '#333',
      border: `3px solid ${color}`,
      transform: highlight ? 'scale(1.1)' : 'scale(1)',
      boxShadow: highlight ? `0 4px 12px ${color}50` : 'none',
    }}>
      <span style={styles.digit}>{digit}</span>
      {label && <span style={styles.digitLabel}>{label}</span>}
    </div>
  );

  return (
    <div style={styles.wrapper}>
      <h3 style={styles.title}>
        📝 Đặt Tính {mode === 'add' ? 'Cộng' : 'Trừ'}
      </h3>

      {/* Mode toggle */}
      <div style={styles.modeToggle}>
        <button
          onClick={() => setMode('add')}
          style={{
            ...styles.modeBtn,
            backgroundColor: mode === 'add' ? '#1976D2' : '#f5f5f5',
            color: mode === 'add' ? '#fff' : '#888',
          }}
        >
          ➕ Cộng
        </button>
        <button
          onClick={() => setMode('subtract')}
          style={{
            ...styles.modeBtn,
            backgroundColor: mode === 'subtract' ? '#E64A19' : '#f5f5f5',
            color: mode === 'subtract' ? '#fff' : '#888',
          }}
        >
          ➖ Trừ
        </button>
      </div>

      {/* Input */}
      <div style={styles.inputRow}>
        <div style={styles.inputGroup}>
          <label style={styles.inputLabel}>Số trên</label>
          <input
            type="number"
            min={mode === 'subtract' ? num2 : 0}
            max={maxVal}
            value={num1}
            onChange={(e) => setNum1(Math.min(maxVal, Math.max(0, parseInt(e.target.value) || 0)))}
            style={styles.numInput}
          />
        </div>
        <div style={styles.inputGroup}>
          <label style={styles.inputLabel}>Số dưới</label>
          <input
            type="number"
            min={0}
            max={maxVal}
            value={num2}
            onChange={(e) => setNum2(Math.min(maxVal, Math.max(0, parseInt(e.target.value) || 0)))}
            style={styles.numInput}
          />
        </div>
      </div>

      {!isValid && (
        <div style={styles.errorMsg}>
          {mode === 'add'
            ? '⚠️ Tổng quá lớn!'
            : '⚠️ Số trên phải lớn hơn hoặc bằng số dưới!'}
        </div>
      )}

      <button
        onClick={handleSolve}
        disabled={!isValid || step > 0}
        style={{
          ...styles.solveBtn,
          opacity: isValid && step === 0 ? 1 : 0.5,
        }}
      >
        🐸 Giải từng bước!
      </button>

      {step > 0 && (
        <button onClick={reset} style={styles.resetBtn}>🔄 Làm lại</button>
      )}

      {/* Column display */}
      {step >= 1 && (
        <div style={styles.columnArea}>
          {/* Carry/Borrow annotation */}
          {step >= 2 && showCarry && (
            <>
              {mode === 'add' && hasCarry && (
                <div style={styles.carryRow}>
                  <div style={styles.carrySpace} />
                  <div style={styles.carryBadge}>
                    <span style={styles.carryText}>nhớ {carry}</span>
                    <span style={styles.carryDigit}>{carry}</span>
                  </div>
                </div>
              )}
              {mode === 'subtract' && hasBorrow && (
                <div style={styles.carryRow}>
                  <div style={styles.borrowBadge}>
                    <span style={styles.carryText}>mượn 1</span>
                  </div>
                  <div style={styles.carrySpace} />
                </div>
              )}
            </>
          )}

          {/* First number */}
          <div style={styles.numRow}>
            <div style={styles.opSpace} />
            {renderDigitBox(
              d1Tens,
              step >= 3,
              '#1976D2',
              step >= 3 ? 'chục' : null
            )}
            {renderDigitBox(
              d1Ones,
              step >= 2,
              '#1976D2',
              step >= 2 ? 'đơn vị' : null
            )}
          </div>

          {/* Operator + Second number */}
          <div style={styles.numRow}>
            <div style={styles.opSymbol}>
              {mode === 'add' ? '+' : '−'}
            </div>
            {renderDigitBox(
              d2Tens,
              step >= 3,
              '#E64A19',
              step >= 3 ? 'chục' : null
            )}
            {renderDigitBox(
              d2Ones,
              step >= 2,
              '#E64A19',
              step >= 2 ? 'đơn vị' : null
            )}
          </div>

          {/* Separator line */}
          <div style={styles.separatorLine} />

          {/* Step explanations */}
          {step >= 2 && (
            <div style={{
              ...styles.stepExplain,
              opacity: step >= 2 ? 1 : 0,
              transition: 'opacity 0.5s',
            }}>
              <div style={styles.stepBadge}>Bước 1</div>
              {mode === 'add' ? (
                <div style={styles.stepText}>
                  Cộng hàng đơn vị: {d1Ones} + {d2Ones} = {onesSum}
                  {hasCarry && (
                    <span style={styles.carryNote}>
                      {' '}→ viết {onesResult}, <strong>nhớ {carry}</strong>
                    </span>
                  )}
                </div>
              ) : (
                <div style={styles.stepText}>
                  Trừ hàng đơn vị: {hasBorrow ? `${d1Ones} < ${d2Ones}` : `${d1Ones} − ${d2Ones}`}
                  {hasBorrow ? (
                    <span style={styles.carryNote}>
                      {' '}→ <strong>mượn 1</strong> chục: {d1Ones + 10} − {d2Ones} = {onesSubResult}
                    </span>
                  ) : (
                    <span> = {onesSubResult}</span>
                  )}
                </div>
              )}
            </div>
          )}

          {step >= 3 && (
            <div style={{
              ...styles.stepExplain,
              opacity: step >= 3 ? 1 : 0,
              transition: 'opacity 0.5s',
            }}>
              <div style={styles.stepBadge}>Bước 2</div>
              {mode === 'add' ? (
                <div style={styles.stepText}>
                  Cộng hàng chục: {d1Tens} + {d2Tens}{hasCarry ? ` + ${carry} (nhớ)` : ''} = {tensSum}
                </div>
              ) : (
                <div style={styles.stepText}>
                  Trừ hàng chục: {d1Tens} − {d2Tens}{hasBorrow ? ` − ${borrow} (đã mượn)` : ''} = {tensSubResult}
                </div>
              )}
            </div>
          )}

          {/* Result row */}
          {step >= 4 && (
            <div style={{
              ...styles.resultRow,
              opacity: step >= 4 ? 1 : 0,
              transform: step >= 4 ? 'scale(1)' : 'scale(0.8)',
              transition: 'all 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55)',
            }}>
              <div style={styles.resultLabel}>=</div>
              {result >= 100 && renderDigitBox(Math.floor(result / 100), true, '#2E7D32', 'trăm')}
              {renderDigitBox(
                mode === 'add' ? (tensSum % 10) : tensSubResult,
                true,
                '#2E7D32',
                'chục'
              )}
              {renderDigitBox(
                mode === 'add' ? onesResult : onesSubResult,
                true,
                '#2E7D32',
                'đơn vị'
              )}
            </div>
          )}

          {/* Final result */}
          {step >= 4 && (
            <div style={styles.finalResult}>
              <div>⭐ ⭐ ⭐</div>
              <div style={styles.finalEq}>
                {num1} {mode === 'add' ? '+' : '−'} {num2} = <span style={styles.finalNum}>{result}</span>
              </div>
              <div>🎉 Giỏi lắm! 🎉</div>
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
    background: 'linear-gradient(135deg, #E3F2FD 0%, #FFF3E0 100%)',
    borderRadius: '20px',
    border: '3px solid #64B5F6',
    maxWidth: '100%',
    boxSizing: 'border-box',
  },
  title: {
    textAlign: 'center',
    fontSize: '22px',
    color: '#1565C0',
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
    gap: '20px',
    justifyContent: 'center',
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
    color: '#555',
  },
  numInput: {
    width: '80px',
    height: '50px',
    textAlign: 'center',
    fontSize: '28px',
    fontWeight: '800',
    borderRadius: '12px',
    border: '3px solid #90CAF9',
    background: '#fff',
    color: '#1565C0',
    outline: 'none',
  },
  errorMsg: {
    textAlign: 'center',
    color: '#FF4D4F',
    fontSize: '14px',
    fontWeight: '600',
    marginBottom: '12px',
  },
  solveBtn: {
    display: 'block',
    margin: '0 auto 12px',
    padding: '14px 36px',
    borderRadius: '30px',
    border: 'none',
    background: 'linear-gradient(135deg, #1976D2, #42A5F5)',
    color: '#fff',
    fontSize: '18px',
    fontWeight: '800',
    cursor: 'pointer',
    boxShadow: '0 4px 12px rgba(25, 118, 210, 0.4)',
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
  columnArea: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '10px',
    padding: '20px',
    background: '#fff',
    borderRadius: '16px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.06)',
  },
  carryRow: {
    display: 'flex',
    gap: '8px',
    alignItems: 'center',
  },
  carrySpace: {
    width: '70px',
  },
  carryBadge: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    padding: '4px 10px',
    background: '#FFCDD2',
    borderRadius: '10px',
    border: '2px solid #EF5350',
  },
  borrowBadge: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    padding: '4px 10px',
    background: '#FFF9C4',
    borderRadius: '10px',
    border: '2px solid #FFC107',
  },
  carryText: {
    fontSize: '13px',
    fontWeight: '700',
    color: '#D32F2F',
  },
  carryDigit: {
    fontSize: '18px',
    fontWeight: '900',
    color: '#D32F2F',
  },
  numRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  },
  opSpace: {
    width: '44px',
  },
  opSymbol: {
    width: '44px',
    height: '64px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '32px',
    fontWeight: '900',
    color: '#FF6B6B',
  },
  digitBox: {
    width: '64px',
    height: '64px',
    borderRadius: '14px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'all 0.4s ease',
    position: 'relative',
  },
  digit: {
    fontSize: '32px',
    fontWeight: '900',
    lineHeight: '1',
  },
  digitLabel: {
    fontSize: '10px',
    fontWeight: '600',
    opacity: '0.8',
    marginTop: '2px',
  },
  separatorLine: {
    width: '160px',
    height: '4px',
    background: '#333',
    borderRadius: '2px',
    margin: '4px 0',
  },
  stepExplain: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    padding: '10px 16px',
    background: '#F5F5F5',
    borderRadius: '12px',
    maxWidth: '360px',
    width: '100%',
    flexWrap: 'wrap',
  },
  stepBadge: {
    padding: '4px 12px',
    background: '#1976D2',
    color: '#fff',
    borderRadius: '20px',
    fontSize: '13px',
    fontWeight: '700',
    flexShrink: 0,
  },
  stepText: {
    fontSize: '14px',
    fontWeight: '600',
    color: '#333',
    lineHeight: '1.5',
  },
  carryNote: {
    color: '#D32F2F',
  },
  resultRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    marginTop: '4px',
  },
  resultLabel: {
    width: '44px',
    height: '64px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '32px',
    fontWeight: '900',
    color: '#2E7D32',
  },
  finalResult: {
    textAlign: 'center',
    padding: '16px 24px',
    background: 'linear-gradient(135deg, #E8F5E9, #C8E6C9)',
    borderRadius: '16px',
    border: '3px solid #66BB6A',
    marginTop: '8px',
  },
  finalEq: {
    fontSize: '24px',
    fontWeight: '800',
    color: '#333',
    margin: '6px 0',
  },
  finalNum: {
    fontSize: '36px',
    fontWeight: '900',
    color: '#2E7D32',
  },
};
