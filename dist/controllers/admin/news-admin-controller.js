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
        try {
            yield (0, news_services_1.removeNews)(req.params.slug);
            return res.status(200).json({ message: 'News deleted successfully' });
        }
        catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Internal server error' });
        }
    });
}
function listNews(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const listNews = yield (0, news_services_1.allNews)();
            return res.status(200).json({ listNews });
        }
        catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Internal server error' });
        }
    });
}
function addNewsGet(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        return res.status(200).json({ message: 'Render add news page' });
    });
}
function addNewsPost(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        upload_Images_1.uploadNews.single('image')(req, res, function (err) {
            return __awaiter(this, void 0, void 0, function* () {
                if (err) {
                    console.error('Error uploading image:', err);
                    return res.status(500).json({ message: 'Error uploading image' });
                }
                if (req.file) {
                    const image = req.file.path.substring(req.file.path.indexOf('\\images'));
                    const { title, content } = req.body;
                    try {
                        yield (0, news_services_1.createNews)({ image, title, content });
                        return res.status(201).json({ message: 'News added successfully' });
                    }
                    catch (error) {
                        console.error('Error creating news:', error);
                        return res.status(500).json({ message: 'Error creating news' });
                    }
                }
                else {
                    console.log('No file uploaded');
                    return res.status(400).json({ message: 'No file uploaded' });
                }
            });
        });
    });
}
function editNewsGet(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const valueNews = yield (0, news_services_1.oneNews)(req.params.slug);
            return res.status(200).json({ valueNews });
        }
        catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Internal server error' });
        }
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
                    return res.status(500).json({ message: 'Error uploading image' });
                }
                try {
                    if (req.file) {
                        const image = req.file.path.substring(req.file.path.indexOf('\\images'));
                        yield (0, news_services_1.editNews)({ image, title, content, dateEdit }, slug);
                    }
                    else {
                        yield (0, news_services_1.editNews)({ title, content, dateEdit }, slug);
                    }
                    return res.status(200).json({ message: 'News edited successfully' });
                }
                catch (error) {
                    console.error('Error editing news:', error);
                    return res.status(500).json({ message: 'Error editing news' });
                }
            });
        });
    });
}
