import type { GiftHint } from '../types/story';
import { Screen } from './Screen';

interface GiftVaultProps {
  hints: readonly GiftHint[];
  revealed: readonly string[];
  onReveal: (id: string) => void;
  onRestart: () => void;
  focusOnMount?: boolean;
}

export function GiftVault({ hints, revealed, onReveal, onRestart, focusOnMount }: GiftVaultProps) {
  return (
    <Screen id="vault" label="Capítulo IV · La bóveda" focusOnMount={focusOnMount}>
      <div className="chapter">CAPÍTULO IV · LA BÓVEDA</div>
      <h2>Cuatro misterios</h2>
      <p>
        Elige el orden de las cajas. Las pistas no revelan lo que hay dentro: eso lo descubrirás
        al abrir cada regalo de verdad.
      </p>
      <ul className="gift-list">
        {hints.map((gift, i) => {
          const isOpen = revealed.includes(gift.id);
          return (
            <li key={gift.id} className="gift">
              <b>
                Caja {i + 1} · {isOpen ? gift.title : '???'}
              </b>
              <span aria-live="polite">{isOpen ? gift.hint : 'La pista está cerrada'}</span>
              <button
                type="button"
                className="secondary"
                disabled={isOpen}
                onClick={() => onReveal(gift.id)}
              >
                {isOpen ? 'Pista descubierta ✓' : 'Descubrir pista'}
              </button>
            </li>
          );
        })}
      </ul>
      <button type="button" className="secondary" onClick={onRestart}>
        Volver al comienzo
      </button>
    </Screen>
  );
}
