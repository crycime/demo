/**
 * Created with Cocos2d-x3.0 jsb.
 * User: lizizhen
 * Date: 2019/4/26
 * Time: 14:56
 *
 */

export enum RUNTIME {
    LOCALHOST = 'localhost',
    TEST = 'test',
    DEVELOPER = 'develop',
    PRODUCTION = 'prod'
}

export interface IRedisConfig {
    readonly host: string;
    readonly port: number;
    readonly secret: string;
}

export interface IMysqlConfig {
    readonly dialect: string;
    readonly host: string;
    readonly port: number;
    readonly define: any;
    readonly username: string;
    readonly pool: {
        [propNmae: string]: number;
    };
    readonly password: string;
    readonly database: string;
}

export interface IMongodbConfig {
    readonly url: string; // 数据库地址
    readonly option: {
        // 数据库选项
        readonly poolSize: number; // 连接池选项
        // readonly user: string; // 数据库帐号
        // readonly pass: string; // 数据库密码
        readonly ssl: boolean; // 是否使用 ssl
        useNewUrlParser: true;
        [propNmae: string]: any;
    };
}

export interface IMailerConfig {
    host: string;
    port: number;
    [propNmae: string]: any;
    auth: {
        user: string;
        pass: string;
    };
}

export default interface IBaseConfig {
    readonly port: number;
    readonly jwtTicketSecret: string;
    readonly jwtSecret: string;
    readonly supportBase: string;
    readonly wechatBase: string;
    readonly usbDriveBase: string;
    readonly runtime: RUNTIME;
    readonly mailer: IMailerConfig;
    readonly mysql: IMysqlConfig;
    readonly mongodb: IMongodbConfig;
    readonly redis: IRedisConfig;
}
