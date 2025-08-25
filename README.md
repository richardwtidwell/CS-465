# CS 465 Module Eight Journal — Travlr Getaways

## Architecture
- Express vs. Angular SPA: The customer-facing site uses Express with Handlebars (HBS) templates to render HTML on the server. Routes map to controllers that fetch JSON from the API and pass it into views for dynamic rendering. The admin interface uses Angular as a single-page application (SPA): client-side routing via `router-outlet`, component-based UI, and stateful interactions without full page reloads. Express performs server-side rendering and navigation; Angular performs client-side rendering, navigation, and state management.
- Integration between tiers: Both the HBS site and the SPA call the same REST API under `/api/*`. The Express controllers use `fetch`/JSON to hydrate templates; Angular uses `HttpClient` with an interceptor to attach `Authorization` headers when logged in.
- Why MongoDB: A NoSQL document store fits trip data well (JSON-like documents, evolving fields), accelerates iteration without heavy migrations, and aligns with Node’s native JSON handling. Mongoose adds schemas, validation, and querying. This stack balances development speed and flexibility for content-driven features like trips/packages.

## Functionality
- JSON vs. JavaScript: JSON is a data-interchange format (strings, numbers, booleans, arrays, objects) and a subset of JavaScript syntax, but it is not executable code. In this project, the API returns JSON; Express consumes JSON to render HBS views; Angular consumes JSON to update components. JSON is the contract that ties the frontend (HBS/SPA) to the backend (Express/Mongoose).
- Refactoring examples and reusable UI:
  - Static HTML → HBS templates: Moved static pages to Handlebars with partials and server-fetched JSON so the customer site renders dynamic trip data.
  - Angular services and interceptor: Consolidated HTTP logic into `TripDataService` and `AuthenticationService`, and attached JWTs via an `HttpInterceptor`. This reduced duplication and centralized security concerns.
  - Reusable components/models: Built `TripCardComponent` once and reused it across listings; introduced shared models (`Trip`, `User`, `AuthResponse`) and a storage injection token (`BROWSER_STORAGE`) for consistent typing and storage access.
  - Protected endpoints: Introduced a single `authenticateJWT` middleware and applied it to multiple routes (`POST /api/trips`, `PUT /api/trips/:tripId`), keeping security DRY and consistent.

## Testing
- Methods and endpoints:
  - Public reads: `GET /api/trips`, `GET /api/trips/id/:tripId`, `GET /api/trips/:tripCode`.
  - Auth: `POST /api/register`, `POST /api/login` return a JWT.
  - Protected writes: `POST /api/trips` (create), `PUT /api/trips/:tripId` (update) require `Authorization: Bearer <token>`.
- Approach:
  - API smoke tests with Postman/curl for register/login, list, add, and update. Verified success responses and error codes (404, 401).
  - Security tests: Confirmed protected endpoints reject requests without tokens and with tampered tokens; checked CORS headers and OPTIONS preflight for the SPA domain.
  - SPA integration: In the browser dev tools Network tab, verified that `GET /api/trips` populates the listing, login stores the token, and the interceptor adds the `Authorization` header for `POST/PUT`. Confirmed UI gating (Login/Logout/Add/Edit) matches `isLoggedIn()` state.

## Reflection
I don’t use Angular with Express frequently at work, and I hadn’t worked with the full MEAN stack before. This project strengthened my understanding of Angular’s component model, routing, forms, dependency injection, and HTTP interceptors, alongside Express routing, Mongoose schemas, and Passport/JWT authentication. I also practiced cross-origin concerns, environment configuration, and protecting API endpoints.

This course broadened my full stack skill set and confidence building a working SPA on top of a REST API. I’m more marketable for roles that expect end-to-end delivery: designing API contracts, integrating NoSQL data models, implementing secure auth flows, and crafting maintainable frontends with reusable components and services.
