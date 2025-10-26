const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  // Proxy for NocoDB API (with /api prefix)
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'http://localhost:3001',
      changeOrigin: true,
      secure: false,
    })
  );

  // Proxy for auth endpoints (without /api prefix)
  app.use(
    ['/login', '/logout'],
    createProxyMiddleware({
      target: 'http://localhost:3001',
      changeOrigin: true,
      secure: false,
    })
  );
};