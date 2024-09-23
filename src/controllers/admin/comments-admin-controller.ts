import { Request, Response } from 'express'
import {
  loadAllComment,
  deleteComments
} from '../../services/comments-services'
async function listComments (req: Request, res: Response) {
  try {
    const listComment = await loadAllComment()
    console.log(listComment)
    return res.status(200).json({ listComment })
  } catch (error) {
    console.error(error)
    return res.status(500).json({ message: 'Internal server error' })
  }
}
async function listCommentsDelete (req: Request, res: Response) {
  try {
    const idComment = req.body.id
    const isDeleted = await deleteComments(idComment)
    if (isDeleted) {
      return res.status(200).json({ message: 'Comment deleted successfully' })
    } else {
      return res.status(404).json({ message: 'Comment not found' })
    }
  } catch (error) {
    console.error(error)
    return res.status(500).json({ message: 'Internal server error' })
  }
}

export { listComments, listCommentsDelete }
