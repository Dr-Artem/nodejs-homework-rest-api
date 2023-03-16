const express = require("express");
const router = express.Router();

const {
    getContacts,
    getContactById,
    createContact,
    updateContact,
    deleteContact,
} = require("../../controllers/contactsController");

// const {
//     addContactValidation,
// } = require("../../middlewares/contactValidationMiddleware");

router.get("/", getContacts);

router.get("/:contactId", getContactById);

router.post("/", createContact);

router.delete("/:contactId", deleteContact);

router.put("/:contactId", updateContact);

module.exports = router;
