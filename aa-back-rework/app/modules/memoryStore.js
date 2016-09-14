import redis from 'redis'

import config from '../config.json';

const client = redis.createClient(config.redis.port, config.redis.url);

client
  .on('connect', () => {
    console.log('Connected to Redis');
  })
  .on('error', () => {
    console.error('Error connecting to Redis');
  });

export class MemoryStore {

  static delete(key, res) {
    return new Promise((resolve, reject) => {
      client.del(key, (err, value) => {
        resolve(value);
      });
    });
  }

  static exists(key) {
    return new Promise((resolve, reject) => {
      client.exists(key, (err, value) => {
        resolve(value);
      });
    });
  }

  static get(key) {
    return new Promise((resolve, reject) => {
      client.get(key, (err, value) => {
        resolve(value);
      });
    })
  }

  static set(key, value) {
    return new Promise((resolve, reject) => {
      client.set(key, value, (err, reply) => {
        resolve(reply);
        this.updateExpire(key);
      });
    })
  }

  static updateExpire(key) {
    return new Promise((resolve, reject) => {
      client.expire(key, config.redis.expire, (err, value) => {
        resolve(value);
      });
    });
  }

}