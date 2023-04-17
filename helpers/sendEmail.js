const sgMail = require("@sendgrid/mail");
require("dotenv").config();

const { SENDGRID_API_KEY } = process.env;
const { EMAIL_SENDER } = process.env;

sgMail.setApiKey(SENDGRID_API_KEY);

const sendEmail = async (data) => {
    const msg = { ...data, from: EMAIL_SENDER };
    // eslint-disable-next-line no-useless-catch
    try {
        await sgMail.send(msg);
        console.log("mail sended");
        return true;
    } catch (error) {
        throw error;
    }
};

module.exports = sendEmail;
