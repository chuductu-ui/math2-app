import { useState, useRef, useCallback } from 'react';

const TOTAL_CM = 20;
const CM_PX = 40; // pixels per cm
const RULER_WIDTH = TOTAL_CM * CM_PX;

export default function RulerVisualizer({ config = {} }) {
  const [startPos, setStartPos] = useState(config.defaultStart ?? 0);
  const [endPos, setEndPos] = useState(config.defaultEnd ?? 5);
  const [dragging, setDragging] = useState(null); // 'start' | 'end' | null
  const rulerRef = useRef(null);

  const measurement = Math.abs(endPos - startPos);
  const dmPart = Math.floor(measurement / 10);
  const cmPart = measurement % 10;

  const getCmFromEvent = useCallback((e) => {
    if (!rulerRef.current) return 0;
    const rect = rulerRef.current.getBoundingClientRect();
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const x = clientX - rect.left;
    const cm = Math.round(x / CM_PX);
    return Math.max(0, Math.min(TOTAL_CM, cm));
  }, []);

  const handlePointerDown = (which) => (e) => {
    e.preventDefault();
    setDragging(which);
  };

  const handlePointerMove = useCallback((e) => {
    if (!dragging) return;
    const cm = getCmFromEvent(e);
    if (dragging === 'start') {
      setStartPos(cm);
    } else {
      setEndPos(cm);
    }
  }, [dragging, getCmFromEvent]);

  const handlePointerUp = useCallback(() => {
    setDragging(null);
  }, []);

  const renderRuler = () => {
    const ticks = [];
    for (let i = 0; i <= TOTAL_CM; i++) {
      const isMajor = i % 10 === 0;
      const isMid = i % 5 === 0 && !isMajor;
      ticks.push(
        <g key={i} transform={`translate(${i * CM_PX}, 0)`}>
          {/* Tick */}
          <line
            x1="0" y1="0"
            x2="0" y2={isMajor ? 30 : isMid ? 22 : 14}
            stroke="#333"
            strokeWidth={isMajor ? 2.5 : 1.5}
          />
          {/* Label */}
          {(isMajor || isMid) && (
            <text
              x="0" y={isMajor ? 48 : 40}
              textAnchor="middle"
              fontSize={isMajor ? 16 : 12}
              fontWeight={isMajor ? '800' : '600'}
              fill={isMajor ? '#D32F2F' : '#555'}
            >
              {i}
            </text>
          )}
          {/* dm labels */}
          {isMajor && i > 0 && (
            <text
              x="0" y="66"
              textAnchor="middle"
              fontSize="11"
              fontWeight="700"
              fill="#1976D2"
            >
              {i / 10}dm
            </text>
          )}
        </g>
      );

      // Half-cm ticks
      if (i < TOTAL_CM) {
        ticks.push(
          <line
            key={`half-${i}`}
            x1={(i + 0.5) * CM_PX} y1="0"
            x2={(i + 0.5) * CM_PX} y2="8"
            stroke="#999"
            strokeWidth="1"
          />
        );
      }
    }
    return ticks;
  };

  const minPos = Math.min(startPos, endPos);
  const maxPos = Math.max(startPos, endPos);

  return (
    <div style={styles.wrapper}>
      <h3 style={styles.title}>📏 Thước Đo Ảo</h3>

      {/* Measurement display */}
      <div style={styles.measureDisplay}>
        <div style={styles.measureMain}>
          <span style={styles.measureNum}>{measurement}</span>
          <span style={styles.measureUnit}>cm</span>
        </div>
        {measurement >= 10 && (
          <div style={styles.dmConversion}>
            = {dmPart} dm {cmPart > 0 ? `${cmPart} cm` : ''}
          </div>
        )}
        <div style={styles.dmNote}>
          📖 1 dm = 10 cm
        </div>
      </div>

      {/* Ruler area */}
      <div style={styles.rulerScroll}>
        <svg
          ref={rulerRef}
          width={RULER_WIDTH + 40}
          height={160}
          style={styles.rulerSvg}
          onMouseMove={handlePointerMove}
          onMouseUp={handlePointerUp}
          onMouseLeave={handlePointerUp}
          onTouchMove={handlePointerMove}
          onTouchEnd={handlePointerUp}
        >
          {/* Ruler body */}
          <g transform="translate(20, 30)">
            {/* Ruler background */}
            <rect
              x="-5" y="-10" width={RULER_WIDTH + 10} height="56"
              rx="4" ry="4"
              fill="linear-gradient(#FFFDE7, #FFF9C4)"
              stroke="#D4A373"
              strokeWidth="2"
            />
            <rect
              x="-5" y="-10" width={RULER_WIDTH + 10} height="56"
              rx="4" ry="4"
              fill="#FFFDE7"
              stroke="#C19A6B"
              strokeWidth="2"
            />

            {/* Tick marks */}
            {renderRuler()}

            {/* Measurement highlight bar */}
            <rect
              x={minPos * CM_PX}
              y={-6}
              width={(maxPos - minPos) * CM_PX}
              height={8}
              rx="4"
              fill="#FF6B6B"
              opacity="0.3"
            />

            {/* Measurement line */}
            <line
              x1={startPos * CM_PX} y1={-12}
              x2={endPos * CM_PX} y2={-12}
              stroke="#FF6B6B"
              strokeWidth="3"
              strokeLinecap="round"
            />

            {/* Measurement value on line */}
            {measurement > 0 && (
              <text
                x={((startPos + endPos) / 2) * CM_PX}
                y={-18}
                textAnchor="middle"
                fontSize="14"
                fontWeight="800"
                fill="#D32F2F"
              >
                {measurement} cm
              </text>
            )}

            {/* Start handle */}
            <g
              transform={`translate(${startPos * CM_PX}, -12)`}
              onMouseDown={handlePointerDown('start')}
              onTouchStart={handlePointerDown('start')}
              style={{ cursor: 'grab' }}
            >
              <circle r="14" fill="#4FC3F7" stroke="#0288D1" strokeWidth="3" />
              <text
                textAnchor="middle"
                dy="5"
                fontSize="12"
                fontWeight="800"
                fill="#fff"
              >
                A
              </text>
            </g>

            {/* End handle */}
            <g
              transform={`translate(${endPos * CM_PX}, -12)`}
              onMouseDown={handlePointerDown('end')}
              onTouchStart={handlePointerDown('end')}
              style={{ cursor: 'grab' }}
            >
              <circle r="14" fill="#FF8A65" stroke="#E64A19" strokeWidth="3" />
              <text
                textAnchor="middle"
                dy="5"
                fontSize="12"
                fontWeight="800"
                fill="#fff"
              >
                B
              </text>
            </g>

            {/* Cute object being measured */}
            <text
              x={((startPos + endPos) / 2) * CM_PX}
              y={100}
              textAnchor="middle"
              fontSize="32"
            >
              {measurement <= 3 ? '🐛' : measurement <= 7 ? '🖊️' : measurement <= 12 ? '📏' : '🐍'}
            </text>
            <text
              x={((startPos + endPos) / 2) * CM_PX}
              y={125}
              textAnchor="middle"
              fontSize="13"
              fontWeight="700"
              fill="#666"
            >
              {measurement <= 3 ? 'Con sâu' : measurement <= 7 ? 'Cây bút' : measurement <= 12 ? 'Cái thước' : 'Con rắn'}
            </text>
          </g>
        </svg>
      </div>

      {/* Instructions */}
      <div style={styles.instructions}>
        <p style={styles.instructionText}>
          👆 Kéo điểm <span style={{ color: '#0288D1', fontWeight: 800 }}>A</span> và{' '}
          <span style={{ color: '#E64A19', fontWeight: 800 }}>B</span> để đo!
        </p>
      </div>

      {/* Quick measure buttons */}
      <div style={styles.quickBtns}>
        {[
          { label: '1 cm', start: 0, end: 1 },
          { label: '5 cm', start: 0, end: 5 },
          { label: '1 dm', start: 0, end: 10 },
          { label: '15 cm', start: 0, end: 15 },
          { label: '2 dm', start: 0, end: 20 },
        ].map((preset) => (
          <button
            key={preset.label}
            onClick={() => { setStartPos(preset.start); setEndPos(preset.end); }}
            style={{
              ...styles.quickBtn,
              backgroundColor: measurement === (preset.end - preset.start) ? '#7E57C2' : '#f5f5f5',
              color: measurement === (preset.end - preset.start) ? '#fff' : '#555',
            }}
          >
            {preset.label}
          </button>
        ))}
      </div>
    </div>
  );
}

