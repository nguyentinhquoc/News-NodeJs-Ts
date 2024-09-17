import news from "../../models/news-model";
import { Request, Response } from 'express';
import { oneNews } from "../../services/news-services";

async function detailNews(req: Request, res: Response) {
    await oneNews(req.params.slug)
        .then((newsResult) => {
            res.render("user/detail-news", { newsResult });
        }).catch((err) => {
            console.log(err);
        });
}
export { detailNews };
