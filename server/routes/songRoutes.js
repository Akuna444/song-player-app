const express = require("express");
const songController = require("../controllers/songController");
const validateSong = require("../middlewares/songValidator");

const router = express.Router();

router.post("/songs", validateSong, songController.createSong);
router.get("/songs", songController.getAllSongs);
router.put("/songs/:id", validateSong, songController.updateSong);
router.delete("/songs/:id", songController.deleteSong);
router.get("/statistics", songController.getStatistics);

module.exports = router;
