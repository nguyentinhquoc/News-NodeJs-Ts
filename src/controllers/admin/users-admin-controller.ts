import { Request, Response } from 'express'
import { verifyToken } from '../../middleware/Authentication'
import {
  allUsers,
  changeStatus,
  changeRole
} from '../../services/user-services'
async function listUsers (req: Request, res: Response) {
  let user = await allUsers()
  res.status(200).json({ user })
}
async function changeStatusC (req: Request, res: Response) {
  try {
    await changeStatus(req.body.username)
    return res.status(200).json({ message: 'Status changed successfully' })
  } catch (error) {
    console.error(error)
    return res.status(500).json({ message: 'Internal server error' })
  }
}
async function changeRoleC (req: Request, res: Response) {
  try {
    await changeRole(req.body.username)
    return res.status(200).json({ message: 'Role changed successfully' })
  } catch (error) {
    console.error(error)
    return res.status(500).json({ message: 'Internal server error' })
  }
}

export { listUsers, changeStatusC, changeRoleC }
