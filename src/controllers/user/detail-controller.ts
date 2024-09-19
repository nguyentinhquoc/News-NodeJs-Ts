import news from "../../models/news-model";
import { Request, Response } from 'express';
import { oneNews } from "../../services/news-services";
import { createComments } from "../../services/comments-services";
import { verifyToken } from "../../middleware/Authentication";
import { loadObjIdNews } from "../../services/news-services";
import { loadObjIdUsers } from "../../services/user-services";

async function detailNews(req: Request, res: Response) {
    await oneNews(req.params.slug)
        .then((newsResult) => {
            res.render("user/detail-news", { newsResult });
        }).catch((err) => {
            console.log(err);
        });
}
async function addComments(req: Request, res: Response) {
    let username = verifyToken(req.cookies.token).username
    let comment = req.body.comment
    let ObjIdNews = loadObjIdNews(req.params.slug)
    let ObjIdUser = loadObjIdUsers(username)
    Promise.all([ObjIdNews, ObjIdUser])
        .then(([news, users]) => {
            createComments({ comment: comment, users: users, news: news })
            res.redirect(`/detail/${req.params.slug}`)
        }).catch((err) => {
            console.log(err);
        });
}

export { detailNews, addComments };
