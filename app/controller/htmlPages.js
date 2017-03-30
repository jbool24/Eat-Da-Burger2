const Burger = require("../models").Burger;

module.exports = function(app) {

    app.get("/", (req, res) => {
        Burger.findAll({}).then((burgers) => {
          let context = {
            burgers: burgers
          };
          console.log(burgers);
          res.render("index", context);
        });

    });

}
