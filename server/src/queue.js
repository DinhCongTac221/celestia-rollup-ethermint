require("module-alias/register");
const logger = require("@logger");
const nodeProcess = require("@queue/node/node.process");
const nodeQueue = require("@queue/node/node.queue");
// const accountProcess = require("@queue/account/account.process");
// const accountQueue = require("@queue/account/account.queue");
const alertProcess = require("@queue/alert/alert.process");
const alertQueue = require("@queue/alert/alert.queue");

// accountQueue.process(
//     1, //concurrency
//     function async(job, done) {
//         accountProcess(job.data);
//         done();
//     }
// );

// logger.info(`accountQueue has started...`);

nodeQueue.process(
    1, //concurrency
    function async(job, done) {
        nodeProcess(job.data);
        done();
    }
);

logger.info(`nodeQueue has started...`);

alertQueue.process(
    1, //concurrency
    function async(job, done) {
        alertProcess(job.data);
        done();
    }
);

logger.info(`alertQueue has started...`);
