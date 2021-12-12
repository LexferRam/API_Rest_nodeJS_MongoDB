const express = require("express");
const morgan = require("morgan");
const app = express();

//settings
app.set("port", proccess.env.PORT || 4000);

//middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan());

//Routes

//Server
const server = app.listen(app.get("port"), () => {
  console.log(`server on http://localhost:${app.get("port")}`);
});

const socketIO = require("socket.io");
const io = socketIO(server);


