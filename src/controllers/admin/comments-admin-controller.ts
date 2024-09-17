import { Request, Response } from "express";

async function listComments(req: Request, res: Response) {
    res.render('admin/comment-list-admin')
}
export { listComments };
