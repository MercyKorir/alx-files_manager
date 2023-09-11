import { createClient } from 'redis';

class RedisClient {
  constructor() {
    this.client = createClient();
    this.client.on('error', (err) =>
      console.error(`Redis client not connected to the server: ${err.message}`),
    );
  }

  isAlive() {
    return this.client.ready;
  }

  async get(key) {
    try {
      const val = await this.client.get(key);
      return val;
    } catch (err) {
      return null;
    }
  }

  async set(key, val, duration) {
    await this.client.set(key, val, 'EX', duration);
  }

  async del(key) {
    await this.client.del(key);
  }
}

const redisClient = new RedisClient();
export default redisClient;
