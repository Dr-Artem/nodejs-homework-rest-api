const getContacts = require("./getContacts");
const getContactById = require("./getContactById");
const createContact = require("./createContact");
const deleteContact = require("./deleteContact");
const updateContact = require("./updateContact");
const updateFavorite = require("./updateFavorite");

module.exports = {
    getContacts,
    getContactById,
    createContact,
    deleteContact,
    updateContact,
    updateFavorite,
};
