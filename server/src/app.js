require("module-alias/register");
const express = require("express");
const logger = require("@logger");
const router = require("@router");
const config = require("@config");
const cors = require("cors");

const app = express();
app.use(express.urlencoded({ extended: true, limit: "10kb" }));
app.use(express.json({ limit: "10kb" }));
app.use(cors());

//set route
app.use("/", router);

//running app
app.listen(config.app.port, async () => {
    console.log(`Server is running on port ${config.app.port}`);    
    logger.info(`Server is running on port ${config.app.port}`);    
});
