import { describe, test, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import BaseTenBlocks from '../src/components/visualizers/BaseTenBlocks';

describe('BaseTenBlocks visualizer', () => {
  test('splits base ten correctly', () => {
    render(<BaseTenBlocks config={{ defaultValue: 125 }} />);
    expect(screen.getByTestId('baseten-visualizer')).toBeInTheDocument();
    expect(screen.getByTestId('block-summary')).toHaveTextContent(/1\s*Trăm.*2\s*Chục.*5\s*Đơn vị/);
  });

  test('supports multiplication representation', () => {
    render(<BaseTenBlocks config={{ mode: 'multiply', defaultA: 3, defaultB: 4 }} />);
    expect(screen.getByTestId('block-summary')).toHaveTextContent(/1\s*Chục.*2\s*Đơn vị/);
  });

  test('allows changing number input', () => {
    render(<BaseTenBlocks config={{ defaultValue: 35 }} />);
    const input = screen.getByTestId('block-input');
    fireEvent.change(input, { target: { value: '42' } });
    expect(screen.getByTestId('block-summary')).toHaveTextContent(/4\s*Chục.*2\s*Đơn vị/);
  });

  test('allows changing multiplication inputs', () => {
    render(<BaseTenBlocks config={{ mode: 'multiply', defaultA: 3, defaultB: 5 }} />);
    const inputA = screen.getByTestId('multA-input');
    const inputB = screen.getByTestId('multB-input');
    fireEvent.change(inputA, { target: { value: '4' } });
    fireEvent.change(inputB, { target: { value: '6' } });
    expect(screen.getByTestId('block-summary')).toHaveTextContent(/2\s*Chục.*4\s*Đơn vị/);
  });
});
