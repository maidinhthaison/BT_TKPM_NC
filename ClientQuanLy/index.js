import express from "express";
import { fileURLToPath } from "url";
import { dirname } from "path";
import { config } from "./config.js";
import Handlebars from "handlebars";
import { engine } from "express-handlebars";
import { apiUserClient, apiStatisticClient, apiOrderClient } from "./client.js";
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
// đăng ký hàm format tiền tệ để gọi trong handlebars
Handlebars.registerHelper("formatCurrency", (amount, locale, currency) => {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency: currency,
  }).format(amount);
});


app.set("view engine", ".hbs");
app.set("views", "./views");

// Thống kê
app.get("/", (req, res) => {
  const user = localStorage.getItem("user");
  res.render("main", {
    layout: "index",
    user: JSON.parse(user),
  });
});
// Tra cứu
app.get("/tracuu", async (req, res) => {
  try {
    const access_token = localStorage.getItem("access_token");
    
    if (access_token === null) {
      res.redirect("/login");
    } else {
      console.log("Call API get order detail");
      const response = await apiOrderClient.get(endPoint.orderDetailEndPoint);
      const data = response.data
      const status = data.status;
      const user = localStorage.getItem('user');
    
      if (status == HTTP_CODE[200].code) {
        res.render("tracuu", {
          layout: "traCuuLayout",
          user: JSON.parse(user),
          orderDetails: data.orderDetails,
          status: status
        });
      } else {
        res.status(HTTP_CODE[400].code).send(MESSAGE.GET_DATA_FAIL);
      }
      

    }
  } catch (err) {
    
    console.error(`Error: >>> ${err.message}`);
    res.status(HTTP_CODE[500].code).send(HTTP_CODE[500].message);
  }
});

app.post("/login", async (req, res) => {
  try {
    const response = await apiUserClient.post(endPoint.loginEndPoint, {
      maSo: req.body.edt_maso,
      matKhau: req.body.edt_mk,
    });

    const data = response.data;
    const status = data.status;
    const user = data.data.user;
    const accessToken = data.data.accessToken;
    localStorage.setItem("access_token", accessToken);
    localStorage.setItem("user", JSON.stringify(user, null, 2));
    if (status == HTTP_CODE[200].code) {
      if (accessToken) {
        console.log("1111");
        res.render("main", {
          layout: "index",
          user: user,
          message: MESSAGE.LOGIN_SUCCESS,
          status: status,
          loginToastMessage: "Đăng nhập thành công",
        });
        res.redirect("/");
      } else {
        console.log("2222");
        res.render("login", {
          layout: "loginLayout",
        });
      }
    } else {
      console.log("3333");
      res.render("login", {
        layout: "loginLayout",
      });
    }
  } catch (err) {
    console.log("4444");
    console.error(err.message);
    res.status(HTTP_CODE[500].code).send(HTTP_CODE[500].message);
  }
});

app.post("/statistic", async (req, res) => {
  try {
    const access_token = localStorage.getItem("access_token");

    if (access_token === null) {
      res.redirect("/login");
    } else {
      console.log("Call get statistic by month API");
      const params = {
        month: req.body.edt_month,
      };

      const response = await apiStatisticClient.post(
        endPoint.getStatisticByMonth,
        params
      );

      const data = response.data;
      const status = data.status;
      const user = localStorage.getItem("user");
      if (status == HTTP_CODE[200].code) {
        res.render("main", {
          layout: "index",
          user: JSON.parse(user),
          statistic: data.statistic,
          summary: data.summary,
          status: status,
        });
      } else {
        res.status(HTTP_CODE[400].code).send(HTTP_CODE[400].message);
      }
    }
  } catch (err) {
    console.error(`Error: >>> ${err.message}`);
    res.status(HTTP_CODE[500].code).send(HTTP_CODE[500].message);
  }
});
/**
 * Search Order
 */
/**
 * Search Order
 */
app.post("/search", async (req, res) => {
  try {
    const access_token = localStorage.getItem("access_token");
    
    if (access_token === null) {
      res.redirect("/login");
    } else {
      console.log("Call Search order API");
  
      const response = await apiOrderClient.post(endPoint.searchOrder, {
        keyword: req.body.inputSearch
      });
      const data = response.data
      const status = data.status;
      const user = localStorage.getItem('user');
     
      if (status == HTTP_CODE[200].code) {
        res.render("tracuu", {
          layout: "traCuuLayout",
          user: JSON.parse(user),
          orderDetails: data.orderDetails,
          status: status
        });
        
      } else {
        res.status(HTTP_CODE[400].code).send(MESSAGE.GET_DATA_FAIL);
      }
    }
  } catch (err) {
    console.error(`Error: >>> ${err.message}`);
    res.status(HTTP_CODE[500].code).send(HTTP_CODE[500].message);
  }
});

app.get("/login", (req, res) => {
  res.render("login", { layout: "loginLayout" });
});

app.listen(config.port, () =>
  console.log(`Client Quản Lý is listening on url ${config.url}`)
);
