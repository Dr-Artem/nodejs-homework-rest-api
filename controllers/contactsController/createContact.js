const { Contact } = require("../../models");

const createContact = async (req, res, next) => {
    const data = await Contact.create(req.body);
    res.status(201).json({
        statusbar: "success",
        code: 201,
        data,
    });
};

module.exports = createContact;
