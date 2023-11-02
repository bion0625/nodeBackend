import jwt from 'jsonwebtoken';
import { config } from '../config.js';

export const authMe = (req, res, next) => {
    const auth = req.get('Authorization');
    if(!auth)return res.sendStatus(404);
    const token = auth.split(' ')[1];
    const decode = jwt.verify(token, config.JWTSECRETKEY);
    if(decode?.id){
        req.userId = decode.id;
        next();
    }else{
        return res.sendStatus(404);
    }
}