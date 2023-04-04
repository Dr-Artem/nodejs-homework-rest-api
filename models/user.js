const { model, Schema } = require("mongoose");
const Joi = require("joi");

const userShema = Schema(
    {
        password: {
            type: String,
            required: [true, "Set password for user"],
        },
        email: {
            type: String,
            required: [true, "Email is required"],
            unique: true,
        },
        subscription: {
            type: String,
            enum: ["starter", "pro", "business"],
            default: "starter",
        },

        token: {
            type: String,
            default: null,
        },
    },
    { versionkey: false, timestamps: true }
);

const joiUserSchema = Joi.object({
    password: Joi.string().required(),
    email: Joi.string()
        .email({
            minDomainSegments: 2,
            tlds: { allow: ["com", "net"] },
        })
        .required(),
    subscription: Joi.string(),
    token: Joi.string(),
});

const User = model("user", userShema);

module.exports = {
    User,
    joiUserSchema,
};
