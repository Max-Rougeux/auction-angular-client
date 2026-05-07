import { Injectable } from '@angular/core';
import { gsap } from 'gsap';

@Injectable({ providedIn: 'root' })
export class WipeService {
  wipeEl: HTMLElement | null = null;

  animateIn(): Promise<void> {
    return new Promise(resolve => {
      const tl = gsap.timeline({ onComplete: resolve });

      gsap.set(this.wipeEl, { top: '100%', width: '100%', height: '100%' });

      tl.to(this.wipeEl, {
        top: '0%', duration: 0.8, ease: 'expo.inOut',
      });
    });
  }

  animateOut(): void {
    const tl = gsap.timeline({
      onComplete: () => {
        gsap.set(this.wipeEl, { top: '100%' });
      }
    });

    tl.to(this.wipeEl, {
      top: '-100%', duration: 0.6, ease: 'expo.inOut', delay: 0.1
    });
  }
}
