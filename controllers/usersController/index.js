const registerUser = require("./registerUser");
const loginUser = require("./loginUser");
const logoutUser = require("./logoutUser");
const currentUser = require("./currentUser");
const updateAvatar = require("./updateAvatar");
const verifyEmail = require("./verifyEmail");
const reVerifyEmail = require("./reVerifyEmail");

module.exports = {
    registerUser,
    loginUser,
    logoutUser,
    currentUser,
    updateAvatar,
    verifyEmail,
    reVerifyEmail,
};
