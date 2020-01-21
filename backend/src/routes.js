const { Router } = require("express");

const routes = Router();

routes.get("/", (req, res) => {
  res.json({ ok: true });
});

routes.post("/users", (req, res) => {
  res.json({ ok: true });
});

module.exports = routes;
