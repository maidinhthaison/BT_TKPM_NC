const xuatLoiChaoTenTuoi = async (req, res, next) => {
    try{ 
       
        const params = req.body.params;
        let currentYear = new Date().getFullYear();
        let birthYear = new Date(params.ngaysinh).getFullYear();
        let tuoi = tinhTuoi(birthYear,currentYear)
        let objectResponse = {
            hoten : params.hoten,
            tuoi : tuoi
        }
       
        res.status(200).send(objectResponse); 
    }catch{
        console.log(res.status);
        res.status(400).send(error.message);
    }
}
function tinhTuoi(birthYear, currentYear){

    return currentYear - birthYear;
    
}

module.exports = { xuatLoiChaoTenTuoi }