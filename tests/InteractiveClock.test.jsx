import { describe, test, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import InteractiveClock from '../src/components/visualizers/InteractiveClock';

describe('InteractiveClock visualizer', () => {
  test('renders hands, sliders, and correctly formatted Vietnamese text', () => {
    render(<InteractiveClock />);
    expect(screen.getByTestId('interactiveclock-visualizer')).toBeInTheDocument();
    expect(screen.getByTestId('clock-time-text')).toHaveTextContent('9 giờ đúng');

    const hourSlider = screen.getByTestId('hour-slider');
    fireEvent.change(hourSlider, { target: { value: 10 } });
    const minuteSlider = screen.getByTestId('minute-slider');
    fireEvent.change(minuteSlider, { target: { value: 30 } });

    expect(screen.getByTestId('clock-time-text')).toHaveTextContent('10 giờ rưỡi');
  });
});
