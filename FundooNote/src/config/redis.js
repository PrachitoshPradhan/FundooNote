import { createClient } from 'redis';
import logger from './logger';

export const redisClient = createClient();

const redis = async () => {
    try {
        await redisClient.connect();
        
        console.log('Connected to the redis client.');
    } catch (error) {
       console.log('Could not connect to the redis client.');
    }
}

export default redis;