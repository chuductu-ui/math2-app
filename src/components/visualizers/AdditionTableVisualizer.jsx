import { useState } from 'react';

const NUMS = [2, 3, 4, 5, 6, 7, 8, 9];

function getSumColor(sum) {
  // Color gradient from green (small sums) to purple (large sums)
  const colors = {
    4: '#A5D6A7',   5: '#81C784',   6: '#66BB6A',   7: '#4CAF50',
    8: '#43A047',   9: '#FFD54F',  10: '#FFCA28',  11: '#FFC107',
    12: '#FFB300',  13: '#FF8F00', 14: '#FF6F00',  15: '#F4511E',
    16: '#E64A19',  17: '#D84315', 18: '#BF360C',
  };
  return colors[sum] || '#E0E0E0';
}

function getTextColor(sum) {
  return sum >= 14 ? '#fff' : '#333';
}

export default function AdditionTableVisualizer({ config = {} }) {
  const [selectedCell, setSelectedCell] = useState(null);
  const [hoveredCell, setHoveredCell] = useState(null);

  const handleCellClick = (row, col) => {
    if (selectedCell && selectedCell.row === row && selectedCell.col === col) {
      setSelectedCell(null);
    } else {
      setSelectedCell({ row, col, sum: row + col });
    }
  };

  const isHighlighted = (row, col) => {
    if (!selectedCell) return false;
    return selectedCell.row === row || selectedCell.col === col;
  };

  const isSelected = (row, col) => {
    if (!selectedCell) return false;
    return selectedCell.row === row && selectedCell.col === col;
  };

  const isHovered = (row, col) => {
    if (!hoveredCell) return false;
    return hoveredCell.row === row && hoveredCell.col === col;
  };

  return (
    <div style={styles.wrapper}>
      <h3 style={styles.title}>📊 Bảng Cộng</h3>

      {/* Selected equation display */}
      {selectedCell && (
        <div style={styles.equationDisplay}>
          <span style={styles.eqPart}>{selectedCell.row}</span>
          <span style={styles.eqOp}>+</span>
          <span style={styles.eqPart}>{selectedCell.col}</span>
          <span style={styles.eqOp}>=</span>
          <span style={styles.eqResult}>{selectedCell.sum}</span>
        </div>
      )}

      {!selectedCell && (
        <p style={styles.hint}>👆 Chạm vào ô bất kỳ để xem phép tính!</p>
      )}

      {/* Table */}
      <div style={styles.tableScroll}>
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.cornerCell}>➕</th>
              {NUMS.map((n) => (
                <th
                  key={n}
                  style={{
                    ...styles.headerCell,
                    backgroundColor: isHighlighted(null, n) ? '#FFF9C4' : '#E3F2FD',
                    transform: selectedCell?.col === n ? 'scale(1.1)' : 'scale(1)',
                  }}
                >
                  {n}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {NUMS.map((row) => (
              <tr key={row}>
                <th
                  style={{
                    ...styles.rowHeader,
                    backgroundColor: isHighlighted(row, null) ? '#FFF9C4' : '#F3E5F5',
                    transform: selectedCell?.row === row ? 'scale(1.1)' : 'scale(1)',
                  }}
                >
                  {row}
                </th>
                {NUMS.map((col) => {
                  const sum = row + col;
                  const selected = isSelected(row, col);
                  const highlighted = isHighlighted(row, col);
                  const hovered = isHovered(row, col);

                  return (
                    <td
                      key={col}
                      onClick={() => handleCellClick(row, col)}
                      onMouseEnter={() => setHoveredCell({ row, col })}
                      onMouseLeave={() => setHoveredCell(null)}
                      style={{
                        ...styles.cell,
                        backgroundColor: selected
                          ? '#FF6B6B'
                          : highlighted
                          ? '#FFF9C4'
                          : getSumColor(sum),
                        color: selected ? '#fff' : getTextColor(sum),
                        transform: selected
                          ? 'scale(1.15)'
                          : hovered
                          ? 'scale(1.08)'
                          : 'scale(1)',
                        boxShadow: selected
                          ? '0 4px 12px rgba(255,107,107,0.5)'
                          : hovered
                          ? '0 3px 8px rgba(0,0,0,0.15)'
                          : 'none',
                        border: selected
                          ? '3px solid #D32F2F'
                          : highlighted
                          ? '2px solid #FFC107'
                          : '1px solid rgba(0,0,0,0.08)',
                        fontWeight: selected || highlighted ? '900' : '700',
                        zIndex: selected ? 10 : hovered ? 5 : 1,
                        position: 'relative',
                      }}
                    >
                      {sum}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Color legend */}
      <div style={styles.legend}>
        <span style={styles.legendTitle}>🎨 Màu sắc theo tổng:</span>
        <div style={styles.legendItems}>
          <div style={styles.legendItem}>
            <div style={{ ...styles.legendColor, backgroundColor: '#A5D6A7' }} />
            <span>Nhỏ (4-7)</span>
          </div>
          <div style={styles.legendItem}>
            <div style={{ ...styles.legendColor, backgroundColor: '#FFC107' }} />
            <span>Vừa (8-13)</span>
          </div>
          <div style={styles.legendItem}>
            <div style={{ ...styles.legendColor, backgroundColor: '#E64A19' }} />
            <span>Lớn (14-18)</span>
          </div>
        </div>
      </div>
    </div>
  );
}

const styles = {
  wrapper: {
    padding: '20px',
    background: 'linear-gradient(135deg, #EDE7F6 0%, #E8EAF6 100%)',
    borderRadius: '20px',
    border: '3px solid #B39DDB',
    maxWidth: '100%',
    boxSizing: 'border-box',
  },
  title: {
    textAlign: 'center',
    fontSize: '22px',
    color: '#4527A0',
    marginBottom: '12px',
    fontWeight: '800',
  },
  hint: {
    textAlign: 'center',
    fontSize: '14px',
    color: '#888',
    marginBottom: '12px',
    fontWeight: '600',
  },
  equationDisplay: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '12px',
    padding: '14px 20px',
    background: '#fff',
    borderRadius: '16px',
    marginBottom: '16px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
  },
  eqPart: {
    fontSize: '32px',
    fontWeight: '900',
    color: '#1565C0',
  },
  eqOp: {
    fontSize: '28px',
    fontWeight: '700',
    color: '#FF6B6B',
  },
  eqResult: {
    fontSize: '40px',
    fontWeight: '900',
    color: '#2E7D32',
  },
  tableScroll: {
    overflowX: 'auto',
    marginBottom: '16px',
    WebkitOverflowScrolling: 'touch',
  },
  table: {
    borderCollapse: 'separate',
    borderSpacing: '3px',
    margin: '0 auto',
    width: 'auto',
  },
  cornerCell: {
    width: '44px',
    height: '44px',
    fontSize: '20px',
    backgroundColor: '#7E57C2',
    color: '#fff',
    borderRadius: '10px',
    textAlign: 'center',
    fontWeight: '800',
    border: 'none',
  },
  headerCell: {
    width: '44px',
    height: '44px',
    fontSize: '18px',
    fontWeight: '800',
    borderRadius: '10px',
    textAlign: 'center',
    color: '#1565C0',
    transition: 'all 0.2s',
    border: 'none',
  },
  rowHeader: {
    width: '44px',
    height: '44px',
    fontSize: '18px',
    fontWeight: '800',
    borderRadius: '10px',
    textAlign: 'center',
    color: '#6A1B9A',
    transition: 'all 0.2s',
    border: 'none',
  },
  cell: {
    width: '44px',
    height: '44px',
    fontSize: '17px',
    textAlign: 'center',
    borderRadius: '10px',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    userSelect: 'none',
  },
  legend: {
    textAlign: 'center',
    padding: '10px',
  },
  legendTitle: {
    fontSize: '13px',
    fontWeight: '700',
    color: '#555',
    display: 'block',
    marginBottom: '8px',
  },
  legendItems: {
    display: 'flex',
    gap: '16px',
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
  legendItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    fontSize: '12px',
    color: '#666',
    fontWeight: '600',
  },
  legendColor: {
    width: '20px',
    height: '20px',
    borderRadius: '6px',
    border: '1px solid rgba(0,0,0,0.1)',
  },
};
