import { useState, useRef, useEffect } from 'react';

const COLORS = [
  '#FF6B6B', '#FF8E53', '#FFC53D', '#52C41A', '#13C2C2',
  '#1890FF', '#722ED1', '#EB2F96', '#FA541C', '#A0D911',
];

function getColorForNumber(n) {
  const idx = Math.floor(n / 10);
  return COLORS[Math.min(idx, COLORS.length - 1)];
}

export default function NumberLine100({ config = {} }) {
  const [selected, setSelected] = useState(null);
  const scrollRef = useRef(null);
  const selectedRef = useRef(null);

  useEffect(() => {
    if (selectedRef.current) {
      selectedRef.current.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
    }
  }, [selected]);

  const numbers = Array.from({ length: 101 }, (_, i) => i);

  return (
    <div style={styles.wrapper}>
      <h3 style={styles.title}>🌈 Tia số từ 0 đến 100</h3>

      {selected !== null && (
        <div style={styles.selectedDisplay}>
          <span style={styles.selectedEmoji}>⭐</span>
          <span style={{ ...styles.selectedNumber, color: getColorForNumber(selected) }}>
            {selected}
          </span>
          <span style={styles.selectedLabel}>
            {selected === 0 ? 'Số không' :
             selected < 10 ? 'Số có 1 chữ số' :
             selected < 100 ? 'Số có 2 chữ số' : 'Số lớn nhất có 2 chữ số + 1'}
          </span>
        </div>
      )}

      <div style={styles.scrollContainer} ref={scrollRef}>
        <div style={styles.lineContainer}>
          {/* The main line */}
          <div style={styles.mainLine} />

          {/* Arrow at end */}
          <div style={styles.arrow}>▶</div>

          {/* Number marks */}
          <div style={styles.numbersRow}>
            {numbers.map((n) => {
              const isMajor = n % 10 === 0;
              const isMid = n % 5 === 0 && !isMajor;
              const isSelected = selected === n;

              return (
                <div
                  key={n}
                  ref={isSelected ? selectedRef : null}
                  style={{
                    ...styles.tickGroup,
                    width: isMajor ? '48px' : '28px',
                  }}
                  onClick={() => setSelected(n)}
                >
                  {/* Tick mark */}
                  <div
                    style={{
                      ...styles.tick,
                      height: isMajor ? '28px' : isMid ? '18px' : '12px',
                      backgroundColor: isSelected ? '#FF6B6B' : getColorForNumber(n),
                      width: isSelected ? '5px' : isMajor ? '4px' : '2px',
                    }}
                  />

                  {/* Number label */}
                  {(isMajor || isMid || isSelected) && (
                    <span
                      style={{
                        ...styles.label,
                        fontWeight: isMajor || isSelected ? '800' : '600',
                        fontSize: isSelected ? '20px' : isMajor ? '16px' : '12px',
                        color: isSelected ? '#FF6B6B' : getColorForNumber(n),
                      }}
                    >
                      {n}
                    </span>
                  )}

                  {/* Selected indicator */}
                  {isSelected && (
                    <div style={styles.selectedDot}>🔵</div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Legend */}
      <div style={styles.legend}>
        <span style={styles.legendItem}>👆 Chạm vào số bất kỳ để xem!</span>
      </div>

      {/* Quick jump buttons */}
      <div style={styles.quickJump}>
        {[0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100].map((n) => (
          <button
            key={n}
            onClick={() => setSelected(n)}
            style={{
              ...styles.jumpBtn,
              backgroundColor: selected === n ? getColorForNumber(n) : '#f0f0f0',
              color: selected === n ? '#fff' : getColorForNumber(n),
              border: `2px solid ${getColorForNumber(n)}`,
              transform: selected === n ? 'scale(1.15)' : 'scale(1)',
            }}
          >
            {n}
          </button>
        ))}
      </div>
    </div>
  );
}

const styles = {
  wrapper: {
    padding: '20px',
    background: 'linear-gradient(135deg, #fff9e6 0%, #e6f7ff 100%)',
    borderRadius: '20px',
    border: '3px solid #ffd666',
    maxWidth: '100%',
    boxSizing: 'border-box',
  },
  title: {
    textAlign: 'center',
    fontSize: '22px',
    color: '#722ED1',
    marginBottom: '16px',
    fontWeight: '800',
  },
  selectedDisplay: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '12px',
    padding: '14px',
    background: '#fff',
    borderRadius: '16px',
    marginBottom: '16px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
  },
  selectedEmoji: {
    fontSize: '28px',
  },
  selectedNumber: {
    fontSize: '42px',
    fontWeight: '900',
  },
  selectedLabel: {
    fontSize: '15px',
    color: '#888',
    fontWeight: '600',
  },
  scrollContainer: {
    overflowX: 'auto',
    padding: '10px 0 20px',
    WebkitOverflowScrolling: 'touch',
  },
  lineContainer: {
    position: 'relative',
    display: 'inline-flex',
    alignItems: 'flex-end',
    minWidth: '100%',
    paddingBottom: '10px',
  },
  mainLine: {
    position: 'absolute',
    bottom: '40px',
    left: '0',
    right: '0',
    height: '4px',
    background: 'linear-gradient(to right, #FF6B6B, #FF8E53, #FFC53D, #52C41A, #13C2C2, #1890FF, #722ED1, #EB2F96, #FA541C, #A0D911, #FF6B6B)',
    borderRadius: '2px',
  },
  arrow: {
    position: 'absolute',
    bottom: '34px',
    right: '-5px',
    fontSize: '16px',
    color: '#A0D911',
  },
  numbersRow: {
    display: 'flex',
    alignItems: 'flex-end',
    gap: '0px',
    paddingLeft: '8px',
    paddingRight: '24px',
  },
  tickGroup: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    cursor: 'pointer',
    padding: '4px 0',
    transition: 'transform 0.2s',
    flexShrink: 0,
  },
  tick: {
    borderRadius: '2px',
    transition: 'all 0.2s',
  },
  label: {
    marginTop: '4px',
    transition: 'all 0.2s',
    userSelect: 'none',
  },
  selectedDot: {
    fontSize: '12px',
    marginTop: '2px',
    animation: 'nl100-bounce 0.5s ease',
  },
  legend: {
    textAlign: 'center',
    marginTop: '8px',
    fontSize: '14px',
    color: '#999',
  },
  legendItem: {
    fontWeight: '600',
  },
  quickJump: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '8px',
    justifyContent: 'center',
    marginTop: '16px',
  },
  jumpBtn: {
    width: '44px',
    height: '44px',
    borderRadius: '12px',
    fontSize: '15px',
    fontWeight: '800',
    cursor: 'pointer',
    transition: 'all 0.2s',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
};
