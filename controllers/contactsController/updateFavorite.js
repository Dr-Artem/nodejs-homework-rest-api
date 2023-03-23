const { Contact } = require("../../models");

const updateFavorite = async (req, res) => {
    const { contactId } = req.params;
    const { favorite } = req.body;
    const data = await Contact.findByIdAndUpdate(
        contactId,
        { favorite },
        { new: true }
    );
    res.status(200).json({
        status: "success",
        code: 200,
        data,
    });
};

module.exports = updateFavorite;
