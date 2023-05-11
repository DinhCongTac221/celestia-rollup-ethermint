require("module-alias/register");
const logger = require("@logger");
const axios = require("axios");

const namespacedSharesController = async (req, res) => {
    try {
        const urlParams = new URLSearchParams(req.query);
        const height = urlParams.get("height");
        const namespace_id = urlParams.get("namespace_id");
        if (!height || !namespace_id) {
            return res.status(404).json({
                code: "NOK",
                data: {
                    message: "invalid params",
                },
            });
        } else {
            //send POST
            const queryShares = await axios({
                method: "GET",
                url: `http://localhost:26659/namespaced_shares/${namespace_id}/height/${height}`,
                headers: {
                    "Accept-Encoding": "application/json",
                },
                maxContentLength: 100000000,
            });
            logger.info(JSON.stringify(queryShares.data, null, 4));
            if (queryShares.status === 200) {
                // response was successful, do something
                const response = queryShares.data;
                return res.status(200).json({
                    code: "OK",
                    data: {
                        message: response,
                    },
                });
            } else {
                logger.warn(
                    `namespacedSharesController fail to query shares with namespace_id ${namespace_id} with height=${height}`
                );
                return res.status(queryShares.status).json({
                    code: "NOK",
                    data: {
                        message: queryShares.data,
                    },
                });
            }
        }
    } catch (exception) {
        logger.warn(`namespacedSharesController got exception:${exception}`);
        return res.status(500).json({
            code: "NOK",
            data: {
                message: String(exception),
            },
        });
    }
};
module.exports = namespacedSharesController;
