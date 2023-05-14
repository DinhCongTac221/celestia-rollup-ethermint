require('module-alias/register');
const { createClient } = require("redis");
const config = require("@config");
const logger = require("@logger");

const redisClient = {
    getValue: async (key) => {
        try {
            const client = createClient(config.redis.port, config.redis.host);
            if (client.connected) {
                return await client.get(key);
            } else {
                await client.connect();
                return await client.get(key);
            }
        } catch (error) {
            logger.info(`get Redis fail with error = ${error}`);
            return false;
        }
    },
    setValue: async (key, value, expireTime) => {
        try {
            const client = createClient(config.redis.port, config.redis.host);
            if (client.connected) {
                await client.set(key, value);
                await client.expire(key, expireTime);
            } else {
                await client.connect();
                await client.set(key, value);
                await client.expire(key, expireTime);
            }
            return true;
        } catch (error) {
            logger.info(`set Redis fail with error = ${error}`);
            return false;
        }
    },
    deleteValue: async (key) => {
        try {
            const client = createClient(config.redis.port, config.redis.host);
            if (client.connected) {
                await client.del(key);
            } else {
                await client.connect();
                await client.del(key);
            }
            return true;
        } catch (error) {
            logger.info(`delete Redis fail with error = ${error}`);
            return false;
        }
    },
};

module.exports = redisClient;
