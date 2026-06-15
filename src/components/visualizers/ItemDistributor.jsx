import { useState } from 'react';

export default function ItemDistributor({ config = {} }) {
  const totalItems = config.totalItems ?? 12;
  const groupsCount = config.groupsCount ?? 3;

  const [distributed, setDistributed] = useState(0);

  const handleDistribute = () => {
    if (distributed < totalItems) {
      setDistributed(distributed + groupsCount);
    }
  };

  const reset = () => {
    setDistributed(0);
  };

  // Calculate items in each group
  const itemsPerGroup = distributed / groupsCount;
  const remaining = totalItems - distributed;

  return (
    <div style={styles.wrapper} data-testid="distributor-visualizer">
      <h3 style={styles.title}>🍎 Chia phần đều nhau</h3>

      <div style={styles.intro}>
        Tổng cộng có {totalItems} quả táo. Hãy chia đều cho {groupsCount} bạn!
      </div>

      <div style={styles.poolSection}>
        <h5>Táo chưa chia:</h5>
        <div style={styles.applesPool} data-testid="apples-pool">
          {Array.from({ length: remaining }).map((_, i) => (
            <span key={i} style={styles.apple}>🍎</span>
          ))}
        </div>
      </div>

      <div style={styles.controls}>
        <button style={styles.btn} onClick={handleDistribute} disabled={distributed >= totalItems} data-testid="btn-distribute">
          Chia đều một lượt 🚀
        </button>
        <button style={{ ...styles.btn, backgroundColor: '#f5222d' }} onClick={reset} data-testid="btn-reset">
          Xếp lại từ đầu 🔄
        </button>
      </div>

      {/* Groups */}
      <div style={styles.groupsRow} data-testid="groups-row">
        {Array.from({ length: groupsCount }).map((_, gIdx) => (
          <div key={gIdx} style={styles.groupPlate} data-testid={`plate-${gIdx}`}>
            <h5>Bạn {gIdx + 1}</h5>
            <div style={styles.plateApples}>
              {Array.from({ length: itemsPerGroup }).map((_, i) => (
                <span key={i} style={styles.apple}>🍎</span>
              ))}
            </div>
            <div style={styles.plateCount}>{itemsPerGroup} quả</div>
          </div>
        ))}
      </div>

      {distributed === totalItems && (
        <div style={styles.mathEquation} data-testid="division-equation">
          Phép chia tương ứng: {totalItems} : {groupsCount} = {totalItems / groupsCount}
        </div>
      )}
    </div>
  );
}

const styles = {
  wrapper: { padding: '20px', backgroundColor: '#fff', borderRadius: '12px', border: '2px solid #ddd', textAlign: 'center' },
  title: { margin: '0 0 10px', color: '#52C41A' },
  intro: { fontWeight: 'bold', fontSize: '15px', marginBottom: '15px' },
  poolSection: { marginBottom: '20px' },
  applesPool: { minHeight: '40px', display: 'flex', justifyContent: 'center', gap: '4px', flexWrap: 'wrap', border: '1px solid #e8e8e8', borderRadius: '8px', padding: '10px', backgroundColor: '#fafafa' },
  apple: { fontSize: '24px' },
  controls: { display: 'flex', justifyContent: 'center', gap: '10px', marginBottom: '20px' },
  btn: { padding: '6px 12px', backgroundColor: '#52C41A', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer' },
  groupsRow: { display: 'flex', justifyContent: 'center', gap: '20px', flexWrap: 'wrap' },
  groupPlate: { width: '100px', border: '2px solid #333', borderRadius: '50% 50% 10px 10px', padding: '10px', backgroundColor: '#fcfcfc', display: 'flex', flexDirection: 'column', alignItems: 'center' },
  plateApples: { minHeight: '36px', display: 'flex', gap: '2px', flexWrap: 'wrap', justifyContent: 'center' },
  plateCount: { fontWeight: 'bold', fontSize: '14px', marginTop: '6px' },
  mathEquation: { fontSize: '22px', fontWeight: 'bold', color: '#52C41A', marginTop: '20px' }
};
