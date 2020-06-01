/* eslint-disable no-console */
type Config = {
  onSuccess?: (registration: ServiceWorkerRegistration) => void;
  onUpdate?: (registration: ServiceWorkerRegistration) => void;
};

export const registerServiceWorker = (config?: Config): void => {
  if (process.env.NODE_ENV === 'production' && 'serviceWorker' in navigator) {
    if (document.readyState === 'complete') {
      registerSW('/service-worker.js', config);
    } else {
      window.addEventListener('load', () => registerSW('/service-worker.js', config));
    }
  }
};

function registerSW(swUrl: string, config?: Config) {
  navigator.serviceWorker
    .register(swUrl)
    .then((registration) => {
      console.log('SW registered: ', registration);

      registration.onupdatefound = () => {
        const installingWorker = registration.installing;

        if (installingWorker == null) {
          return;
        }

        installingWorker.onstatechange = () => {
          if (installingWorker.state === 'installed') {
            if (navigator.serviceWorker.controller) {
              console.log('SW updated. New content is available.');

              if (config && config.onUpdate) {
                config.onUpdate(registration);
              }
            } else {
              console.log('SW installed. Content is cached for offline use.');

              if (config && config.onSuccess) {
                config.onSuccess(registration);
              }
            }
          }
        };
      };
    })
    .catch((registrationError) => {
      console.log('SW registration failed: ', registrationError);
    });
}
