const { Contact } = require("../../models");

const createContact = async (req, res) => {
    const { _id } = req.user;
    const data = await Contact.create({ ...req.body, owner: _id });
    res.status(201).json({
        statusbar: "success",
        code: 201,
        data,
    });
};

module.exports = createContact;
