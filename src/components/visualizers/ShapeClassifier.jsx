import { useState } from 'react';

const SHAPES = [
  { id: 1, name: '⚽ Quả bóng', type: 'sphere' },
  { id: 2, name: '🥤 Lon nước', type: 'cylinder' },
  { id: 3, name: '🔋 Viên pin', type: 'cylinder' },
  { id: 4, name: '🔮 Viên bi', type: 'sphere' },
  { id: 5, name: '🥫 Hộp sữa', type: 'cylinder' },
  { id: 6, name: '🍊 Quả cam', type: 'sphere' }
];

export default function ShapeClassifier() {
  const [items, setItems] = useState(SHAPES);
  const [sphereBox, setSphereBox] = useState([]);
  const [cylinderBox, setCylinderBox] = useState([]);
  const [feedback, setFeedback] = useState(null);

  const classify = (item, targetType) => {
    if (item.type === targetType) {
      setFeedback({
        text: `🎉 Đúng rồi! ${item.name} là khối ${targetType === 'sphere' ? 'cầu' : 'trụ'}.`,
        isCorrect: true
      });
      setItems(items.filter(i => i.id !== item.id));
      if (targetType === 'sphere') {
        setSphereBox([...sphereBox, item]);
      } else {
        setCylinderBox([...cylinderBox, item]);
      }
    } else {
      setFeedback({
        text: `😢 Sai rồi! Hãy suy nghĩ kỹ xem ${item.name} có hình gì nhé.`,
        isCorrect: false
      });
    }
  };

  const reset = () => {
    setItems(SHAPES);
    setSphereBox([]);
    setCylinderBox([]);
    setFeedback(null);
  };

  return (
    <div style={styles.wrapper} data-testid="shapeclassifier-visualizer">
      <h3 style={styles.title}>📦 Phân loại khối hình</h3>
      <p style={styles.help}>Bé hãy bấm vào các nút bên dưới mỗi vật để xếp vào hộp cho đúng nhé!</p>

      {feedback && (
        <div
          style={{
            ...styles.feedback,
            backgroundColor: feedback.isCorrect ? '#F6FFED' : '#FFF0F6',
            borderColor: feedback.isCorrect ? '#B7EB8F' : '#FFADD2',
            color: feedback.isCorrect ? '#389E0D' : '#CF1322',
          }}
          data-testid="classifier-feedback"
        >
          {feedback.text}
        </div>
      )}

      {/* Unclassified Items */}
      <div style={styles.itemsPool}>
        {items.map(item => (
          <div key={item.id} style={styles.itemCard} data-testid={`item-${item.id}`}>
            <div>{item.name}</div>
            <div style={styles.actionRow}>
              <button style={styles.classifyBtn} onClick={() => classify(item, 'cylinder')}>Khối Trụ</button>
              <button style={styles.classifyBtn} onClick={() => classify(item, 'sphere')}>Khối Cầu</button>
            </div>
          </div>
        ))}
      </div>

      {/* Categories Boxes */}
      <div style={styles.boxesRow}>
        {/* Cylinder Box */}
        <div style={styles.box} data-testid="box-cylinder">
          <h4 style={styles.boxTitle}>🥫 Hộp Khối Trụ</h4>
          <div style={styles.boxContent}>
            {cylinderBox.map(item => (
              <span key={item.id} style={styles.itemBadge}>{item.name}</span>
            ))}
          </div>
        </div>

        {/* Sphere Box */}
        <div style={styles.box} data-testid="box-sphere">
          <h4 style={styles.boxTitle}>⚽ Hộp Khối Cầu</h4>
          <div style={styles.boxContent}>
            {sphereBox.map(item => (
              <span key={item.id} style={styles.itemBadge}>{item.name}</span>
            ))}
          </div>
        </div>
      </div>

      {items.length === 0 && (
        <div style={styles.congrats}>
          🎉 Tuyệt vời! Bé đã phân loại chính xác tất cả các đồ vật!
          <br />
          <button style={styles.resetBtn} onClick={reset}>Luyện tập lại 🔄</button>
        </div>
      )}
    </div>
  );
}

const styles = {
  wrapper: { padding: '20px', backgroundColor: '#fff', borderRadius: '12px', border: '2px solid #ddd', textAlign: 'center' },
  title: { margin: '0 0 10px', color: '#722ED1' },
  help: { color: '#8c8c8c', marginBottom: '15px' },
  feedback: { padding: '10px', border: '1px solid', borderRadius: '6px', marginBottom: '15px', display: 'inline-block' },
  itemsPool: { display: 'flex', flexWrap: 'wrap', gap: '15px', justifyContent: 'center', margin: '20px 0' },
  itemCard: { border: '1px solid #ccc', padding: '10px', borderRadius: '8px', backgroundColor: '#fafafa', display: 'flex', flexDirection: 'column', alignItems: 'center' },
  actionRow: { display: 'flex', gap: '6px', marginTop: '8px' },
  classifyBtn: { padding: '4px 8px', fontSize: '11px', cursor: 'pointer', border: '1px solid #ccc', borderRadius: '4px' },
  boxesRow: { display: 'flex', justifyContent: 'center', gap: '30px', flexWrap: 'wrap' },
  box: { width: '150px', border: '2px dashed #722ED1', borderRadius: '8px', minHeight: '120px', padding: '10px', display: 'flex', flexDirection: 'column' },
  boxTitle: { margin: '0 0 8px', color: '#722ED1' },
  boxContent: { display: 'flex', flexDirection: 'column', gap: '4px', alignItems: 'center' },
  itemBadge: { backgroundColor: '#f5f5f5', border: '1px solid #d9d9d9', borderRadius: '4px', padding: '2px 6px', fontSize: '12px' },
  congrats: { color: '#52C41A', fontWeight: 'bold', fontSize: '18px', marginTop: '20px' },
  resetBtn: { padding: '6px 12px', fontSize: '14px', marginTop: '10px', cursor: 'pointer' }
};
