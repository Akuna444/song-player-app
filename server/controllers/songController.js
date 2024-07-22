const Song = require("../models/song");

// Create a new song
exports.createSong = async (req, res) => {
  try {
    const song = new Song(req.body);
    await song.save();
    res.status(201).json(song);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get all songs
exports.getAllSongs = async (req, res) => {
  const { q = "", page = 1, genre=""} = req.query;
  console.log(q, page, genre, "dkdk");
  const regex = new RegExp(q, "i");
  const genreReg = new RegExp(genre, "i")

  const ITEM_PER_PAGE = 10;

  try {
    const count = await Song.find({
      title: { $regex: regex }, genre: {$regex: genreReg}
    }).countDocuments();
    const songs = await Song.find({ title: { $regex: regex }, genre: {$regex: genreReg} })
      .sort({ createdAt: -1 })
      .limit(ITEM_PER_PAGE)
      .skip(ITEM_PER_PAGE * (page - 1));
    console.log("co", count, songs);
    return res.status(200).json({ count, songs });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

// Get all songs
exports.getSong = async (req, res) => {
  try {
    const songs = await Song.findById(req.params.id);
    res.status(200).json(songs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// Update a song
exports.updateSong = async (req, res) => {
  try {
    const song = await Song.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!song) return res.status(404).json({ message: "Song not found" });
    res.status(200).json(song);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete a song
exports.deleteSong = async (req, res) => {
  try {
    const song = await Song.findByIdAndDelete(req.params.id);
    if (!song) return res.status(404).json({ message: "Song not found" });
    res.status(200).json({ message: "Song deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Generate statistics
exports.getStatistics = async (req, res) => {
  try {
    const totalSongs = await Song.countDocuments();
    const totalArtists = await Song.distinct("artist").then(
      (artists) => artists.length
    );
    const totalAlbums = await Song.distinct("album").then(
      (albums) => albums.length
    );
    const totalGenres = await Song.distinct("genre").then(
      (genres) => genres.length
    );

    const genreCounts = await Song.aggregate([
      { $group: { _id: "$genre", count: { $sum: 1 } } },
    ]);

    const artistStats = await Song.aggregate([
      {
        $group: {
          _id: "$artist",
          songs: { $sum: 1 },
          albums: { $addToSet: "$album" },
        },
      },
      { $project: { artist: "$_id", songs: 1, albums: { $size: "$albums" } } },
    ]);

    const albumStats = await Song.aggregate([
      { $group: { _id: "$album", count: { $sum: 1 } } },
    ]);

    res.status(200).json({
      totalSongs,
      totalArtists,
      totalAlbums,
      totalGenres,
      genreCounts,
      artistStats,
      albumStats,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
