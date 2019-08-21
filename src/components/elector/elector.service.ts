/**
 * Created with Cocos2d-x3.0 jsb.
 * User: lizizhen
 * Date: 2019/8/19
 * Time: 20:59
 *
 */

import { Injectable } from '@nestjs/common';
import { NotFoundException } from '../../common/helpers/forbidden.exception';
import { CampaignDto } from '../campaign/campaign.dto';
import { ElectorDto } from './elector.dto';
import { Elector } from './interfaces/elector.interface';

@Injectable()
export class ElectorService {
    constructor(private readonly electorDto: ElectorDto, private readonly campaignDto: CampaignDto) {}

    /*
     * 添加选举人
     *
     * */
    async addElector(data: Elector) {
        const campaignId = data.campaign;
        const elector = await this.electorDto.create(data);
        const electorId = elector._id;
        const campaign = this.campaignDto.findByIdAndUpdate(campaignId, { $addToSet: { elector: { electorId } } });
        if (!campaign) {
            throw new NotFoundException('信息不存在');
        }
        return elector;
    }

    /*
     * 删除选举人
     *
     * */
    async deleteElector(electorId: string) {
        const elector = await this.electorDto.findByIdAndDelete(electorId);
        if (!elector) {
            throw new NotFoundException('信息不存在');
        }
        const campaign = this.campaignDto.findByIdAndUpdate(elector.campaign, {
            $pull: { elector: { electorId } }
        });
        if (!campaign) {
            throw new NotFoundException('信息不存在');
        }
        return elector;
    }
}
