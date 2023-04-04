const express = require("express");
const router = express.Router();

const {
    authCurrentMiddleware,
    errorControlMiddleware,
    contactValidationMiddleware,
} = require("../../middlewares");
const { users: ctrl } = require("../../controllers");
const { joiUserSchema } = require("../../models/user");

router.post(
    "/register",
    contactValidationMiddleware(joiUserSchema),
    errorControlMiddleware(ctrl.registerUser)
);
router.post(
    "/login",
    contactValidationMiddleware(joiUserSchema),
    errorControlMiddleware(ctrl.loginUser)
);
router.post(
    "/logout",
    authCurrentMiddleware,
    errorControlMiddleware(ctrl.logoutUser)
);
router.get(
    "/current",
    authCurrentMiddleware,
    errorControlMiddleware(ctrl.currentUser)
);

module.exports = router;
