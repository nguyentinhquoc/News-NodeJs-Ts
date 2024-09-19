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
exports.allUsers = allUsers;
exports.oneUsers = oneUsers;
exports.createUser = createUser;
exports.checkDataRegister = checkDataRegister;
exports.checkDataLogin = checkDataLogin;
exports.checkAdmin = checkAdmin;
exports.loadObjIdUsers = loadObjIdUsers;
exports.changeStatus = changeStatus;
exports.changeRole = changeRole;
const users_model_1 = __importDefault(require("../models/users-model"));
function allUsers() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            return yield users_model_1.default.find({});
        }
        catch (err) {
            throw new Error('Lỗi err' + err);
        }
    });
}
function oneUsers(id) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            return yield users_model_1.default.findOne({ id: id });
        }
        catch (err) {
            throw new Error('Lỗi err' + err);
        }
    });
}
function createUser(data) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            return yield users_model_1.default.create(data);
        }
        catch (err) {
            throw new Error('Lỗi err' + err);
        }
    });
}
function checkDataRegister(data) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            if ((yield users_model_1.default.find({ $or: data })).length < 1) {
                return true;
            }
            return false;
        }
        catch (err) {
            throw new Error('Lỗi err' + err);
        }
    });
}
function checkDataLogin(data) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            if ((yield users_model_1.default.find({ $and: data })).length > 0) {
                return true;
            }
            return false;
        }
        catch (err) {
            throw new Error('Lỗi err' + err);
        }
    });
}
function checkAdmin(userName) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let user = yield users_model_1.default.findOne({ username: userName });
            if (user && user.admin == 1) {
                return true;
            }
            return false;
        }
        catch (err) {
            throw new Error('Lỗi err' + err);
        }
    });
}
function loadObjIdUsers(username) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const usersItem = yield users_model_1.default.findOne({ username: username });
            return usersItem === null || usersItem === void 0 ? void 0 : usersItem._id;
        }
        catch (err) {
            console.error('Error creating users:', err);
            throw err;
        }
    });
}
function changeStatus(username) {
    return __awaiter(this, void 0, void 0, function* () {
        let user = yield users_model_1.default.findOne({ username: username });
        if ((user === null || user === void 0 ? void 0 : user.status) == 1) {
            yield users_model_1.default.updateOne({ username }, { status: 0 });
        }
        else {
            yield users_model_1.default.updateOne({ username }, { status: 1 });
        }
    });
}
function changeRole(username) {
    return __awaiter(this, void 0, void 0, function* () {
        let user = yield users_model_1.default.findOne({ username: username });
        if ((user === null || user === void 0 ? void 0 : user.admin) == 1) {
            yield users_model_1.default.updateOne({ username }, { admin: 0 });
        }
        else {
            yield users_model_1.default.updateOne({ username }, { admin: 1 });
        }
    });
}
