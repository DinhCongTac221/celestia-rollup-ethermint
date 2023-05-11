const Bull = require("bull");
const config = require("../../config/app.config");
const { handlerFailure, handlerCompleted, handlerStalled } = require("./alert.handler");

const alertQueue = new Bull("alertCelestiaBlockspaceQueue", {
    redis: config.redis,
});

alertQueue.on("completed", handlerCompleted);

alertQueue.on("error", handlerFailure);

alertQueue.on("failed", handlerStalled);

module.exports = alertQueue;
