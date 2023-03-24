const { Contact } = require("../../models");

const updateContact = async (req, res) => {
    const { contactId } = req.params;
    const data = await Contact.findByIdAndUpdate(contactId, req.body, {
        new: true,
    });

    res.status(200).json({
        status: "success",
        code: 200,
        data,
    });
};

module.exports = updateContact;