const styles = {
  wrapper: {
    padding: '20px',
    background: 'linear-gradient(135deg, #FFFDE7 0%, #FFF3E0 100%)',
    borderRadius: '20px',
    border: '3px solid #FFD54F',
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
  measureDisplay: {
    textAlign: 'center',
    padding: '16px',
    background: '#fff',
    borderRadius: '16px',
    marginBottom: '16px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.06)',
  },
  measureMain: {
    display: 'flex',
    alignItems: 'baseline',
    justifyContent: 'center',
    gap: '6px',
  },
  measureNum: {
    fontSize: '48px',
    fontWeight: '900',
    color: '#D32F2F',
  },
  measureUnit: {
    fontSize: '24px',
    fontWeight: '700',
    color: '#666',
  },
  dmConversion: {
    fontSize: '18px',
    fontWeight: '700',
    color: '#1976D2',
    marginTop: '4px',
  },
  dmNote: {
    fontSize: '13px',
    color: '#888',
    marginTop: '4px',
    fontWeight: '600',
  },
  rulerScroll: {
    overflowX: 'auto',
    marginBottom: '12px',
    WebkitOverflowScrolling: 'touch',
    padding: '10px 0',
  },
  rulerSvg: {
    display: 'block',
    minWidth: '100%',
  },
  instructions: {
    textAlign: 'center',
    marginBottom: '12px',
  },
  instructionText: {
    fontSize: '14px',
    color: '#666',
    fontWeight: '600',
    margin: 0,
  },
  quickBtns: {
    display: 'flex',
    gap: '8px',
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
  quickBtn: {
    padding: '10px 18px',
    borderRadius: '20px',
    border: '2px solid #ddd',
    fontSize: '14px',
    fontWeight: '700',
    cursor: 'pointer',
    transition: 'all 0.2s',
  },
};
