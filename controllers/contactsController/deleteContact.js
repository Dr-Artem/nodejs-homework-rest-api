const { Contact } = require("../../models");

const deleteContact = async (req, res, next) => {
    const { contactId } = req.params;
    const data = await Contact.findByIdAndDelete(contactId);
    if (!data) {
        const error = new Error("Not found");
        error.status = 404;
        throw error;
    }
    res.json({
        status: "success",
        code: 200,
        data,
    });
};

module.exports = deleteContact;
