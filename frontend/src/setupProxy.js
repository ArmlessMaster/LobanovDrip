const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'https://drip-server.onrender.com/',
      changeOrigin: true,
    })
  );
  // app.use(
  //   '/api',
  //   createProxyMiddleware({
  //     target: 'http://localhost:5000',
  //     changeOrigin: true,
  //   })
  // );
  app.use(
    '/api-novaposhta',
    createProxyMiddleware({
      target: 'https://api.novaposhta.ua/v2.0/json',
      changeOrigin: true,
    })
  );
};