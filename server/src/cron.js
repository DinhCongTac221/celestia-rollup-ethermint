require("module-alias/register");
var CronJob = require("cron").CronJob;
const checkNodeAccount = require("@cron/checkNodeAccount");
const processAlert = require("@cron/processAlert");
const logger = require("@logger");

async function runCronJobs() {   
    const cronCheckNodeAccount = new CronJob("30 */5 * * * *", checkNodeAccount);
    const cronProcessAlert = new CronJob("50 */5 * * * *", processAlert);
    
    cronCheckNodeAccount.start();
    logger.info(`cronCheckNodeAccount has started...`);
    cronProcessAlert.start();
    logger.info(`cronProcessAlert has started...`);
}

runCronJobs();
