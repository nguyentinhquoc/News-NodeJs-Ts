import { Request, Response } from "express";
async function listUsers(req: Request, res: Response) {
    res.render('admin/account-list-admin')
}
export { listUsers };