import { memo } from 'react';

interface StarfieldProps {
  count?: number;
}

/** Fondo de estrellas determinista (mismas posiciones que el prototipo). */
export const Starfield = memo(function Starfield({ count = 32 }: StarfieldProps) {
  return (
    <div className="stars" aria-hidden="true">
      {Array.from({ length: count }, (_, i) => (
        <i
          key={i}
          className="star"
          style={{
            left: `${(i * 37 + 11) % 100}%`,
            top: `${(i * 61 + 17) % 100}%`,
            animationDelay: `${(i % 7) * 0.4}s`,
          }}
        />
      ))}
    </div>
  );
});
