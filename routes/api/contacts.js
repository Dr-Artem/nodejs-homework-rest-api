const express = require("express");
const router = express.Router();

const {
    authCurrentMiddleware,
    errorControlMiddleware,
    contactValidationMiddleware,
} = require("../../middlewares");
const { joiContactSchema } = require("../../models/contact");
const { joiFavoriteSchema } = require("../../models/contact");
const { contacts: ctrl } = require("../../controllers");

router.get(
    "/",
    authCurrentMiddleware,
    errorControlMiddleware(ctrl.getContacts)
);

router.get("/:contactId", errorControlMiddleware(ctrl.getContactById));

router.post(
    "/",
    authCurrentMiddleware,
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
