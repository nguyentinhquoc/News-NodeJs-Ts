"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = ViewsEngine;
//? Import template engine EJS
function ViewsEngine(app) {
    app.set("views", "./src/views");
    app.set("view engine", "ejs");
}
