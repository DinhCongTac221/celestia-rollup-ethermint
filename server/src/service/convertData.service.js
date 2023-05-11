require("module-alias/register");
const logger = require("@logger");
const sha256 = require("js-sha256");

const ConvertDataService = (anyDataString) => {
    try {
        var hash = sha256.create();
        hash.update(anyDataString);
        return hash.hex();
    } catch (exception) {
        logger.warn("ConvertDataService exception:" + exception);
    }
};
module.exports = ConvertDataService;
