import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { App } from '@capacitor/app';
import * as LiveUpdates from '@capacitor/live-updates';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {
    this.initializeApp();
  }

  async initializeApp() {
    // Register event to fire each time user resumes the app
    App.addListener('resume', async () => {
      console.log(
        'randy - local storage type',
        typeof localStorage['shouldReloadApp'],
        typeof localStorage['sessionActive'],
        '\n',
        localStorage['shouldReloadApp'] === 'true',
        '\n',
        localStorage['shouldReloadApp'] === 'false',
        '\n',
        localStorage['sessionActive'] === 'true',
        '\n',
        localStorage['sessionActive'] === 'false',

      );
      if (
        localStorage['shouldReloadApp'] === 'true' &&
        localStorage['sessionActive'] === 'false'
      ) {
        await LiveUpdates.reload();
      } else {
        const result = await LiveUpdates.sync();
        localStorage['shouldReloadApp'] = result.activeApplicationPathChanged;
      }
    });

    // First sync on app load
    const result = await LiveUpdates.sync();
    localStorage['shouldReloadApp'] = result.activeApplicationPathChanged;
  }
}
