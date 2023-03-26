const cloudinary = require("../../config/cloudinary");
const songModel = require("../../model/songs");
const upload = require("../multer/index");
const express = require("express");
const { v4 } = require("uuid");
const fs = require("fs");

const router = express.Router();

const generateSongModelData = (file, genre, cloudinaryData) => {
  return {
    id: `${Date.now()}-${v4()}`,
    asset_id: cloudinaryData.asset_id,
    public_id: cloudinaryData.public_id,
    version: cloudinaryData.version,
    signature: cloudinaryData.signature,
    version_id: cloudinaryData.version_id,
    format: cloudinaryData.format,
    mimeType: file.mimetype,
    fileName: file.originalname,
    size: file.size,
    encoding: file.encoding,
    genre,
    url: cloudinaryData.url,
    secure_url: cloudinaryData.secure_url,
    playback_url: cloudinaryData.playback_url,
    folder: cloudinaryData.folder,
    audio: {
      codec: cloudinaryData.audio.codec || "mp3",
      bit_rate: cloudinaryData.audio.bit_rate || "0",
      frequency: cloudinaryData.audio.frequency || 0,
      channels: cloudinaryData.audio.channels || 1,
      channel_layout: cloudinaryData.audio.channel_layout || "stereo",
    },
    bit_rate: cloudinaryData.bit_rate,
    duration: cloudinaryData.duration,
    token: cloudinaryData.api_key,
  };
};

/* GET home page. */
// router.get("/", function (req, res, next) {
//   res.render("index", { title: "Inventory" });
// });

router.get("/genres", async (req, res) => {
  try {
    const genres = await songModel.distinct("genre");
    res.status(200).json({ genres: [...genres] });
  } catch (exception) {
    console.error(exception);
    res.status(500).json(exception);
  }
});

router.get("/all/:genre", async (req, res) => {
  const { genre } = req.params;
  try {
    const musicList = await songModel.find({ genre: genre });
    res.status(200).json({ musics: [...musicList] });
  } catch (exception) {
    console.error(exception);
    res.status(500).json(exception);
  }
});

router.post("/upload", upload.array("files"), async (req, res) => {
  const files = req.files;
  const genre = req.body.genre;
  files.forEach(async (file) => {
    console.log("**************************************");
    console.log("****** uploading to cloudinary *******");
    const fileData = await cloudinary.uploader(
      file.path,
      genre || "mix",
      "songs"
    );
    if (fileData.success) {
      console.log("<<<<<<<<<<< db insertion >>>>>>>>>>>>>");
      const song = new songModel(
        generateSongModelData(file, genre, fileData.data)
      );
      const result = await song.save();
      console.log("*********** " + result.id + " ************");
      console.log("<<<<<<<<<<<<< db insertion end >>>>>>>>>>>");
    }

    fs.unlinkSync(file.path);
  });
  res.json({ success: "done" });
});

module.exports = router;
