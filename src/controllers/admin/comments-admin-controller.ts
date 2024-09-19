import { Request, Response } from "express";
import { loadAllComment, deleteComments } from "../../services/comments-services";
async function listComments(req: Request, res: Response) {
    var listComment = await loadAllComment()
    console.log(listComment);

    res.render('admin/comment-list-admin', { listComment })
}
async function listCommentsDelete(req: Request, res: Response) {
    let idComment = req.body.id
    if (await deleteComments(idComment)) {
        res.redirect('/admin/list-comments')
    }
}
export { listComments, listCommentsDelete };
