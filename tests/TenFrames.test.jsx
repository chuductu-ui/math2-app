import { describe, test, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import TenFrames from '../src/components/visualizers/TenFrames';

describe('TenFrames visualizer', () => {
  test('renders frames correctly', () => {
    render(<TenFrames config={{ defaultA: 8, defaultB: 4, mode: 'add' }} />);
    expect(screen.getByTestId('tenframe-visualizer')).toBeInTheDocument();
    expect(screen.getAllByTestId('tenframe-element').length).toBe(2);
  });

  test('updates values and shows result', () => {
    render(<TenFrames config={{ defaultA: 9, defaultB: 3, mode: 'add' }} />);
    const btn = screen.getByTestId('btn-animate');
    fireEvent.click(btn);
    // Wait for simple resolution step
    const inputA = screen.getByTestId('input-a');
    expect(inputA.value).toBe('9');
  });
});
