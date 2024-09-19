"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const home_controller_1 = require("../controllers/user/home-controller");
const detail_controller_1 = require("../controllers/user/detail-controller");
const account_controller_1 = require("../controllers/account-controller");
const users_admin_controller_1 = require("../controllers/admin/users-admin-controller");
const comments_admin_controller_1 = require("../controllers/admin/comments-admin-controller");
const news_admin_controller_1 = require("../controllers/admin/news-admin-controller");
const function_local_1 = require("../untils/function-local");
const news_admin_controller_2 = require("../controllers/admin/news-admin-controller");
const Authentication_1 = require("../middleware/Authentication");
const routerWeb = (app) => {
    app.use((req, res, next) => {
        res.locals.formatDateTime = function_local_1.formatDateTime;
        next();
    });
    app.get("/", Authentication_1.Authentication, home_controller_1.homeUser);
    //? <+====================account====================+>
    app.get("/login", account_controller_1.loginGet);
    app.post("/login", account_controller_1.loginPost);
    app.get("/register", account_controller_1.registerGet);
    app.post("/register", account_controller_1.registerPost);
    //? <+====================account====================+>
    app.get("/detail/:slug", Authentication_1.Authentication, detail_controller_1.detailNews);
    app.post("/detail/:slug", Authentication_1.Authentication, detail_controller_1.addComments);
    app.get("/admin/list-news", Authentication_1.Authentication, Authentication_1.Authorization, news_admin_controller_1.listNews);
    //? <+====================Admin News====================+>
    app.get("/admin/add-news", Authentication_1.Authentication, Authentication_1.Authorization, news_admin_controller_2.addNewsGet);
    app.post("/admin/add-news", Authentication_1.Authentication, Authentication_1.Authorization, news_admin_controller_2.addNewsPost);
    app.get("/admin/edit-news/:slug", Authentication_1.Authentication, Authentication_1.Authorization, news_admin_controller_2.editNewsGet);
    app.post("/admin/edit-news/:slug", Authentication_1.Authentication, Authentication_1.Authorization, news_admin_controller_2.editNewsPost);
    app.get("/admin/delete-news/:slug", Authentication_1.Authentication, Authentication_1.Authorization, news_admin_controller_2.deleteNews);
    // <+==================== News====================+>
    app.get("/admin/list-comments", Authentication_1.Authentication, Authentication_1.Authorization, comments_admin_controller_1.listComments);
    app.post("/admin/list-comments", Authentication_1.Authentication, Authentication_1.Authorization, comments_admin_controller_1.listCommentsDelete);
    app.get("/admin/list-users", Authentication_1.Authentication, Authentication_1.Authorization, users_admin_controller_1.listUsers);
    app.post("/changeStatus", Authentication_1.Authentication, Authentication_1.Authorization, users_admin_controller_1.changeStatusC);
    app.post("/changeRole", Authentication_1.Authentication, Authentication_1.Authorization, users_admin_controller_1.changeRoleC);
    app.get("/Logout", (req, res) => {
        res.clearCookie('token');
        res.redirect('/login');
    });
};
exports.default = routerWeb;
