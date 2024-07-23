const express = require("express");
const mongoose = require("mongoose");
const songRoutes = require("./routes/songRoutes");
const cors = require("cors");

require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;

const allowedOrigins = [
  "http://localhost:3000",
  "https://walia-song-player-app.vercel.app",
];

const corsOptions = {
  origin: (origin, callback) => {
    if (allowedOrigins.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  methods: "GET,POST,PUT,DELETE",
  allowedHeaders: "Content-Type",
};

// Enable CORS
app.use(cors(corsOptions));

app.use(express.json());
app.use("/api", songRoutes);

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() =>
    app.listen(port, () => console.log(`Server running on port ${port}`))
  )
  .catch((error) => console.error(error));
