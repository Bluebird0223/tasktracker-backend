const multer = require('multer');
const fs = require("fs");
const uniqId = require("short-unique-id")
const uid = new uniqId();
const multerUtils = require("../../utils/multer/multer-utils")


const multerStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        const path = "./public/image/";  // file added to the public folder of the root directory
        if (!fs.existsSync(path)) {
            fs.mkdirSync(path)
        }
        cb(null, path)
    },
    
    //save file name as original name
    filename: function (req, file, cb) {
        try {
            const extension = file.mimetype.split("/")[1];
            const filename = `${uid.stamp(10)}.${extension}`;
            cb(null, filename);
        } catch (error) {
            cb(error, null);
        }
    }
});


const uploadSingleImage = multer({ storage: multerStorage, limits: { fileSize: multerUtils?.MULTER_UPLOAD_FILE_SIZE_LIMIT }, fileFilter: multerUtils?.multerFileTypeImage })
module.exports = uploadSingleImage;