import { useState } from 'react';

const OBJECTS = [
  { name: '🎃 Bí ngô', weight: 5 },
  { name: '🧸 Gấu bông', weight: 2 },
  { name: '🍎 Quả táo', weight: 1 },
  { name: '📘 Quyển sách', weight: 1 }
];

export default function BalanceScale() {
  const [selectedObject, setSelectedObject] = useState(OBJECTS[0]);
  const [weights, setWeights] = useState([]); // List of kg values (1, 2, 5)

  const leftWeight = selectedObject ? selectedObject.weight : 0;
  const rightWeight = weights.reduce((sum, w) => sum + w, 0);

  const tilt = leftWeight > rightWeight 
    ? 'left' 
    : leftWeight < rightWeight 
      ? 'right' 
      : 'balanced';

  const addWeight = (w) => {
    setWeights([...weights, w]);
  };

  const clearWeights = () => {
    setWeights([]);
  };

  return (
    <div style={styles.wrapper} data-testid="balancescale-visualizer">
      <h3 style={styles.title}>⚖️ Cân Đĩa Thăng Bằng</h3>

      <div style={styles.selectionRow}>
        <label>Chọn vật muốn cân: </label>
        <select
          value={selectedObject.name}
          onChange={(e) => {
            setSelectedObject(OBJECTS.find(o => o.name === e.target.value));
            clearWeights();
          }}
          style={styles.select}
          data-testid="object-select"
        >
          {OBJECTS.map(o => (
            <option key={o.name} value={o.name}>{o.name} ({o.weight} kg)</option>
          ))}
        </select>
      </div>

      <div style={styles.controlButtons}>
        <button style={styles.btn} onClick={() => addWeight(1)} data-testid="btn-add-1">Thêm +1kg</button>
        <button style={styles.btn} onClick={() => addWeight(2)} data-testid="btn-add-2">Thêm +2kg</button>
        <button style={styles.btn} onClick={() => addWeight(5)}>Thêm +5kg</button>
        <button style={{ ...styles.btn, backgroundColor: '#f5222d' }} onClick={clearWeights} data-testid="btn-clear">Bỏ hết cân 🔄</button>
      </div>

      {/* Visual scale */}
      <div style={styles.scaleContainer}>
        <div style={{
          ...styles.balanceBeam,
          transform: tilt === 'left' ? 'rotate(-8deg)' : tilt === 'right' ? 'rotate(8deg)' : 'rotate(0deg)'
        }} data-testid="balance-beam">
          {/* Left tray */}
          <div style={{ ...styles.tray, left: '20px', top: tilt === 'left' ? '60px' : tilt === 'right' ? '20px' : '40px' }}>
            <div style={styles.trayPlate}>
              {selectedObject && <div style={{ fontSize: '28px' }}>{selectedObject.name.split(' ')[0]}</div>}
            </div>
            <div style={styles.trayWeightLabel}>{leftWeight} kg</div>
          </div>

          {/* Right tray */}
          <div style={{ ...styles.tray, right: '20px', top: tilt === 'left' ? '20px' : tilt === 'right' ? '60px' : '40px' }}>
            <div style={styles.trayPlate}>
              <div style={{ display: 'flex', gap: '2px', flexWrap: 'wrap', justifyContent: 'center' }}>
                {weights.map((w, idx) => (
                  <span key={idx} style={styles.weightBadge} data-testid={`placed-weight-${w}`}>{w}kg</span>
                ))}
              </div>
            </div>
            <div style={styles.trayWeightLabel}>{rightWeight} kg</div>
          </div>
        </div>
        <div style={styles.scaleBase}>▲</div>
      </div>

      <div style={styles.status} data-testid="scale-status">
        {tilt === 'balanced' ? (
          <span style={{ color: '#52C41A', fontWeight: 'bold' }}>🎉 Cân thăng bằng! {selectedObject.name} nặng đúng {leftWeight}kg!</span>
        ) : tilt === 'left' ? (
          <span>Cân đang nghiêng về bên trái (vật nặng hơn).</span>
        ) : (
          <span>Cân đang nghiêng về bên phải (quả cân nặng hơn).</span>
        )}
      </div>
    </div>
  );
}

const styles = {
  wrapper: { padding: '20px', backgroundColor: '#fff', borderRadius: '12px', border: '2px solid #ddd', textAlign: 'center' },
  title: { margin: '0 0 15px', color: '#1890FF' },
  selectionRow: { marginBottom: '15px' },
  select: { padding: '6px', fontSize: '14px', borderRadius: '4px' },
  controlButtons: { display: 'flex', justifyContent: 'center', gap: '8px', marginBottom: '20px' },
  btn: { padding: '6px 12px', backgroundColor: '#1890FF', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer' },
  scaleContainer: { position: 'relative', height: '180px', margin: '20px 0', borderBottom: '4px solid #333' },
  balanceBeam: { position: 'absolute', top: '50px', left: '10%', right: '10%', height: '8px', backgroundColor: '#8c8c8c', transition: 'all 0.5s ease', display: 'flex', justifyContent: 'space-between' },
  scaleBase: { position: 'absolute', bottom: 0, left: '48%', fontSize: '40px', color: '#555' },
  tray: { position: 'absolute', width: '90px', display: 'flex', flexDirection: 'column', alignItems: 'center', transition: 'all 0.5s ease' },
  trayPlate: { width: '80px', height: '40px', borderTop: '4px solid #555', borderLeft: '2px solid #8c8c8c', borderRight: '2px solid #8c8c8c', borderRadius: '0 0 10px 10px', backgroundColor: '#fafafa', display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '10px' },
  trayWeightLabel: { fontWeight: 'bold', fontSize: '14px', marginTop: '4px' },
  weightBadge: { backgroundColor: '#fa8c16', color: '#fff', fontSize: '10px', padding: '1px 3px', borderRadius: '3px' },
  status: { fontSize: '16px', marginTop: '10px' }
};
