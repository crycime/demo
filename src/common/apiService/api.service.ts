/**
 * Created with Cocos2d-x3.0 jsb.
 * User: lizizhen
 * Date: 2019/4/26
 * Time: 14:26
 *
 */

import { Injectable } from '@nestjs/common';
import * as request from 'superagent';
import { ConfigService } from '../config/config.service';
import { ServiceApiError } from '../helpers/forbidden.exception';
import { arrMapKey, objMapKey } from '../util/lodash';
import { methodLog } from '../util/log4js';

@Injectable()
export class ApiService {
    constructor(private readonly config: ConfigService) {}

    async bindDevicebyWxSer({ deviceId, pcId }) {
        const url = this.config.wechatBase + `/wechat/pc/bind2`;
        try {
            if (!deviceId || !pcId) {
                throw { message: '参数不全' };
            }
            const data = await request
                .post(url)
                .type('json')
                .accept('json')
                .send({ deviceId, pcId });

            const res = data.body;
            if (res.code != 0) {
                throw { message: '状态码返回的code不为0' };
            }
            return res;
        } catch (e) {
            throw new ServiceApiError(`调用服务${url}报错：${e.message}`, 6000);
        }
    }

    async unbindDevicebyWxSer({ deviceId, pcId }) {
        const url = this.config.wechatBase + `/wechat/pc/unbind`;
        try {
            if (!deviceId || !pcId) {
                throw { message: '参数不全' };
            }
            const data = await request
                .post(url)
                .type('json')
                .accept('json')
                .send({ deviceId, pcId });

            const res = data.body;
            if (res.code != 0) {
                throw { message: '状态码返回的code不为0' };
            }
            return res;
        } catch (e) {
            throw new ServiceApiError(`调用服务${url}报错：${e.message}`, 6000);
        }
    }

    async usbAuth({ uid }) {
        const url = this.config.usbDriveBase + `/product/auth`;
        try {
            if (!uid) {
                throw { message: '参数不全' };
            }
            const data = await request
                .post(url)
                .type('json')
                .accept('json')
                .send({ uid });

            const res = data.body;
            if (res.error != 0) {
                throw { message: res.result ? res.result : res.data };
            }
            return res.result ? res.result : res.data;
        } catch (e) {
            throw new ServiceApiError(`调用服务${url}报错：${e.message}`, 6000);
        }
    }

    async getDevicebyWxSer(userid) {
        const url = this.config.wechatBase + `/wechat/pc/bound?pcid=${userid}`;
        try {
            if (!userid) {
                throw { message: '参数不全' };
            }
            const data = await request
                .get(url)
                .type('json')
                .accept('json');
            const res = data.body;
            if (res.code != 0) {
                throw { message: '状态码返回的code不为0' };
            }
            return res.data;
        } catch (e) {
            throw new ServiceApiError(`调用服务${url}报错：${e.message}`, 6000);
        }
    }

    async getActPackages({ uid }) {
        const url = this.config.usbDriveBase + `/product/get_u_pkg?uid=${uid}`;
        try {
            if (!uid) {
                throw { message: '参数不全' };
            }
            const data = await request
                .get(url)
                .type('json')
                .accept('json');

            const res = data.body;
            if (res.error != 0) {
                throw { message: res.result ? res.result : res.data };
            }
            const result = res.result ? res.result : res.data;
            const resData = arrMapKey(result, {
                pkgid: 'pkgId',
                activate_time: 'effectTime',
                valid_time: 'expireTime'
            });
            return resData;
        } catch (e) {
            throw new ServiceApiError(`调用服务${url}报错：${e.message}`, 6000);
        }
    }

    async getUsbCipher({ key }) {
        const url = this.config.usbDriveBase + `/product/get_aes_key_new`;
        try {
            if (!key) {
                throw { message: '参数不全' };
            }
            const data = await request
                .post(url)
                .type('json')
                .accept('json')
                .send({ key });

            const res = data.body;
            if (res.error != 0) {
                throw { message: res.result ? res.result : res.data };
            }
            return res.result ? res.result : res.data;
        } catch (e) {
            throw new ServiceApiError(`调用服务${url}报错：${e.message}`, 6000);
        }
    }

