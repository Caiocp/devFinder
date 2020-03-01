const { Router } = require("express");

const DevController = require("./controllers/DevController");
const SearchController = require("./controllers/SearchController");

const routes = Router();

routes.get("/users", DevController.index);
routes.get("/search", SearchController.index);
routes.post("/users", DevController.store);
routes.delete("/users/:id", DevController.destroy);

module.exports = routes;
