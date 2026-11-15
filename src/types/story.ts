/** Pantallas de la narrativa, en orden. */
export type ScreenId = 'intro' | 'memories' | 'date' | 'vault';

export type DatePlanId = 'dinner' | 'cinema' | 'creative' | 'surprise';

export interface DatePlan {
  id: DatePlanId;
  name: string;
  detail: string;
}

/**
 * Una caja de la bóveda. Solo contiene la PISTA pública.
 * El contenido real del regalo nunca vive en el código del cliente.
 */
export interface GiftHint {
  id: string;
  title: string;
  hint: string;
}

export interface StoryState {
  screen: ScreenId;
  /** Elección en curso (aún no guardada). */
  selectedDate: DatePlanId | null;
  /** IDs de pistas descubiertas en esta sesión. */
  revealedHints: readonly string[];
}

export type StoryAction =
  | { type: 'NAVIGATE'; screen: ScreenId }
  | { type: 'HYDRATE_DATE'; plan: DatePlanId | null }
  | { type: 'SELECT_DATE'; plan: DatePlanId }
  | { type: 'REVEAL_HINT'; id: string }
  | { type: 'RESTART' };
