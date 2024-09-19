import { Request, Response } from 'express';
import { createUser, checkDataRegister, checkDataLogin, checkAdmin } from '../services/user-services';
import { createToken } from '../middleware/Authentication';
import cookieParser from 'cookie-parser';

// Add the following line to declare the module
async function loginGet(req: Request, res: Response) {
    res.render("login");
}
async function loginPost(req: Request, res: Response) {
    if (await checkDataLogin([{ username: req.body.username }, { password: req.body.password }])) {
        let token = createToken({ username: req.body.username });
        res.cookie('token', token, { maxAge: 900000, httpOnly: true });
        if ( await checkAdmin(req.body.username)) {
            res.redirect("/admin/list-news");
        } else{
            res.redirect("/");
        }
    }
}
async function registerGet(req: Request, res: Response) {
    res.render("register", {
        message: "",
    });
}
async function registerPost(req: Request, res: Response, next: Function) {
    if (await checkDataRegister([{ email: req.body.email }, { username: req.body.username }])) {
        createUser(req.body);
        res.redirect("/login");
    } else {
        res.render("register", {
            message: "Email hoặc tên đăng nhập đã tồn tại",
        });
        next();
    }
}
export { loginGet, registerGet, registerPost, loginPost };
