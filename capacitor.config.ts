
import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.lovable.abe27fc3b472467aa48c85dde0c277e6',
  appName: 'finance-whisper-app',
  webDir: 'dist',
  server: {
    url: 'https://abe27fc3-b472-467a-a48c-85dde0c277e6.lovableproject.com?forceHideBadge=true',
    cleartext: true
  },
  android: {
    buildOptions: {
      keystorePath: undefined,
      keystoreAlias: undefined,
      keystorePassword: undefined,
      keystoreAliasPassword: undefined,
    },
  },
  ios: {
    scheme: 'finance-whisper-app'
  }
};

export default config;
