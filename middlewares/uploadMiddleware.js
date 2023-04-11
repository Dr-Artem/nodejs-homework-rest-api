const multer = require("multer");
const path = require("path");

const tempDir = path.dirname(__dirname, "../", "temp");

const multerConfig = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, tempDir);
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    },
    limit: {
        fileSize: 2048,
    },
});

const uploadMiddleware = multer({
    storage: multerConfig,
});

module.exports = uploadMiddleware;
