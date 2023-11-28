import {createProxyMiddleware} from "http-proxy-middleware";

module.exports = function (app) {
  app.use(
    createProxyMiddleware("/", {
      target: "http://localhost:8080",
      changeOrigin: true,
    })
  );

  app.use(
    createProxyMiddleware("/googleapi", {
      target: "https://maps.googleapis.com",
      changeOrigin: true,
    })
  );
};