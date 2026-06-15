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

  test('handles keyboard accessibility events (Enter/Space)', () => {
    render(<InteractiveEquation />);
    const termA = screen.getByTestId('term-add-a');
    
    // Test Enter key
    fireEvent.keyDown(termA, { key: 'Enter', code: 'Enter' });
    expect(screen.getByTestId('term-info')).toHaveTextContent('Số 12 gọi là: Số hạng');

    // Test click on B term
    const termB = screen.getByTestId('term-add-b');
    fireEvent.click(termB);
    expect(screen.getByTestId('term-info')).toHaveTextContent('Số 5 gọi là: Số hạng');

    // Test Space key
    fireEvent.keyDown(termA, { key: ' ', code: 'Space' });
    expect(screen.getByTestId('term-info')).toHaveTextContent('Số 12 gọi là: Số hạng');
  });

  test('initializes with custom config mode', () => {
    render(<InteractiveEquation config={{ mode: 'sub' }} />);
    
    // Should render subtraction mode initially
    expect(screen.getByTestId('term-sub-a')).toBeInTheDocument();
    expect(screen.queryByTestId('term-add-a')).not.toBeInTheDocument();
    
    const termSubB = screen.getByTestId('term-sub-b');
    fireEvent.click(termSubB);
    expect(screen.getByTestId('term-info')).toHaveTextContent('Số 5 gọi là: Số trừ');
  });
});

