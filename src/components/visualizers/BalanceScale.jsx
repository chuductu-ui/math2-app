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
      <style>{`
        .balance-btn {
          padding: 8px 16px;
          background: linear-gradient(135deg, #1890ff 0%, #096dd9 100%);
          color: #fff;
          border: none;
          border-radius: 8px;
          font-weight: bold;
          cursor: pointer;
          transition: all 0.2s ease;
          box-shadow: 0 2px 4px rgba(24,144,255,0.2);
        }
        .balance-btn:hover {
          transform: translateY(-1px);
          box-shadow: 0 4px 8px rgba(24,144,255,0.4);
          filter: brightness(1.05);
        }
        .balance-btn:active {
          transform: translateY(1px);
        }
        .clear-btn {
          background: linear-gradient(135deg, #ff4d4f 0%, #cf1322 100%) !important;
          box-shadow: 0 2px 4px rgba(255,77,79,0.2) !important;
        }
        .clear-btn:hover {
          box-shadow: 0 4px 8px rgba(255,77,79,0.4) !important;
        }
      `}</style>

      <h3 style={styles.title}>⚖️ Cân Đĩa Thăng Bằng</h3>

      <div style={styles.selectionRow}>
        <label style={{ fontWeight: '600' }}>Chọn vật muốn cân: </label>
        <select
          value={selectedObject.name}
          onChange={(e) => {
            const found = OBJECTS.find(o => o.name === e.target.value);
            if (found) {
              setSelectedObject(found);
              clearWeights();
            }
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
        <button className="balance-btn" onClick={() => addWeight(1)} data-testid="btn-add-1">Thêm +1kg</button>
        <button className="balance-btn" onClick={() => addWeight(2)} data-testid="btn-add-2">Thêm +2kg</button>
        <button className="balance-btn" onClick={() => addWeight(5)} data-testid="btn-add-5">Thêm +5kg</button>
        <button className="balance-btn clear-btn" onClick={clearWeights} data-testid="btn-clear">Bỏ hết cân 🔄</button>
      </div>

      {/* Visual scale */}
      <div style={styles.scaleContainer}>
        {/* Scale stand/pillar */}
        <div style={styles.scaleBase}>
          <div style={styles.pillar}></div>
          <div style={styles.pillarBase}></div>
        </div>

        {/* Balance beam */}
        <div style={{
          ...styles.balanceBeam,
          transform: tilt === 'left' ? 'rotate(-8deg)' : tilt === 'right' ? 'rotate(8deg)' : 'rotate(0deg)'
        }} data-testid="balance-beam">
          {/* Pivot center */}
          <div style={styles.pivot}></div>

          {/* Left tray */}
          <div style={{
            ...styles.tray,
            left: '-45px',
            top: '5px',
            transform: tilt === 'left' ? 'rotate(8deg)' : tilt === 'right' ? 'rotate(-8deg)' : 'rotate(0deg)'
          }}>
            <svg width="90" height="60" style={{ display: 'block' }}>
              <line x1="45" y1="0" x2="10" y2="55" stroke="#722ed1" strokeWidth="2" />
              <line x1="45" y1="0" x2="80" y2="55" stroke="#722ed1" strokeWidth="2" />
              <line x1="45" y1="0" x2="45" y2="55" stroke="#bfbfbf" strokeWidth="1" strokeDasharray="2,2" />
            </svg>
            <div style={styles.trayPlate}>
              {selectedObject && <div style={styles.objectEmoji}>{selectedObject.name.split(' ')[0]}</div>}
            </div>
            <div style={styles.trayWeightLabel}>{leftWeight} kg</div>
          </div>

          {/* Right tray */}
          <div style={{
            ...styles.tray,
            right: '-45px',
            top: '5px',
            transform: tilt === 'left' ? 'rotate(8deg)' : tilt === 'right' ? 'rotate(-8deg)' : 'rotate(0deg)'
          }}>
            <svg width="90" height="60" style={{ display: 'block' }}>
              <line x1="45" y1="0" x2="10" y2="55" stroke="#13c2c2" strokeWidth="2" />
              <line x1="45" y1="0" x2="80" y2="55" stroke="#13c2c2" strokeWidth="2" />
              <line x1="45" y1="0" x2="45" y2="55" stroke="#bfbfbf" strokeWidth="1" strokeDasharray="2,2" />
            </svg>
            <div style={styles.trayPlate}>
              <div style={styles.weightsContainer}>
                {weights.map((w, idx) => (
                  <span key={`placed-weight-${w}-${idx}`} style={styles.weightBadge} data-testid={`placed-weight-${w}`}>{w}kg</span>
                ))}
              </div>
            </div>
            <div style={styles.trayWeightLabel}>{rightWeight} kg</div>
          </div>
        </div>
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
  wrapper: {
    padding: '20px',
    backgroundColor: '#fff',
    borderRadius: '16px',
    border: '1px solid #e8e8e8',
    textAlign: 'center',
    boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
  },
  title: {
    margin: '0 0 20px',
    color: '#1890FF',
    fontSize: '20px',
    fontWeight: 'bold',
  },
  selectionRow: {
    marginBottom: '20px',
    fontSize: '16px',
    color: '#555',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '10px'
  },
  select: {
    padding: '8px 12px',
    fontSize: '15px',
    borderRadius: '8px',
    border: '2px solid #1890ff',
    backgroundColor: '#fff',
    color: '#333',
    fontWeight: '600',
    outline: 'none',
    cursor: 'pointer',
    boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
  },
  controlButtons: {
    display: 'flex',
    justifyContent: 'center',
    gap: '10px',
    marginBottom: '25px',
    flexWrap: 'wrap'
  },
  scaleContainer: {
    position: 'relative',
    height: '240px',
    margin: '30px auto',
    width: '100%',
    maxWidth: '500px',
    borderBottom: '6px solid #434343',
    backgroundColor: '#f5f5f5',
    borderRadius: '8px',
    boxShadow: 'inset 0 2px 8px rgba(0,0,0,0.05)',
  },
  scaleBase: {
    position: 'absolute',
    bottom: 0,
    left: '50%',
    transform: 'translateX(-50%)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    zIndex: 1,
  },
  pillar: {
    width: '20px',
    height: '200px',
    background: 'linear-gradient(90deg, #d9d9d9 0%, #8c8c8c 50%, #595959 100%)',
    borderRadius: '6px 6px 0 0',
  },
  pillarBase: {
    width: '120px',
    height: '20px',
    background: 'linear-gradient(180deg, #8c8c8c 0%, #595959 100%)',
    borderRadius: '6px 6px 0 0',
    boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
  },
  balanceBeam: {
    position: 'absolute',
    top: '40px',
    left: '80px',
    right: '80px',
    height: '10px',
    background: 'linear-gradient(180deg, #bfbfbf 0%, #8c8c8c 50%, #595959 100%)',
    borderRadius: '5px',
    transition: 'all 0.5s cubic-bezier(0.18, 0.89, 0.32, 1.28)',
    display: 'flex',
    justifyContent: 'space-between',
    boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
    zIndex: 2,
    transformOrigin: 'center center',
  },
  pivot: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '18px',
    height: '18px',
    backgroundColor: '#595959',
    border: '3px solid #d9d9d9',
    borderRadius: '50%',
    zIndex: 10,
  },
  tray: {
    position: 'absolute',
    width: '90px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    transition: 'all 0.5s ease',
    transformOrigin: '45px 0px', // center of the SVG wires
  },
  trayPlate: {
    width: '90px',
    height: '16px',
    background: 'linear-gradient(180deg, #ffe58f 0%, #d4b106 100%)',
    border: '1px solid #b79800',
    borderRadius: '0 0 16px 16px',
    boxShadow: '0 4px 8px rgba(0,0,0,0.15)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    minHeight: '20px',
  },
  objectEmoji: {
    fontSize: '32px',
    position: 'absolute',
    bottom: '12px',
    filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.15))',
    transition: 'transform 0.3s ease',
  },
  weightsContainer: {
    display: 'flex',
    gap: '2px',
    flexWrap: 'wrap',
    justifyContent: 'center',
    position: 'absolute',
    bottom: '12px',
    width: '100%',
    maxWidth: '80px',
  },
  trayWeightLabel: {
    fontWeight: 'bold',
    fontSize: '14px',
    marginTop: '6px',
    color: '#333'
  },
  weightBadge: {
    background: 'linear-gradient(135deg, #fa8c16 0%, #d46b08 100%)',
    color: '#fff',
    fontSize: '11px',
    fontWeight: 'bold',
    padding: '2px 5px',
    borderRadius: '4px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.15)',
    border: '1px solid #ad4e00',
  },
  status: {
    fontSize: '16px',
    marginTop: '15px',
    minHeight: '24px',
    color: '#555'
  }
};
