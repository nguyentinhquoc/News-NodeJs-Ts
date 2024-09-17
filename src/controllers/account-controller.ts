import { Request, Response } from 'express';
async function login(req: Request, res: Response) {
    res.render("login");
}
async function register(req: Request, res: Response) {
    res.render("register");
}
export { login, register };
