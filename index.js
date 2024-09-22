// console.log("Hello Mohsoo");
//LET'S START WITH CREATING WITH WEB SERVER.
//WE ARE GOING TO USE THE EXPRESS LIBRARY.
import express from "express";
import bodyParser from "body-parser";
import cookieSession from "cookie-session";
import authRouter from "./routes/admin/auth.js";
import productsAdminRouter from "./routes/admin/products.js";
import productsRouter from "./routes/products.js";
import cartsRouter from "./routes/carts.js";
const app = express();
//middlewares
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieSession({ keys: ["shariifRajpoot"] }));
app.use(authRouter);
app.use(productsAdminRouter);
app.use(productsRouter);
app.use(cartsRouter);
app.listen(3000, () => {
  console.log("Listening at port 3000");
});
