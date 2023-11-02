import bcrypt from 'bcrypt';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import { config } from '../config.js';

let users = [];

const Schema = new mongoose.Schema({
    username: {type: String, unique: true},
    password: {type: String},
    name: {type: String},
    createdAt: {type: Date, default: Date.now},
    updatedAt: {type: Date, default: Date.now},
    delete: Boolean
});

const User = mongoose.model('User', Schema);

export const signup = async (req, res) => {
    const {username, password, name} = req.body;
    return bcrypt.hash(password, config.HASHNUMBER).then(hashed =>{
        return User.create({username, password:hashed, name, delete: false}).then(data => {
            const {id} = data;
            const token = jwt.sign({id}, config.JWTSECRETKEY, {expiresIn:config.JWTEXPIRES});
            return res.json({token});
        });
    })
};

export const login = (req, res) => {
    const {username, password} = req.body;
    return User.findOne({username}).then(user => {
        return bcrypt.compare(password, user.password).then(loginCheck => {
            if(loginCheck){
                const token = jwt.sign({id:user.id}, config.JWTSECRETKEY, {expiresIn:config.JWTEXPIRES});
                return res.json({token});
            }else{
                return res.sendStatus(404);
            }
        })
    })
};

export const me = (req, res) => {
    const auth = req.get('Authorization');
    if(!auth)return res.sendStatus(404);
    const token = auth.split(' ')[1];
    const decode = jwt.verify(token, config.JWTSECRETKEY);
    if(decode?.id){
        req.userId = decode.id;
        return res.status(200).json({id:decode.id, token});
    }else{
        return res.sendStatus(404);
    }
}