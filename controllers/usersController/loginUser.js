const { Unauthorized } = require("http-errors");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { SECRET_KEY } = process.env;
const { User } = require("../../models");

const loginUser = async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    const passCompare = bcryptjs.compareSync(password, user.password);

    if (!passCompare || !user) {
        throw new Unauthorized("Email or password is wrong");
    }

    const payload = {
        id: user._id,
    };
    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "10m" });
    await User.findByIdAndUpdate(user._id, { token });

    res.status(200).json({
        status: "OK",
        code: 200,
        data: {
            token,
            user: {
                email,
                subscription: user.subscription,
            },
        },
    });
};
module.exports = loginUser;
