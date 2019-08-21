/**
 * Created with Cocos2d-x3.0 jsb.
 * User: lizizhen
 * Date: 2019/2/19
 * Time: 14:56
 *
 */
import * as BlurBird from 'bluebird';
import IBaseConfig, { IMongodbConfig, IMysqlConfig, IRedisConfig, IMailerConfig, RUNTIME } from './base';

const mongodb: IMongodbConfig = {
    url: 'mongodb://localhost:27017/data',
    option: {
        poolSize: 10,
        useCreateIndex: true,
        // user: 'ptahuser',
        // pass: 'Ptah@6cF0d',
        ssl: null,
        useNewUrlParser: true,
        promiseLibrary: BlurBird
    }
};

const redis: IRedisConfig = {
    host: '127.0.0.1',
    port: 6379,
    secret: 'rebong'
};

const mysql: IMysqlConfig = {
    dialect: 'mysql',
    host: '120.78.143.165',
    port: 13306,
    define: {
        charset: 'utf8mb4'
    },
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    },
    username: 'dotsview2',
    password: '!244466666',
    database: 'dotsview2'
};

const mailer: IMailerConfig = {
    host: 'smtp-mail.outlook.com', // hostname
    secureConnection: false, // TLS requires secureConnection to be false
    port: 587, // port for secure SMTP
    tls: {
        ciphers: 'SSLv3'
    },
    auth: {
        user: 'test123edemo@outlook.com',
        pass: '1234567890agd,,'
    }
};

const develop: IBaseConfig = {
    port: 3000,
    jwtSecret: 'app.get(superSecret)',
    jwtTicketSecret: 'app.get(superTicket)',
    supportBase: 'http://localhost:3000',
    wechatBase: 'https://wechat3.jzmediatech.com',
    usbDriveBase: 'http://rms3.jzmediatech.com/upgrade_itf',
    runtime: RUNTIME.DEVELOPER,
    mailer,
    redis,
    mysql,
    mongodb
};
export default develop;
