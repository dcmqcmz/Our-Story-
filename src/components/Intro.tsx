import type { CSSProperties } from 'react';
import { Screen } from './Screen';

interface IntroProps {
  recipient: string;
  chapterLabel: string;
  tagline: string;
  onBegin: () => void;
  focusOnMount?: boolean;
}

export function Intro({ recipient, chapterLabel, tagline, onBegin, focusOnMount }: IntroProps) {
  return (
    <Screen id="intro" label="Bienvenida" focusOnMount={focusOnMount}>
      <div className="eyebrow">A story for</div>
      <h1 className="name" aria-label={recipient}>
        {Array.from(recipient).map((char, i) => (
          <span
            key={i}
            className="letter"
            aria-hidden="true"
            style={{ '--i': i } as CSSProperties}
          >
            {char}
          </span>
        ))}
      </h1>
      <div className="rule" />
      <div className="subtitle">{chapterLabel}</div>
      <p className="description">{tagline}</p>
      <div className="actions">
        <button type="button" onClick={onBegin}>
          Comenzar nuestra historia →
        </button>
      </div>
    </Screen>
  );
}
