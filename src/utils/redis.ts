import { createClient, RedisClientType } from 'redis';

let redisClient : RedisClientType | null = null;

const getRedisClient = async () => {
    if (!redisClient) {
        redisClient = createClient();
        redisClient.on('error', err => {
            console.log('Redis Client Error', err);
        });

    }
    return redisClient;
};

export const client = getRedisClient();