const contacts = require("../models/contacts");
const Joi = require("joi");

const contactSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string()
        .email({
            minDomainSegments: 2,
            tlds: { allow: ["com", "net"] },
        })
        .required(),
    phone: Joi.string().required(),
});

const getContacts = async (req, res, next) => {
    try {
        const data = await contacts.listContacts();
        if (!data) {
            throw new Error("Server error");
        }
        res.json({
            status: "success",
            code: 200,
            data,
        });
    } catch (error) {
        next(error);
    }
};

const getContactById = async (req, res, next) => {
    try {
        const { contactId } = req.params;
        const data = await contacts.getContactById(contactId);
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
    } catch (error) {
        next(error);
    }
};

const createContact = async (req, res, next) => {
    try {
        const { error } = contactSchema.validate(req.body);
        if (error) {
            res.status(400).json({ message: "missing required name field" });
        }
        const data = await contacts.addContact(req, res);
        res.status(201).json({
            status: "created",
            code: 201,
            data: data,
        });
    } catch (error) {
        next(error);
    }
};

const deleteContact = async (req, res, next) => {
    try {
        const { contactId } = req.params;
        const data = await contacts.removeContact(contactId);
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
    } catch (error) {
        next(error);
    }
};

const updateContact = async (req, res, next) => {
    try {
        const { error } = contactSchema.validate(req.body);
        if (error) {
            res.status(400).json({ message: "missing required name field" });
        }
        const data = await contacts.updateContact(req, res);
        res.status(200).json({
            status: "created",
            code: 200,
            data,
        });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getContacts,
    getContactById,
    createContact,
    deleteContact,
    updateContact,
};
