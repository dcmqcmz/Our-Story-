import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  type ReactNode,
} from 'react';
import type { DatePlanId, ScreenId, StoryState } from '../types/story';
import { initialStoryState, storyReducer } from './storyReducer';
import { createStoryRepository, type StoryRepository } from '../services/storyRepository';

interface StoryActions {
  goTo: (screen: ScreenId) => void;
  selectDate: (plan: DatePlanId) => void;
  saveDate: () => Promise<void>;
  revealHint: (id: string) => void;
  restart: () => void;
}

interface StoryContextValue {
  state: StoryState;
  actions: StoryActions;
}

const StoryContext = createContext<StoryContextValue | null>(null);

interface StoryProviderProps {
  children: ReactNode;
  repository?: StoryRepository;
}

export function StoryProvider({ children, repository }: StoryProviderProps) {
  const repo = useMemo(() => repository ?? createStoryRepository(), [repository]);
  const [state, dispatch] = useReducer(storyReducer, initialStoryState);

  useEffect(() => {
    let alive = true;
    repo.loadDateChoice().then((plan) => {
      if (alive) dispatch({ type: 'HYDRATE_DATE', plan });
    });
    return () => {
      alive = false;
    };
  }, [repo]);

  const goTo = useCallback((screen: ScreenId) => dispatch({ type: 'NAVIGATE', screen }), []);
  const selectDate = useCallback((plan: DatePlanId) => dispatch({ type: 'SELECT_DATE', plan }), []);
  const revealHint = useCallback((id: string) => dispatch({ type: 'REVEAL_HINT', id }), []);
  const restart = useCallback(() => dispatch({ type: 'RESTART' }), []);

  const saveDate = useCallback(async () => {
    if (!state.selectedDate) return;
    await repo.saveDateChoice(state.selectedDate);
    dispatch({ type: 'NAVIGATE', screen: 'vault' });
  }, [repo, state.selectedDate]);

  const value = useMemo<StoryContextValue>(
    () => ({ state, actions: { goTo, selectDate, saveDate, revealHint, restart } }),
    [state, goTo, selectDate, saveDate, revealHint, restart],
  );

  return <StoryContext.Provider value={value}>{children}</StoryContext.Provider>;
}

export function useStory(): StoryContextValue {
  const ctx = useContext(StoryContext);
  if (!ctx) throw new Error('useStory debe usarse dentro de <StoryProvider>');
  return ctx;
}
