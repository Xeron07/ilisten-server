const cloudinary = require("cloudinary").v2;
const { CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET } = process.env;
cloudinary.config({
  cloud_name: CLOUD_NAME,
  api_key: CLOUDINARY_API_KEY,
  api_secret: CLOUDINARY_API_SECRET,
});

exports.uploader = (file, genre, rootFolder) => {
  return new Promise((resolve) => {
    const folder = `${rootFolder}/${genre}`;
    cloudinary.uploader
      .upload(file, { resource_type: "auto", folder: folder })
      .then((result) => {
        console.log("********* upload success **********");
        console.log("******* " + result.public_id);
        resolve({ success: true, data: result });
      })
      .catch((err) => {
        console.error("############ error occured during upload ########");
        console.error(`"* ${err} *"`);
        console.error("############ error ends #########################");
        resolve({ success: false, data: {} });
      });
  });
};
