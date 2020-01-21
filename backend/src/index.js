const express = require("express");
const mongoose = require("mongoose");

const routes = require("./routes");

const app = express();
app.use(express.json());

mongoose.connect(
  "mongodb+srv://omnistack:omnistack@omnistack-wrcgu.mongodb.net/semana10?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }
);

app.use(routes);

app.listen(3333);
