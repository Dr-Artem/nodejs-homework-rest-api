const errorControlMiddleware = require("./errorControlMiddleware");
const contactValidationMiddleware = require("./contactValidationMiddleware");
const authCurrentMiddleware = require("./authCurrentMiddleware");
const uploadMiddleware = require("./uploadMiddleware");

module.exports = {
    errorControlMiddleware,
    contactValidationMiddleware,
    authCurrentMiddleware,
    uploadMiddleware,
};
