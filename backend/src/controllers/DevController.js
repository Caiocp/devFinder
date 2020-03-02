const axios = require("axios");

const Dev = require("../models/Dev");
const StringToArray = require("../utils/StringToArray");
const { findConnections, sendMessage } = require("../websocket");

module.exports = {
  async index(req, res) {
    const devs = await Dev.find();

    return res.json(devs);
  },

  async store(req, res) {
    const { github_username, techs, latitude, longitude } = req.body;

    let dev = await Dev.findOne({ github_username });

    if (!dev) {
      const response = await axios.get(
        `https://api.github.com/users/${github_username}`
      );

      const { name = login, avatar_url, bio } = response.data;

      const arrayTechs = StringToArray(techs);

      const location = {
        type: "Point",
        coordinates: [longitude, latitude]
      };

      dev = await Dev.create({
        github_username,
        name,
        avatar_url,
        bio,
        techs: arrayTechs,
        location
      });

      const sendSocketMessegeTo = findConnections(
        { latitude, longitude },
        arrayTechs
      );

      sendMessage(sendSocketMessegeTo, "new-dev", dev);
    }

    return res.json(dev);
  },

  async destroy(req, res) {
    await Dev.findByIdAndRemove(req.params.id);

    return res.send();
  }
};
