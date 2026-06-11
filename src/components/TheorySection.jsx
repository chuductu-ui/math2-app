import React, { useState, useEffect, lazy, Suspense } from 'react';

// Lazy-load visualizers to keep initial bundle small
const visualizerMap = {
  NumberLine100: lazy(() => import('./visualizers/NumberLine100')),
  AddSubVisualizer: lazy(() => import('./visualizers/AddSubVisualizer')),
  TenFrameVisualizer: lazy(() => import('./visualizers/TenFrameVisualizer')),
  AdditionTableVisualizer: lazy(() => import('./visualizers/AdditionTableVisualizer')),
  ColumnAddition: lazy(() => import('./visualizers/ColumnAddition')),
  ShapeExplorer: lazy(() => import('./visualizers/ShapeExplorer')),
  RulerVisualizer: lazy(() => import('./visualizers/RulerVisualizer')),
};

export default function TheorySection({
  lesson,
  onBack,
  recoverHearts,
  hearts,
  maxHearts,
}) {
  const [heartsRecovered, setHeartsRecovered] = useState(false);

  // Recover hearts when viewing theory
  useEffect(() => {
    if (hearts < maxHearts) {
      recoverHearts();
      setHeartsRecovered(true);
    }
  }, []); // Run once on mount

  const theory = lesson.theory;
  const VisualizerComponent = theory?.visualizerType
    ? visualizerMap[theory.visualizerType]
    : null;

  return (
    <div className="theory-section">
      <button className="theory-back-btn" onClick={onBack}>
        ← Quay lại bản đồ
      </button>

      <div className="theory-card">
        <h2 className="theory-title">{lesson.title}</h2>

        {heartsRecovered && (
          <div className="theory-hearts-msg">
            💚 Đã hồi phục 2 trái tim! Đọc lý thuyết thật kỹ nhé!
          </div>
        )}

        <div className="theory-explanation">
          <p>{theory?.explanation}</p>
        </div>

        {/* Dynamic visualizer */}
        {VisualizerComponent && (
          <div className="theory-visualizer">
            <Suspense
              fallback={
                <div className="visualizer-loading">
                  🐸 Đang tải công cụ học tập...
                </div>
              }
            >
              <VisualizerComponent config={theory.visualizerConfig || {}} />
            </Suspense>
          </div>
        )}
      </div>
    </div>
  );
}
