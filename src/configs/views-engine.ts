//? Import template engine EJS
export default function ViewsEngine(app: any) {
  app.set("views", "./src/views");
  app.set("view engine", "ejs");
}
