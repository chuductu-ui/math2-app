import { useState } from 'react';

export default function LitreCup() {
  const [cup1L, setCup1L] = useState(0);
  const [cup2L, setCup2L] = useState(0);
  const [cup5L, setCup5L] = useState(0);
  const [tank, setTank] = useState(0);

  const pourIntoTank = (volume, setCup) => {
    setTank(tank + volume);
    setCup(0);
  };

  const reset = () => {
    setCup1L(0);
    setCup2L(0);
    setCup5L(0);
    setTank(0);
  };

  return (
    <div style={styles.wrapper} data-testid="litrecup-visualizer">
      <h3 style={styles.title}>🥤 Ca đong nước (Lít)</h3>

      <div style={styles.help}>Bé hãy đổ nước đầy ca rồi rót vào bể lớn nhé!</div>

      <div style={styles.cupsRow}>
        {/* 1L Cup */}
        <div style={styles.cupContainer}>
          <div style={styles.cupLabel}>Ca 1 Lít</div>
          <div style={styles.cup1L}>
            <div style={{ ...styles.water, height: `${cup1L * 100}%` }} />
          </div>
          <div style={styles.cupButtons}>
            <button style={styles.btn} onClick={() => setCup1L(1)} data-testid="fill-1l">Múc đầy</button>
            <button style={styles.btn} onClick={() => pourIntoTank(cup1L, setCup1L)} data-testid="pour-1l">Rót vào bể</button>
          </div>
        </div>

        {/* 2L Cup */}
        <div style={styles.cupContainer}>
          <div style={styles.cupLabel}>Ca 2 Lít</div>
          <div style={styles.cup2L}>
            <div style={{ ...styles.water, height: `${(cup2L / 2) * 100}%` }} />
          </div>
          <div style={styles.cupButtons}>
            <button style={styles.btn} onClick={() => setCup2L(2)}>Múc đầy</button>
            <button style={styles.btn} onClick={() => pourIntoTank(cup2L, setCup2L)}>Rót vào bể</button>
          </div>
        </div>

        {/* 5L Cup */}
        <div style={styles.cupContainer}>
          <div style={styles.cupLabel}>Ca 5 Lít</div>
          <div style={styles.cup5L}>
            <div style={{ ...styles.water, height: `${(cup5L / 5) * 100}%` }} />
          </div>
          <div style={styles.cupButtons}>
            <button style={styles.btn} onClick={() => setCup5L(5)}>Múc đầy</button>
            <button style={styles.btn} onClick={() => pourIntoTank(cup5L, setCup5L)}>Rót vào bể</button>
          </div>
        </div>
      </div>

      {/* Large tank */}
      <div style={styles.tankSection}>
        <h4>Bể chứa lớn</h4>
        <div style={styles.tankFrame}>
          <div style={{ ...styles.tankWater, height: `${Math.min(100, (tank / 10) * 100)}%` }} />
          <div style={styles.tankLabel} data-testid="tank-label">{tank} Lít (l)</div>
        </div>
        <button style={{ ...styles.btn, backgroundColor: '#f5222d', marginTop: '10px' }} onClick={reset} data-testid="btn-reset">Làm lại 🔄</button>
      </div>
    </div>
  );
}

const styles = {
  wrapper: { padding: '20px', backgroundColor: '#fff', borderRadius: '12px', border: '2px solid #ddd', textAlign: 'center' },
  title: { margin: '0 0 10px', color: '#13C2C2' },
  help: { color: '#8c8c8c', marginBottom: '20px' },
  cupsRow: { display: 'flex', justifyContent: 'center', gap: '30px', flexWrap: 'wrap', marginBottom: '30px' },
  cupContainer: { display: 'flex', flexDirection: 'column', alignItems: 'center' },
  cupLabel: { fontWeight: 'bold', fontSize: '14px', marginBottom: '8px' },
  cup1L: { width: '40px', height: '60px', border: '2px solid #333', borderTop: 'none', borderRadius: '0 0 5px 5px', position: 'relative', overflow: 'hidden', backgroundColor: '#fafafa' },
  cup2L: { width: '50px', height: '70px', border: '2px solid #333', borderTop: 'none', borderRadius: '0 0 8px 8px', position: 'relative', overflow: 'hidden', backgroundColor: '#fafafa' },
  cup5L: { width: '70px', height: '90px', border: '2px solid #333', borderTop: 'none', borderRadius: '0 0 12px 12px', position: 'relative', overflow: 'hidden', backgroundColor: '#fafafa' },
  water: { position: 'absolute', bottom: 0, left: 0, right: 0, backgroundColor: '#1890FF', transition: 'height 0.4s ease' },
  cupButtons: { display: 'flex', flexDirection: 'column', gap: '4px', marginTop: '10px' },
  btn: { padding: '4px 8px', backgroundColor: '#13C2C2', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '12px' },
  tankSection: { display: 'flex', flexDirection: 'column', alignItems: 'center' },
  tankFrame: { width: '120px', height: '120px', border: '3px solid #333', borderTop: 'none', position: 'relative', overflow: 'hidden', backgroundColor: '#fafafa', borderRadius: '0 0 10px 10px' },
  tankWater: { position: 'absolute', bottom: 0, left: 0, right: 0, backgroundColor: '#1890FF', transition: 'height 0.5s ease' },
  tankLabel: { position: 'absolute', width: '100%', top: '45%', textAlign: 'center', fontWeight: 'bold', fontSize: '18px', color: '#000', textShadow: '1px 1px 2px #fff' }
};
