require("module-alias/register");
const logger = require("@logger");
const updateAddress = require("@mysql/crud/updateAddress");
const timeUtils = require("@lib/timeUtils");
const notifyUptimeScore = require("@telegram/notifyUptimeScore");
const axios = require("axios");

const nodeProcess = async (data) => {
    try {
        const { id, nodeId, lastUptimeScore, qualityIndex, chatId, botTokenId } = data.node;
        const queryHealth = await axios({
            method: "GET",
            url: `https://leaderboard.celestia.tools/api/v1/nodes/${nodeId}`,
            headers: {
                "Accept-Encoding": "application/json",
            },
            maxContentLength: 100000000,
        });
        const health = queryHealth.data;
        // {
        //     "node_id": "12D3KooWDk4QApcpR86PtsWa1WHhHm9uuGvL6ZQDzVzrLUEk357R",
        //     "node_type": 3,
        //     "latest_metrics_time": "2023-04-08T17:34:29.549065011Z",
        //     "uptime": 95.93615,
        //     "last_pfb_timestamp": "2023-04-08T02:33:20.11Z",
        //     "pfb_count": 5,
        //     "head": 201413,
        //     "network_height": 201416,
        //     "das_latest_sampled_timestamp": "2023-04-08T17:33:51Z",
        //     "das_network_head": 201413,
        //     "das_sampled_chain_head": 201413,
        //     "das_sampled_headers_counter": 3924,
        //     "das_total_sampled_headers": 201413,
        //     "total_synced_headers": 201412,
        //     "start_time": "2023-03-29T17:50:56Z",
        //     "last_restart_time": "2023-04-02T10:49:57Z",
        //     "node_runtime_counter_in_seconds": 542640,
        //     "last_accumulative_node_runtime_counter_in_seconds": 285302,
        //     "node_type_str": "Celestia-Light"
        //   }
        if (health) {
            let messageAlert = `Node Uptime Score:
            + node_id = ${nodeId}
            + uptime_score = ${health.uptime} %
            + latest_metrics_time = ${health.latest_metrics_time}`;
            await notifyUptimeScore({
                message: messageAlert,
                chatId: chatId,
                botToken: botTokenId,
            });
            let quality_index;
            if (lastUptimeScore > health.uptime) {
                quality_index = qualityIndex--;
            } else {
                quality_index = 0;
            }
            if (timeUtils.getDiffMinutesFromNow(health.latest_metrics_time) >= 3) {
                quality_index = qualityIndex - 3;
            }

            if (quality_index <= -3) {
                messageAlert = `Your node is not working well! The uptime score tends to decrease or the node data becomes outdated. Details:
                + uptime_score = ${last_uptime_score} %
                + latest_metrics_time = ${health.latest_metrics_time}
                Please check node ASAP!`;
                await Promise.all([
                    updateAddress({
                        id: +id,
                        last_uptime_score: health.uptime,
                        qualityIndex: quality_index,
                    }),
                    insertAlert({
                        address_id: +id,
                        message: messageAlert,
                        chat_id: chatId,
                        bot_token_id: botTokenId,
                    }),
                ]);
            } else {
                await updateAddress({
                    id: +id,
                    last_uptime_score: health.uptime,
                    qualityIndex: quality_index,
                });
            }
        } else {
            logger.warn("node.process exception: cannot get node heath!");
        }
    } catch (error) {
        logger.warn("node.process exception: " + error);
    }
};

module.exports = nodeProcess;
