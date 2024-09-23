import { Request, Response } from 'express'
import {
  createUser,
  checkDataRegister,
  checkDataLogin,
  checkAdmin
} from '../services/user-services'
import { createToken } from '../middleware/Authentication'
import cookieParser from 'cookie-parser'

// Add the following line to declare the module
async function loginGet (req: Request, res: Response) {
  return res.status(200).json({ message: 'Render login page' })
}

async function loginPost (req: Request, res: Response) {
  try {
    const { username, password } = req.body
    const isValidLogin = await checkDataLogin([
      { username },
      { password },
      { status: 1 }
    ])
    if (isValidLogin) {
      const token = createToken({ username })
      res.cookie('token', token, { maxAge: 900000, httpOnly: true })
      const isAdmin = await checkAdmin(username)
      if (isAdmin) {
        return res
          .status(200)
          .json({ message: 'Login successful', redirect: '/admin/list-news' })
      } else {
        return res
          .status(200)
          .json({ message: 'Login successful', redirect: '/' })
      }
    } else {
      return res.status(401).json({ message: 'Invalid login credentials' })
    }
  } catch (error) {
    return res.status(500).json({ message: 'Internal server error' })
  }
}

async function registerGet (req: Request, res: Response) {
  res.status(200).json({ message: 'Render Register page' })
}
async function registerPost (req: Request, res: Response, next: Function) {
  try {
    if (
      await checkDataRegister([
        { email: req.body.email },
        { username: req.body.username }
      ])
    ) {
      createUser(req.body)
      return res
        .status(200)
        .json({ message: 'User registered successfully. Please log in.' })
    } else {
      return res
        .status(409)
        .json({ message: '.Email or username already exists.' })
    }
  } catch (error) {
    return res.status(500).json({ message: 'Internal server error' })
  }
}
export { loginGet, registerGet, registerPost, loginPost }
