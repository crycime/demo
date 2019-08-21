/**
 * Created with Cocos2d-x3.0 jsb.
 * User: lizizhen
 * Date: 2019/8/19
 * Time: 20:59
 *
 */

import { Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import BaseDto from '../../common/base.dto';
import { CAMPAIGN_REPOSITORY } from '../../common/constants/entity.constant';
import { DBError } from '../../common/helpers/forbidden.exception';
import { Campaign } from './interfaces/campaign.interface';

@Injectable()
export class CampaignDto extends BaseDto<Campaign> {
    constructor(@Inject(CAMPAIGN_REPOSITORY) private readonly campaignModel: Model<Campaign>) {
        super(campaignModel);
    }

    async findOneRefElector(query, projection = {}, populate: any = []): Promise<Campaign> {
        try {
            const campaign = await this.campaignModel.findOne(query, projection).populate(populate);
            return campaign;
        } catch (e) {
            throw new DBError(e.message);
        }
    }
}
