/**
 * Created with Cocos2d-x3.0 jsb.
 * User: lizizhen
 * Date: 2019/8/19
 * Time: 20:59
 *
 */

import { Injectable } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import * as _ from 'lodash';
import MailerService from '../../common/apiService/mailer.service';
import { ConfigService } from '../../common/config/config.service';
import { NotFoundException, BadRequestException } from '../../common/helpers/forbidden.exception';
import { CampaignDto } from '../campaign/campaign.dto';
import { UserDto } from './user.dto';
import { User } from './interfaces/user.interface';

@Injectable()
export class UserService {
    constructor(
        private readonly userDto: UserDto,
        private readonly campaignDto: CampaignDto,
        private readonly mailerService: MailerService,
        private readonly configService: ConfigService
    ) {}

    /*
     * 用户注册
     *
     * */
    async register(data: User) {
        const user = await this.userDto.findOne({ user: data.user });
        if (user) {
            throw new BadRequestException('用户已存在');
        }
        try {
            const result = await this.userDto.create(data);
            await this.mailerService.sendEmail({
                emailAddress: data.user,
                title: '邮箱验证',
                content: `${this.configService.supportBase}/user/${result._id}/verification-email`
            });
            return 'Success';
        } catch (e) {
            await this.userDto.deleteOne(data);
            throw e;
        }
    }

    /*
     * 用户登录
     *
     * */
    async login(data: User) {
        const expire = 60 * 60;
        const result = await this.userDto.findOne(data);
        if (!result) {
            throw new NotFoundException('用户不存在');
        }
        const token = jwt.sign({ user: result.user, status: result.status }, this.configService.jwtSecret, {
            expiresIn: expire
        });

        return {
            sessionToken: token,
            sessionExpire: expire,
            timestamp: Math.round(new Date().getTime() / 1000)
        };
    }

    /*
     * 用户投票
     *
     * */
    async vote({ userId, campaignId, electorId }) {
        const user = await this.userDto.findOne({ _id: userId }, { vote: { $elemMatch: { campaignId } } });
        let voteNum = _.get(user, 'vote[0].elector.length');
        voteNum = voteNum ? voteNum : 0;
        if (!user) {
            throw new NotFoundException('用户不存在');
        }
        const campaign = await this.campaignDto.findOne({ _id: campaignId, elector: { $elemMatch: { electorId } } });
        if (!campaign) {
            throw new NotFoundException('信息不存在');
        }
        if (campaign.status == '2') {
            throw new BadRequestException('选举已结束');
        }
        //最大投票数
        const max = campaign.vote_max;

        if (voteNum >= max) {
            throw new BadRequestException('超出投票限制');
        }

        if (voteNum) {
            await this.userDto.update(
                { _id: userId, vote: { $elemMatch: { campaignId } } },
                { $push: { 'vote.$.elector': electorId } }
            );
        } else {
            await this.userDto.update({ _id: userId }, { $addToSet: { vote: { campaignId, elector: [electorId] } } });
        }

        await this.campaignDto.update(
            { _id: campaignId, elector: { $elemMatch: { electorId } } },
            { $inc: { 'elector.$.vote_num': 1 } }
        );
        return 'success';
    }

    /*
     * 验证邮箱
     *
     * */
    async verificationEmail(id: string) {
        const result = await this.userDto.findByIdAndUpdate(id, { status: '1' });
        if (!result) {
            throw new NotFoundException(`用户不存在 id ${id}`);
        }
        return result;
    }
}
