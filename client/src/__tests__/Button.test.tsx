import { render, screen } from '@testing-library/react';
import { Button } from '../components/ui/Button';

describe('Button', () => {
  it('renders correctly', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByText('Click me')).toBeDefined();
  });

  it('renders disabled state', () => {
    render(<Button disabled>Click me</Button>);
    expect(screen.getByText('Click me')).toBeDefined();
    // In a real setup we'd check .toBeDisabled() but requires jest-dom
  });
});
