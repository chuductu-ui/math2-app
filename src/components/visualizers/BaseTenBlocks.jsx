import { useState } from 'react';

export default function BaseTenBlocks({ config = {} }) {
  const defaultVal = config.defaultValue ?? 35;
  const mode = config.mode ?? 'split'; // split | multiply
  const defaultA = config.defaultA ?? 3;
  const defaultB = config.defaultB ?? 5;

  const [value, setValue] = useState(defaultVal);
  const [multA, setMultA] = useState(defaultA);
  const [multB, setMultB] = useState(defaultB);

  const parseVal = (val, minVal, maxVal) => {
    if (val === "" || val === undefined || val === null) return 0;
    const num = Math.round(Number(val));
    if (isNaN(num)) return 0;
    return Math.max(minVal, Math.min(maxVal, num));
  };

  const handleBlur = (setter, val, minVal, maxVal) => {
    if (val === "" || val === undefined || val === null) {
      setter(minVal);
    } else {
      const num = Math.round(Number(val));
      if (isNaN(num)) {
        setter(minVal);
      } else {
        setter(Math.max(minVal, Math.min(maxVal, num)));
      }
    }
  };

  const targetVal = mode === 'split' 
    ? parseVal(value, 0, 199) 
    : parseVal(multA, 1, 10) * parseVal(multB, 1, 10);

  const hundreds = Math.floor(targetVal / 100);
  const remainder = targetVal % 100;
  const tens = Math.floor(remainder / 10);
  const units = remainder % 10;

  return (
    <div style={styles.wrapper} data-testid="baseten-visualizer">
      <h3 style={styles.title}>🧱 Khối cơ số 10 (Base-10 Blocks)</h3>

      {mode === 'split' ? (
        <div style={styles.controls}>
          <label htmlFor="block-input">Nhập số (0-199): </label>
          <input
            id="block-input"
            type="number"
            min="0"
            max="199"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onBlur={() => handleBlur(setValue, value, 0, 199)}
            style={styles.input}
            data-testid="block-input"
          />
        </div>
      ) : (
        <div style={styles.controls}>
          <label htmlFor="multA-input">Phép nhân: </label>
          <input
            id="multA-input"
            type="number"
            min="1"
            max="10"
            value={multA}
            onChange={(e) => setMultA(e.target.value)}
            onBlur={() => handleBlur(setMultA, multA, 1, 10)}
            style={styles.input}
            data-testid="multA-input"
          />
          <span> x </span>
          <input
            id="multB-input"
            type="number"
            min="1"
            max="10"
            value={multB}
            onChange={(e) => setMultB(e.target.value)}
            onBlur={() => handleBlur(setMultB, multB, 1, 10)}
            style={styles.input}
            data-testid="multB-input"
          />
          <span> = {targetVal}</span>
        </div>
      )}

      <div style={styles.summary} data-testid="block-summary">
        {hundreds > 0 && <span>{hundreds} Trăm 🟩 </span>}
        {tens > 0 && <span>{tens} Chục 🟧 </span>}
        {units > 0 && <span>{units} Đơn vị 🟨 </span>}
      </div>

      <div style={styles.grid}>
        {/* Hundreds blocks */}
        {Array.from({ length: hundreds }).map((_, i) => (
          <div key={`h-${i}`} style={styles.hundredBlock} title="1 Trăm (10x10)">
            {Array.from({ length: 100 }).map((_, j) => (
              <div key={j} style={styles.hundredUnitSquare} />
            ))}
          </div>
        ))}

        {/* Tens blocks */}
        {tens > 0 && (
          <div style={styles.tensContainer}>
            {Array.from({ length: tens }).map((_, i) => (
              <div key={`t-${i}`} style={styles.tenBlock} title="1 Chục (1x10)">
                {Array.from({ length: 10 }).map((_, j) => (
                  <div key={j} style={styles.tenUnitSquare} />
                ))}
              </div>
            ))}
          </div>
        )}

        {/* Units blocks */}
        {units > 0 && (
          <div style={styles.unitsContainer}>
            {Array.from({ length: units }).map((_, i) => (
              <div key={`u-${i}`} style={styles.unitBlock} title="1 Đơn vị" />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

const styles = {
  wrapper: { padding: '20px', backgroundColor: '#fff', borderRadius: '12px', border: '2px solid #ddd' },
  title: { textAlign: 'center', margin: '0 0 15px', color: '#722ED1' },
  controls: { display: 'flex', justifyContent: 'center', gap: '8px', marginBottom: '15px', alignItems: 'center' },
  input: { width: '60px', padding: '6px', fontSize: '14px', borderRadius: '4px', border: '1px solid #ccc' },
  summary: { textAlign: 'center', marginBottom: '20px', fontWeight: 'bold', fontSize: '16px' },
  grid: { display: 'flex', flexWrap: 'wrap', gap: '20px', justifyContent: 'center', alignItems: 'flex-start' },
  hundredBlock: { display: 'grid', gridTemplateColumns: 'repeat(10, 8px)', gap: '1px', padding: '2px', backgroundColor: '#52C41A', borderRadius: '4px', border: '1px solid #52C41A' },
  hundredUnitSquare: { width: '8px', height: '8px', backgroundColor: '#B7EB8F', border: 'none' },
  tenBlock: { display: 'grid', gridTemplateRows: 'repeat(10, 8px)', gap: '1px', padding: '2px', backgroundColor: '#FF8E53', borderRadius: '4px', border: '1px solid #FF8E53' },
  tenUnitSquare: { width: '8px', height: '8px', backgroundColor: '#FFBB96', border: 'none' },
  tensContainer: { display: 'flex', gap: '4px' },
  unitsContainer: { display: 'flex', flexWrap: 'wrap', gap: '4px', maxWidth: '80px' },
  unitBlock: { width: '8px', height: '8px', backgroundColor: '#FFD666', border: '1px solid #d4b106', borderRadius: '2px' }
};

