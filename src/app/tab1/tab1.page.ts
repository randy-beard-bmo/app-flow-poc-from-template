import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
} from '@angular/core';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Tab1Page {
  constructor(private cdr: ChangeDetectorRef) {}

  sessionExists = false;

  expireSession() {
    this.sessionExists = false;
    localStorage['sessionActive'] = false;
    this.cdr.markForCheck();
  }

  initializeSession() {
    this.sessionExists = true;
    localStorage['sessionActive'] = true;
    this.cdr.markForCheck();
  }
}
