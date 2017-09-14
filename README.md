## Dashboard
The client dashboard for smsapi **version 5**. This provides a way for the client to get started and use the sms api services. This also enable them to manage and monitor the status of sent messages.

## Code Structure
- assets (styles, images, fonts, library)
- directives (custom directive)
- helpers (facilitates communication with the remote HTTP servers)
- providers (manage api GET/POST response)
- services (manage object data between controllers)
- templates (custom directive's markup)
- home
- signin
- signup
- source (mock data)
- .htaccess (alter server config for refresh due to the implementation of angularjs route)
- app.js (config dashboard application)
- app.uri.js (setting dashboard endpoints)
- index.html (main html)
- namespace.js (organize application modules)

## Installation
in the following files update the base url to your folder name:
- .htaccess
- index.html