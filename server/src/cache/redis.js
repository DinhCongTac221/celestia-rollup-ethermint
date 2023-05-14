require('module-alias/register');
const { createClient } = require("redis");
const config = require("@config");

const redis = createClient(config.redis);
redis.on("error", (err) => console.log("Redis Client Error", err));

exports.connectRedis = async () => {
    await redis.connect();
    console.log("Redis connected");
};

exports.redis = redis;
