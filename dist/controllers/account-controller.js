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
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginGet = loginGet;
exports.registerGet = registerGet;
exports.registerPost = registerPost;
exports.loginPost = loginPost;
const user_services_1 = require("../services/user-services");
const Authentication_1 = require("../middleware/Authentication");
// Add the following line to declare the module
function loginGet(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        return res.status(200).json({ message: 'Render login page' });
    });
}
function loginPost(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { username, password } = req.body;
            const isValidLogin = yield (0, user_services_1.checkDataLogin)([
                { username },
                { password },
                { status: 1 }
            ]);
            if (isValidLogin) {
                const token = (0, Authentication_1.createToken)({ username });
                res.cookie('token', token, { maxAge: 900000, httpOnly: true });
                const isAdmin = yield (0, user_services_1.checkAdmin)(username);
                if (isAdmin) {
                    return res
                        .status(200)
                        .json({ message: 'Login successful', redirect: '/admin/list-news' });
                }
                else {
                    return res
                        .status(200)
                        .json({ message: 'Login successful', redirect: '/' });
                }
            }
            else {
                return res.status(401).json({ message: 'Invalid login credentials' });
            }
        }
        catch (error) {
            return res.status(500).json({ message: 'Internal server error' });
        }
    });
}
function registerGet(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        res.status(200).json({ message: 'Render Register page' });
    });
}
function registerPost(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            if (yield (0, user_services_1.checkDataRegister)([
                { email: req.body.email },
                { username: req.body.username }
            ])) {
                (0, user_services_1.createUser)(req.body);
                return res
                    .status(200)
                    .json({ message: 'User registered successfully. Please log in.' });
            }
            else {
                return res
                    .status(409)
                    .json({ message: '.Email or username already exists.' });
            }
        }
        catch (error) {
            return res.status(500).json({ message: 'Internal server error' });
        }
    });
}
