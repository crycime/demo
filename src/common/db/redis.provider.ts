/**
 * Created with Cocos2d-x3.0 jsb.
 * User: lizizhen
 * Date: 2019/4/28
 * Time: 17:04
 *
 */

import { RedisClient } from 'redis';
import * as redis from 'redis';
import bluebird from 'bluebird';
import { IRedisConfig } from '../config/common/base';
import { ConfigService } from '../config/config.service';
import { DB_CONNECTION_REDIS } from '../constants/system.constant';
import { DBError } from '../helpers/forbidden.exception';
bluebird.promisifyAll(redis.RedisClient.prototype);
bluebird.promisifyAll(redis.Multi.prototype);

export class Redis {
    redisWrite3: RedisClient;
    redisRead3: RedisClient;
    redisPublish: RedisClient;
    redisSubscribe: RedisClient;

    constructor(config?: IRedisConfig) {
        if (this.redisWrite3 && this.redisRead3) return;

        /*
         * select('3')
         * */
        this.redisWrite3 = redis.createClient(config.port, config.host);
        this.redisRead3 = redis.createClient(config.port, config.host);
        this.redisWrite3.auth(config.secret);
        this.redisWrite3.select('3');
        this.redisWrite3.on('error', function(error) {
            throw new DBError('无法连接到redis server.msg:' + error.message, 5001);
        });
        this.redisRead3.auth(config.secret);
        this.redisRead3.select('3');
        this.redisRead3.on('error', function(error) {
            throw new DBError('无法连接到redis server.msg:' + error.message, 5001);
        });

        /*
         * select('15')
         * */
        this.redisPublish = redis.createClient(config.port, config.host);
        this.redisSubscribe = redis.createClient(config.port, config.host);

        this.redisPublish.on('error', function(error) {
            throw new DBError('无法连接到redis server.msg:' + error.message, 5001);
        });
        this.redisSubscribe.on('error', function(error) {
            throw new DBError('无法连接到redis server.msg:' + error.message, 5001);
        });

        this.redisSubscribe.auth(config.secret, (error, res) => {
            if (res == 'OK') {
                this.redisSubscribe.select('15', error2 => {
                    if (!error2) {
                        console.log('SUCCESS', 'redis', 'rdc_sub');
                    }
                });
            }
        });

        this.redisPublish.auth(config.secret, (error, res) => {
            if (res == 'OK') {
                this.redisSubscribe.select('14', function(error2) {
                    if (!error2) {
                        console.log('SUCCESS', 'redis', 'rdc_pub');
                    }
                });
            }
        });
    }
}

export const redisProvider = {
    provide: DB_CONNECTION_REDIS,
    useFactory: async (config: ConfigService) => {
        return new Redis(config.redis);
    },
    inject: [ConfigService]
};

export default Redis;
