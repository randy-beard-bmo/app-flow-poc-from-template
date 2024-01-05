import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  ChangeDetectorRef,
  EventEmitter,
  Output,
  Input,
} from '@angular/core';

@Component({
  selector: 'app-countdown-timer',
  templateUrl: './countdown-timer.component.html',
  styleUrls: ['./countdown-timer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CountdownTimerComponent implements OnInit {
  constructor(private cdr: ChangeDetectorRef) {}
  initialSeconds: number = 10;
  secondsRemaining: number = this.initialSeconds;
  countdownInterval: any;

  @Input() clearTimerText: string = 'Clear Timer';
  @Input() startTimerText: string = 'Start Timer';

  @Output() timerCompleted = new EventEmitter();
  @Output() timerStarted = new EventEmitter();


  ngOnInit() {
    this.startCountdown();
  }

  startCountdown() {
    this.triggerTimerStart();
    this.countdownInterval = setInterval(() => {
      this.secondsRemaining--;

      if (this.secondsRemaining === 0) {
        clearInterval(this.countdownInterval);
        this.triggerTimerComplete();
      }
      this.cdr.markForCheck();
    }, 1000);
  }

  clearTimer() {
    clearInterval(this.countdownInterval);
    this.secondsRemaining = 0;
    this.cdr.markForCheck();
  }

  startTimer() {
    clearInterval(this.countdownInterval);
    this.secondsRemaining = this.initialSeconds;
    this.startCountdown();
    this.cdr.markForCheck();
  }

  triggerTimerStart() {
    this.timerStarted.emit();
  }

  triggerTimerComplete() {
    this.timerCompleted.emit();
  }
}
