const express = require("express");
const { createProxyMiddleware } = require("http-proxy-middleware");

const app = express();

app.use(
  "/",
  createProxyMiddleware({
    target: "http://localhost:5173",
    changeOrigin: true,
    ws: true,
    pathFilter: (pathname) => !pathname.startsWith("/lia"),
  })
);

app.use(
  "/lia",
  createProxyMiddleware({
    target: "http://localhost:3007/lia",
    changeOrigin: true,
    ws: true,
    pathRewrite: {
      "^/lia": "",
    },
  })
);

const PORT = 8080;
app.listen(PORT, () => {
  console.log(`Proxy server is running on http://localhost:${PORT}`);
});
