// const redisClient=require('../config/redisClient');

// exports.setItem = function (key, value, expired, callback) {
//     if (!redisActive) {
//         return callback(null);
//     }
//     client.set(key, JSON.stringify(value), function (err) {
//         if (err) {
//             return callback(err);
//         }
//         if (expired) {
//             client.expire(key, expired);
//         }
//         return callback(null);
//     });
// };

// exports.getItem = function (key, callback) {
//     if (!redisActive) {
//         return callback(null, null);
//     }
//     client.get(key, function (err, reply) {
//         if (err) {
//             return callback(err);
//         }
//         return callback(null, JSON.parse(reply));
//     });
// };

// exports.removeItem = function (key, callback) {
//     if (!redisActive) {
//         return callback(null);
//     }
//     client.del(key, function (err) {
//         if (err) {
//             return callback(err);
//         }
//         return callback(null);
//     });
// };

// async function set(key, content, expire) {
//     await redisClient.set(key, JSON.stringify(content || ''));
//     if (expire) {
//       await redisClient.expire(key, expire);
//     }
//     return null;
//   };
  
//    async function get(key, func, expire, refresh = false) {
//     const cacheContent = await redisClient.get(key);
//     if (cacheContent && !refresh) {
//       return JSON.parse(cacheContent);
//     }
//     if (typeof func === 'function') {
//       const content = await func();
//       await this.set(key, content, expire);
//       return content;
//     } else {
//       return null;
//     }
//   };


  
// async function hset(key, field, content, expire) {
//     await redisClient.hset(key, field, JSON.stringify(content) || '');
//     if (expire) {
//       await redisClient.expire(key, expire);
//     }
//     return null;
//   };
  
//    async function hget(key, field, func, expire, refresh = false) {
//     const cacheContent = await this._client.hget(key, field);
//     if (cacheContent && !refresh) {
//       return JSON.parse(cacheContent);
//     }
//     if (typeof func === 'function') {
//       const content = await func();
//       await this.hset(key, field, content, expire);
//       return content;
//     } else {
//       return null;
//     }
//   };
  
//  async function del(key) {
//     return await this._client.del(key);
//   };
  
//   module.exports={del,hget,hset,get,set};