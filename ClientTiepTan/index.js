import express from "express";
import { fileURLToPath } from "url";
import { dirname } from "path";
import { config } from "./config.js";
import { engine } from "express-handlebars";
import { apiClient } from "./client.js";
import { endPoint } from "./endPoint.js";
import { log } from "console";

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

app.set("view engine", ".hbs");
app.set("views", "./views");

// Quản lý phiếu thuê phòng

app.get("/", async (req, res) => {
  try {
    // const response = await apiClient.get(endPoint.getAllRoomsEndPoint);
    // if (response.data.status == 'OK') {
    //    res.render("main", {
    //     layout: "index",
    //     listPhong: response.data.listPhong,
    //     status: response.data.status
    //   });
    // }else {
    //     res.status(400).send("Lỗi 400 lấy dữ liệu thất bại");
    // }
    res.render("main", {
            layout: "index"
          });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});
app.get("/login", (req, res) => {
  res.render("login", { layout: "loginLayout" });
});

app.post("/login", async (req, res) => {
  try {
    const params = {
      maSo: req.body.edt_maso,
      matKhau: req.body.edt_mk,
    } 
    console.log(`params: ${JSON.stringify(params, null, 2)}`);
    
    const response = await apiClient.post(endPoint.loginEndPoint, {params});
  
    console.log(`response: ${JSON.stringify(response.data, null, 2)}`);
    if (response.data.status == 'OK') {
      if (response.data.user) {
        res.render("login", {
          layout: "loginLayout",
          user: response.data.user,
          message: "Đăng nhập thành công",
          status: response.data.status
        });
      }else{
        res.render("login", {
          layout: "loginLayout",
          user: {},
          message: "Đăng nhập thất bại",
          status: response.data.status
        });
      }
      
    }else {
        res.render("login", {
          layout: "loginLayout",
          user: {},
          message: "Lỗi 400 đăng nhập thất bại",
          status: response.data.status
        });
    }

  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

app.listen(config.port, () =>
  console.log(`Client Tiep Tan is listening on url ${config.url}`)
);
