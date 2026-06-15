import { describe, test, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import BaseTenBlocks from '../src/components/visualizers/BaseTenBlocks';

describe('BaseTenBlocks visualizer', () => {
  test('splits base ten correctly and renders correct visual block counts', () => {
    render(<BaseTenBlocks config={{ defaultValue: 125 }} />);
    expect(screen.getByTestId('baseten-visualizer')).toBeInTheDocument();
    expect(screen.getByTestId('block-summary')).toHaveTextContent(/1\s*Trăm.*2\s*Chục.*5\s*Đơn vị/);
    
    // Assert visual block counts in DOM
    expect(screen.queryAllByTitle("1 Trăm (10x10)")).toHaveLength(1);
    expect(screen.queryAllByTitle("1 Chục (1x10)")).toHaveLength(2);
    expect(screen.queryAllByTitle("1 Đơn vị")).toHaveLength(5);
  });

  test('supports multiplication representation and renders correct block counts', () => {
    render(<BaseTenBlocks config={{ mode: 'multiply', defaultA: 3, defaultB: 4 }} />);
    expect(screen.getByTestId('block-summary')).toHaveTextContent(/1\s*Chục.*2\s*Đơn vị/);

    expect(screen.queryAllByTitle("1 Trăm (10x10)")).toHaveLength(0);
    expect(screen.queryAllByTitle("1 Chục (1x10)")).toHaveLength(1);
    expect(screen.queryAllByTitle("1 Đơn vị")).toHaveLength(2);
  });

  test('allows changing number input', () => {
    render(<BaseTenBlocks config={{ defaultValue: 35 }} />);
    const input = screen.getByTestId('block-input');
    fireEvent.change(input, { target: { value: '42' } });
    expect(screen.getByTestId('block-summary')).toHaveTextContent(/4\s*Chục.*2\s*Đơn vị/);
    
    expect(screen.queryAllByTitle("1 Chục (1x10)")).toHaveLength(4);
    expect(screen.queryAllByTitle("1 Đơn vị")).toHaveLength(2);
  });

  test('allows changing multiplication inputs', () => {
    render(<BaseTenBlocks config={{ mode: 'multiply', defaultA: 3, defaultB: 5 }} />);
    const inputA = screen.getByTestId('multA-input');
    const inputB = screen.getByTestId('multB-input');
    fireEvent.change(inputA, { target: { value: '4' } });
    fireEvent.change(inputB, { target: { value: '6' } });
    expect(screen.getByTestId('block-summary')).toHaveTextContent(/2\s*Chục.*4\s*Đơn vị/);

    expect(screen.queryAllByTitle("1 Chục (1x10)")).toHaveLength(2);
    expect(screen.queryAllByTitle("1 Đơn vị")).toHaveLength(4);
  });

  test('handles decimal rounding and empty inputs', () => {
    render(<BaseTenBlocks config={{ defaultValue: 35 }} />);
    const input = screen.getByTestId('block-input');
    
    // Test decimal rounding
    fireEvent.change(input, { target: { value: '45.7' } });
    expect(screen.getByTestId('block-summary')).toHaveTextContent(/4\s*Chục.*6\s*Đơn vị/);
    
    fireEvent.blur(input);
    expect(input.value).toBe('46');

    // Test temporary empty input state
    fireEvent.change(input, { target: { value: '' } });
    expect(screen.queryAllByTitle("1 Chục (1x10)")).toHaveLength(0);
    expect(screen.queryAllByTitle("1 Đơn vị")).toHaveLength(0);

    // Blur empty input resets to min value (0)
    fireEvent.blur(input);
    expect(input.value).toBe('0');
  });
});

