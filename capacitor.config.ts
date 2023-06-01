import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.scolarite.app',
  appName: 'Scolarite',
  webDir: 'dist/my-app',
  bundledWebRuntime: false,
  server: {
    androidScheme: 'http',
    cleartext: true,
  
    
  }
};

export default config;
