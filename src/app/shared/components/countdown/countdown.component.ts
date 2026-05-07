import {Component, input, OnDestroy, OnInit, signal} from '@angular/core';
import {PadPipe} from '../../pipes/pad.pipe';

@Component({
  selector: 'app-countdown',
  imports: [PadPipe],
  templateUrl: './countdown.component.html',
})
export class CountdownComponent implements OnInit, OnDestroy {
  endAt = input<Date>(new Date(Date.now() + 14 * 24 * 60 * 60 * 1000));

  days = signal(0);
  hours = signal(0);
  minutes = signal(0);
  seconds = signal(0);
  expired = signal(false);

  private interval: ReturnType<typeof setInterval> | null = null;

  ngOnInit() {
    this.update();
    this.interval = setInterval(() => this.update(), 1000);
  }

  ngOnDestroy() {
    if (this.interval) clearInterval(this.interval);
  }

  private update() {
    const diff = new Date(this.endAt()).getTime() - Date.now();

    if (diff <= 0) {
      this.expired.set(true);
      clearInterval(this.interval!);
      return;
    }

    this.days.set(Math.floor(diff / 86400000));
    this.hours.set(Math.floor((diff % 86400000) / 3600000));
    this.minutes.set(Math.floor((diff % 3600000) / 60000));
    this.seconds.set(Math.floor((diff % 60000) / 1000));
  }
}
