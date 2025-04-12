import express from "express";
import { fileURLToPath } from "url";
import { dirname } from "path";
import { config } from "./config.js";
import { engine } from "express-handlebars";
import { apiClient } from "./client.js";
import { endPoint } from "./endpoint.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const app = express();
app.use(express.static("public"));
app.use(express.json());

app.engine(
  ".hbs",
  engine({
    extname: ".hbs",
    layoutsDir: __dirname + "/views/layouts",
    defaultLayout: "planB",
    partialsDir: __dirname + "/views/partials/",
  })
);

app.set("view engine", ".hbs");
app.set("views", "./views");


const fakeApi = () => {
  return [
    {
      name: "Katarina",
      lane: "midlaner",
    },
    {
      name: "Jayce",
      lane: "toplaner",
    },
    {
      name: "Heimerdinger",
      lane: "toplaner",
    },
    {
      name: "Zed",
      lane: "midlaner",
    },
    {
      name: "Azir",
      lane: "midlaner",
    },
  ];
};

// getAllRooms

app.get("/", async (req, res) => {
  try {
    const response = await apiClient.get(endPoint.getAllRoomsEndPoint);
    console.log(response.data);
    
    res.render("main", {
      layout: "index",
      listPhong: response.data.listPhong,
      status: response.data.status
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});
app.get("/login", (req, res) => {
  res.render("login", { layout: "loginLayout" });
});
app.get("/about", (req, res) => {
  res.render("about", { layout: "aboutLayout" });
});

app.get("/contact", (req, res) => {
  res.render("contact", { layout: "contactLayout" });
});

app.listen(config.port, () =>
  console.log(`Client Khach Hang is listening on url ${config.url}`)
);
