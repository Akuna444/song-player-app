const express = require("express");
const mongoose = require("mongoose");
const songRoutes = require("./routes/songRoutes");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use("/api", songRoutes);

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() =>
    app.listen(port, () => console.log(`Server running on port ${port}`))
  )
  .catch((error) => console.error(error));
