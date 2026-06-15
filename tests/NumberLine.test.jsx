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

  test('allows dragging pointer to locate a number', () => {
    render(<NumberLine config={{ defaultValue: 10 }} />);
    const lineContainer = screen.getByTestId('line-container');
    const pointer = screen.getByTestId('draggable-pointer');
    expect(pointer).toBeInTheDocument();

    // Mouse down at clientX = 60 (which is tick 1 center, i.e., 10 + 40 + 10 = 60px)
    fireEvent.mouseDown(lineContainer, { button: 0, clientX: 60 });
    expect(screen.getByTestId('selected-number')).toHaveTextContent('1');

    // Drag to clientX = 30 (which is tick 0 center, i.e., 10 + 20 = 30px)
    fireEvent.mouseMove(window, { clientX: 30 });
    expect(screen.getByTestId('selected-number')).toHaveTextContent('0');

    // Drag to touch (simulate TouchMove) at clientX = 80 (tick 2 center is 10 + 40 + 20 + 10 = 80px)
    fireEvent.touchStart(lineContainer, { touches: [{ clientX: 80 }] });
    expect(screen.getByTestId('selected-number')).toHaveTextContent('2');

    // TouchMove to clientX = 60
    fireEvent.touchMove(window, { touches: [{ clientX: 60 }] });
    expect(screen.getByTestId('selected-number')).toHaveTextContent('1');
  });
});
