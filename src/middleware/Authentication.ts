
import jwt from 'jsonwebtoken';
require('dotenv').config();
import { checkAdmin } from '../services/user-services';
function createToken(data: object): any {
  if (process.env.SECRET_KEY !== undefined) {
    const token = jwt.sign(data, process.env.SECRET_KEY, { expiresIn: '1h' });
    return token;
  }
}
function verifyToken(token: string): any {
  if (process.env.SECRET_KEY !== undefined) {
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    return decoded;
  }
}
function Authentication(req: any, res: any, next: any) {
  if (req.cookies.token !== undefined) {
    if (verifyToken(req.cookies.token)) {
      next();
    } else {
      res.redirect('/login');
    }
  } else {
    res.redirect('/login');
  }
}
async function Authorization(req: any, res: any, next: any) {
  if (req.cookies.token !== undefined) {
    if (await checkAdmin(verifyToken(req.cookies.token).username)) {
      next();
    } else {
      res.redirect('/');
    }
  }
}
export { createToken, verifyToken, Authentication, Authorization };