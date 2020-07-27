const path = require("path");
const http = require("http");
const port = process.env.PORT || 5000;
const express = require("express");
const bodyParser = require("body-parser");
const {
  allowInsecurePrototypeAccess,
} = require("@handlebars/allow-prototype-access");
const exphbs = require("express-handlebars");
const Handlebars = require("handlebars");

const app = express();
const { mongodb } = require("./src/configs/mongo");

// use bodyParser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
server = http.createServer(app);

// View Engine
app.set("view engine", ".hbs");
app.engine(
  "hbs",
  exphbs({
    helpers: {},
    handlebars: allowInsecurePrototypeAccess(Handlebars),
    extname: "hbs",
    defaultLayout: "main",
    layoutsDir: __dirname + "/src/views/layouts/",
    partialsDir: __dirname + "/src/views/partials/",
  })
);

// HANDLING CORS ERRORS
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "*");
  if (req.method === "OPTIONS") {
    res.headers("Access-Control-Allow-Methods", "POST, PUT, GET, DELETE");
    return res.status(200).json({});
  }
  next();
});
// Join path and use static files
// app.use(express.static(path.join(__dirname + "/public")));
app.use("/js", express.static(path.join(__dirname + "/src/public/js")));
app.use("/css", express.static(path.join(__dirname + "/src/public/css")));
app.use("/uploads", express.static("uploads"));
// app.use("/uploads", express.static("uploads"));
// Load routers
const index = require("./src/routers/index");
app.use("/", index);
// Load MongoDB
mongodb();
server.listen(port, function () {
  console.log("server listening on port", port);
});
