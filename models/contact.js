const { model, Schema } = require("mongoose");
const Joi = require("joi");

const contactShema = Schema(
    {
        name: {
            type: String,
            required: [true, "Set name for contact"],
        },
        email: {
            type: String,
        },
        phone: {
            type: String,
        },
        favorite: {
            type: Boolean,
            default: false,
        },
    },
    { versionkey: false, timestamps: true }
);

const joiContactSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string()
        .email({
            minDomainSegments: 2,
            tlds: { allow: ["com", "net"] },
        })
        .required(),
    phone: Joi.string().required(),
    favorite: Joi.bool(),
});

const joiFavoriteSchema = Joi.object({
    favorite: Joi.bool().required(),
});

const Contact = model("contact", contactShema);

module.exports = {
    Contact,
    joiContactSchema,
    joiFavoriteSchema,
};
