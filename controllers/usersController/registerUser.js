const { User } = require("../../models");
const { Conflict } = require("http-errors");
const bcryptjs = require("bcryptjs");
const gravatar = require("gravatar");
const { v4: uuidv4 } = require("uuid");
const { sendEmail } = require("../../helpers");

const registerUser = async (req, res) => {
    const { email, password, subscription } = req.body;
    const user = await User.findOne({ email });

    if (user) {
        throw new Conflict(`Email in use`);
    }
    const verificationToken = uuidv4();
    const cryptedPassword = bcryptjs.hashSync(
        password,
        bcryptjs.genSaltSync(10)
    );

    const avatarURL = gravatar.url(email);

    const data = await User.create({
        email,
        password: cryptedPassword,
        subscription,
        avatarURL,
        verificationToken,
    });

    const mail = {
        to: email,
        subject: "Verify your email",
        html: `<a target="_blank" href="http://localhost:3000/api/users/verify/${verificationToken}">Verify your email</a>`,
    };
    await sendEmail(mail);

    res.status(201).json({
        status: "Created",
        code: 201,
        data,
    });
};
module.exports = registerUser;
