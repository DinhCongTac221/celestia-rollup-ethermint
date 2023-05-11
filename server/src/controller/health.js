require("module-alias/register");
const logger = require("@logger");
const axios = require("axios");

const healthController = async (req, res) => {
    try {
        const urlParams = new URLSearchParams(req.query);
        const NODE_ID = urlParams.get("node");
        if (!NODE_ID) {
            return res.status(404).json({
                code: "NOK",
                data: {
                    message: "invalid node id",
                },
            });
        } else {
            const queryHealth = await axios({
                method: "GET",
                url: `https://leaderboard.celestia.tools/api/v1/nodes/${NODE_ID}`,
                headers: {
                    "Accept-Encoding": "application/json",
                },
                maxContentLength: 100000000,
            });
            const health = queryHealth.data;
            return res.status(200).json({
                code: "OK",
                data: {
                    message: health,
                },
            });
        }
    } catch (exception) {
        logger.warn(`healthController got exception:${exception}`);
        return res.status(500).json({
            code: "NOK",
            data: {
                message: String(exception),
            },
        });
    }
};
module.exports = healthController;
