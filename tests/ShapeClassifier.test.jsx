import { describe, test, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import ShapeClassifier from '../src/components/visualizers/ShapeClassifier';

describe('ShapeClassifier visualizer', () => {
  test('correctly handles cylinder/sphere sorting logic', () => {
    render(<ShapeClassifier />);
    expect(screen.getByTestId('shapeclassifier-visualizer')).toBeInTheDocument();

    // Verify item Lon nước exists
    expect(screen.getByText('🥤 Lon nước')).toBeInTheDocument();

    // Item 1: Quả bóng (sphere) is first. Click 'Khối Trụ' (which is incorrect)
    const sphereCardBtns = screen.getAllByText('Khối Trụ');
    fireEvent.click(sphereCardBtns[0]); // Classify Quả bóng (sphere) as Cylinder -> error
    expect(screen.getByTestId('classifier-feedback')).toHaveTextContent('Sai rồi');
  });
});
