
const {Router} = require("express");
const router = Router();

const {Send} = require("../middleware/Send");

const {
  createPlayer,
  removePlayer,
  getAllPlayers,
  getPlayers
} = require("../Controllers/playerController");

router.post("/player/:team_id", createPlayer, Send)
      .delete("/player/:player_id", removePlayer,Send)
      .get("/player", getAllPlayers, Send)
      .get("/player/:team_id", getPlayers, Send);

module.exports = router;