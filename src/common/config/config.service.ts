/**
 * Created with Cocos2d-x3.0 jsb.
 * User: lizizhen
 * Date: 2019/4/26
 * Time: 15:34
 *
 */

import IBaseConfig, { IMailerConfig, IMongodbConfig, IMysqlConfig, IRedisConfig, RUNTIME } from './common/base.js';

export class ConfigService {
    private readonly envConfig: IBaseConfig;
    private static readonly config: ConfigService;

    private constructor(filePath: string = `./common/${process.env.NODE_ENV ? process.env.NODE_ENV : 'localhost'}`) {
        this.envConfig = require(filePath).default;
    }

    static init(filePath?: string): ConfigService {
        if (this.config) return this.config;
        const config = new ConfigService(filePath);
        return config;
    }

    get env(): RUNTIME {
        return this.envConfig.runtime;
    }
    get port(): number {
        return this.envConfig.port;
    }
    get supportBase(): string {
        return this.envConfig.supportBase;
    }
    get wechatBase(): string {
        return this.envConfig.wechatBase;
    }
    get jwtSecret(): string {
        return this.envConfig.jwtSecret;
    }
    get jwtTicketSecret(): string {
        return this.envConfig.jwtTicketSecret;
    }
    get usbDriveBase(): string {
        return this.envConfig.usbDriveBase;
    }
    get mongodb(): IMongodbConfig {
        return this.envConfig.mongodb;
    }
    get mysql(): IMysqlConfig {
        return this.envConfig.mysql;
    }
    get redis(): IRedisConfig {
        return this.envConfig.redis;
    }
    get mailer(): IMailerConfig {
        return this.envConfig.mailer;
    }
}
