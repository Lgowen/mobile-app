import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.mobile.app',
  appName: 'mobile-app',
  webDir: 'dist',
  server: {
    androidScheme: 'https',
  },
};

export default config;
