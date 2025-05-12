import jwt from 'jsonwebtoken';
import { HTTP_CODE } from '../constant.js';
import { config } from '../config.js';
const authMiddleware = (req, res, next) => {
    console.log('authMiddleware >>>>>>>>',req.headers);
    
    console.log('authMiddleware >>>>>>>>',req.headers.authorization.split(' ')[1]);
    
    const bearer = req.headers.authorization.split(' ')[1]
   
    if(!bearer){
        console.log('authMiddleware >>>>>>>>','Not Found');
        
        return res.status(HTTP_CODE[404].code).json({
            message: HTTP_CODE[404].message
        })
    }
    jwt.verify(bearer, config.accessTokenSecret, (err, user) => {
        console.log('authMiddleware USER>>>>>>>>',user);
        console.log('authMiddleware ERROR>>>>>>>>',err);
        if(err){
            
            console.log('Access Token has expired, need call refresh token');
            return res.status(HTTP_CODE[403].code).json({
                message: HTTP_CODE[403].message
            })
        }
        if(listMaso.includes(user.maSo)){
            console.log('authMiddleware >>>>>>>> NEXT');
            next()
        }else {
            console.error('authMiddleware >>>>>>>>Token verification failed:', err.message);
            return res.status(HTTP_CODE[403].code).json({
                message: HTTP_CODE[403].message
            })
        }
    });
}
// chỉ có giám đốc mới có quyền truy cập
const listMaso = ['GD_6'];
export default authMiddleware;