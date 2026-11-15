import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { StoryProvider } from './state/StoryContext';
import './styles/global.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <StoryProvider>
      <App />
    </StoryProvider>
  </StrictMode>,
);
