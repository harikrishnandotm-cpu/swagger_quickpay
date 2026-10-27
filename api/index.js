
const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const specPath = path.join(process.cwd(), 'quickpay-openapi.yaml');

if (!fs.existsSync(specPath)) {
  throw new Error(`OpenAPI file not found: ${specPath}`);
}

app.get('/openapi.yaml', (req, res) => {
  res.type('text/yaml').sendFile(specPath);
});

app.get('/health', (req, res) => {
  res.json({ status: 'UP' });
});

module.exports = app;
