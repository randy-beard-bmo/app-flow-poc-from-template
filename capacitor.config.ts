import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.randy.beard.bmo.app-flow-poc-from-template',
  appName: 'App Flow POC from Template',
  webDir: 'www',
  plugins: {
    LiveUpdates: {
      appId: '2da538c9',
      channel: 'Production',
      autoUpdateMethod: 'background',
      maxVersions: 2
    }
  }
};

export default config;