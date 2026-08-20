import {inject, Injectable} from '@angular/core';
import { gsap } from 'gsap';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {NavigationEnd, Router} from '@angular/router';

@Injectable({ providedIn: 'root' })
export class WipeService {
  private readonly router = inject(Router);
  wipeEl: HTMLElement | null = null;
  private previousPath = '';

  constructor() {
    this.router.events.pipe(takeUntilDestroyed()).subscribe(event => {
      if (event instanceof NavigationEnd) {
        const currentPath = event.urlAfterRedirects.split('?')[0];
        if (currentPath !== this.previousPath) {
          this.previousPath = currentPath;
          this.animateOut();
        }
      }
    });
  }

  animateIn(): Promise<void> {
    return new Promise(resolve => {
      gsap.set(this.wipeEl, { top: '100%' });
      gsap.to(this.wipeEl, {
        top: '0%',
        duration: 0.8,
        ease: 'expo.inOut',
        onComplete: resolve
      });
    });
  }

  animateOut(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });

    gsap.to(this.wipeEl, {
      top: '-100%',
      duration: 0.6,
      ease: 'expo.inOut',
      onComplete: () => {
        gsap.set(this.wipeEl, { top: '100%' });
      }
    });
  }
}
