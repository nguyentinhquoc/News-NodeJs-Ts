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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.allNews = allNews;
exports.oneNews = oneNews;
exports.createNews = createNews;
exports.editNews = editNews;
exports.removeNews = removeNews;
exports.loadObjIdNews = loadObjIdNews;
const news_model_1 = __importDefault(require("./../models/news-model"));
function allNews() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            return yield news_model_1.default.find({});
        }
        catch (err) {
            throw new Error('Lỗi err' + err);
        }
    });
}
function oneNews(slug) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            return yield news_model_1.default.findOne({ slug: slug });
        }
        catch (err) {
            throw new Error('Lỗi err' + err);
        }
    });
}
function createNews(data) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const newsItem = yield news_model_1.default.create(data);
            return newsItem;
        }
        catch (err) {
            console.error('Error creating news:', err);
            throw err;
        }
    });
}
function editNews(data, slug) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const newsItem = yield news_model_1.default.updateOne({ slug }, data);
            return newsItem;
        }
        catch (err) {
            console.error('Error creating news:', err);
            throw err;
        }
    });
}
function removeNews(slug) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const newsItem = yield news_model_1.default.deleteOne({ slug });
            return newsItem;
        }
        catch (err) {
            console.error('Error creating news:', err);
            throw err;
        }
    });
}
function loadObjIdNews(slug) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const usersItem = yield news_model_1.default.findOne({ slug: slug });
            return usersItem === null || usersItem === void 0 ? void 0 : usersItem._id;
        }
        catch (err) {
            console.error('Error creating news:', err);
            throw err;
        }
    });
}
