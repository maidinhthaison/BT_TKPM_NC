import jwt from 'jsonwebtoken';
import { HTTP_CODE } from '../constant.js';
import { config } from '../config.js';
const TAG = 'authMiddleware OrderService: '
const authMiddleware = (req, res, next) => {
    console.log(TAG,req.headers);
    const bearer = req.headers.authorization.split(' ')[1];
    console.log(TAG,bearer);
   
    if(!bearer){
        console.log(TAG,'Not Found');
        
        return res.status(HTTP_CODE[404].code).json({
            message: HTTP_CODE[404].message
        })
    }
    jwt.verify(bearer, config.accessTokenSecret, (err, user) => {
        console.log(TAG,user);
        console.log(TAG,err);
        if(err){
            
            console.log(TAG, 'Access Token has expired, need call refresh token');
            return res.status(HTTP_CODE[403].code).json({
                message: HTTP_CODE[403].message
            })
        }
        if(listMaso.includes(user.maSo)){
            console.log(TAG, 'NEXT');
            next()
        }else {
            console.error(TAG, `Token verification failed: ${err.message}`);
            return res.status(HTTP_CODE[403].code).json({
                message: HTTP_CODE[403].message
            })
        }
    });
}
// mảng này là hard code các mã số nhân viên, quản lý và giám đốc để xác thực chuỗi access_token mà client
// gửi lên là ai?, chức vụ gì, thay vì sẽ phải có 1 trường là role, isAdmin...trong file json
// Những mã số của user có trong danh sách này sẽ truy cập được các service chỉ định
const listMaso = ['NV_1', 'NV_2', 'NV_3', 'QL_4', 'QL_5', 'GD_6' ];
export default authMiddleware;