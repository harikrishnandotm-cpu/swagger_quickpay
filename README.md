# QuickPay API Docs

React-based interactive API documentation for QuickPay, powered by Swagger UI.

## Install dependencies

```bash
npm install
```

## Develop the React app

Start the API/spec server in one terminal:

```bash
npm run api
```

Then start Vite in another terminal:

```bash
npm run dev
```

Vite serves the app at http://localhost:5173 and proxies the OpenAPI spec to the API server.

## Build and run

```bash
npm run build
npm run api
```

Open http://localhost:9000.

The Express server serves the React production build and the OpenAPI specification.

## API specification

`quickpay-openapi.yaml`

**Note:** The QuickPay backend must be running to test endpoints using **Try it out**.
