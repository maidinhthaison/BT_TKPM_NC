const { parseJson } = require('../controller/jsonController');

const getNhanVien = async (req, res, next) => {
    try{ 
       
        let arrayNhanVien = parseJson();
        let arrayDonVi = [];
        arrayNhanVien.forEach(dv => {
            let donvi = dv.Don_vi;
            arrayDonVi.push(donvi);
        })
        const uniqueArrayDonvi = arrayDonVi.filter((o, index, arrayDonVi) =>
            arrayDonVi.findIndex(item => JSON.stringify(item) === JSON.stringify(o)) === index
        );
        
        let arrayChiNhanh = [];
        arrayDonVi.forEach(dv => {
            let chinhanh = dv.Chi_nhanh;
            arrayChiNhanh.push(chinhanh);
        })
        const uniqueArrayChinhanh = arrayChiNhanh.filter((o, index, arrayChiNhanh) =>
            arrayChiNhanh.findIndex(item => JSON.stringify(item) === JSON.stringify(o)) === index
        );
    
        const response = {
            listDonVi : uniqueArrayDonvi,
            listChiNhanh : uniqueArrayChinhanh,
            listNhanVien : arrayNhanVien
        }
        res.status(200).send(response); 
    }catch(error){
        console.log(res.status);
        res.status(400).send(error.message);
    }
}

const traCuuNhanVien = async (req, res, next) => {
    try{ 
       
        const params = req.body.params;
        console.log(params);
        
        let arrayNhanVien = parseJson();
        let  result = arrayNhanVien.filter(nhanvien =>
            (nhanvien.Don_vi.Ma_so == params.donVi || nhanvien.Don_vi.Chi_nhanh.Ma_so == params.chiNhanh) &&
            nhanvien.Ho_ten.toLowerCase().includes(params.tukhoa.toLowerCase())
          );
        const response = {
        
            listNhanVien : result
        }
        console.log(response);
        res.status(200).send(response); 
    }catch(error){
        console.log(res.status);
        res.status(400).send(error.message);
    }
}

module.exports = { getNhanVien, traCuuNhanVien }