    async getUsbPackages({ spid }) {
        const url = this.config.usbDriveBase + `/product/get_pkg`;
        try {
            if (!spid) {
                throw { message: '参数不全' };
            }
            const data = await request
                .post(url)
                .type('json')
                .accept('json')
                .send({ spid });

            const res = data.body;
            if (res.error != 0) {
                throw { message: res.result ? res.result : res.data };
            }
            const result = res.result ? res.result : res.data;
            const resData = arrMapKey(result, { id: 'pkgId', name: 'pkgName', type: 'pkgFree', content: 'pkgContent' });
            for (const ele of resData) {
                if (Array.isArray(ele.pkgContent)) {
                    const uu = arrMapKey(ele.pkgContent, { name: 'contentName', path: 'contentPath' });
                    ele.pkgContent = uu;
                }
            }
            return resData;
        } catch (e) {
            throw new ServiceApiError(`调用服务${url}报错：${e.message}`, 6000);
        }
    }

    async getUsbClients({ spid }) {
        const url = this.config.usbDriveBase + `/product/get_kindergarten`;
        try {
            if (!spid) {
                throw { message: '参数不全' };
            }
            const data = await request
                .post(url)
                .type('json')
                .accept('json')
                .send({ spid });

            const res = data.body;
            if (res.error != 0) {
                throw { message: res.result ? res.result : res.data };
            }
            const result = res.result ? res.result : res.data;
            const resData = arrMapKey(result, {
                id: 'clientId',
                kindername: 'clientName'
            });
            return resData;
        } catch (e) {
            throw new ServiceApiError(`调用服务${url}报错：${e.message}`, 6000);
        }
    }

    async usbActivate({ uid, code, spid, type, kindergartern }) {
        const url = this.config.usbDriveBase + `/product/activate`;
        try {
            const data = await request
                .post(url)
                .type('json')
                .accept('json')
                .send({ uid, code, spid, type, kindergartern });

            const res = data.body;
            if (res.error != 0) {
                throw { message: res.result ? res.result : res.data };
            }
            const result = res.result ? res.result : res.data;
            const resData = objMapKey(result, {
                pkgid: 'pkgId',
                activate_time: 'effectTime',
                valid_time: 'expiredTime'
            });
            return resData;
        } catch (e) {
            throw new ServiceApiError(`调用服务${url}报错：${e.message}`, 6000);
        }
    }

    async usbBrenew({ uid, code, spid, type, kindergartern }) {
        const url = this.config.usbDriveBase + `/product/buy_duration`;
        try {
            const data = await request
                .post(url)
                .type('json')
                .accept('json')
                .send({ uid, code, spid, type, kindergartern });

            const res = data.body;
            if (res.error != 0) {
                throw { message: res.result ? res.result : res.data };
            }
            const result = res.result ? res.result : res.data;
            const resData = objMapKey(result, {
                pkgid: 'pkgId',
                activate_time: 'effectTime',
                valid_time: 'expiredTime'
            });
            return resData;
        } catch (e) {
            throw new ServiceApiError(`调用服务${url}报错：${e.message}`, 6000);
        }
    }

    async getUsbUpgradeCfg({ spid, type }) {
        const url = this.config.usbDriveBase + `/product/get_upgrade_config_new`;
        try {
            const data = await request
                .post(url)
                .type('json')
                .accept('json')
                .send({ spid, type });

            const res = data.body;
            if (res.error != 0) {
                throw { message: res.result ? res.result : res.data };
            }
            return res.result ? res.result : res.data;
        } catch (e) {
            throw new ServiceApiError(`调用服务${url}报错：${e.message}`, 6000);
        }
    }
}
