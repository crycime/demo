/**
 * Created with Cocos2d-x3.0 jsb.
 * User: lizizhen
 * Date: 2019/8/19
 * Time: 20:59
 *
 */

import { Module } from '@nestjs/common';
import { CampaignDto } from './campaign.dto';
import { CampaignProviders } from './campaign.providers';
import { CampaignController } from './campaign.controller';
import { CampaignService } from './campaign.service';

@Module({
    imports: [],
    controllers: [CampaignController],
    providers: [CampaignService, CampaignDto, ...CampaignProviders],
    exports: [CampaignService]
})
export class CampaignModule {
    constructor(private readonly catService: CampaignService) {}
}
