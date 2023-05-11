require("module-alias/register");
const express = require("express");
const logger = require("@logger");
const router = require("@router");
const config = require("@config");
const cors = require("cors");
const { mySqlConnect } = require("@mysql");

const app = express();
app.use(express.urlencoded({ extended: true, limit: "10kb" }));
app.use(express.json({ limit: "10kb" }));
app.use(cors());

//set route
app.use("/", router);

//running app
app.listen(config.app.port, async () => {
    logger.info(`Server is running on port ${config.app.port}`);
    await Promise.all([mySqlConnect()]).then(async () => {
        logger.info(`Server is ready now...`);
    });
});
