interface Props {
  value: number;
  onChange: (rating: number) => void;
  size?: 'sm' | 'lg';
}

export default function StarPicker({ value, onChange, size = 'lg' }: Props) {
  const starSize = size === 'lg' ? 'text-3xl' : 'text-xl';
  return (
    <div className="flex gap-1" role="radiogroup" aria-label="Rating">
      {[1, 2, 3, 4, 5].map((n) => (
        <button
          key={n}
          type="button"
          onClick={() => onChange(n)}
          aria-label={`${n} stele`}
          aria-checked={value === n}
          role="radio"
          className={`${starSize} leading-none transition-transform duration-100 hover:scale-110 focus:outline-none focus-visible:ring-2 focus-visible:ring-lime rounded ${
            n <= value ? 'text-orange' : 'text-border hover:text-orange/50'
          }`}
        >
          {n <= value ? '★' : '☆'}
        </button>
      ))}
    </div>
  );
}

export function Stars({ rating, className = '' }: { rating: number; className?: string }) {
  return (
    <span className={`stars-display text-orange ${className}`}>
      {'★'.repeat(rating)}{'☆'.repeat(5 - rating)}
    </span>
  );
}
