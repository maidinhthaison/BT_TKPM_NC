import express from "express";
import { engine } from "express-handlebars";
import { routes } from "./routes/index.js";
import { config } from "../config.js";

const app = express();

app.use(express.static("src/public"));
app.use(express.json());

app.engine(".hbs", engine({ extname: ".hbs" }));
app.set("view engine", ".hbs");
app.set("views", "./src/views");

routes(app);

app.listen(config.port, () =>
  console.log(`Customer Client is listening on url ${config.url}`)
);
