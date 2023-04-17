const { User } = require("../../models");
const { sendEmail } = require("../../helpers");
const { BadRequest } = require("http-errors");

const reVerifyEmail = async (req, res) => {
    const { email } = req.body;
    const user = await User.findOne({ email });

    if (!email) {
        throw BadRequest("missing required field email");
    }
    if (user.verify) {
        throw BadRequest("Verification has already been passed");
    }

    const mail = {
        to: email,
        subject: "Verify your email",
        html: `<a target="_blank" href="http://localhost:3000/api/users/verify/${user.verificationToken}">Verify your email</a>`,
    };
    await sendEmail(mail);

    res.json({
        status: "OK",
        code: 200,
        message: "Verification email sent",
    });
};

module.exports = reVerifyEmail;
