import { useEffect, useRef, type ReactNode } from 'react';

interface ScreenProps {
  id: string;
  label: string;
  /** Mover el foco a esta pantalla al montarse (lectores de pantalla / teclado). */
  focusOnMount?: boolean;
  children: ReactNode;
}

/** Contenedor común de cada capítulo: misma clase y transición que el prototipo. */
export function Screen({ id, label, focusOnMount = false, children }: ScreenProps) {
  const ref = useRef<HTMLElement>(null);

  // Solo al montarse: un re-render posterior no debe robar el foco.
  useEffect(() => {
    if (focusOnMount) ref.current?.focus({ preventScroll: true });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section ref={ref} id={id} className="screen active" aria-label={label} tabIndex={-1}>
      {children}
    </section>
  );
}
