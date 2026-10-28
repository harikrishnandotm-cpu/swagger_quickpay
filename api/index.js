const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();

const specPath = path.join(process.cwd(), 'quickpay-openapi.yaml');
const BACKEND_URL = 'http://16.170.221.74:3000';

if (!fs.existsSync(specPath)) {
  throw new Error(`OpenAPI file not found: ${specPath}`);
}

app.get('/openapi.yaml', (req, res) => {
  res.type('text/yaml').sendFile(specPath);
});

app.get('/health', (req, res) => {
  res.json({ status: 'UP' });
});

// Proxy Swagger API requests to EC2
app.use('/backend', async (req, res) => {
  try {
    const backendPath = req.originalUrl.replace(/^\/backend/, '') || '/';
    const targetUrl = new URL(backendPath, BACKEND_URL);

    const headers = { ...req.headers };

    delete headers.host;
    delete headers.connection;
    delete headers['content-length'];

    const options = {
      method: req.method,
      headers
    };

    if (!['GET', 'HEAD'].includes(req.method)) {
      options.body = req;
      options.duplex = 'half';
    }

    const response = await fetch(targetUrl, options);

    res.status(response.status);

    response.headers.forEach((value, key) => {
      if (!['content-encoding', 'content-length', 'transfer-encoding', 'connection'].includes(key.toLowerCase())) {
        res.setHeader(key, value);
      }
    });

    const responseBody = Buffer.from(await response.arrayBuffer());
    res.send(responseBody);

  } catch (error) {
    console.error('EC2 proxy error:', error);

    res.status(502).json({
      message: 'Unable to connect to EC2 backend',
      error: error.message
    });
  }
});

module.exports = app;
