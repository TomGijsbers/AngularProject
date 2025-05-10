import { ApplicationConfig } from '@angular/core';
import { providePrimeNG } from 'primeng/config';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';
import { provideAuth0 } from '@auth0/auth0-angular';
import { environment } from '../environments/environment';
import Lara from '@primeng/themes/lara';


  const domain = environment.AUTH0_DOMAIN;
  const clientId = environment.AUTH0_CLIENT_ID;

export const appConfig: ApplicationConfig = {
  providers: [
    provideAnimationsAsync(),
    provideRouter(routes),
    provideHttpClient(),
    provideAuth0({
        domain: domain,
        clientId: clientId,
        authorizationParams: {
          redirect_uri: environment.redirectUri
        }
      }),
    providePrimeNG({
      theme: {
        preset: Lara,
        options: {
          /** zet dark‑mode UIT, altijd licht */
          darkModeSelector: false        // of 'none'
        }
      }
    }),
  ]
};
