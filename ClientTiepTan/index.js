import express from "express";
import { fileURLToPath } from "url";
import { dirname } from "path";
import { config } from "./config.js";
import { engine } from "express-handlebars";
import { apiUserClient, apiOrderClient } from "./client.js";
import { endPoint } from "./endPoint.js";
import { HTTP_CODE, MESSAGE } from "./constant.js";
import { LocalStorage } from "node-localstorage";
const localStorage = new LocalStorage("./scratch");

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

app.get("/", async (req, res) => {
  try {
    const access_token = localStorage.getItem("access_token");
    if (access_token === undefined || access_token === null) {
      res.redirect("/login");
    } else {
      console.log("Call API get order detail");
      const response = await apiOrderClient.get(endPoint.orderDetailEndPoint);
      const data = response.data
      const status = data.status;
      const user = localStorage.getItem('user');
      if (status == HTTP_CODE[200].code) {
        res.render("main", {
          layout: "index",
          user: JSON.parse(user),
          orderDetails: data.orderDetails,
          status: status,
        });
      } else {
        res.status(HTTP_CODE[400].code).send(MESSAGE.GET_DATA_FAIL);
      }
    }
  } catch (err) {
    console.error(err.message);
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
    };
    const response = await apiUserClient.post(endPoint.loginEndPoint, {
      params,
    });
    const data = response.data
    const status = data.status;
    const user = data.data.user;
    const accessToken = data.data.accessToken;
    localStorage.setItem("access_token", accessToken);
    localStorage.setItem("user", JSON.stringify(user, null, 2));
    if (status == HTTP_CODE[200].code) {
      if (accessToken) {
        res.render("main", {
          layout: "index",
          user: user,
          message: MESSAGE.LOGIN_SUCCESS,
          status: status,
        });
      } else {
        res.render("login", {
          layout: "loginLayout",
        });
      }
    } else {
      res.render("login", {
        layout: "loginLayout",
      });
    }
  } catch (err) {
    console.error(err.message);
    res.status(HTTP_CODE[500].code).send(HTTP_CODE[500].message);
  }
});

app.get('/detail', async (req, res) => {
  const orderId = req.query.id;
  try {
    console.log("Call API get order detail by id: ", orderId);
    const response = await apiOrderClient.get(`${endPoint.orderDetailByIdEndPoint}?oId=${orderId}`);
    const data = response.data
    const status = data.status;
    const user = localStorage.getItem('user');
    if (status == HTTP_CODE[200].code) {
      res.render("order_detail", {
        layout: "orderDetailLayout",
        user: JSON.parse(user),
        orderDetail: data.orderDetail,
        status: status,
      });
    } else {
      res.status(HTTP_CODE[400].code).send(MESSAGE.GET_DATA_FAIL);
    }      
  } catch (err) {
    console.error(err);
    res.status(HTTP_CODE[500].code).send(HTTP_CODE[500].message);
  }

});

app.listen(config.port, () =>
  console.log(`Client Tiep Tan is listening on url ${config.url}`)
);
