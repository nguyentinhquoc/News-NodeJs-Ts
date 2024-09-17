import { Request, Response } from "express";
import { allNews } from "../../services/news-services";

async function listNews(req: Request, res: Response) {
    await allNews()
        .then((listNews) => {
            res.render('admin/news-list-admin', { listNews })
        }).catch((err) => {
            // <+====================ERROR====================+>
            console.log(err);
            // <+====================ERROR====================+>
        });
}
async function addNewsGet(req: Request, res: Response) {
            res.render('admin/news-add-admin')
}
export { listNews, addNewsGet };
