require("module-alias/register");
const logger = require("@logger");
const axios = require("axios");
const ConvertDataService = require("@service/convertData.service");
const ConvertNamespaceService = require("@service/convertNamespace.service");
const insertTransaction = require("@mysql/crud/insertTransaction");
const config = require("@config");

const createPFBTxController = async (req, res) => {
    try {
        const urlBody = req.body;
        const namespace = urlBody.namespace;
        const dataCustom = urlBody.data;
        if (!namespace || !dataCustom) {
            return res.status(404).json({
                code: "NOK",
                data: {
                    message: "invalid params",
                },
            });
        } else {
            //get namespace_id 8 bytes
            const namespace_id = ConvertNamespaceService(namespace);
            //convert data to hexa
            const data = ConvertDataService(dataCustom);
            //build body json
            const bodyData = {
                namespace_id: namespace_id,
                data: data,
                gas_limit: 80000,
                fee: 2000,
            };
            //send POST
            const sendPfbTx = await axios({
                method: "POST",
                url: `http://localhost:26659/submit_pfb`,
                data: bodyData,
                headers: {
                    "Accept-Encoding": "application/json",
                },
                maxContentLength: 100000000,
            });
            logger.info(JSON.stringify(sendPfbTx.data, null, 4));
            if (sendPfbTx.status === 200) {
                // response was successful, do something
                const response = sendPfbTx.data;
                await insertTransaction({
                    ...response,
                    wallet_address: config.celestia.nodeWallet,
                    namespace_id: namespace_id,
                });
                return res.status(200).json({
                    code: "OK",
                    data: {
                        message: response,
                    },
                });
            } else {
                logger.warn(
                    `createPFBTxController fail to create PFB tx with status=${sendPfbTx.status}`
                );
                return res.status(sendPfbTx.status).json({
                    code: "NOK",
                    data: {
                        message: sendPfbTx.data,
                    },
                });
            }
        }
    } catch (exception) {
        logger.warn(`createPFBTxController got exception:${exception}`);
        return res.status(500).json({
            code: "NOK",
            data: {
                message: String(exception),
            },
        });
    }
};
module.exports = createPFBTxController;
