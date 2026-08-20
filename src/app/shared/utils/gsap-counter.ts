import { gsap } from 'gsap';
import { WritableSignal } from '@angular/core';

export function animateCounter(
  signal: WritableSignal<number>,
  to: number,
  duration = 1,
  ease = "power4.out",
  onComplete?: () => void
) {
  const proxy = { value: signal() };

  gsap.to(proxy, {
    value: to,
    duration,
    ease,
    onUpdate: () => signal.set(Math.round(proxy.value)),
    onComplete
  });
}
