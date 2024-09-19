import { Request, Response } from "express";
import { verifyToken } from "../../middleware/Authentication";
import {
    allUsers, changeStatus, changeRole
} from "../../services/user-services";
async function listUsers(req: Request, res: Response) {
    let user = await allUsers()
    res.render('admin/user-list-admin', { user })
}
async function changeStatusC(req: Request, res: Response) {
    changeStatus(req.body.username);
    res.redirect('/admin/list-users');
}
async function changeRoleC(req: Request, res: Response) {
    changeRole(req.body.username);
    res.redirect('/admin/list-users');
}
export {
    listUsers, changeStatusC, changeRoleC
};