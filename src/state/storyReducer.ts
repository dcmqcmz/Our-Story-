import type { StoryAction, StoryState } from '../types/story';

export const initialStoryState: StoryState = {
  screen: 'intro',
  selectedDate: null,
  revealedHints: [],
};

export function storyReducer(state: StoryState, action: StoryAction): StoryState {
  switch (action.type) {
    case 'NAVIGATE':
      return { ...state, screen: action.screen };
    case 'HYDRATE_DATE':
      // No pisar una elección que ya se hizo antes de que cargara el almacenamiento.
      return state.selectedDate ? state : { ...state, selectedDate: action.plan };
    case 'SELECT_DATE':
      return { ...state, selectedDate: action.plan };
    case 'REVEAL_HINT':
      return state.revealedHints.includes(action.id)
        ? state
        : { ...state, revealedHints: [...state.revealedHints, action.id] };
    case 'RESTART':
      // Igual que el prototipo: cierra las pistas y vuelve al inicio; la cita elegida se conserva.
      return { ...state, screen: 'intro', revealedHints: [] };
    default: {
      const exhaustive: never = action;
      return exhaustive;
    }
  }
}
