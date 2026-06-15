import { describe, test, expect, beforeEach, afterEach, vi } from 'vitest';
import { render, screen, fireEvent, act } from '@testing-library/react';
import TenFrames from '../src/components/visualizers/TenFrames';

describe('TenFrames visualizer', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  test('renders inputs and handles mode toggling', () => {
    render(<TenFrames config={{ defaultA: 9, defaultB: 5, mode: 'add' }} />);
    expect(screen.getByTestId('tenframe-visualizer')).toBeInTheDocument();
    
    // Switch to subtract
    const subBtn = screen.getByTestId('btn-mode-subtract');
    fireEvent.click(subBtn);
    
    // Verify operator changes to '-'
    expect(screen.getByText('-')).toBeInTheDocument();
  });

  test('shows error message for invalid inputs', () => {
    render(<TenFrames config={{ defaultA: 5, defaultB: 8, mode: 'subtract' }} />);
    // Initial render with subtract mode should show error since A < B
    expect(screen.getByTestId('error-msg')).toHaveTextContent('Số bị trừ phải lớn hơn hoặc bằng số trừ');
    expect(screen.getByTestId('btn-animate')).toBeDisabled();
  });

  test('animates addition step-by-step', () => {
    render(<TenFrames config={{ defaultA: 9, defaultB: 4, mode: 'add' }} />);
    const btn = screen.getByTestId('btn-animate');
    fireEvent.click(btn);

    // Initial state after click: step 1 (600ms timeout)
    expect(screen.queryByTestId('result-box')).not.toBeInTheDocument();

    // Advance 600ms to enter step 2 (bridging)
    act(() => {
      vi.advanceTimersByTime(600);
    });
    
    // dotsToMove = 1. The interval runs at 400ms.
    act(() => {
      vi.advanceTimersByTime(400); // 1 dot moved, interval clears
    });
    
    // There is an 800ms timeout to enter step 3 (result)
    act(() => {
      vi.advanceTimersByTime(800);
    });
    
    // Result box should now be visible
    expect(screen.getByTestId('result-box')).toBeInTheDocument();
    expect(screen.getByTestId('result-box')).toHaveTextContent('Kết quả: 9 + 4 = 13');
  });

  test('animates subtraction step-by-step with double ten-frames', () => {
    render(<TenFrames config={{ defaultA: 12, defaultB: 5, mode: 'subtract' }} />);
    const btn = screen.getByTestId('btn-animate');
    fireEvent.click(btn);

    // Advance 600ms to enter step 2 (subtraction from A2: 2 dots)
    act(() => {
      vi.advanceTimersByTime(600);
    });
    
    // dotsToRemoveFromA2 = 2. Interval is 400ms per dot.
    act(() => {
      vi.advanceTimersByTime(400); // removed 1 dot
    });
    act(() => {
      vi.advanceTimersByTime(400); // removed 2 dots, interval clears, schedules 600ms timeout for next stage
    });

    // Advance 600ms to enter step 3 (subtraction from A1: 3 dots)
    act(() => {
      vi.advanceTimersByTime(600);
    });

    // dotsToRemoveFromA1 = 3. Interval is 400ms per dot.
    act(() => {
      vi.advanceTimersByTime(400); // removed 1 dot
    });
    act(() => {
      vi.advanceTimersByTime(400); // removed 2 dots
    });
    act(() => {
      vi.advanceTimersByTime(400); // removed 3 dots, interval clears, schedules 800ms timeout for result
    });

    // Advance 800ms to enter step 4 (result)
    act(() => {
      vi.advanceTimersByTime(800);
    });

    // Result box visible
    expect(screen.getByTestId('result-box')).toBeInTheDocument();
    expect(screen.getByTestId('result-box')).toHaveTextContent('Kết quả: 12 - 5 = 7');
  });
});
