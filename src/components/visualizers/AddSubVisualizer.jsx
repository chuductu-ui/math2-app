import { useState, useEffect } from 'react';

const BLOCK_COLORS = [
  '#FF6B6B', '#FF8E53', '#FFC53D', '#52C41A', '#13C2C2',
  '#1890FF', '#722ED1', '#EB2F96', '#FA541C', '#A0D911',
];

export default function AddSubVisualizer({ config = {} }) {
  const [num1, setNum1] = useState(config.defaultA ?? 5);
  const [num2, setNum2] = useState(config.defaultB ?? 3);
  const [mode, setMode] = useState(config.mode ?? 'add');
  const [showResult, setShowResult] = useState(false);
  const [animStep, setAnimStep] = useState(0);

  const result = mode === 'add' ? num1 + num2 : num1 - num2;
  const isValid = mode === 'subtract' ? num1 >= num2 : (num1 + num2) <= 100;

  useEffect(() => {
    setShowResult(false);
    setAnimStep(0);
  }, [num1, num2, mode]);

  const handleCalculate = () => {
    setShowResult(true);
    setAnimStep(0);
    let step = 0;
    const interval = setInterval(() => {
      step++;
      setAnimStep(step);
      if (step >= 3) clearInterval(interval);
    }, 600);
  };

  const renderBlocks = (count, color, label) => {
    const blocks = [];
    const maxShow = Math.min(count, 20);
    for (let i = 0; i < maxShow; i++) {
      blocks.push(
        <div
          key={i}
          style={{
            ...styles.block,
            backgroundColor: color,
            animationDelay: `${i * 0.05}s`,
            opacity: showResult ? 1 : 0.7,
            transform: showResult ? 'scale(1)' : 'scale(0.8)',
            transition: `all 0.3s ease ${i * 0.05}s`,
          }}
        >
          {count <= 20 ? '●' : ''}
        </div>
      );
    }
    if (count > 20) {
      blocks.push(
        <div key="more" style={styles.moreLabel}>+{count - 20} nữa</div>
      );
    }
    return (
      <div style={styles.blockGroup}>
        <div style={styles.blockLabel}>{label}: {count}</div>
        <div style={styles.blocksContainer}>{blocks}</div>
      </div>
    );
  };

  return (
    <div style={styles.wrapper}>
      <h3 style={styles.title}>
        {mode === 'add' ? '➕ Phép Cộng' : '➖ Phép Trừ'}
      </h3>

      {/* Mode toggle */}
      <div style={styles.modeToggle}>
        <button
          onClick={() => setMode('add')}
          style={{
            ...styles.modeBtn,
            backgroundColor: mode === 'add' ? '#52C41A' : '#f0f0f0',
            color: mode === 'add' ? '#fff' : '#666',
          }}
        >
          ➕ Cộng
        </button>
        <button
          onClick={() => setMode('subtract')}
          style={{
            ...styles.modeBtn,
            backgroundColor: mode === 'subtract' ? '#FF6B6B' : '#f0f0f0',
            color: mode === 'subtract' ? '#fff' : '#666',
          }}
        >
          ➖ Trừ
        </button>
      </div>

      {/* Number inputs */}
      <div style={styles.inputRow}>
        <div style={styles.inputGroup}>
          <label style={styles.inputLabel}>Số thứ nhất</label>
          <div style={styles.inputControls}>
            <button
              style={styles.adjustBtn}
              onClick={() => setNum1(Math.max(0, num1 - 1))}
            >−</button>
            <input
              type="number"
              min="0"
              max="100"
              value={num1}
              onChange={(e) => setNum1(Math.min(100, Math.max(0, parseInt(e.target.value) || 0)))}
              style={styles.numberInput}
            />
            <button
              style={styles.adjustBtn}
              onClick={() => setNum1(Math.min(100, num1 + 1))}
            >+</button>
          </div>
        </div>

        <div style={styles.operatorDisplay}>
          {mode === 'add' ? '+' : '−'}
        </div>

        <div style={styles.inputGroup}>
          <label style={styles.inputLabel}>Số thứ hai</label>
          <div style={styles.inputControls}>
            <button
              style={styles.adjustBtn}
              onClick={() => setNum2(Math.max(0, num2 - 1))}
            >−</button>
            <input
              type="number"
              min="0"
              max="100"
              value={num2}
              onChange={(e) => setNum2(Math.min(100, Math.max(0, parseInt(e.target.value) || 0)))}
              style={styles.numberInput}
            />
            <button
              style={styles.adjustBtn}
              onClick={() => setNum2(Math.min(100, num2 + 1))}
            >+</button>
          </div>
        </div>
      </div>

      {/* Calculate button */}
      <button
        onClick={handleCalculate}
        style={{
          ...styles.calcBtn,
          opacity: isValid ? 1 : 0.5,
          cursor: isValid ? 'pointer' : 'not-allowed',
        }}
        disabled={!isValid}
      >
        🐸 Tính nào!
      </button>

      {!isValid && (
        <div style={styles.errorMsg}>
          {mode === 'subtract'
            ? '⚠️ Số thứ nhất phải lớn hơn hoặc bằng số thứ hai!'
            : '⚠️ Tổng không được vượt quá 100!'}
        </div>
      )}

      {/* Visual blocks */}
      {showResult && isValid && (
        <div style={styles.visualArea}>
          {renderBlocks(num1, '#4FC3F7', 'Số thứ nhất')}

          <div style={{
            ...styles.operatorBig,
            opacity: animStep >= 1 ? 1 : 0,
            transform: animStep >= 1 ? 'scale(1)' : 'scale(0)',
            transition: 'all 0.4s ease',
          }}>
            {mode === 'add' ? '+' : '−'}
          </div>

          {renderBlocks(num2, '#FF8A65', 'Số thứ hai')}

          {/* Step-by-step */}
          <div style={{
            ...styles.stepDisplay,
            opacity: animStep >= 2 ? 1 : 0,
            transform: animStep >= 2 ? 'translateY(0)' : 'translateY(20px)',
            transition: 'all 0.5s ease',
          }}>
            <div style={styles.equation}>
              <span style={styles.eqNum}>{num1}</span>
              <span style={styles.eqOp}>{mode === 'add' ? '+' : '−'}</span>
              <span style={styles.eqNum}>{num2}</span>
              <span style={styles.eqOp}>=</span>
              <span style={styles.eqOp}>?</span>
            </div>
          </div>

          {/* Result */}
          <div style={{
            ...styles.resultBox,
            opacity: animStep >= 3 ? 1 : 0,
            transform: animStep >= 3 ? 'scale(1)' : 'scale(0)',
            transition: 'all 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55)',
          }}>
            <div style={styles.resultStars}>⭐⭐⭐</div>
            <div style={styles.resultEquation}>
              {num1} {mode === 'add' ? '+' : '−'} {num2} = <span style={styles.resultNumber}>{result}</span>
            </div>
            <div style={styles.resultStars}>🎉 Giỏi lắm! 🎉</div>
          </div>
        </div>
      )}
    </div>
  );
}

