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
      const source = document.getElementById('search_result_template').innerHTML;
      const template = Handlebars.compile(source);  
      const html = template(data);
      document.getElementById('search_result_table').innerHTML = html;     
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
  
  const params = {
    donVi: donVi,
    chiNhanh: chiNhanh,
    tukhoa: tukhoa
  };
  await traCuuNhanVien(params);
});