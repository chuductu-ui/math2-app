import { useState } from 'react';

const SHAPES = [
  {
    id: 'triangle',
    name: 'Hình tam giác',
    emoji: '🔺',
    sides: 3,
    corners: 3,
    color: '#FF6B6B',
    description: 'Có 3 cạnh và 3 góc',
    renderSVG: (color) => (
      <polygon
        points="60,10 10,100 110,100"
        fill={color}
        stroke="#333"
        strokeWidth="3"
        strokeLinejoin="round"
      />
    ),
  },
  {
    id: 'rectangle',
    name: 'Hình chữ nhật',
    emoji: '🟦',
    sides: 4,
    corners: 4,
    color: '#4FC3F7',
    description: 'Có 4 cạnh, 4 góc vuông, 2 cạnh dài bằng nhau, 2 cạnh ngắn bằng nhau',
    renderSVG: (color) => (
      <rect
        x="10" y="25" width="100" height="65"
        rx="2" ry="2"
        fill={color}
        stroke="#333"
        strokeWidth="3"
      />
    ),
  },
  {
    id: 'square',
    name: 'Hình vuông',
    emoji: '🟧',
    sides: 4,
    corners: 4,
    color: '#FFB74D',
    description: 'Có 4 cạnh bằng nhau, 4 góc vuông',
    renderSVG: (color) => (
      <rect
        x="15" y="15" width="85" height="85"
        rx="2" ry="2"
        fill={color}
        stroke="#333"
        strokeWidth="3"
      />
    ),
  },
  {
    id: 'circle',
    name: 'Hình tròn',
    emoji: '🔴',
    sides: 0,
    corners: 0,
    color: '#81C784',
    description: 'Không có cạnh, không có góc, mọi điểm trên đường tròn cách đều tâm',
    renderSVG: (color) => (
      <circle
        cx="60" cy="55" r="45"
        fill={color}
        stroke="#333"
        strokeWidth="3"
      />
    ),
  },
  {
    id: 'quadrilateral',
    name: 'Hình tứ giác',
    emoji: '🔶',
    sides: 4,
    corners: 4,
    color: '#BA68C8',
    description: 'Có 4 cạnh và 4 góc (các cạnh có thể không bằng nhau)',
    renderSVG: (color) => (
      <polygon
        points="20,30 95,10 100,90 30,100"
        fill={color}
        stroke="#333"
        strokeWidth="3"
        strokeLinejoin="round"
      />
    ),
  },
];

