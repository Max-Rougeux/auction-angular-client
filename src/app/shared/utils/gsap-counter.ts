import { gsap } from 'gsap';
import { WritableSignal } from '@angular/core';

export function animateCounter(
  signal: WritableSignal<number>,
  to: number,
  duration = 0.6,
  ease = 'power2.out'
) {
  const proxy = { value: signal() };

  gsap.to(proxy, {
    value: to,
    duration,
    ease,
    onUpdate: () => signal.set(Math.round(proxy.value))
  });
}
