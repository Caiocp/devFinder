const { Router } = require("express");

const devController = require("./controllers/DevController");

const routes = Router();

routes.post("/users", devController.store);

module.exports = routes;
