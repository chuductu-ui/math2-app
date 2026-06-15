import { describe, test, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import NumberLine from '../src/components/visualizers/NumberLine';

describe('NumberLine visualizer', () => {
  test('renders standard bounds and defaults', () => {
    render(<NumberLine config={{ defaultValue: 10 }} />);
    expect(screen.getByTestId('numberline-visualizer')).toBeInTheDocument();
    expect(screen.getByTestId('selected-number')).toHaveTextContent('10');
  });

  test('updates selection on click and controls', () => {
    render(<NumberLine config={{ defaultValue: 10 }} />);
    const btnNext = screen.getByTestId('btn-next');
    fireEvent.click(btnNext);
    expect(screen.getByTestId('selected-number')).toHaveTextContent('11');

    const btnPrev = screen.getByTestId('btn-prev');
    fireEvent.click(btnPrev);
    expect(screen.getByTestId('selected-number')).toHaveTextContent('10');
  });
});
