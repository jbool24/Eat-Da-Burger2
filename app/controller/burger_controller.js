// Dependencies
// =============================================================
const Burger = require("../models").Burger;

// Routes
// =============================================================
module.exports = function(app) {

    // Add route to return all burgers
    app.get("/api/burgers", function(req, res) {
        Burger.findAll({}).then((burgers) => res.json(burgers));
    });

    // Add route to return specific burger by id
    app.get("/api/burger/:id", function(req, res) {
        Burger
          .findAll({ where: { id: req.params.id }})
          .then(burger => res.json(burger));
    });

    // Add route to return all devoured burgers
    app.get("/api/burgers/devoured", function(req, res) {
        Burger
        .findAll({ where: {  devoured: true }})
        .then((burgers) => res.json(burgers));
    });

    // Add route to create new burger
    app.post("/api/burger", function(req, res) {
        const name = req.body.burger;

        if (name !== "" || name !== undefined) {
          Burger
            .create({ burger_name: name })
            .then((Burger) => {
              console.log(req.body.name);
              res.redirect("/");
          });
        } else {
          res.end();
        }
    });

    // Update burger devoured = true
    app.put("/api/burger/:id", function(req, res) {
        const id = req.params.id;
        Burger
          .update({ devoured: true },{ where: { id: id }})
          .then((result) => {
            res.json(result);
          });
    });
};
