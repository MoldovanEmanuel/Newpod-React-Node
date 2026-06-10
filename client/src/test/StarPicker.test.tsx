import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import StarPicker from '@/components/StarPicker';

describe('StarPicker', () => {
  it('renders 5 star buttons', () => {
    render(<StarPicker value={3} onChange={vi.fn()} />);
    expect(screen.getAllByRole('radio')).toHaveLength(5);
  });

  it('calls onChange with the clicked star value', () => {
    const onChange = vi.fn();
    render(<StarPicker value={3} onChange={onChange} />);
    fireEvent.click(screen.getByLabelText('5 stele'));
    expect(onChange).toHaveBeenCalledWith(5);
  });

  it('marks stars up to value as filled', () => {
    render(<StarPicker value={2} onChange={vi.fn()} />);
    const stars = screen.getAllByRole('radio');
    expect(stars[0]).toHaveTextContent('★');
    expect(stars[1]).toHaveTextContent('★');
    expect(stars[2]).toHaveTextContent('☆');
  });
});
