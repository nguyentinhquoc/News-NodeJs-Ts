"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadNews = exports.uploadAvatar = void 0;
const multer_1 = __importDefault(require("multer"));
// Cấu hình lưu trữ cho avatar
const storageAvatar = multer_1.default.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'src/public/images/user');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '.jpg');
    }
});
const uploadAvatar = (0, multer_1.default)({
    storage: storageAvatar
});
exports.uploadAvatar = uploadAvatar;
// Cấu hình lưu trữ cho sản phẩm
const storageNews = multer_1.default.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'src/public/images/news');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '.jpg');
    }
});
// Tạo các middleware upload
const uploadNews = (0, multer_1.default)({
    storage: storageNews
});
exports.uploadNews = uploadNews;
