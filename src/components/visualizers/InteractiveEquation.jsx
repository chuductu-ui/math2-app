import { useState } from 'react';

export default function InteractiveEquation({ config = {} }) {
  const [selectedTerm, setSelectedTerm] = useState(null);
  const [eqMode, setEqMode] = useState(config.mode || 'add'); // add | sub

  const handleSelect = (term, vnName, desc) => {
    setSelectedTerm({ term, vnName, desc });
  };

  const handleKeyDown = (e, term, vnName, desc) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleSelect(term, vnName, desc);
    }
  };

  return (
    <div style={styles.wrapper} data-testid="equation-visualizer">
      <h3 style={styles.title}>🧮 Thành phần phép tính</h3>

      <div style={styles.tabs}>
        <button
          style={{ ...styles.tabBtn, backgroundColor: eqMode === 'add' ? '#1890FF' : '#f5f5f5', color: eqMode === 'add' ? '#fff' : '#000' }}
          onClick={() => { setEqMode('add'); setSelectedTerm(null); }}
          data-testid="tab-add"
        >
          Phép cộng (+)
        </button>
        <button
          style={{ ...styles.tabBtn, backgroundColor: eqMode === 'sub' ? '#1890FF' : '#f5f5f5', color: eqMode === 'sub' ? '#fff' : '#000' }}
          onClick={() => { setEqMode('sub'); setSelectedTerm(null); }}
          data-testid="tab-sub"
        >
          Phép trừ (-)
        </button>
      </div>

      <div style={styles.equationRow}>
        {eqMode === 'add' ? (
          <>
            <span
              style={{ ...styles.term, color: '#389E0D' }}
              onClick={() => handleSelect('12', 'Số hạng', 'Số đứng trong phép cộng để tính tổng.')}
              onKeyDown={(e) => handleKeyDown(e, '12', 'Số hạng', 'Số đứng trong phép cộng để tính tổng.')}
              data-testid="term-add-a"
              role="button"
              tabIndex={0}
            >
              12
            </span>
            <span style={styles.symbol}>+</span>
            <span
              style={{ ...styles.term, color: '#08979C' }}
              onClick={() => handleSelect('5', 'Số hạng', 'Số đứng trong phép cộng để tính tổng.')}
              onKeyDown={(e) => handleKeyDown(e, '5', 'Số hạng', 'Số đứng trong phép cộng để tính tổng.')}
              data-testid="term-add-b"
              role="button"
              tabIndex={0}
            >
              5
            </span>
            <span style={styles.symbol}>=</span>
            <span
              style={{ ...styles.term, color: '#722ED1' }}
              onClick={() => handleSelect('17', 'Tổng', 'Kết quả thu được sau khi thực hiện phép cộng.')}
              onKeyDown={(e) => handleKeyDown(e, '17', 'Tổng', 'Kết quả thu được sau khi thực hiện phép cộng.')}
              data-testid="term-add-sum"
              role="button"
              tabIndex={0}
            >
              17
            </span>
          </>
        ) : (
          <>
            <span
              style={{ ...styles.term, color: '#D32029' }}
              onClick={() => handleSelect('25', 'Số bị trừ', 'Số đứng trước dấu trừ, bị bớt đi một lượng.')}
              onKeyDown={(e) => handleKeyDown(e, '25', 'Số bị trừ', 'Số đứng trước dấu trừ, bị bớt đi một lượng.')}
              data-testid="term-sub-a"
              role="button"
              tabIndex={0}
            >
              25
            </span>
            <span style={styles.symbol}>-</span>
            <span
              style={{ ...styles.term, color: '#D46B08' }}
              onClick={() => handleSelect('5', 'Số trừ', 'Số đứng sau dấu trừ, là lượng bớt đi.')}
              onKeyDown={(e) => handleKeyDown(e, '5', 'Số trừ', 'Số đứng sau dấu trừ, là lượng bớt đi.')}
              data-testid="term-sub-b"
              role="button"
              tabIndex={0}
            >
              5
            </span>
            <span style={styles.symbol}>=</span>
            <span
              style={{ ...styles.term, color: '#C41D7F' }}
              onClick={() => handleSelect('20', 'Hiệu', 'Kết quả thu được sau khi thực hiện phép trừ.')}
              onKeyDown={(e) => handleKeyDown(e, '20', 'Hiệu', 'Kết quả thu được sau khi thực hiện phép trừ.')}
              data-testid="term-sub-diff"
              role="button"
              tabIndex={0}
            >
              20
            </span>
          </>
        )}
      </div>

      <div style={styles.infoBox} data-testid="term-info">
        {selectedTerm ? (
          <>
            <h4>Số {selectedTerm.term} gọi là: <span style={styles.badge}>{selectedTerm.vnName}</span></h4>
            <p>{selectedTerm.desc}</p>
          </>
        ) : (
          <p style={{ color: '#8c8c8c' }}>👆 Bấm vào số bất kỳ trong phép tính trên để xem tên gọi!</p>
        )}
      </div>
    </div>
  );
}

const styles = {
  wrapper: { padding: '20px', backgroundColor: '#fff', borderRadius: '12px', border: '2px solid #ddd' },
  title: { textAlign: 'center', margin: '0 0 15px', color: '#1890FF' },
  tabs: { display: 'flex', justifyContent: 'center', gap: '8px', marginBottom: '20px' },
  tabBtn: { padding: '6px 12px', border: '1px solid #ccc', borderRadius: '6px', cursor: 'pointer' },
  equationRow: { display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '15px', fontSize: '36px', fontWeight: 'bold', margin: '20px 0' },
  term: { cursor: 'pointer', borderBottom: '2px dashed currentColor', padding: '2px 6px', borderRadius: '4px', transition: 'background-color 0.2s' },
  symbol: { color: '#8c8c8c' },
  infoBox: { padding: '15px', border: '1px solid #e8e8e8', borderRadius: '8px', backgroundColor: '#fafafa', minHeight: '80px', textAlign: 'center' },
  badge: { backgroundColor: '#1890FF', color: '#fff', padding: '2px 8px', borderRadius: '12px', fontSize: '14px', marginLeft: '6px' }
};

