import { useState } from 'react';

export default function InteractiveClock() {
  const [hour, setHour] = useState(9);
  const [minute, setMinute] = useState(0);

  const formatVnTime = (h, m) => {
    if (m === 0) return `${h} giờ đúng`;
    if (m === 30) return `${h} giờ rưỡi (hoặc ${h} giờ 30 phút)`;
    return `${h} giờ ${m} phút`;
  };

  // Calculate rotation angles
  const minuteAngle = minute * 6; // 360 / 60 = 6 deg per min
  const hourAngle = (hour % 12) * 30 + minute * 0.5; // 30 deg per hour + offset

  return (
    <div style={styles.wrapper} data-testid="interactiveclock-visualizer">
      <h3 style={styles.title}>🕒 Đồng hồ tương tác</h3>

      <div style={styles.timeLabel} data-testid="clock-time-text">
        {formatVnTime(hour, minute)}
      </div>

      {/* SVG Clock */}
      <div style={styles.clockFrame}>
        <svg width="200" height="200" viewBox="0 0 200 200">
          <circle cx="100" cy="100" r="95" stroke="#333" strokeWidth="6" fill="#fff" />
          
          {/* Clock numbers */}
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map(n => {
            const angle = (n * 30 * Math.PI) / 180;
            const x = 100 + 75 * Math.sin(angle);
            const y = 100 - 75 * Math.cos(angle);
            return (
              <text key={n} x={x} y={y} textAnchor="middle" dominantBaseline="middle" style={styles.clockNumber}>
                {n}
              </text>
            );
          })}

          {/* Hour hand */}
          <line
            x1="100"
            y1="100"
            x2="100"
            y2="50"
            stroke="#333"
            strokeWidth="6"
            strokeLinecap="round"
            transform={`rotate(${hourAngle} 100 100)`}
            data-testid="hour-hand"
          />

          {/* Minute hand */}
          <line
            x1="100"
            y1="100"
            x2="100"
            y2="30"
            stroke="#fa8c16"
            strokeWidth="4"
            strokeLinecap="round"
            transform={`rotate(${minuteAngle} 100 100)`}
            data-testid="minute-hand"
          />

          {/* Center dot */}
          <circle cx="100" cy="100" r="6" fill="#333" />
        </svg>
      </div>

      {/* Sliders */}
      <div style={styles.sliders}>
        <div style={styles.sliderRow}>
          <label htmlFor="hour-slider">Giờ: {hour}</label>
          <input
            id="hour-slider"
            type="range"
            min="1"
            max="12"
            value={hour}
            onChange={(e) => setHour(Number(e.target.value))}
            style={styles.range}
            data-testid="hour-slider"
          />
        </div>
        <div style={styles.sliderRow}>
          <label htmlFor="minute-slider">Phút: {minute}</label>
          <input
            id="minute-slider"
            type="range"
            min="0"
            max="59"
            step="5"
            value={minute}
            onChange={(e) => setMinute(Number(e.target.value))}
            style={styles.range}
            data-testid="minute-slider"
          />
        </div>
      </div>
    </div>
  );
}

const styles = {
  wrapper: { padding: '20px', backgroundColor: '#fff', borderRadius: '12px', border: '2px solid #ddd', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' },
  title: { margin: '0 0 10px', color: '#1890FF' },
  timeLabel: { fontSize: '20px', fontWeight: 'bold', margin: '10px 0', color: '#fa8c16' },
  clockFrame: { width: '200px', height: '200px', margin: '20px 0' },
  clockNumber: { fontSize: '14px', fontWeight: 'bold', fill: '#555' },
  sliders: { width: '80%', marginTop: '20px' },
  sliderRow: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', margin: '10px 0' },
  range: { flexGrow: 1, marginLeft: '15px' }
};
