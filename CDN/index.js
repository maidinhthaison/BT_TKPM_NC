import express from "express";
import { config } from "./config.js";
const app = express();
app.use(express.static("public"));
app.listen(config.port, () =>
  console.log(`CDN is listening on ${config.host} port ${config.port}`)
);