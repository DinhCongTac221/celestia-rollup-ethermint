require("module-alias/register");
const logger = require("@logger");
const ConvertDataService = require("@service/convertData.service");
const ConvertNamespaceService = require("@service/convertNamespace.service");

const genCommandPfbController = async (req, res) => {
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
            logger.info(
                `Success for create command PFB tx with namespace=${namespace} && dataCustom=${dataCustom}`
            );
            const message = `curl -X POST -d '{"namespace_id":"${namespace_id}","data":"${data}","gas_limit": 80000, "fee": 2000}' http://localhost:26659/submit_pfb | jq -r .txhash;`;

            return res.status(200).send(message);
        }
    } catch (exception) {
        logger.warn(`genCommandPfbController got exception:${exception}`);
        return res.status(500).json("system busy");
    }
};
module.exports = genCommandPfbController;
