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
const news_services_1 = require("../../services/news-services");
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
