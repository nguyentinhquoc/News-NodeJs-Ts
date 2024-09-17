import { Express } from 'express';
import { homeUser } from "../controllers/user/home-controller";
import { detailNews } from "../controllers/user/detail-controller";
import { login, register } from "../controllers/account-controller";
import { listUsers } from '../controllers/admin/users-admin-controller';
import { listComments } from '../controllers/admin/comments-admin-controller';
import { listNews } from '../controllers/admin/news-admin-controller';
import { formatDateTime } from '../untils/function-local';
import { addNewsGet } from '../controllers/admin/news-admin-controller';
const routerWeb = (app: Express) => {
    app.use((req, res, next) => {
        res.locals.formatDateTime = formatDateTime;
        next();
    });
    app.get("/", homeUser);
    app.get("/login", login);
    app.get("/register", register);
    app.get("/register", homeUser);
    app.get("/:slug", detailNews);
    app.get("/admin/list-news", listNews);
    app.get("/admin/add-news", addNewsGet);
    app.get("/admin/list-comments", listComments);
    app.get("/admin/list-users", listUsers);
};
export default routerWeb;