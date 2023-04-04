const errorControlMiddleware = require("./errorControlMiddleware");
const contactValidationMiddleware = require("./contactValidationMiddleware");
const authCurrentMiddleware = require("./authCurrentMiddleware");

module.exports = {
    errorControlMiddleware,
    contactValidationMiddleware,
    authCurrentMiddleware,
};
