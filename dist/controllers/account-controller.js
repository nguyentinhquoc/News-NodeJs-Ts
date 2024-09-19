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
        res.render("login");
    });
}
function loginPost(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        if (yield (0, user_services_1.checkDataLogin)([{ username: req.body.username }, { password: req.body.password }])) {
            let token = (0, Authentication_1.createToken)({ username: req.body.username });
            res.cookie('token', token, { maxAge: 900000, httpOnly: true });
            if (yield (0, user_services_1.checkAdmin)(req.body.username)) {
                res.redirect("/admin/list-news");
            }
            else {
                res.redirect("/");
            }
        }
    });
}
function registerGet(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        res.render("register", {
            message: "",
        });
    });
}
function registerPost(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        if (yield (0, user_services_1.checkDataRegister)([{ email: req.body.email }, { username: req.body.username }])) {
            (0, user_services_1.createUser)(req.body);
            res.redirect("/login");
        }
        else {
            res.render("register", {
                message: "Email hoặc tên đăng nhập đã tồn tại",
            });
            next();
        }
    });
}
