const { Contact } = require("../../models");

const getContactById = async (req, res) => {
    const { contactId } = req.params;
    const data = await Contact.findById(contactId);
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

module.exports = getContactById;
