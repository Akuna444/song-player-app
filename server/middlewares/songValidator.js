const { body, validationResult } = require("express-validator");

// Validation rules for creating or updating a song
const validateSong = [
  body("title")
    .notEmpty()
    .withMessage("Title is required")
    .isString()
    .withMessage("Title must be a string"),

  body("artist")
    .notEmpty()
    .withMessage("Artist is required")
    .isString()
    .withMessage("Artist must be a string"),

  body("album")
    .notEmpty()
    .withMessage("Album is required")
    .isString()
    .withMessage("Album must be a string"),

  body("genre")
    .notEmpty()
    .withMessage("Genre is required")
    .isString()
    .withMessage("Genre must be a string"),

  // Check if the validation passed
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

module.exports = validateSong;
