const restaurent_router = require("./routers/restaurent");
const category_router = require("./routers/category");
const command_router = require("./routers/command");
const food_router = require("./routers/food");
const user_router = require("./routers/user");
const express = require("express");
const db = require("./db");
const app = express();
const port = 3000;

app.use(express.json());
app.use("/api/user",user_router);
app.use("/api/food",food_router);
app.use("/api/command",command_router);
app.use("/api/category",category_router);
app.use("/api/restaurent",restaurent_router);
app.listen(port,()=>console.log(`server is running on ${port} ...`));