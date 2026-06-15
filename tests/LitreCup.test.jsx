import { describe, test, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import LitreCup from '../src/components/visualizers/LitreCup';

describe('LitreCup visualizer', () => {
  test('interacts with cup pouring and resets', () => {
    render(<LitreCup />);
    expect(screen.getByTestId('litrecup-visualizer')).toBeInTheDocument();
    
    const fillBtn = screen.getByTestId('fill-1l');
    const pourBtn = screen.getByTestId('pour-1l');

    fireEvent.click(fillBtn);
    fireEvent.click(pourBtn);

    expect(screen.getByTestId('tank-label')).toHaveTextContent('1 Lít (l)');

    const resetBtn = screen.getByTestId('btn-reset');
    fireEvent.click(resetBtn);
    expect(screen.getByTestId('tank-label')).toHaveTextContent('0 Lít (l)');
  });
});
