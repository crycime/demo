/**
 * Created with Cocos2d-x3.0 jsb.
 * User: lizizhen
 * Date: 2019/3/31
 * Time: 22:49
 *
 */

import { configure, getLogger } from 'log4js';
import * as jsonfile from 'jsonfile';
import * as path from 'path';
import log4jConfig from '../config/log4j.json';

configure(log4jConfig);

const logger = getLogger('mysql');

/**
 * @description  日志配置名獲取
 *
 */
const loggerUtil = (name, level?) => {
    let falg = false;
    for (const obj in log4jConfig.appenders) {
        if (obj === name) {
            falg = true;
        }
    }
    // 判斷JSON是否存在日志配置
    if (falg) {
        const logger = getLogger(name);
        logger.level = level || 'trace';
        return logger;
    } else {
        // 不存在配置日志
        log4jConfig.appenders[name] = {
            type: 'dateFile',
            filename: `log/${name}/`,
            pattern: 'yyyy-MM-dd.log',
            alwaysIncludePattern: true,
            maxLogSize: 1048576,
            backups: 20,
            encoding: 'utf8',
            mode: 420,
            flags: 'a'
        };

        log4jConfig.categories[`${name}`] = {
            appenders: [name],
            level: 'all'
        };
        jsonfile.writeFileSync(path.join(__dirname, '../config/log4j.json'), log4jConfig, { spaces: 2 });
        // 重新加載日志配置
        configure(log4jConfig);
        const logger = getLogger(name);
        logger.level = level || 'trace';
        return logger;
    }
};

let methodLog = logName => {
    return (target, name, descriptor) => {
        const method = descriptor.value;
        descriptor.value = async (...args) => {
            let ret;
            try {
                ret = await method.apply(target, args);
            } catch (error) {
                const logger = loggerUtil(logName);
                logger.info(name + '方法   Fail,\n query:%s \n error:%s', JSON.stringify(args), error.message);
                throw error;
            }
        };
        return descriptor;
    };
};

const loggerInfo = (name, req, err) => {
    const logger = loggerUtil(name);
    logger.info(req.method + '  ' + req.url + ' Fail,\n query:%s \n error:', JSON.stringify(req.body), err);
};

//重新写了info方法
function mysqlLog(message) {
    logger.info(message);
}

export { mysqlLog, loggerInfo, methodLog };
