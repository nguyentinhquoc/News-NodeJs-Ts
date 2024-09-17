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
const routerWeb = (app) => {
    app.use((req, res, next) => {
        res.locals.formatDateTime = function_local_1.formatDateTime;
        next();
    });
    app.get("/", home_controller_1.homeUser);
    app.get("/login", account_controller_1.login);
    app.get("/register", account_controller_1.register);
    app.get("/register", home_controller_1.homeUser);
    app.get("/:slug", detail_controller_1.detailNews);
    app.get("/admin/list-news", news_admin_controller_1.listNews);
    app.get("/admin/add-news", news_admin_controller_2.addNewsGet);
    app.get("/admin/list-comments", comments_admin_controller_1.listComments);
    app.get("/admin/list-users", users_admin_controller_1.listUsers);
};
exports.default = routerWeb;
