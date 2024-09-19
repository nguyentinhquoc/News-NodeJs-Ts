import { Express } from 'express';
import { homeUser } from "../controllers/user/home-controller";
import { detailNews } from "../controllers/user/detail-controller";
import { loginGet, loginPost, registerGet, registerPost } from "../controllers/account-controller";
import { listUsers } from '../controllers/admin/users-admin-controller';
import { listComments } from '../controllers/admin/comments-admin-controller';
import { listNews } from '../controllers/admin/news-admin-controller';
import { formatDateTime } from '../untils/function-local';
import { addNewsGet, addNewsPost, editNewsGet, editNewsPost, deleteNews } from '../controllers/admin/news-admin-controller';
import { Authentication, Authorization } from '../middleware/Authentication';
const routerWeb = (app: Express) => {
    app.use((req, res, next) => {
        res.locals.formatDateTime = formatDateTime;
        next();
    });
    app.get("/", Authentication, homeUser);
    //? <+====================account====================+>
    app.get("/login", loginGet);
    app.post("/login", loginPost);
    app.get("/register", registerGet);
    app.post("/register", registerPost);
    //? <+====================account====================+>
    app.get("/detail/:slug", Authentication, detailNews);
    app.get("/admin/list-news", Authentication, Authorization, listNews);
    //? <+====================Admin News====================+>
    app.get("/admin/add-news", Authentication, Authorization, addNewsGet);
    app.post("/admin/add-news", Authentication, Authorization, addNewsPost);
    app.get("/admin/edit-news/:slug", Authentication, Authorization, editNewsGet);
    app.post("/admin/edit-news/:slug", Authentication, Authorization, editNewsPost);
    app.get("/admin/delete-news/:slug", Authentication, Authorization, deleteNews);
    // <+==================== News====================+>
    app.get("/admin/list-comments", Authentication, Authorization, listComments);
    app.get("/admin/list-users", Authentication, Authorization, listUsers);
};
export default routerWeb;