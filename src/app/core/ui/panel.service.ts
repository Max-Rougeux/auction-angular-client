import {inject, Injectable, signal} from '@angular/core';
import {NavigationEnd, Router} from '@angular/router';
import {filter} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PanelService {
  private readonly router = inject(Router);

  private readonly _middlePanel = signal<"thumbnail" | "graph">("thumbnail")
  readonly middlePanel = this._middlePanel.asReadonly();

  private readonly _leftPanel = signal<"feed" | "notification">("feed")
  readonly leftPanel = this._leftPanel.asReadonly();

  setMiddlePanel(toggle: "thumbnail" | "graph") {
    this._middlePanel.set(toggle);
  }
  setLeftPanel(toggle: "feed" | "notification") {
    this._leftPanel.set(toggle);
  }

  toggleMiddlePanel() {
    if(this._middlePanel() === "graph") {
      this._middlePanel.set("thumbnail");
    } else {
      this._middlePanel.set("graph");
    }
  }
  toggleLeftPanel() {
    if(this.leftPanel() === "notification") {
      this._leftPanel.set("feed");
    } else {
      this._leftPanel.set("notification");
    }
  }

  reset(): void {
    this._leftPanel.set("feed");
    this._middlePanel.set("thumbnail");
  }

  constructor() {
    this.router.events.pipe(
      filter(e => e instanceof NavigationEnd)
    ).subscribe(() => this.reset());
  }
}
