const express = require("express"),
  bodyParser = require("body-parser"),
  mongoose = require("mongoose"),
  app = express(),
  upload = require("express-fileupload");
const logger = require("morgan");
mongoose //conectar a mongoDB
  .connect(
    "mongodb+srv://newpablo:newpablo1@cluster0-twppr.mongodb.net/test?retryWrites=true&w=majority",
    { useNewUrlParser: true }
  )
  .then(x => {
    console.log(
      `Connected to Mongo! Database name: "${x.connections[0].name}"`
    );
  })
  .catch(err => {
    console.error("Error connecting to mongo", err);
  });
app.use(logger("dev"));
app.use(bodyParser.json()); //utilizar formato json en request
app.use(bodyParser.urlencoded({ extended: false }));
app.use(upload()); //middleware para obtener archivos
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});
app.use("/", require("./routes/index"));
module.exports = app;
