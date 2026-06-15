import { describe, test, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import BalanceScale from '../src/components/visualizers/BalanceScale';

describe('BalanceScale visualizer', () => {
  test('renders initial state and interacts with weights', () => {
    render(<BalanceScale />);
    expect(screen.getByTestId('balancescale-visualizer')).toBeInTheDocument();
    expect(screen.getByTestId('scale-status')).toHaveTextContent('Cân đang nghiêng về bên trái');

    const btn1 = screen.getByTestId('btn-add-1');
    fireEvent.click(btn1);
    fireEvent.click(btn1);
    fireEvent.click(btn1);
    fireEvent.click(btn1);
    fireEvent.click(btn1); // total 5kg
    expect(screen.getByTestId('scale-status')).toHaveTextContent('Cân thăng bằng');
  });
});
