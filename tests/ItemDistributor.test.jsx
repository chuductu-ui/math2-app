import { describe, test, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import ItemDistributor from '../src/components/visualizers/ItemDistributor';

describe('ItemDistributor visualizer', () => {
  test('distributes items equally and shows division formula', () => {
    render(<ItemDistributor config={{ totalItems: 6, groupsCount: 2 }} />);
    expect(screen.getByTestId('distributor-visualizer')).toBeInTheDocument();

    const distBtn = screen.getByTestId('btn-distribute');
    fireEvent.click(distBtn); // distributes 2
    fireEvent.click(distBtn); // distributes 4
    fireEvent.click(distBtn); // distributes 6

    expect(screen.getByTestId('division-equation')).toHaveTextContent('6 : 2 = 3');
  });
});
