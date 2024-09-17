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
const news_services_1 = require("../../services/news-services");
function detailNews(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        yield (0, news_services_1.oneNews)(req.params.slug)
            .then((newsResult) => {
            res.render("user/detail-news", { newsResult });
        }).catch((err) => {
            console.log(err);
        });
    });
}
