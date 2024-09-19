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
exports.listComments = listComments;
exports.listCommentsDelete = listCommentsDelete;
const comments_services_1 = require("../../services/comments-services");
function listComments(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        var listComment = yield (0, comments_services_1.loadAllComment)();
        console.log(listComment);
        res.render('admin/comment-list-admin', { listComment });
    });
}
function listCommentsDelete(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        let idComment = req.body.id;
        if (yield (0, comments_services_1.deleteComments)(idComment)) {
            res.redirect('/admin/list-comments');
        }
    });
}
