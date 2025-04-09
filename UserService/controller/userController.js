import { xuLyDangNhap } from "../services/UserService.js";
import path from "path";
import { config } from "../config.js";
var pathFile = path.join("Du_Lieu_Khach_San", "Media");
// const getNhanVien = async (req, res, next) => {
//     try{

//         let arrayNhanVien = parseJson();
//         let arrayDonVi = [];
//         arrayNhanVien.forEach(dv => {
//             let donvi = dv.Don_vi;
//             arrayDonVi.push(donvi);
//         })
//         const uniqueArrayDonvi = arrayDonVi.filter((o, index, arrayDonVi) =>
//             arrayDonVi.findIndex(item => JSON.stringify(item) === JSON.stringify(o)) === index
//         );

//         let arrayChiNhanh = [];
//         arrayDonVi.forEach(dv => {
//             let chinhanh = dv.Chi_nhanh;
//             arrayChiNhanh.push(chinhanh);
//         })
//         const uniqueArrayChinhanh = arrayChiNhanh.filter((o, index, arrayChiNhanh) =>
//             arrayChiNhanh.findIndex(item => JSON.stringify(item) === JSON.stringify(o)) === index
//         );

//         const response = {
//             listDonVi : uniqueArrayDonvi,
//             listChiNhanh : uniqueArrayChinhanh,
//             listNhanVien : arrayNhanVien
//         }
//         res.status(200).send(response);
//     }catch(error){
//         console.log(res.status);
//         res.status(400).send(error.message);
//     }
// }

// const traCuuNhanVien = async (req, res, next) => {
//     try{

//         const params = req.body.params;
//         console.log(params);

//         let arrayNhanVien = parseJson();
//         let  result = arrayNhanVien.filter(nhanvien =>
//             (nhanvien.Don_vi.Ma_so == params.donVi || nhanvien.Don_vi.Chi_nhanh.Ma_so == params.chiNhanh) &&
//             nhanvien.Ho_ten.toLowerCase().includes(params.tukhoa.toLowerCase())
//           );
//         result.forEach(nv => {
//             nv.imagePath = config.url + '/' + pathFile + '/' + nv.Ma_so + '.png'
//         })
//         const response = {

//             listNhanVien : result
//         }

//         console.log(response);

//         res.status(200).send(response);
//     }catch(error){
//         console.log(res.status);
//         res.status(400).send(error.message);
//     }
// }
export const dangNhap = async (req, res, next) => {
  try {
    const params = req.body.params;
    console.log(`Params: ${JSON.stringify(params)}`);
    
    // let arrayNhanVien = parseJson();
    // let  result = arrayNhanVien.filter(nhanvien =>
    //     (nhanvien.Don_vi.Ma_so == params.donVi || nhanvien.Don_vi.Chi_nhanh.Ma_so == params.chiNhanh) &&
    //     nhanvien.Ho_ten.toLowerCase().includes(params.tukhoa.toLowerCase())
    //   );
    // result.forEach(nv => {
    //     nv.imagePath = config.url + '/' + pathFile + '/' + nv.Ma_so + '.png'
    // })
    const response = await xuLyDangNhap(params.maSo, params.matKhau); 
    res.status(200).send(response);
  } catch (error) {
    console.log(res.status);
    res.status(400).send(error.message);
  }
};
