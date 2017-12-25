
'use strict';

const redis = require('ioredis');

// const redisClient = redis.createClient();
const redisClient = new redis();

redisClient.on('error', (err)=>{
  if(err){
     process.exit(1);
  }
});

redisClient.on('ready', ()=>{
  console.log('Redis is ready!');
});

exports = module.exports = redisClient;