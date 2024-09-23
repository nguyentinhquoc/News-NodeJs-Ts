import news from '../../models/news-model'
import { Request, Response } from 'express'
import { oneNews } from '../../services/news-services'
import { createComments } from '../../services/comments-services'
import { verifyToken } from '../../middleware/Authentication'
import { loadObjIdNews } from '../../services/news-services'
import { loadObjIdUsers } from '../../services/user-services'
import { loadCommentsDetailNews } from '../../services/comments-services'
async function detailNews (req: Request, res: Response) {
  try {
    const result = await loadObjIdNews(req.params.slug)
    if (result) {
      const comment = await loadCommentsDetailNews(result)
      const newsResult = await oneNews(req.params.slug)
      res.status(200).json({ newsResult, comment })
    } else {
      res.status(404).send('News not found')
    }
  } catch (err) {
    console.error('Error:', err)
    res.status(500).send('Internal Server Error')
  }
}
async function addComments (req: Request, res: Response) {
  let username = verifyToken(req.cookies.token).username
  let comment = req.body.comment
  let ObjIdNews = loadObjIdNews(req.params.slug)
  let ObjIdUser = loadObjIdUsers(username)
  Promise.all([ObjIdNews, ObjIdUser])
    .then(([news, users]) => {
      createComments({ comment: comment, users: users, news: news })
      return res
        .status(201)
        .json({ message: 'Comment added successfully', news: req.params.slug })
    })
    .catch(err => {
      return res.status(500).json({ message:err })
    })
}

export { detailNews, addComments }
