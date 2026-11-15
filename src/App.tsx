import { useEffect, useRef } from 'react';
import { useStory } from './state/StoryContext';
import { DATE_PLANS, GIFT_HINTS, STORY_META } from './data/content';
import { Starfield } from './components/Starfield';
import { Intro } from './components/Intro';
import { MemoryAlbum } from './components/MemoryAlbum';
import { DateSelector } from './components/DateSelector';
import { GiftVault } from './components/GiftVault';

export default function App() {
  const { state, actions } = useStory();
  const hasNavigated = useRef(false);

  // Igual que show() del prototipo: al cambiar de pantalla, volver arriba.
  useEffect(() => {
    if (!hasNavigated.current) {
      hasNavigated.current = true;
      return;
    }
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
  }, [state.screen]);

  // En la primera carga no robamos el foco; después de navegar, sí.
  const focus = hasNavigated.current;

  return (
    <>
      <Starfield />
      <main>
        {state.screen === 'intro' && (
          <Intro
            recipient={STORY_META.recipient}
            chapterLabel={STORY_META.chapterLabel}
            tagline={STORY_META.tagline}
            onBegin={() => actions.goTo('memories')}
            focusOnMount={focus}
          />
        )}
        {state.screen === 'memories' && (
          <MemoryAlbum onContinue={() => actions.goTo('date')} focusOnMount={focus} />
        )}
        {state.screen === 'date' && (
          <DateSelector
            plans={DATE_PLANS}
            selected={state.selectedDate}
            onSelect={actions.selectDate}
            onSave={actions.saveDate}
            focusOnMount={focus}
          />
        )}
        {state.screen === 'vault' && (
          <GiftVault
            hints={GIFT_HINTS}
            revealed={state.revealedHints}
            onReveal={actions.revealHint}
            onRestart={actions.restart}
            focusOnMount={focus}
          />
        )}
        <footer>{STORY_META.date}</footer>
      </main>
    </>
  );
}
