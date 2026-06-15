import { describe, test, expect } from 'vitest';
import { render, screen, fireEvent, within } from '@testing-library/react';
import ShapeClassifier from '../src/components/visualizers/ShapeClassifier';

describe('ShapeClassifier visualizer', () => {
  test('correctly handles cylinder/sphere sorting logic', () => {
    render(<ShapeClassifier />);
    expect(screen.getByTestId('shapeclassifier-visualizer')).toBeInTheDocument();

    // Verify item Lon nước exists
    expect(screen.getByText('🥤 Lon nước')).toBeInTheDocument();

    // Classify Quả bóng (item-1, sphere) as Cylinder (incorrect)
    const sphereCard = screen.getByTestId('item-1');
    const toCylinderBtn = within(sphereCard).getByRole('button', { name: 'Khối Trụ' });
    fireEvent.click(toCylinderBtn);

    const feedback = screen.getByTestId('classifier-feedback');
    expect(feedback).toHaveTextContent('Sai rồi');
    // Verify dynamic incorrect style color
    expect(feedback.style.color).toBe('rgb(207, 19, 34)'); // corresponds to #CF1322
  });

  test('successfully classifies all shapes, displays congrats, and resets', () => {
    render(<ShapeClassifier />);

    const testItems = [
      { id: 1, btnName: 'Khối Cầu', name: 'Quả bóng' },
      { id: 2, btnName: 'Khối Trụ', name: 'Lon nước' },
      { id: 3, btnName: 'Khối Trụ', name: 'Viên pin' },
      { id: 4, btnName: 'Khối Cầu', name: 'Viên bi' },
      { id: 5, btnName: 'Khối Trụ', name: 'Hộp sữa' },
      { id: 6, btnName: 'Khối Cầu', name: 'Quả cam' }
    ];

    // Classify all items correctly
    testItems.forEach(({ id, btnName }) => {
      const card = screen.getByTestId(`item-${id}`);
      const btn = within(card).getByRole('button', { name: btnName });
      fireEvent.click(btn);
    });

    // Check feedback shows success
    const feedback = screen.getByTestId('classifier-feedback');
    expect(feedback).toHaveTextContent('Đúng rồi');
    expect(feedback.style.color).toBe('rgb(56, 158, 13)'); // corresponds to #389E0D

    // Check congrats message is displayed
    const congratsMsg = screen.getByText(/Tuyệt vời! Bé đã phân loại chính xác/);
    expect(congratsMsg).toBeInTheDocument();

    // Click the reset button
    const resetBtn = within(congratsMsg).getByRole('button', { name: /Luyện tập lại/ });
    fireEvent.click(resetBtn);

    // Verify pool is repopulated and congrats is gone
    expect(congratsMsg).not.toBeInTheDocument();
    testItems.forEach(({ id }) => {
      expect(screen.getByTestId(`item-${id}`)).toBeInTheDocument();
    });
  });
});
