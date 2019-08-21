/**
 * Created with Cocos2d-x3.0 jsb.
 * User: lizizhen
 * Date: 2019/4/4
 * Time: 10:32
 *
 */

import { async } from 'rxjs/internal/scheduler/async.js';
import { customModule } from '../../src/common/custom.module';
import { DatabaseModule } from '../../src/common/db/database.module';
import * as dotenv from 'dotenv';
import path from 'path';
import { User } from '../../src/components/user/interfaces/user.interface';
dotenv.config({ path: path.join(__dirname, '../../default.env') });
import { UserDto } from '../../src/components/user/user.dto';
import { UserModule } from '../../src/components/user/user.module';
import { post, get } from './supertest';
import { Test } from '@nestjs/testing';
import config from '../config.json';
const addContext = require('mochawesome/addContext');

describe.only('用户模块', function() {
    let userDto: UserDto;

    before(async function() {
        const module = await Test.createTestingModule({
            imports: [UserModule, customModule, DatabaseModule]
        }).compile();
        userDto = module.get<UserDto>(UserDto);
    });

    afterEach(async function() {
        await userDto.deleteOne({ user: config.user });
        return;
    });

    describe('用户注册', function() {
        it.only('邮箱格式错误', async function() {
            const { resBody, headers, body } = await post('/user', null, {
                user: 'test',
                password: config.password
            });
            addContext(this, headers);
            addContext(this, body);
            addContext(this, {
                title: '返回结果',
                value: resBody
            });
        });
        it.only('正常发送', async function() {
            const { resBody, headers, body } = await post('/user', null, {
                user: config.user,
                password: config.password
            });
            addContext(this, headers);
            addContext(this, body);
            addContext(this, {
                title: '返回结果',
                value: resBody
            });
        });
    });

    describe('邮箱验证', function() {
        let user: User;
        before(async function() {
            user = await userDto.create({
                user: config.user,
                password: config.password
            } as User);
        });

        it.only('正常发送', async function() {
            const { resBody, headers, body } = await get(`/user/${user._id}/verification-email`, null, {
                user: 'test',
                password: config.password
            });
            addContext(this, headers);
            addContext(this, body);
            addContext(this, {
                title: '返回结果',
                value: resBody
            });
        });
    });
});
