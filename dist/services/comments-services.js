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
exports.createComments = createComments;
exports.loadCommentsDetailNews = loadCommentsDetailNews;
const comments_model_1 = __importDefault(require("../models/comments-model"));
function createComments(data) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            return yield comments_model_1.default.create(data);
        }
        catch (err) {
            console.error('Error creating comments:', err);
            throw err;
        }
    });
}
function loadCommentsDetailNews(newsId) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            return yield comments_model_1.default.find({ news: newsId }).populate('users');
        }
        catch (err) {
            console.error('Error loading comments:', err);
            throw err;
        }
    });
}
