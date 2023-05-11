const Bull = require("bull");
const config = require("../../config/app.config");
const { handlerFailure, handlerCompleted, handlerStalled } = require("./node.handler");

const nodeQueue = new Bull("nodeCelestiaBlockspaceQueue", {
    redis: config.redis,
});

nodeQueue.on("completed", handlerCompleted);

nodeQueue.on("error", handlerFailure);

nodeQueue.on("failed", handlerStalled);

module.exports = nodeQueue;
