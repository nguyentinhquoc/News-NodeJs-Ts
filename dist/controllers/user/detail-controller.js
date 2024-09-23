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
exports.detailNews = detailNews;
exports.addComments = addComments;
const news_services_1 = require("../../services/news-services");
const comments_services_1 = require("../../services/comments-services");
const Authentication_1 = require("../../middleware/Authentication");
const news_services_2 = require("../../services/news-services");
const user_services_1 = require("../../services/user-services");
const comments_services_2 = require("../../services/comments-services");
function detailNews(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const result = yield (0, news_services_2.loadObjIdNews)(req.params.slug);
            if (result) {
                const comment = yield (0, comments_services_2.loadCommentsDetailNews)(result);
                const newsResult = yield (0, news_services_1.oneNews)(req.params.slug);
                res.status(200).json({ newsResult, comment });
            }
            else {
                res.status(404).send('News not found');
            }
        }
        catch (err) {
            console.error('Error:', err);
            res.status(500).send('Internal Server Error');
        }
    });
}
function addComments(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        let username = (0, Authentication_1.verifyToken)(req.cookies.token).username;
        let comment = req.body.comment;
        let ObjIdNews = (0, news_services_2.loadObjIdNews)(req.params.slug);
        let ObjIdUser = (0, user_services_1.loadObjIdUsers)(username);
        Promise.all([ObjIdNews, ObjIdUser])
            .then(([news, users]) => {
            (0, comments_services_1.createComments)({ comment: comment, users: users, news: news });
            return res
                .status(201)
                .json({ message: 'Comment added successfully', news: req.params.slug });
        })
            .catch(err => {
            return res.status(500).json({ message: err });
        });
    });
}
