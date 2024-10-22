const express = require("express");
const { createProxyMiddleware } = require("http-proxy-middleware");

require("dotenv").config();

const app = express();

const apiProxy = createProxyMiddleware({
  target: process.env.TARGET_API,
  changeOrigin: true,
  logger: console,
  secure: false,
});

app.use("/api", apiProxy);

const PORT = process.env.PORT || 5006;
app.listen(PORT, () => {
  console.log(`Proxy server is listening on http://localhost:${PORT}`);
});
