import "regenerator-runtime/runtime";
import Handlebars from "handlebars";
const { apiClient } = require("./client");
const { endpoint } = require("./endpoint");


const getNhanVien = async () => {
  const url = endpoint.getNhanNv;
  console.log(url);
  
  apiClient
    .get(url)
    .then((response) => {
      const data = response.data;
      const source = document.getElementById('template').innerHTML;
      const template = Handlebars.compile(source);  
      const html = template(data);
      document.getElementById('container').innerHTML = html;      
    })
    .catch((error) => {
      console.error("Error:", error);
    });
};
window.addEventListener("load", async (event) => {
  await getNhanVien();
});


const traCuuNhanVien = async (params) => {
  const url = endpoint.traCuuNv;
  
  apiClient
    .post(url, {
         params,
     })
    .then((response) => {
      const data = response.data;
    })
    .catch((error) => {
      console.error("Error:", error);
    });
};

const form = document.getElementById("frm");
form.addEventListener("submit", async (event) => {
  event.preventDefault();
  let cbDonVi = document.getElementById("cbDonVi");
  let cbChiNhanh = document.getElementById("cbChiNhanh");
  let donVi = cbDonVi.options[cbDonVi.selectedIndex].id;
  let chiNhanh = cbChiNhanh.options[cbChiNhanh.selectedIndex].id;
  let tukhoa = document.getElementById("tukhoa").value;
  console.log(donVi);
  console.log(chiNhanh);
  console.log(tukhoa);
  
  const params = {
    donVi: donVi,
    chiNhanh: chiNhanh,
    tukhoa: tukhoa
  };
  await traCuuNhanVien(params);
});









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
