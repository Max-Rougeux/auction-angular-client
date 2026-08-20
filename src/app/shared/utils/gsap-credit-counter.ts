import { gsap } from 'gsap';
import { WritableSignal } from '@angular/core';

export type CreditDirection = 'increase' | 'decrease' | null;

export function animateCreditCounter(
  signal: WritableSignal<number>,
  to: number,
  onDirectionChange: (direction: CreditDirection) => void,
  duration = 1,
  ease = 'power4.out',
  colorReturnAt = 0.4
) {
  const from = signal();
  if (from === to) return;

  onDirectionChange(to > from ? 'increase' : 'decrease');

  const proxy = { value: from };

  gsap.delayedCall(duration * colorReturnAt, () => onDirectionChange(null));

  gsap.to(proxy, {
    value: to,
    duration,
    ease,
    onUpdate: () => signal.set(Math.round(proxy.value)),
  });
}
