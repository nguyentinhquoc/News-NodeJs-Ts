import news from "../../models/news-model";
import { Request, Response } from "express";
import { allNews } from "../../services/news-services";

async function homeUser(req: Request, res: Response) {
    await allNews()
        .then((data) => {
            res.render('user/home', { data })
        }).catch((err) => {
            res.send(err);
        });
}
export { homeUser };
