// Dependencies
// =============================================================
const path           = require("path");
const express        = require("express");
const bodyParser     = require("body-parser");
const methodOverride = require("method-override");
const exphbs         = require("express-handlebars");
const db             = require("./app/models");

// Sets up the Express App
// =============================================================
const app = express();
const PORT = process.env.PORT || 8080;

// Sets up the Express app to handle data parsing
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

// Static directory
app.use(express.static("app/public"));

// Override with POST having ?_method=DELETE
app.use(methodOverride("_method"));

// Template engine setup : Handlebars
app.engine("handlebars", exphbs({ defaultLayout: "main", layoutsDir: "./app/views/layouts/"}));
app.set("view engine", "handlebars");
app.set("views", path.join(__dirname, "./app/views"))

// Routes
// =============================================================
require("./app/controller/burger_controller.js")(app);
require("./app/controller/htmlPages.js")(app);

// ---- ERROR ROUTES -------------------------
app.use((req, res, next) => {
    res.status(404).sendFile(path.join(__dirname, "app/public/404.html"));
});

app.use((err, req, res, next) => {
    console.log(err.stack);
    res.status(500).sendFile(path.join(__dirname, "app/public/500.html"));
});
//--------------------------------------------

// Starts the server to begin listening
// =============================================================
app.listen(PORT, function() {
  db.sequelize.sync().then(() => console.log("Connected to DB"));
  console.log("App listening on PORT " + PORT);
});
