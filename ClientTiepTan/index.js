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

const TAG = "Client Tiep Tan: ";

app.get("/", async (req, res) => {
  try {
    const access_token = localStorage.getItem("access_token");

    if (access_token === null) {
      res.redirect("/login");
    } else {
      console.log(TAG, "Call API get order detail");
      const response = await apiOrderClient.get(endPoint.orderDetailEndPoint);
      const data = response.data;
      const status = data.status;
      const user = localStorage.getItem("user");
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
    console.error(TAG, `Error: >>> ${err.message}`);
    const status = err.status;
    if (status === HTTP_CODE[403].code) {
      res.status(HTTP_CODE[403].code).send(HTTP_CODE[403].message);
      // call refresh token
      const refreshToken = localStorage.getItem("refresh_token");
      console.log(TAG, `Call refresh token , ${refreshToken}`);
      const resp = await apiUserClient.post(
        endPoint.getNewAccessTokenEndPoint,
        { refresh_token: refreshToken }
      );
      console.log(TAG, JSON.stringify(resp.data, null, 2));
      const dataResp = resp.data;
      if (dataResp.status === HTTP_CODE[200].code) {
        const newAcccessToken = dataResp.access_token;
        localStorage.setItem("access_token", newAcccessToken);
        // Continue call order detail
        console.log("Continue call order detail");
        const orderDetailResp = await apiOrderClient.get(
          endPoint.orderDetailEndPoint
        );
        const data = orderDetailResp.data;
        const status = data.status;
        const user = localStorage.getItem("user");
        res.render("main", {
          layout: "index",
          user: JSON.parse(user),
          orderDetails: data.orderDetails,
          status: status,
        });
      }
    }
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
    const refreshToken = data.data.refreshToken;
    localStorage.setItem("access_token", accessToken);
    localStorage.setItem("refresh_token", refreshToken);
    localStorage.setItem("user", JSON.stringify(user, null, 2));
    if (status == HTTP_CODE[200].code) {
      if (accessToken) {
        console.log("1111");
        res.render("main", {
          layout: "index",
          user: user,
          message: MESSAGE.LOGIN_SUCCESS,
          status: status,
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

app.get("/detail", async (req, res) => {
  const orderId = req.query.id;
  try {
    console.log("Call API get order detail by id: ", orderId);
    const response = await apiOrderClient.get(
      `${endPoint.orderDetailByIdEndPoint}?oId=${orderId}`
    );
    const data = response.data;
    const status = data.status;
    console.log("res>>> detail", JSON.stringify(data.orderDetail, null, 2));
    const user = localStorage.getItem("user");
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
        keyword: req.body.inputSearch,
      });
      const data = response.data;
      const status = data.status;
      const user = localStorage.getItem("user");
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
    console.error(`Error: >>> ${err.message}`);
    res.status(HTTP_CODE[500].code).send(HTTP_CODE[500].message);
  }
});
/**
 * Update Order By Id
 */
app.post("/updateOrderDetail", async (req, res) => {
  try {
    const access_token = localStorage.getItem("access_token");

    if (access_token === null) {
      res.redirect("/login");
    } else {
      console.log("Call Update order API");
      const params = {
        orderId: req.body.edt_orderId,
        tongtien: req.body.edt_tongTien,
        ngayThue: req.body.edt_ngayThue,
        ngayTra: req.body.edt_ngayTra,
      };
      console.log(JSON.stringify(params, null, 2));

      const response = await apiOrderClient.post(
        endPoint.updateOrderById,
        params
      );

      const data = response.data;
      const status = data.status;
      const user = localStorage.getItem("user");
      if (status == HTTP_CODE[200].code) {
        res.render("order_detail", {
          layout: "orderDetailLayout",
          user: JSON.parse(user),
          orderDetail: data.orderDetail,
          status: status,
          toastMessage: "Cập nhật đơn hàng thành công",
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
app.get("/login", (req, res) => {
  res.render("login", { layout: "loginLayout" });
});

app.listen(config.port, () =>
  console.log(`Client Tiep Tan is listening on url ${config.url}`)
);
