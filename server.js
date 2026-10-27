
const express = require('express');
const path = require('path');

const app = express();
const PORT = 9000;

const specPath = path.join(__dirname, 'quickpay-openapi.yaml');
const distPath = path.join(__dirname, 'dist');

app.get('/openapi.yaml', (req, res) => {
  res.type('text/yaml').sendFile(specPath);
});

app.get('/health', (req, res) => {
  res.json({ status: 'UP' });
});

app.use(express.static(distPath));

app.get('*path', (req, res) => {
  res.sendFile(path.join(distPath, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`QuickPay API docs: http://localhost:${PORT}`);
  console.log(`OpenAPI YAML: http://localhost:${PORT}/openapi.yaml`);
});
