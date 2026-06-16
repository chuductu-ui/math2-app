import { describe, test, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import App from '../src/App';

// Mock fetch before tests
beforeEach(() => {
  globalThis.fetch = vi.fn().mockImplementation(() =>
    Promise.resolve({
      ok: true,
      json: () => Promise.resolve({ chapters: [] }),
    })
  );
});

describe('App component', () => {
  test('renders the landing loading/header state and loads map', async () => {
    render(<App />);
    expect(screen.getByText(/Đang tải bài học.../)).toBeInTheDocument();
    
    // Wait for the loading state to disappear after mock fetch resolves
    await waitFor(() => {
      expect(screen.queryByText(/Đang tải bài học.../)).not.toBeInTheDocument();
    });
    
    expect(screen.getByText(/Toán 2 Phiêu Lưu Ký/)).toBeInTheDocument();
  });
});
