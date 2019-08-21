/**
 * Created with Cocos2d-x3.0 jsb.
 * User: lizizhen
 * Date: 2019/8/19
 * Time: 20:59
 *
 */

import { Injectable } from '@nestjs/common';
import * as _ from 'lodash';
import { ConfigService } from '../../common/config/config.service';
import { NotFoundException } from '../../common/helpers/forbidden.exception';
import { CampaignDto } from './campaign.dto';
import { Campaign } from './interfaces/campaign.interface';

@Injectable()
export class CampaignService {
    constructor(private readonly campaignDto: CampaignDto, private readonly configService: ConfigService) {}

    /*
     * 开始选举
     *
     * */
    async startCampaign(campaignId?: string) {
        let campaign;
        if (campaignId) {
            campaign = await this.campaignDto.findByIdAndUpdate(campaignId, { status: '1' });
            if (!campaign) {
                throw new NotFoundException('信息不存在');
            }
        } else {
            campaign = await this.campaignDto.create({} as Campaign);
        }
        return campaign;
    }

    /*
     * 结束选举
     *
     * */
    async endCampaign(campaignId: string) {
        const campaign = await this.campaignDto.findByIdAndUpdate(campaignId, { status: '2' });
        if (!campaign) {
            throw new NotFoundException('信息不存在');
        }
        return campaign;
    }

    /*
     * 查询投票结果
     *
     * */
    async queryVoteResult(campaignId: string) {
        let campaign = await this.campaignDto.findOneRefElector(
            { _id: campaignId },
            { elector: 1 },
            { path: 'elector.electorId', select: 'name -_id' }
        );
        const res = _.get(campaign, 'elector');
        if (!res) {
            throw new NotFoundException('没有投票信息');
        }
        return res;
    }
}
