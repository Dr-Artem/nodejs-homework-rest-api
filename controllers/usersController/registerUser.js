const { User } = require("../../models");
const { Conflict } = require("http-errors");
const bcryptjs = require("bcryptjs");

const registerUser = async (req, res) => {
    const { email, password, subscription } = req.body;
    const user = await User.findOne({ email });

    if (user) {
        throw new Conflict(`Email in use`);
    }
    const cryptedPassword = bcryptjs.hashSync(
        password,
        bcryptjs.genSaltSync(10)
    );

    const data = await User.create({
        email,
        password: cryptedPassword,
        subscription,
    });

    res.status(201).json({
        status: "Created",
        code: 201,
        data,
    });
};
module.exports = registerUser;
