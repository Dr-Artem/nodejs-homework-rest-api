const app = require("./app");
const mongoose = require("mongoose");
const { DB_HOST } = process.env;

mongoose
    .connect(DB_HOST)
    .then(() => {
        console.log("Database connection successful");
        app.listen(3000, () => {
            console.log("Server running. Use our API on port: 3000");
        });
    })
    .catch((err) => {
        console.log(err.messsage);
        process.exit(1);
    });
