import jwt from 'jsonwebtoken'
import { HTTP_CODE, MESSAGE } from '../constant.js'
import { config } from '../config.js'
const authMiddleware = (req, res, next) => {
    const token = req.headers.token.split(' ')[1]
    console.log(`authMiddleware: ${token}`);
    
    if(!token){
        return res.status(HTTP_CODE[404].code).json({
            message: 'Token is valid'.join(HTTP_CODE[404].message)
        })
    }
    jwt.verify(token, config.accessTokenSecret, (err, user) => {
        if(err){
            return res.status(HTTP_CODE[403].code).json({
                message: HTTP_CODE[403].message
            })
        }
        console.log(`authMiddleware: ${JSON.stringify(user, null, 2)}`);
        
        if(maSoTiepTan.includes(user.maSo)){
            next()
        }else {
            return res.status(HTTP_CODE[403].code).json({
                message: HTTP_CODE[403].message
            })
        }
    });
}


const maSoTiepTan = ["NV_1", "NV_2", 'NV_3'];

export default authMiddleware