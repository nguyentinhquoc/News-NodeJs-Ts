"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createToken = createToken;
exports.verifyToken = verifyToken;
exports.Authentication = Authentication;
exports.Authorization = Authorization;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
require('dotenv').config();
const user_services_1 = require("../services/user-services");
function createToken(data) {
    if (process.env.SECRET_KEY !== undefined) {
        const token = jsonwebtoken_1.default.sign(data, process.env.SECRET_KEY, { expiresIn: '1h' });
        return token;
    }
}
function verifyToken(token) {
    if (process.env.SECRET_KEY !== undefined) {
        const decoded = jsonwebtoken_1.default.verify(token, process.env.SECRET_KEY);
        return decoded;
    }
}
function Authentication(req, res, next) {
    if (req.cookies.token !== undefined) {
        if (verifyToken(req.cookies.token)) {
            next();
        }
        else {
            res.redirect('/login');
        }
    }
    else {
        res.redirect('/login');
    }
}
function Authorization(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        if (req.cookies.token !== undefined) {
            if (yield (0, user_services_1.checkAdmin)(verifyToken(req.cookies.token).username)) {
                next();
            }
            else {
                res.redirect('/');
            }
        }
    });
}
