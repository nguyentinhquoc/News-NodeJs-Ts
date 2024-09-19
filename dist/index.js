"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const views_engine_1 = __importDefault(require("./configs/views-engine"));
const connect_db_1 = __importDefault(require("./configs/connect-db"));
const web_1 = __importDefault(require("./routes/web"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const app = (0, express_1.default)();
app.use(express_1.default.urlencoded());
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
(0, web_1.default)(app);
app.use((0, morgan_1.default)("combined"));
(0, views_engine_1.default)(app);
(0, connect_db_1.default)();
app.use(express_1.default.static("./src/public"));
const port = 3000;
app.listen(port, () => {
    console.log(`http://localhost:${port}/`);
});
