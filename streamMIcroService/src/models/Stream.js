const mongoose = require("mongoose"),
  Schema = mongoose.Schema,
  streamSchema = new Schema(
    {
      title: String,
      filename: { type: String, unique: true },
      description: String,
      imageURL: String,
      category: {
        type: String,
        enum: ["Aventura", "Acción", "Terror"]
      }
    },
    { timestamps: true }
  );

module.exports = mongoose.model("Stream", streamSchema);
