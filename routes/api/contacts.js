const express = require("express");
const router = express.Router();

const {
    errorControlMiddleware,
    contactValidationMiddleware,
} = require("../../middlewares");
const { joiContactSchema } = require("../../models/contact");
const { joiFavoriteSchema } = require("../../models/contact");
const { contacts: ctrl } = require("../../controllers");

router.get("/", errorControlMiddleware(ctrl.getContacts));

router.get("/:contactId", errorControlMiddleware(ctrl.getContactById));

router.post(
    "/",
    contactValidationMiddleware(joiContactSchema),
    errorControlMiddleware(ctrl.createContact)
);

router.delete("/:contactId", errorControlMiddleware(ctrl.deleteContact));

router.put(
    "/:contactId",
    contactValidationMiddleware(joiContactSchema),
    errorControlMiddleware(ctrl.updateContact)
);

router.patch(
    "/:contactId/favorite",
    contactValidationMiddleware(joiFavoriteSchema),
    errorControlMiddleware(ctrl.updateFavorite)
);

module.exports = router;
