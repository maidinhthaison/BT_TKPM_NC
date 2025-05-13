import jwt from 'jsonwebtoken';
import { HTTP_CODE } from '../constant.js';
import { config } from '../config.js';
const authMiddleware = (req, res, next) => {
    const TAG = 'authMiddleware Config service: '
    let headers =  req.headers;
    
    console.log(`${TAG} headers - ${JSON.stringify(headers, null,2)}`);
    const bearer = headers.authorization.split(' ')[1]
    console.log(`${TAG} Bearer - ${bearer}`);
    
   
    if(bearer == null){
        console.log(`${TAG} Bearer Not Found`);
        
        return res.status(HTTP_CODE[404].code).json({
            message: HTTP_CODE[404].message
        })
    }
    jwt.verify(bearer, config.accessTokenSecret, (err, user) => {
        console.log(`${TAG} USER >>> ${JSON.stringify(user, null, 2)}`);
        console.log(`${TAG} ERROR >>> ${err}`);
        if(err != null){
            console.log('Access Token has expired, need call refresh token');
            return res.status(HTTP_CODE[403].code).json({
                message: HTTP_CODE[403].message
            })
        }
        if(listMaso.includes(user.maSo)){
            console.log(`${TAG} NEXT`);
            next()
        }else {
            console.log(`${TAG} Token verification failed >>> ${err.message}`);
            return res.status(HTTP_CODE[403].code).json({
                message: HTTP_CODE[403].message
            })
        }
    });
}
// chỉ có giám đốc mới có quyền truy cập ConfigService
const listMaso = ['GD_6'];
export default authMiddleware;