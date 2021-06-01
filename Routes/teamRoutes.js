const {Router} = require("express");

const router = Router();
const {Send} = require("../middleware/Send");
const {
  createTeam,
  getAllTeam,
  removeTeam
} = require("../Controllers/teamController");

router.post("/team", createTeam, Send)
      .get("/team",getAllTeam, Send)
      .delete("/team/:team_id", removeTeam, Send);


module.exports = router;