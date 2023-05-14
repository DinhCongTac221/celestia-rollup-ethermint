require('module-alias/register');
const redis = require('./redisClient');
const NodeCache = require('node-cache');

const redisGetOrSet = async(key, getDataFunc, redisTtl) => {   
    let value = await redis.getValue(key);   
    if (value === null || value === undefined) {
        let nextRedisValue = await getDataFunc();
        if (+redisTtl > 0) {
            await redis.setValue(key, nextRedisValue, +redisTtl);
        } else {
            await redis.setValue(key, nextRedisValue, 1);
        }
        return [null, nextRedisValue];
    }
    return [value, value];
}

const memCache = new NodeCache({
    useClones: false,
});
const memGetOrSet = async(key, getDataFunc, redisTtl, memTtl) => {   
    let value = memCache.get(key);    
    if (value === null || value === undefined) {       
        let [currentRedisValue, nextRedisValue] = await redisGetOrSet(key, getDataFunc, redisTtl);       
        if (+memTtl > 0) {
            memCache.set(key, nextRedisValue, +memTtl);
        } else {
            memCache.set(key, nextRedisValue, 1);
        }       
        return currentRedisValue;
    }
    return value;
}

const getDataFromCacheSystem = async(hashRequest, valueThisCall) => {    
    const cacheDataResult = await memGetOrSet(
        hashRequest,
        async () => {
            // This will load item directly from database and return value            
            return valueThisCall; //simple return
        },
        60 * 60 * 24, // Redis cache TTL 1 day
        60 * 60 * 24  // Memory cache TTL 1 day
    );
    return cacheDataResult;
}

module.exports = getDataFromCacheSystem;