const styles = {
  wrapper: {
    padding: '20px',
    background: 'linear-gradient(135deg, #e8f5e9 0%, #e3f2fd 100%)',
    borderRadius: '20px',
    border: '3px solid #81C784',
    maxWidth: '100%',
    boxSizing: 'border-box',
  },
  title: {
    textAlign: 'center',
    fontSize: '22px',
    color: '#2E7D32',
    marginBottom: '16px',
    fontWeight: '800',
  },
  modeToggle: {
    display: 'flex',
    gap: '10px',
    justifyContent: 'center',
    marginBottom: '20px',
  },
  modeBtn: {
    padding: '10px 24px',
    borderRadius: '25px',
    border: 'none',
    fontSize: '16px',
    fontWeight: '700',
    cursor: 'pointer',
    transition: 'all 0.3s',
  },
  inputRow: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '12px',
    flexWrap: 'wrap',
    marginBottom: '16px',
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
  inputControls: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
  },
  adjustBtn: {
    width: '40px',
    height: '40px',
    borderRadius: '50%',
    border: '2px solid #ccc',
    background: '#fff',
    fontSize: '20px',
    fontWeight: '700',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'all 0.2s',
    color: '#333',
  },
  numberInput: {
    width: '70px',
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
  operatorDisplay: {
    fontSize: '36px',
    fontWeight: '900',
    color: '#FF6B6B',
    margin: '0 8px',
    marginTop: '20px',
  },
  calcBtn: {
    display: 'block',
    margin: '0 auto 16px',
    padding: '14px 40px',
    borderRadius: '30px',
    border: 'none',
    background: 'linear-gradient(135deg, #52C41A, #73D13D)',
    color: '#fff',
    fontSize: '20px',
    fontWeight: '800',
    cursor: 'pointer',
    boxShadow: '0 4px 12px rgba(82, 196, 26, 0.4)',
    transition: 'all 0.3s',
  },
  errorMsg: {
    textAlign: 'center',
    color: '#FF4D4F',
    fontSize: '14px',
    fontWeight: '600',
    marginBottom: '12px',
  },
  visualArea: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '16px',
    padding: '16px',
    background: '#fff',
    borderRadius: '16px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.06)',
  },
  blockGroup: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '8px',
  },
  blockLabel: {
    fontSize: '14px',
    fontWeight: '700',
    color: '#666',
  },
  blocksContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '6px',
    justifyContent: 'center',
    maxWidth: '320px',
  },
  block: {
    width: '30px',
    height: '30px',
    borderRadius: '8px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#fff',
    fontSize: '16px',
    fontWeight: '700',
    boxShadow: '0 2px 4px rgba(0,0,0,0.15)',
  },
  moreLabel: {
    fontSize: '13px',
    fontWeight: '600',
    color: '#999',
    alignSelf: 'center',
  },
  operatorBig: {
    fontSize: '40px',
    fontWeight: '900',
    color: '#FF6B6B',
  },
  stepDisplay: {
    width: '100%',
    textAlign: 'center',
  },
  equation: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '12px',
    padding: '12px',
    background: '#FFF9C4',
    borderRadius: '12px',
    border: '2px dashed #FFC107',
  },
  eqNum: {
    fontSize: '32px',
    fontWeight: '900',
    color: '#1565C0',
  },
  eqOp: {
    fontSize: '28px',
    fontWeight: '700',
    color: '#FF6B6B',
  },
  resultBox: {
    textAlign: 'center',
    padding: '20px 30px',
    background: 'linear-gradient(135deg, #FFF9C4, #FFECB3)',
    borderRadius: '20px',
    border: '3px solid #FFD54F',
    boxShadow: '0 6px 20px rgba(255, 213, 79, 0.3)',
  },
  resultStars: {
    fontSize: '20px',
    marginBottom: '4px',
  },
  resultEquation: {
    fontSize: '28px',
    fontWeight: '800',
    color: '#333',
  },
  resultNumber: {
    fontSize: '40px',
    fontWeight: '900',
    color: '#FF6B6B',
  },
};
