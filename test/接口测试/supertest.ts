/**
 * Created with Cocos2d-x3.0 jsb.
 * User: lizizhen
 * Date: 2019/4/3
 * Time: 13:53
 *
 */
const config = require('../config.json');
const serverUrl = config.serverUrl;
const request = require('supertest')(serverUrl);

const post = async (api, token, data) => {
    const headValue = {
        Accept: 'application/json',
        Method: 'POST',
        URL: serverUrl + api,
        'access-token': token
    };
    if (!headValue['access-token']) {
        delete headValue['access-token'];
    }

    const headers = {
        title: '请求头部',
        value: headValue
    };
    const body = {
        title: '请求参数',
        value: data
    };

    const res = await request
        .post(api)
        .set('Accept', 'application/json')
        .set('access-token', token)
        .send(data)
        .expect('Content-Type', /json/);
    return { resBody: res.body, body, headers };
};
const get = async (api, token, data) => {
    const headValue = {
        Accept: 'application/json',
        Method: 'GET',
        URL: serverUrl + api,
        'access-token': token
    };
    if (!headValue['access-token']) {
        delete headValue['access-token'];
    }

    const headers = {
        title: '请求头部',
        value: headValue
    };
    const body = {
        title: '请求参数',
        value: data
    };
    const res = await request
        .get(api)
        .set('Accept', 'application/json')
        .set('access-token', token)
        .query(data)
        .expect('Content-Type', /json/);
    return { resBody: res.body, body, headers };
};
export { post, get };
