const express = require("express");
const mongoose = require("mongoose");
const songRoutes = require("./routes/songRoutes");
const cors = require("cors");

require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;

const corsOptions = {
  origin: "http://localhost:3000", // Allow requests from this origin
  methods: "GET,POST,PUT,DELETE", // Allowed HTTP methods
  allowedHeaders: "Content-Type", // Allowed headers
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
