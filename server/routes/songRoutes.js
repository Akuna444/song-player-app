const express = require("express");
const songController = require("../controllers/songController");

const router = express.Router();

router.post("/songs", songController.createSong);
router.get("/songs", songController.getAllSongs);
router.put("/songs/:id", songController.updateSong);
router.delete("/songs/:id", songController.deleteSong);
router.get("/statistics", songController.getStatistics);

module.exports = router;
