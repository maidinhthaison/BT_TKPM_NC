import "regenerator-runtime/runtime";
import Handlebars from "handlebars";
import { apiClient } from "./client";
import { endpoint } from "./endpoint";


const xulyLogin = async () => {
  const url = endpoint.dangNhapEndPoint;
  
  apiClient
    .post(url)
    .then((response) => {
    //   const data = response.data;
    //   const source = document.getElementById('template').innerHTML;
    //   const template = Handlebars.compile(source);  
    //   const html = template(data);
    //   document.getElementById('container').innerHTML = html;      
        const data = response.data;
        console.log(data);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
};

const form = document.getElementById("loginForm");
form.addEventListener("submit", async (event) => {
  event.preventDefault();
  const maso = document.getElementById("edt_maso").value;
  const mk = document.getElementById("edt_mk").value;

  const params = {
    maSo: maso,
    matKhau: mk,
  };
  await xulyLogin(params);
});

// const button = document.getElementById("btn");
// button.addEventListener("click",  async () => {
//   await traCuuNhanVien();
// });

// const getLoiChaoTen = async (params) => {
//   const url = endpoint.loichao;
//   apiClient
//     .post(url, {
//       params,
//     })
//     .then((response) => {
//       const res = response.data;
//       console.log(res);
//       document.getElementById(
//         "demo"
//       ).innerHTML = `Xin chào ${res.hoten} bạn ${res.tuoi} tuổi`;
//     })
//     .catch((error) => {
//       console.error("Error:", error);
//     });
// };
// const form = document.getElementById("form");
// form.addEventListener("submit", async (event) => {
//   event.preventDefault();
//   const hotenInput = document.getElementById("hoten");
//   const dateInput = document.getElementById("dateInput");

//   const params = {
//     hoten: hotenInput.value,
//     ngaysinh: dateInput.value,
//   };
//   await getLoiChaoTen(params);
// });