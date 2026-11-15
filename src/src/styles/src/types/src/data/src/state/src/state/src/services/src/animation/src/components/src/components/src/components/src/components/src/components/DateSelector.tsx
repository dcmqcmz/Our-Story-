import type { DatePlan, DatePlanId } from '../types/story';
import { Screen } from './Screen';

interface DateSelectorProps {
  plans: readonly DatePlan[];
  selected: DatePlanId | null;
  onSelect: (plan: DatePlanId) => void;
  onSave: () => void;
  focusOnMount?: boolean;
}

export function DateSelector({ plans, selected, onSelect, onSave, focusOnMount }: DateSelectorProps) {
  return (
    <Screen id="date" label="Capítulo II · Tu decisión" focusOnMount={focusOnMount}>
      <div className="chapter">CAPÍTULO II · TU DECISIÓN</div>
      <h2>¿Cuál será nuestra cita?</h2>
      <p>Elige el plan que más te emocione. Puedes cambiarlo después.</p>
      <div role="group" aria-label="Planes de cita">
        {plans.map((plan) => (
          <button
            key={plan.id}
            type="button"
            className="choice"
            aria-pressed={selected === plan.id}
            onClick={() => onSelect(plan.id)}
          >
            <strong>{plan.name}</strong>
            <small>{plan.detail}</small>
          </button>
        ))}
      </div>
      <button type="button" onClick={onSave} disabled={!selected}>
        Guardar mi elección →
      </button>
      <p className="note">Esta versión de prueba guarda la elección solo en este dispositivo.</p>
    </Screen>
  );
}
