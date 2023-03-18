const Joi = require("joi");

module.exports = {
    addContactValidation: (req, res, next) => {
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

        const validateResult = contactSchema.validate(req.body);

        if (validateResult.error) {
            return res
                .status(400)
                .json({ error: validateResult.error.details[0].message });
        }

        next();
    },
};
