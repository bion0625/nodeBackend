import bcrypt from 'bcrypt';
import mongoose from 'mongoose';
import { config } from '../config.js';

let users = [];

const Schema = new mongoose.Schema({
    username: {type: String},
    password: {type: String},
    name: {type: String},
    createdAt: {type: Date, default: Date.now},
    updatedAt: {type: Date, default: Date.now},
    delete: Boolean
});

const User = mongoose.model('User', Schema);

export const signup = async (req, res) => {
    const {username, password, name} = req.body;
    return User.create({username, password, name, delete: false}).then(data => {
        const {id} = data;
        return res.json({id});
    });
};

export const login = (req, res) => {
    console.log('ENTER MAIN');
    return res.end();
};