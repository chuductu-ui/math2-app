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

  test('interacts with empty cup buttons and displays capacity overlays', () => {
    render(<LitreCup />);
    
    // Check initial capacity overlays
    expect(screen.getByTestId('overlay-1l')).toHaveTextContent('0 L');
    expect(screen.getByTestId('overlay-2l')).toHaveTextContent('0 L');
    expect(screen.getByTestId('overlay-5l')).toHaveTextContent('0 L');
    
    // Fill 2L cup and verify overlay
    const fill2L = screen.getByTestId('fill-2l');
    fireEvent.click(fill2L);
    expect(screen.getByTestId('overlay-2l')).toHaveTextContent('2 L');
    
    // Empty 2L cup and verify overlay
    const empty2L = screen.getByTestId('empty-2l');
    fireEvent.click(empty2L);
    expect(screen.getByTestId('overlay-2l')).toHaveTextContent('0 L');

    // Fill 5L cup and verify overlay
    const fill5L = screen.getByTestId('fill-5l');
    fireEvent.click(fill5L);
    expect(screen.getByTestId('overlay-5l')).toHaveTextContent('5 L');
    
    // Empty 5L cup and verify overlay
    const empty5L = screen.getByTestId('empty-5l');
    fireEvent.click(empty5L);
    expect(screen.getByTestId('overlay-5l')).toHaveTextContent('0 L');
  });
});
