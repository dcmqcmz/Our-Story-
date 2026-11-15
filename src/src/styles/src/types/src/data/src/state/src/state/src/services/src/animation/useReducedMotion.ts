import { useEffect, useState } from 'react';

const QUERY = '(prefers-reduced-motion: reduce)';

/**
 * Respeta la preferencia del sistema. Las animaciones actuales son CSS y ya
 * la respetan vía @media; este hook es para cuando entren timelines de GSAP:
 *
 *   const reduced = useReducedMotion();
 *   useLayoutEffect(() => {
 *     if (reduced) return;               // estado final sin animar
 *     const ctx = gsap.context(() => { ... }, rootRef);
 *     return () => ctx.revert();
 *   }, [reduced]);
 */
export function useReducedMotion(): boolean {
  const [reduced, setReduced] = useState(
    () => typeof window !== 'undefined' && window.matchMedia(QUERY).matches,
  );

  useEffect(() => {
    const mql = window.matchMedia(QUERY);
    const onChange = () => setReduced(mql.matches);
    mql.addEventListener('change', onChange);
    return () => mql.removeEventListener('change', onChange);
  }, []);

  return reduced;
}
