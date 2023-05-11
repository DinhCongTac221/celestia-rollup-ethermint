const Bull = require("bull");
const config = require("../../config/app.config");
const { handlerFailure, handlerCompleted, handlerStalled } = require("./account.handler");

const accountQueue = new Bull("accountCelestiaBlockspaceQueue", {
    redis: config.redis,
});

accountQueue.on("completed", handlerCompleted);

accountQueue.on("error", handlerFailure);

accountQueue.on("failed", handlerStalled);

module.exports = accountQueue;
