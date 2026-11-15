import { Screen } from './Screen';

interface MemoryAlbumProps {
  onContinue: () => void;
  focusOnMount?: boolean;
}

/**
 * Capítulo I. Por ahora es el texto del prototipo.
 * Cuando lleguen las fotos (Supabase Storage), se renderizan aquí debajo del párrafo.
 */
export function MemoryAlbum({ onContinue, focusOnMount }: MemoryAlbumProps) {
  return (
    <Screen id="memories" label="Capítulo I · El archivo" focusOnMount={focusOnMount}>
      <div className="chapter">CAPÍTULO I · EL ARCHIVO</div>
      <h2>Los pequeños recuerdos</h2>
      <p>
        Esta sección tendrá nuestras fotografías y las historias que las acompañan. Por ahora,
        aquí comienza la aventura.
      </p>
      <button type="button" onClick={onContinue}>
        Continuar →
      </button>
    </Screen>
  );
}
