// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  apiUrl: 'https://#{DOMAIN_NAME}#/api/',
  mailKey: '#{PROFILE_MAIL}',
  designSystem: {
    stylesheet: '#{DESIGN_SYSTEM_STYLESHEET_URL}#'
  },
  encription: {
    rsaKey: "#{RSA_PUBLIC_KEY}#"
  },
  assetsContext: 'https://#{DOMAIN_NAME}#',
  translationFiles: 'https://#{DOMAIN_NAME}#',
  storage: {
    key: '#{FRONTEND_STORAGE_KEY}#',
  },
  session: {
    channel: '#{FRONTEND_CHANNEL_SESSION_REFRESH}#',
    topic: '#{FRONTEND_TOPIC_SESSION_REFRESH}#'
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
