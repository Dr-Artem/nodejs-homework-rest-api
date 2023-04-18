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
        avatarURL: {
            type: String,
            required: true,
        },
        verify: {
            type: Boolean,
            default: false,
        },
        verificationToken: {
            type: String,
            required: [true, "Verify token is required"],
        },
    },
    { versionkey: false, timestamps: true }
);

const joiUserSchema = Joi.object({
    email: Joi.string()
        .email({
            minDomainSegments: 2,
            tlds: { allow: ["com", "net", "me"] },
        })
        .required(),
    password: Joi.string().required(),

    subscription: Joi.string(),
    token: Joi.string(),
});

const User = model("user", userShema);

module.exports = {
    User,
    joiUserSchema,
};
