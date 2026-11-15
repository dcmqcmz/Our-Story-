import type { DatePlanId } from '../types/story';
import { DATE_PLANS } from '../data/content';

/**
 * Contrato de persistencia. Hoy: localStorage.
 * Después: SupabaseStoryRepository que implemente esta misma interfaz,
 * sin tocar componentes ni reducer.
 */
export interface StoryRepository {
  loadDateChoice(): Promise<DatePlanId | null>;
  saveDateChoice(plan: DatePlanId): Promise<void>;
}

const DATE_KEY = 'ourstory_demo_date';

function isDatePlanId(value: unknown): value is DatePlanId {
  return DATE_PLANS.some((p) => p.id === value);
}

export class LocalStoryRepository implements StoryRepository {
  async loadDateChoice(): Promise<DatePlanId | null> {
    try {
      const value = localStorage.getItem(DATE_KEY);
      return isDatePlanId(value) ? value : null;
    } catch {
      return null;
    }
  }

  async saveDateChoice(plan: DatePlanId): Promise<void> {
    try {
      localStorage.setItem(DATE_KEY, plan);
    } catch {
      // Modo privado o almacenamiento bloqueado: la experiencia sigue sin persistir.
    }
  }
}

export function createStoryRepository(): StoryRepository {
  // Punto de enchufe para Supabase:
  // if (import.meta.env.VITE_SUPABASE_URL) return new SupabaseStoryRepository(...);
  return new LocalStoryRepository();
}
