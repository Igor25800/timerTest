import {Component, DestroyRef, OnInit} from '@angular/core';
import {AsyncPipe} from "@angular/common";
import {TimeFormatPipe} from "../../shared/pipes/time-format.pipe";
import {filter, interval, map, Observable, of} from "rxjs";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";

@Component({
  selector: 'app-timer',
  standalone: true,
  imports: [
    AsyncPipe,
    TimeFormatPipe
  ],
  templateUrl: './timer.component.html',
  styleUrl: './timer.component.scss'
})
export class TimerComponent implements OnInit {
  timer$: Observable<number> = of(0);
  running: boolean = false;
  lastClickTime: number = 0;

  constructor(
    private destroyRef: DestroyRef,
  ) {}

  ngOnInit(): void {
    this.getTimer();
  }

  getTimer(): void {
    interval(1000).pipe(
      takeUntilDestroyed(this.destroyRef),
      filter(() => this.running)
    ).subscribe(() => {
      if (this.running) {
        this.timer$ = this.timer$.pipe(
          map(timer => timer + 1)
        );
      }
    });
  }

  startStopTimer(): void {
    this.running = !this.running;
    if (!this.running) {
      this.timer$ = of(0);
    }
  }

  waitTimer(): void {
    const currentTime = new Date().getTime();
    if (currentTime - this.lastClickTime < 500) {
      this.running = false;
    }
    this.lastClickTime = currentTime;
  }

  resetTime(): void {
    this.running = false;
    this.timer$ = of(0);
  }
}
