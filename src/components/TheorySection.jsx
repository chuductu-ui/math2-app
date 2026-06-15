import { useState, useEffect, lazy, Suspense } from 'react';

// Lazy-load visualizers to keep initial bundle small
const visualizerMap = {
  BaseTenBlocks: lazy(() => import('./visualizers/BaseTenBlocks')),
  NumberLine: lazy(() => import('./visualizers/NumberLine')),
  InteractiveEquation: lazy(() => import('./visualizers/InteractiveEquation')),
  TenFrames: lazy(() => import('./visualizers/TenFrames')),
  BalanceScale: lazy(() => import('./visualizers/BalanceScale')),
  LitreCup: lazy(() => import('./visualizers/LitreCup')),
  ShapeExplorer: lazy(() => import('./visualizers/ShapeExplorer')),
  ShapeClassifier: lazy(() => import('./visualizers/ShapeClassifier')),
  InteractiveClock: lazy(() => import('./visualizers/InteractiveClock')),
  ItemDistributor: lazy(() => import('./visualizers/ItemDistributor')),
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
      setTimeout(() => {
        setHeartsRecovered(true);
      }, 0);
    }
  }, [hearts, maxHearts, recoverHearts]);

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
