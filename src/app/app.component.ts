import { ChangeDetectionStrategy, Component } from '@angular/core';
import { App } from '@capacitor/app';
import * as LiveUpdates from '@capacitor/live-updates';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  constructor() {}

  async initializeApp() {
    // Register event to fire each time user resumes the app
    App.addListener('resume', async () => {
      if (localStorage['shouldReloadApp'] && localStorage['sessionActive'] === false) {
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
