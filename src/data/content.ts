import type { DatePlan, GiftHint } from '../types/story';

export const DATE_PLANS: readonly DatePlan[] = [
  { id: 'dinner', name: 'Cena especial', detail: 'Una noche para celebrar' },
  { id: 'cinema', name: 'Cine y comida', detail: 'Película, botanas y algo rico' },
  { id: 'creative', name: 'Cita creativa', detail: 'Hacer algo juntas' },
  { id: 'surprise', name: 'Plan sorpresa', detail: 'Dejar que la aventura nos encuentre' },
];

/**
 * Solo pistas poéticas. NO agregues aquí qué es cada regalo:
 * todo lo que esté en este repo termina en el bundle público.
 */
export const GIFT_HINTS: readonly GiftHint[] = [
  { id: 'box-1', title: 'El pequeño universo', hint: 'Algo que podrás llevar contigo' },
  { id: 'box-2', title: 'El sueño', hint: 'Un símbolo de tu camino' },
  { id: 'box-3', title: 'Otra dimensión', hint: 'Un universo inesperado' },
  { id: 'box-4', title: 'El jardín', hint: 'Algo que florece' },
];

export const STORY_META = {
  recipient: 'Thania',
  chapterLabel: 'Our Story · Chapter III',
  tagline: 'Hay historias que no necesitan un final. Solo un siguiente capítulo.',
  date: '03 · 12 · 2026',
} as const;
