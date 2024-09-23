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
exports.listUsers = listUsers;
exports.changeStatusC = changeStatusC;
exports.changeRoleC = changeRoleC;
const user_services_1 = require("../../services/user-services");
function listUsers(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        let user = yield (0, user_services_1.allUsers)();
        res.status(200).json({ user });
    });
}
function changeStatusC(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield (0, user_services_1.changeStatus)(req.body.username);
            return res.status(200).json({ message: 'Status changed successfully' });
        }
        catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Internal server error' });
        }
    });
}
function changeRoleC(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield (0, user_services_1.changeRole)(req.body.username);
            return res.status(200).json({ message: 'Role changed successfully' });
        }
        catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Internal server error' });
        }
    });
}
