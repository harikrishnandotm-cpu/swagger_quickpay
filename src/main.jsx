import React from 'react';
import { createRoot } from 'react-dom/client';
import SwaggerUI from 'swagger-ui-react';
import 'swagger-ui-react/swagger-ui.css';
import './styles.css';

function App() {
  return (
    <main>
      <header className="app-header">
        <a className="brand" href="/" aria-label="QuickPay API documentation home">
          <span className="brand-mark" aria-hidden="true">Q</span>
          <span>QuickPay <span className="brand-subtitle">API DOCS</span></span>
        </a>
        <a className="spec-link" href="/openapi.yaml" target="_blank" rel="noreferrer">
          View OpenAPI spec
        </a>
      </header>
      <SwaggerUI
        url="/openapi.yaml"
        docExpansion="list"
        persistAuthorization
        deepLinking
      />
    </main>
  );
}

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
