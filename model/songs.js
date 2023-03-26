const mongoose = require("mongoose");

const songSchema = new mongoose.Schema({
  id: { type: String, unique: true },
  asset_id: { type: String, default: "" },
  public_id: { type: String, default: "" },
  version: { type: Number, default: 1 },
  signature: { type: String, default: "" },
  version_id: { type: String, default: "" },
  format: { type: String, default: "" },
  mimeType: { type: String, default: "" },
  fileName: { type: String, default: null },
  artist: { type: String, default: "Unknown" },
  size: { type: Number, default: 0 },
  encoding: { type: String, default: "7bit" },
  placeholder: {
    type: String,
    default:
      "https://res.cloudinary.com/dou11jh0x/image/upload/v1679791174/assets/b18ee78cc15841e086d737019792eebf_hmhva3.jpg",
  },
  genre: { type: String, default: "mix" },
  url: { type: String, unique: false },
  secure_url: { type: String, default: "" },
  playback_url: { type: String, default: "" },
  folder: { type: String, default: "" },
  audio: {
    codec: { type: String, default: "" },
    bit_rate: { type: String, default: "" },
    frequency: { type: Number, default: 0 },
    channels: { type: Number, default: 2 },
    channel_layout: { type: String, default: "" },
  },
  bit_rate: { type: Number, default: 0 },
  duration: { type: Number, default: 0.0 },
  token: { type: String, default: "" },
});

module.exports = mongoose.model("songs", songSchema);
