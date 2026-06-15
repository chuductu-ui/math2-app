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

  test('clears weights and re-balances when selecting a different object', () => {
    render(<BalanceScale />);
    
    // Add some weights first
    const btn1 = screen.getByTestId('btn-add-1');
    fireEvent.click(btn1); // total 1kg, pumpkin is 5kg, left-tilted
    expect(screen.getByTestId('scale-status')).toHaveTextContent('Cân đang nghiêng về bên trái');

    // Change object to Quả táo (1kg)
    const select = screen.getByTestId('object-select');
    fireEvent.change(select, { target: { value: '🍎 Quả táo' } });

    // Apple (1kg) vs 0kg on the right -> should still tilt left
    expect(screen.getByTestId('scale-status')).toHaveTextContent('Cân đang nghiêng về bên trái');
    
    // Add 1kg to right side to balance it
    fireEvent.click(btn1);
    expect(screen.getByTestId('scale-status')).toHaveTextContent('Cân thăng bằng');
  });
});