const LINES = [
  {
    id: 'straight',
    name: 'Đường thẳng',
    emoji: '➖',
    color: '#1976D2',
    description: 'Đường thẳng không có điểm cong, đi theo một hướng',
    renderSVG: (color) => (
      <line
        x1="10" y1="55" x2="110" y2="55"
        stroke={color}
        strokeWidth="5"
        strokeLinecap="round"
      />
    ),
  },
  {
    id: 'curve',
    name: 'Đường cong',
    emoji: '〰️',
    color: '#E64A19',
    description: 'Đường cong uốn lượn, không có góc nhọn',
    renderSVG: (color) => (
      <path
        d="M 10,70 Q 40,10 60,55 Q 80,100 110,40"
        fill="none"
        stroke={color}
        strokeWidth="5"
        strokeLinecap="round"
      />
    ),
  },
  {
    id: 'zigzag',
    name: 'Đường gấp khúc',
    emoji: '📐',
    color: '#2E7D32',
    description: 'Đường gấp khúc gồm nhiều đoạn thẳng nối nhau tại các đỉnh',
    renderSVG: (color) => (
      <polyline
        points="10,80 35,20 60,70 85,25 110,75"
        fill="none"
        stroke={color}
        strokeWidth="5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    ),
  },
];

export default function ShapeExplorer({ config = {} }) {
  const [selectedShape, setSelectedShape] = useState(null);
  const [selectedLine, setSelectedLine] = useState(null);
  const [tab, setTab] = useState('shapes'); // 'shapes' or 'lines'

  const handleShapeClick = (shape) => {
    setSelectedShape(selectedShape?.id === shape.id ? null : shape);
    setSelectedLine(null);
  };

  const handleLineClick = (line) => {
    setSelectedLine(selectedLine?.id === line.id ? null : line);
    setSelectedShape(null);
  };

  const currentItem = tab === 'shapes' ? selectedShape : selectedLine;

  return (
    <div style={styles.wrapper}>
      <h3 style={styles.title}>🔷 Khám Phá Hình Học</h3>

      {/* Tab toggle */}
      <div style={styles.tabRow}>
        <button
          onClick={() => { setTab('shapes'); setSelectedLine(null); }}
          style={{
            ...styles.tabBtn,
            backgroundColor: tab === 'shapes' ? '#7E57C2' : '#f5f5f5',
            color: tab === 'shapes' ? '#fff' : '#888',
          }}
        >
          🔷 Hình phẳng
        </button>
        <button
          onClick={() => { setTab('lines'); setSelectedShape(null); }}
          style={{
            ...styles.tabBtn,
            backgroundColor: tab === 'lines' ? '#7E57C2' : '#f5f5f5',
            color: tab === 'lines' ? '#fff' : '#888',
          }}
        >
          📏 Các đường
        </button>
      </div>

      {/* Shape / Line cards */}
      {tab === 'shapes' && (
        <div style={styles.cardsGrid}>
          {SHAPES.map((shape) => (
            <div
              key={shape.id}
              onClick={() => handleShapeClick(shape)}
              style={{
                ...styles.card,
                borderColor: selectedShape?.id === shape.id ? shape.color : '#e0e0e0',
                backgroundColor: selectedShape?.id === shape.id ? `${shape.color}15` : '#fff',
                transform: selectedShape?.id === shape.id ? 'scale(1.05)' : 'scale(1)',
                boxShadow: selectedShape?.id === shape.id
                  ? `0 6px 16px ${shape.color}30`
                  : '0 2px 6px rgba(0,0,0,0.08)',
              }}
            >
              <svg viewBox="0 0 120 110" style={styles.svgCanvas}>
                {shape.renderSVG(shape.color)}
              </svg>
              <div style={styles.cardName}>{shape.emoji} {shape.name}</div>
            </div>
          ))}
        </div>
      )}

      {tab === 'lines' && (
        <div style={styles.cardsGrid}>
          {LINES.map((line) => (
            <div
              key={line.id}
              onClick={() => handleLineClick(line)}
              style={{
                ...styles.card,
                borderColor: selectedLine?.id === line.id ? line.color : '#e0e0e0',
                backgroundColor: selectedLine?.id === line.id ? `${line.color}15` : '#fff',
                transform: selectedLine?.id === line.id ? 'scale(1.05)' : 'scale(1)',
                boxShadow: selectedLine?.id === line.id
                  ? `0 6px 16px ${line.color}30`
                  : '0 2px 6px rgba(0,0,0,0.08)',
              }}
            >
              <svg viewBox="0 0 120 110" style={styles.svgCanvas}>
                {line.renderSVG(line.color)}
              </svg>
              <div style={styles.cardName}>{line.emoji} {line.name}</div>
            </div>
          ))}
        </div>
      )}

      {/* Detail panel */}
      {currentItem && (
        <div style={{
          ...styles.detailPanel,
          borderColor: currentItem.color,
        }}>
          <div style={styles.detailHeader}>
            <svg viewBox="0 0 120 110" style={styles.detailSvg}>
              {currentItem.renderSVG(currentItem.color)}
            </svg>
            <div>
              <h4 style={{ ...styles.detailName, color: currentItem.color }}>
                {currentItem.emoji} {currentItem.name}
              </h4>
              {'sides' in currentItem && (
                <div style={styles.propsRow}>
                  <div style={styles.propBadge}>
                    📐 {currentItem.sides} cạnh
                  </div>
                  <div style={styles.propBadge}>
                    📍 {currentItem.corners} góc
                  </div>
                </div>
              )}
            </div>
          </div>
          <p style={styles.detailDesc}>{currentItem.description}</p>
        </div>
      )}

      {!currentItem && (
        <p style={styles.hint}>👆 Chạm vào hình hoặc đường bất kỳ để khám phá!</p>
      )}
    </div>
  );
}

const styles = {
  wrapper: {
    padding: '20px',
    background: 'linear-gradient(135deg, #F3E5F5 0%, #E8EAF6 100%)',
    borderRadius: '20px',
    border: '3px solid #CE93D8',
    maxWidth: '100%',
    boxSizing: 'border-box',
  },
  title: {
    textAlign: 'center',
    fontSize: '22px',
    color: '#6A1B9A',
    marginBottom: '16px',
    fontWeight: '800',
  },
  tabRow: {
    display: 'flex',
    gap: '10px',
    justifyContent: 'center',
    marginBottom: '16px',
  },
  tabBtn: {
    padding: '10px 22px',
    borderRadius: '25px',
    border: 'none',
    fontSize: '15px',
    fontWeight: '700',
    cursor: 'pointer',
    transition: 'all 0.3s',
  },
  cardsGrid: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '12px',
    justifyContent: 'center',
    marginBottom: '16px',
  },
  card: {
    width: '130px',
    padding: '12px',
    borderRadius: '16px',
    border: '3px solid',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '8px',
  },
  svgCanvas: {
    width: '80px',
    height: '70px',
  },
  cardName: {
    fontSize: '13px',
    fontWeight: '700',
    color: '#333',
    textAlign: 'center',
  },
  detailPanel: {
    padding: '20px',
    background: '#fff',
    borderRadius: '16px',
    border: '3px solid',
    boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
  },
  detailHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
    marginBottom: '12px',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  detailSvg: {
    width: '100px',
    height: '90px',
  },
  detailName: {
    fontSize: '22px',
    fontWeight: '800',
    margin: '0 0 8px 0',
  },
  propsRow: {
    display: 'flex',
    gap: '10px',
    flexWrap: 'wrap',
  },
  propBadge: {
    padding: '6px 14px',
    background: '#F5F5F5',
    borderRadius: '20px',
    fontSize: '14px',
    fontWeight: '700',
    color: '#555',
  },
  detailDesc: {
    fontSize: '15px',
    color: '#555',
    lineHeight: '1.6',
    margin: 0,
    textAlign: 'center',
    fontWeight: '600',
  },
  hint: {
    textAlign: 'center',
    fontSize: '14px',
    color: '#888',
    fontWeight: '600',
  },
};
