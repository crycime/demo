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
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { UserDto } from './user.dto';
import { UserProviders } from './user.providers';

@Module({
    imports: [],
    controllers: [UserController],
    providers: [UserService, UserDto, CampaignDto, ...UserProviders, ...CampaignProviders],
    exports: [UserService]
})
export class UserModule {
    constructor(private readonly catService: UserService) {}
}
