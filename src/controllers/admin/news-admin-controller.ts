import { Request, Response } from "express";
import { allNews, createNews, oneNews, editNews, removeNews } from "../../services/news-services";
import { uploadNews } from "../../untils/upload-Images";

async function deleteNews(req: Request, res: Response) {
    await removeNews(req.params.slug)
        .then((listNews) => {
            res.redirect('/admin/list-news');

        }).catch((err) => {
            // <+====================ERROR====================+>
            console.log(err);
            // <+====================ERROR====================+>
        });
}
async function listNews(req: Request, res: Response) {
    await allNews()
        .then((listNews) => {
            res.render('admin/news-list-admin', { listNews })
        }).catch((err) => {
            // <+====================ERROR====================+>
            console.log(err);
            // <+====================ERROR====================+>
        });
}
async function addNewsGet(req: Request, res: Response) {
    res.render('admin/news-add-admin')
} async function addNewsPost(req: Request, res: Response) {
    uploadNews.single('image')(req, res, async function (err) {
        if (err) {
            console.error('Error uploading image:', err);
            return res.status(500).send('Error uploading image');
        }
        if (req.file) {
            const image = req.file.path.substring(req.file.path.indexOf('\\images'));
            const { title, content } = req.body;
            await createNews({ image, title, content });
            res.redirect('/admin/list-news');
        } else {
            console.log('No file uploaded');
            res.status(400).send('No file uploaded');
        }
    });
}
async function editNewsGet(req: Request, res: Response) {
    await oneNews(req.params.slug)
        .then((valueNews) => {
            res.render('admin/news-edit-admin', { valueNews })
        }).catch((err) => {
            // <+====================ERROR====================+>
            console.log(err);
            // <+====================ERROR====================+>
        });
}
async function editNewsPost(req: Request, res: Response) {
    uploadNews.single('image')(req, res, async function (err) {
        const { title, content } = req.body;
        const dateEdit = Date.now();
        const slug = req.params.slug;
        if (err) {
            console.error('Error uploading image:', err);
            return res.status(500).send('Error uploading image');
        }
        if (req.file) {
            const image = req.file.path.substring(req.file.path.indexOf('\\images'));
            await editNews({ image, title, content, dateEdit }, slug);
            res.redirect('/admin/list-news');
        } else {
            await editNews({ title, content, dateEdit }, slug);
            res.redirect('/admin/list-news');
        }
    });
}
export { listNews, addNewsGet, addNewsPost, editNewsGet, editNewsPost, deleteNews };
