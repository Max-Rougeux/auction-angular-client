import {Component, computed, HostListener, input, output, signal} from '@angular/core';
import {animateCounter} from '../../../../shared/utils/gsap-counter';
import {MoneyIcon} from '../../../../shared/icons/money.icon';

@Component({
  selector: 'app-bid-stepper',
  imports: [
    MoneyIcon
  ],
  template: `
    <div class="grid grid-cols-3 gap-1 5">
      <div class="flex border items-center w-full"
           [class]="error() ? 'border-chart-hot' : 'border-neutral-800'">
        <input
          type="number"
          (keydown.enter)="onSubmit()"
          [value]="value()"
          (input)="onInput($event)"
          (blur)="onBlur($event)"
          class="w-full text-white text-center text-box-trim bg-transparent outline-none"
        />
        <div class="flex flex-col border-s *:px-3 text-white"
             [class]="error() ? 'border-chart-hot/80' : 'border-neutral-800'">
          <button (click)="plus()"
                  class="h-1/2 border-b border-inherit w-full cursor-pointer select-none text-box-trim py-1.5">+
          </button>
          <button (click)="minus()" class="h-1/2 w-full cursor-pointer select-none text-box-trim py-1.5">-</button>
        </div>
      </div>
      <button (click)="onSubmit()"
              class="transition-all duration-400 col-span-2 border overflow-hidden hover:rounded-2xl hover:bg-neutral-900/80"
              [class]="error() ? 'border-chart-hot' : 'border-neutral-800'"
              [class.opacity-30]="isAnimating()"
              [class.cursor-not-allowed]="isAnimating()">
        <div class="flex items-center justify-center gap-1 h-full text-box-trim text-sm font-medium text-black"
             [class]="error() ? 'bg-chart-hot' : 'bg-neutral-200'">
          @if (error()) {
            ✕ Failed — tap to retry
          } @else {
            + Place bid for {{ value() }}
            <app-money-icon [size]="18" class="mb-0.5"/>
          }
        </div>
      </button>
    </div>

  `
})
export class BidStepperComponent {
  min = input.required<number>();
  max = input.required<number>();
  error = input<boolean>(false);

  readonly bidSubmit = output<number>();

  private readonly _offset = signal(1);
  private readonly _animating = signal(false);

  readonly isAnimating = this._animating.asReadonly();
  readonly minValid = computed(() => this.min() + 1);
  readonly value = computed(() => this.min() + this._offset());

  plus() {
    if (this.value() < this.max()) this._offset.update(v => v + 1);
  }

  minus() {
    if (this._offset() > 1) this._offset.update(v => v - 1);
  }

  onInput(event: Event) {
    const typed = Number.parseInt((event.target as HTMLInputElement).value);
    if (!Number.isNaN(typed)) this._offset.set(typed - this.min());
  }

  onBlur(event: FocusEvent) {
    const input = (event.target as HTMLInputElement);
    const typed = Number.parseInt(input.value);
    const min = this.minValid();
    const max = this.max();

    let value = typed;
    if (Number.isNaN(value) || value < min) value = min;
    if (value > max) value = max;

    input.value = String(value);
    const offset = value - this.min();

    if (!Number.isNaN(typed) && typed >= min && typed <= max) {
      this._offset.set(offset);
      return;
    }

    this._animating.set(true);
    animateCounter(this._offset, offset, 0.4, 'power4.out', () => {
      this._animating.set(false);
    });
  }

  onSubmit() {
    if (this.isAnimating() || this.value() <= this.min()) return;
    this.bidSubmit.emit(this.value());
  }

  @HostListener('window:keydown.enter')
  onEnter() {
    this.onSubmit();
  }
}
