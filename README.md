# Our Story

Experiencia web interactiva de aniversario. React 18 + Vite 5 + TypeScript (strict).

## Iniciar localmente

Requisitos: Node.js 18 o superior.

```bash
npm install
npm run dev        # http://localhost:5173
```

Para probar desde tu celular en la misma red Wi‑Fi:

```bash
npm run dev -- --host   # abre en el cel la URL "Network" que muestra la terminal
```

Otros comandos:

```bash
npm run build      # typecheck + build de producción en dist/
npm run preview    # sirve dist/ en http://localhost:4173
npm run typecheck
```

## Estructura

```
src/
  components/
    Screen.tsx        contenedor de capítulo (transición + foco accesible)
    Starfield.tsx     fondo de estrellas
    Intro.tsx         bienvenida con letras animadas
    MemoryAlbum.tsx   Capítulo I  (aquí irán las fotos)
    DateSelector.tsx  Capítulo II (elección de cita)
    GiftVault.tsx     Capítulo IV (pistas de las cajas)
  state/
    storyReducer.ts   reducer tipado (pantalla, cita, pistas)
    StoryContext.tsx  provider + hook useStory()
  services/
    storyRepository.ts  interfaz StoryRepository + implementación localStorage
  animation/
    useReducedMotion.ts hook para cuando entre GSAP
  data/content.ts     textos, planes y pistas
  types/story.ts      tipos del dominio
  styles/global.css   estilos del prototipo + tokens CSS
```

## Siguientes fases

**GSAP**: `npm i gsap`. Cada componente usa un `ref` + `gsap.context()` dentro de
`useLayoutEffect`, y sale temprano si `useReducedMotion()` es `true`. Al migrar una
animación a GSAP, quita su `animation:` del CSS para no duplicarla.

**Supabase**: `npm i @supabase/supabase-js`, copia `.env.example` → `.env.local`,
crea `SupabaseStoryRepository implements StoryRepository` y devuélvelo en
`createStoryRepository()`. Los componentes no cambian.

## Privacidad de los regalos

`src/data/content.ts` solo contiene **pistas**. Todo lo que esté en el repo termina en el
JavaScript público, así que el contenido real de cada regalo nunca debe escribirse aquí.
Cuando se necesite revelarlo, debe venir de Supabase protegido con RLS.
