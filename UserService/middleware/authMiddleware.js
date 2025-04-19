import jwt from 'jsonwebtoken'
import { HTTP_CODE } from '../constant.js'
import { config } from '../config.js'
const authMiddleware = (req, res, next) => {
    const token = req.headers.token.split(' ')[1]
    const result = filterByMaSoList(createNhanVienList, maSoTiepTan);
    console.log(`result: ${JSON.stringify(result, null, 2)}`);
    if(!token){
        return res.status(HTTP_CODE[400].code).json({
            message: 'Token is valid'.join(HTTP_CODE[400].message)
        })
    }
    jwt.verify(token, config.accessTokenSecret, function(err, user) {
        if(err){
            return res.status(HTTP_CODE[403].code).json({
                message: 'The user is not authentication'.join(HTTP_CODE[403].message)
            })
        }
        console.log(`user: ${JSON.stringify(user, null, 2)}`);
        
        // if(user.isAdmin){
        //     next()
        // }else {
        //     return res.status(404).json({
        //         message: 'The user is not authentication'
        //     })
        // }
    });
}
const parseJson = () => {
  let fileContent = fs.readFileSync(`./${pathNVJson}/${jsonFile}`, "utf8");
  return JSON.parse(fileContent);
};
function createNhanVienList() {
  const nhanVienArray = parseJson();
  return nhanVienArray.map(
    (item) =>
      new User(
        item.hoTen,
        item.maSo,
        item.tenDangNhap,
        item.matKhau,
        item.dienThoai,
        item.khuVuc
      )
  );
}

const maSoTiepTan = ["NV_1", "NV_2", 'NV_3'];

const filterByMaSoList = (array, maSoList) => {
  return array.filter(user => maSoList.includes(user.maSo));
};
export default authMiddleware