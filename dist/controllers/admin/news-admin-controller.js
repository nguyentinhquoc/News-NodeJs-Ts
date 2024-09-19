"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.listNews = listNews;
exports.addNewsGet = addNewsGet;
exports.addNewsPost = addNewsPost;
exports.editNewsGet = editNewsGet;
exports.editNewsPost = editNewsPost;
exports.deleteNews = deleteNews;
const news_services_1 = require("../../services/news-services");
const upload_Images_1 = require("../../untils/upload-Images");
function deleteNews(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        yield (0, news_services_1.removeNews)(req.params.slug)
            .then((listNews) => {
            res.redirect('/admin/list-news');
        }).catch((err) => {
            // <+====================ERROR====================+>
            console.log(err);
            // <+====================ERROR====================+>
        });
    });
}
function listNews(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        yield (0, news_services_1.allNews)()
            .then((listNews) => {
            res.render('admin/news-list-admin', { listNews });
        }).catch((err) => {
            // <+====================ERROR====================+>
            console.log(err);
            // <+====================ERROR====================+>
        });
    });
}
function addNewsGet(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        res.render('admin/news-add-admin');
    });
}
function addNewsPost(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        upload_Images_1.uploadNews.single('image')(req, res, function (err) {
            return __awaiter(this, void 0, void 0, function* () {
                if (err) {
                    console.error('Error uploading image:', err);
                    return res.status(500).send('Error uploading image');
                }
                if (req.file) {
                    const image = req.file.path.substring(req.file.path.indexOf('\\images'));
                    const { title, content } = req.body;
                    yield (0, news_services_1.createNews)({ image, title, content });
                    res.redirect('/admin/list-news');
                }
                else {
                    console.log('No file uploaded');
                    res.status(400).send('No file uploaded');
                }
            });
        });
    });
}
function editNewsGet(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        yield (0, news_services_1.oneNews)(req.params.slug)
            .then((valueNews) => {
            res.render('admin/news-edit-admin', { valueNews });
        }).catch((err) => {
            // <+====================ERROR====================+>
            console.log(err);
            // <+====================ERROR====================+>
        });
    });
}
function editNewsPost(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        upload_Images_1.uploadNews.single('image')(req, res, function (err) {
            return __awaiter(this, void 0, void 0, function* () {
                const { title, content } = req.body;
                const dateEdit = Date.now();
                const slug = req.params.slug;
                if (err) {
                    console.error('Error uploading image:', err);
                    return res.status(500).send('Error uploading image');
                }
                if (req.file) {
                    const image = req.file.path.substring(req.file.path.indexOf('\\images'));
                    yield (0, news_services_1.editNews)({ image, title, content, dateEdit }, slug);
                    res.redirect('/admin/list-news');
                }
                else {
                    yield (0, news_services_1.editNews)({ title, content, dateEdit }, slug);
                    res.redirect('/admin/list-news');
                }
            });
        });
    });
}
