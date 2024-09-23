import { Request, Response } from 'express'
import {
  allNews,
  createNews,
  oneNews,
  editNews,
  removeNews
} from '../../services/news-services'
import { uploadNews } from '../../untils/upload-Images'

async function deleteNews (req: Request, res: Response) {
  try {
    await removeNews(req.params.slug)
    return res.status(200).json({ message: 'News deleted successfully' })
  } catch (error) {
    console.error(error)
    return res.status(500).json({ message: 'Internal server error' })
  }
}
async function listNews (req: Request, res: Response) {
  try {
    const listNews = await allNews()
    return res.status(200).json({ listNews })
  } catch (error) {
    console.error(error)
    return res.status(500).json({ message: 'Internal server error' })
  }
}
async function addNewsGet (req: Request, res: Response) {
  return res.status(200).json({ message: 'Render add news page' })
}
async function addNewsPost (req: Request, res: Response) {
  uploadNews.single('image')(req, res, async function (err) {
    if (err) {
      console.error('Error uploading image:', err)
      return res.status(500).json({ message: 'Error uploading image' })
    }
    if (req.file) {
      const image = req.file.path.substring(req.file.path.indexOf('\\images'))
      const { title, content } = req.body
      try {
        await createNews({ image, title, content })
        return res.status(201).json({ message: 'News added successfully' })
      } catch (error) {
        console.error('Error creating news:', error)
        return res.status(500).json({ message: 'Error creating news' })
      }
    } else {
      console.log('No file uploaded')
      return res.status(400).json({ message: 'No file uploaded' })
    }
  })
}

async function editNewsGet (req: Request, res: Response) {
  try {
    const valueNews = await oneNews(req.params.slug)
    return res.status(200).json({ valueNews })
  } catch (error) {
    console.error(error)
    return res.status(500).json({ message: 'Internal server error' })
  }
}
async function editNewsPost (req: Request, res: Response) {
  uploadNews.single('image')(req, res, async function (err) {
    const { title, content } = req.body
    const dateEdit = Date.now()
    const slug = req.params.slug
    if (err) {
      console.error('Error uploading image:', err)
      return res.status(500).json({ message: 'Error uploading image' })
    }
    try {
      if (req.file) {
        const image = req.file.path.substring(req.file.path.indexOf('\\images'))
        await editNews({ image, title, content, dateEdit }, slug)
      } else {
        await editNews({ title, content, dateEdit }, slug)
      }
      return res.status(200).json({ message: 'News edited successfully' })
    } catch (error) {
      console.error('Error editing news:', error)
      return res.status(500).json({ message: 'Error editing news' })
    }
  })
}

export {
  listNews,
  addNewsGet,
  addNewsPost,
  editNewsGet,
  editNewsPost,
  deleteNews
}
