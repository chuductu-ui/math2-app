import { describe, test, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import InteractiveEquation from '../src/components/visualizers/InteractiveEquation';

describe('InteractiveEquation visualizer', () => {
  test('renders interactive terms and changes tab', () => {
    render(<InteractiveEquation />);
    expect(screen.getByTestId('equation-visualizer')).toBeInTheDocument();
    
    const termA = screen.getByTestId('term-add-a');
    fireEvent.click(termA);
    expect(screen.getByTestId('term-info')).toHaveTextContent('Số hạng');

    const tabSub = screen.getByTestId('tab-sub');
    fireEvent.click(tabSub);
    expect(screen.queryByTestId('term-add-a')).not.toBeInTheDocument();

    const termSubA = screen.getByTestId('term-sub-a');
    fireEvent.click(termSubA);
    expect(screen.getByTestId('term-info')).toHaveTextContent('Số bị trừ');
  });
});
