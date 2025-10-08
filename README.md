/// CarSharing Tech Test (2025) ///

Install dependencies: npm install;
Start the dev server: npm run dev;

/// Test Instructions ///

Run all unit and integration tests: npm test;
Run tests once (e.g., for CI): npm test -- --run;
Open interactive test UI (recommended for development): npm run test:ui

/// Backend (Mock API) ///

The app uses a fully mocked API (src/api/mock-api.ts) that simulates:
/api/flags → feature flags
/api/rides → ride data
No separate backend process is needed — all data is served in-memory.

/// Technical Decisions & Trade-offs ///

State Management: Zustand
Chosen over Context API or Redux Toolkit for its simplicity, minimal boilerplate, and excellent React 18+ support.
Perfect for small-to-medium apps with isolated state (like feature flags).

/// UI Library: antd-mobile ///

Provides mobile-optimized, accessible components out of the box.

/// Routing: React Router v6 ///
Standard for React apps; enables clean page navigation (/passenger, /driver, /settings).

/// Testing: Vitest + React Testing Library ///
Vitest: Blazing fast, Vite-native test runner.
