import express from "express";
import { fileURLToPath } from "url";
import { dirname } from "path";
import { config } from "./config.js";
import Handlebars from "handlebars";
import { engine } from "express-handlebars";
import { apiClient } from "./client.js";
import { endPoint } from "./endpoint.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const app = express();
app.use(express.static("public"));
// Middleware to parse JSON and URL-encoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.engine(
  ".hbs",
  engine({
    extname: ".hbs",
    layoutsDir: __dirname + "/views/layouts",
    defaultLayout: "main",
    partialsDir: __dirname + "/views/partials/",
  })
);

// đăng ký hàm format tiền tệ để gọi trong handlebars
Handlebars.registerHelper("formatCurrency", (amount, locale, currency) => {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency: currency,
  }).format(amount);
});

app.set("view engine", ".hbs");
app.set("views", "./views");

// getAllRooms

app.get("/", async (req, res) => {
  try {
    const response = await apiClient.get(endPoint.getAllRoomsEndPoint);
    if (response.data.status == 'OK') {
       res.render("main", {
        layout: "index",
        listPhong: response.data.listPhong,
        status: response.data.status
      });
    }else {
        res.status(400).send("Lỗi 400 lấy dữ liệu thất bại");
    }

  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

app.get("/about", (req, res) => {
  res.render("about", { layout: "aboutLayout", cdnUrl : config.cdn_url });
});

app.get("/contact", (req, res) => {
  res.render("contact", 
    { 
      layout: "contactLayout",
      cdnUrl : config.cdn_url
    });
});

app.post("/search", async (req, res) => {
  try {
    const params = {
      keyword: req.body.inputSearch,
    } 
    console.log(`params: ${JSON.stringify(params, null, 2)}`);
    
    const response = await apiClient.post(endPoint.searchRoomsEndPoint, { params});
    console.log(`response: ${JSON.stringify(response.data, null, 2)}`);
    if (response.data.status == 'OK') {
      if (response.data.listPhong.length == 0) {
        res.render("main", {
          layout: "index",
          listPhong: [],
          message: "Không tìm thấy phòng nào",
          status: response.data.status
        });
      }else{
        res.render("main", {
          layout: "index",
          listPhong: response.data.listPhong,
          message: "",
          status: response.data.status
        });
      }
      
    }else {
        res.render("main", {
          layout: "index",
          listPhong: [],
          message: "Lỗi 400 lấy dữ liệu thất bại",
          status: response.data.status
        });
    }

  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

app.listen(config.port, () =>
  console.log(`Client Khach Hang is listening on ${config.host} port ${config.port}`)
);
