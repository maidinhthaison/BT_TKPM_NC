import jwt from 'jsonwebtoken';
import { HTTP_CODE } from '../constant.js';
import { config } from '../config.js';
const authMiddleware = (req, res, next) => {
    const headers = req.headers;

    const token = headers.authorization.split(' ')[1]
    
    if(!token){
        return res.status(HTTP_CODE[404].code).json({
            message: HTTP_CODE[404].message
        })
    }
    jwt.verify(token, config.accessTokenSecret, (err, user) => {
        if(err){
            return res.status(HTTP_CODE[404].code).json({
                message: HTTP_CODE[404].message
            })
        }
        if(listMaso.includes(user.maSo)){
            next()
        }else {
            return res.status(HTTP_CODE[404].code).json({
                message: HTTP_CODE[404].message
            })
        }
    });
}
// mảng này là hard code các mã số nhân viên, quản lý và giám đốc để xác thực chuỗi access_token mà client
// gửi lên là ai?, chức vụ gì, thay vì sẽ phải có 1 trường là role, isAdmin...trong file json
const listMaso = ['NV_1', 'NV_2', 'NV_3', 'QL_4', 'QL_5', 'GD_6' ];
export default authMiddleware;