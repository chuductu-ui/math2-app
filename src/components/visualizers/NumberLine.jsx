import { useState, useRef, useEffect } from 'react';

const COLORS = ['#FF6B6B', '#FF8E53', '#FFC53D', '#52C41A', '#13C2C2', '#1890FF', '#722ED1'];

function getColor(n) {
  return COLORS[n % COLORS.length];
}

export default function NumberLine({ config = {} }) {
  const [selected, setSelected] = useState(config.defaultValue ?? 10);
  const scrollRef = useRef(null);
  const selectedRef = useRef(null);

  useEffect(() => {
    if (selectedRef.current && typeof selectedRef.current.scrollIntoView === 'function') {
      selectedRef.current.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
    }
  }, [selected]);

  const numbers = Array.from({ length: 101 }, (_, i) => i);

  return (
    <div style={styles.wrapper} data-testid="numberline-visualizer">
      <h3 style={styles.title}>🎯 Tia số thông minh (0 - 100)</h3>

      {selected !== null && (
        <div style={styles.selectedDisplay}>
          <span data-testid="selected-number" style={{ ...styles.number, color: getColor(selected) }}>
            {selected}
          </span>
          <div style={styles.neighborPanel}>
            <button
              style={styles.neighborBtn}
              onClick={() => setSelected(Math.max(0, selected - 1))}
              data-testid="btn-prev"
            >
              ◀ Số liền trước: {selected > 0 ? selected - 1 : 'Không có'}
            </button>
            <button
              style={styles.neighborBtn}
              onClick={() => setSelected(Math.min(100, selected + 1))}
              data-testid="btn-next"
            >
              Số liền sau: {selected < 100 ? selected + 1 : 'Không có'} ▶
            </button>
          </div>
        </div>
      )}

      <div style={styles.scrollContainer} ref={scrollRef}>
        <div style={styles.lineContainer}>
          <div style={styles.mainLine} />
          <div style={styles.arrow}>▶</div>

          <div style={styles.ticksRow}>
            {numbers.map((n) => {
              const isMajor = n % 10 === 0;
              const isSelected = selected === n;

              return (
                <div
                  key={n}
                  ref={isSelected ? selectedRef : null}
                  style={{
                    ...styles.tickGroup,
                    width: isMajor ? '40px' : '20px',
                  }}
                  onClick={() => setSelected(n)}
                  data-testid={`tick-${n}`}
                >
                  <div
                    style={{
                      ...styles.tickLine,
                      height: isMajor ? '20px' : '10px',
                      backgroundColor: isSelected ? '#FF6B6B' : '#8c8c8c',
                      width: isSelected ? '4px' : '2px',
                    }}
                  />
                  {(isMajor || isSelected) && (
                    <span
                      style={{
                        ...styles.label,
                        fontWeight: isSelected ? '800' : '400',
                        color: isSelected ? '#FF6B6B' : '#000',
                      }}
                    >
                      {n}
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

const styles = {
  wrapper: { padding: '20px', backgroundColor: '#fff', borderRadius: '12px', border: '2px solid #ddd' },
  title: { textAlign: 'center', margin: '0 0 15px', color: '#1890FF' },
  selectedDisplay: { display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '15px' },
  number: { fontSize: '48px', fontWeight: 'bold' },
  neighborPanel: { display: 'flex', gap: '10px', marginTop: '10px' },
  neighborBtn: { padding: '8px 12px', border: '1px solid #ccc', borderRadius: '6px', cursor: 'pointer', backgroundColor: '#f5f5f5' },
  scrollContainer: { overflowX: 'auto', padding: '10px 0' },
  lineContainer: { position: 'relative', display: 'inline-flex', alignItems: 'flex-end', paddingBottom: '20px' },
  mainLine: { position: 'absolute', bottom: '30px', left: 0, right: 0, height: '4px', backgroundColor: '#1890FF' },
  arrow: { position: 'absolute', bottom: '24px', right: '-10px', color: '#1890FF', fontSize: '14px' },
  ticksRow: { display: 'flex', alignItems: 'flex-end', paddingLeft: '10px', paddingRight: '20px' },
  tickGroup: { display: 'flex', flexDirection: 'column', alignItems: 'center', cursor: 'pointer', flexShrink: 0 },
  tickLine: { transition: 'all 0.2s' },
  label: { fontSize: '12px', marginTop: '4px' },
};
