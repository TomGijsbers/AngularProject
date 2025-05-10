export const environment = {
  production: false,                       // in production.ts → true
  AUTH0_DOMAIN: 'dev-6cbzmmad8bpcv3o6.eu.auth0.com',
  AUTH0_CLIENT_ID: '6lSnjwwGJQ4cGxsv3DA3Jh4fJUeK7xVC',
  redirectUri: 'http://localhost:4200/callback',
  apiUrl: 'http://localhost:8080'
} as const;
