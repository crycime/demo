/**
 * Created with Cocos2d-x3.0 jsb.
 * User: lizizhen
 * Date: 2019/8/19
 * Time: 20:59
 *
 */

import { Module } from '@nestjs/common';
import { CampaignDto } from '../campaign/campaign.dto';
import { CampaignProviders } from '../campaign/campaign.providers';
import { ElectorDto } from './elector.dto';
import { ElectorProviders } from './elector.providers';
import { ElectorController } from './elector.controller';
import { ElectorService } from './elector.service';

@Module({
    imports: [],
    controllers: [ElectorController],
    providers: [ElectorService, ElectorDto, CampaignDto, ...ElectorProviders, ...CampaignProviders],
    exports: [ElectorService]
})
export class ElectorModule {
    constructor(private readonly catService: ElectorService) {}
}
