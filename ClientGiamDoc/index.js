import express from "express";
import { fileURLToPath } from "url";
import { dirname } from "path";
import { config } from "./config.js";
import Handlebars from 'handlebars';
import { engine } from "express-handlebars";
import { apiUserClient, apiStatisticClient, apiOrderClient, apiConfigClient } from "./client.js";
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

Handlebars.registerHelper('formatCurrency', (amount, locale, currency) => {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency: currency,
  }).format(amount);
});

Handlebars.registerHelper('findById', (array, id, options) => {
  const item = array.find(el => el.id === id);
  return item ? options.fn(item) : options.inverse(this);
});

Handlebars.registerHelper('equals', (a, b) => {
  return a === b;
});

app.set("view engine", ".hbs");
app.set("views", "./views");

app.get("/", async (req, res) => {
  try {
    const access_token = localStorage.getItem("access_token");
    console.log('access_token >>>', access_token);
    
    if (access_token === null) {
      res.redirect("/login");
    } else {
    
      const user = localStorage.getItem('user');
      res.render("main", {
        layout: "index",
        user: JSON.parse(user)
      });
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
    
    const data = response.data
    const status = data.status;
    const user = data.data.user;
    const accessToken = data.data.accessToken;
    localStorage.setItem("access_token", accessToken);
    localStorage.setItem("user", JSON.stringify(user, null, 2));
    if (status == HTTP_CODE[200].code) {
      if (accessToken) {
        console.log('1111');
        res.render("main", {
          layout: "index",
          user: user,
          message: MESSAGE.LOGIN_SUCCESS,
          status: status,
          loginToastMessage: "Cập nhật thành công"
        });
       res.redirect('/');
      } else {
        console.log('2222');
        res.render("login", {
          layout: "loginLayout",
        });
      }
    } else {
      console.log('3333');
      res.render("login", {
        layout: "loginLayout",
      });
    }
  } catch (err) {
    console.log('4444');
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
      console.log("Call get statistic by month and year API");
      const params = {
        month: req.body.edt_month,
      };
      // Reponse Month
      const response = await apiStatisticClient.post(
        endPoint.getStatisticByMonth,
        params
      );
      const data = response.data;
      const status = data.status;
      
      // Reponse Year
      const responseYear = await apiStatisticClient.post(
        endPoint.getStatisticByYear,
        params
      );
      const dataYear = responseYear.data;
      const statusYear = dataYear.status;
      
      const user = localStorage.getItem("user");

      if (status == HTTP_CODE[200].code && statusYear== HTTP_CODE[200].code) {
        res.render("main", {
          layout: "index",
          user: JSON.parse(user),
          statisticMonth: data.statistic,
          summaryMonth: data.summary,
          statisticYear: dataYear.statistic,
          summaryYear: dataYear.summary,
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
    res.render("login", { layout: "loginLayout", title: "Đăng nhập" });
});

app.get("/tracuu", (req, res) => {
  const user = localStorage.getItem('user');
  res.render("tracuu", { layout: "tracuuLayout", title: "Tra cứu", user: JSON.parse(user) });
});

app.get("/quanlygia", async (req, res) => {
  const user = localStorage.getItem('user');
  let  loaiPhongId = req.query.id;
  try {
    const access_token = localStorage.getItem("access_token");
    console.log('access_token >>>', access_token);
    
    if (access_token === null) {
      res.redirect("/login");
    } else {
      console.log("Call Get ALl LoaiPhong API");
  
      const response = await apiConfigClient.get(endPoint.getALlLoaiPhong)
      const data = response.data;
      
      const user = localStorage.getItem('user');
   
      if(loaiPhongId === undefined){
        loaiPhongId = data.arrayLoaiPhong[0].id;
      }
      let item = data.arrayLoaiPhong.find(item => item.id === loaiPhongId);
      if(item){
        item.selected = true;
      }
     
      res.render("quanlygia", { 
        layout: "quanlygiaLayout", 
        title: "Quản lý cấu hình", 
        user: JSON.parse(user),
        arrayLoaiPhong : data.arrayLoaiPhong,
        loaiPhongId: loaiPhongId
      });
    }
  } catch (err) {
    
    console.error(`Error: >>> ${err.message}`);
    res.status(HTTP_CODE[500].code).send(HTTP_CODE[500].message);
  }
  
});
/**
 * Update giá
 */
app.post("/capNhatCauHinh", async (req, res) => {
  const user = localStorage.getItem('user');
  let  params = req.body
  let  loaiPhongId = req.query.id;
  try {
    const access_token = localStorage.getItem("access_token");
    console.log('access_token >>>', access_token);
    
    if (access_token === null) {
      res.redirect("/login");
    } else {
      console.log("Call Update price API");
  
      const response = await apiConfigClient.post(endPoint.capNhatGia, params)
      const data = response.data;
    
      const user = localStorage.getItem('user');
   
      if(loaiPhongId === undefined){
        loaiPhongId = data.arrayLoaiPhong[0].id;
      }
      let item = data.arrayLoaiPhong.find(item => item.id === loaiPhongId);
      if(item){
        item.selected = true;
      }
     
      res.render("quanlygia", { 
        layout: "quanlygiaLayout", 
        title: "Quản lý cấu hình", 
        user: JSON.parse(user),
        arrayLoaiPhong : data.arrayCauHinh,
        arrayCauHinh : data.arrayCauHinh,
        loaiPhongId: data.loaiPhongId,
        updateMessageToast : 'Cập nhật thành công'
      });
    }
  } catch (err) {
    
    console.error(`Error: >>> ${err.message}`);
    res.status(HTTP_CODE[500].code).send(HTTP_CODE[500].message);
  }
  
});

app.listen(config.port, () =>
  console.log(`Client Giám đốc is listening on url ${config.url}`)
);
