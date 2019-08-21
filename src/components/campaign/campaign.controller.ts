/**
 * Created with Cocos2d-x3.0 jsb.
 * User: lizizhen
 * Date: 2019/8/19
 * Time: 20:58
 *
 */

import { Controller, Post, Body, UsePipes, Get, Param, UseGuards } from '@nestjs/common';
import { AuthGuard } from '../../common/guard/auth.guard';
import { JoiValidationPipe } from '../../common/validata/JoiValidation.pipe';
import * as Joi from 'joi';
import { CampaignService } from './campaign.service';

@Controller('/campaign')
export class CampaignController {
    constructor(private readonly service: CampaignService) {}

    @UseGuards(AuthGuard)
    @Post('/start')
    async startCampaign(@Body() body) {
        return await this.service.startCampaign(body.campaignId);
    }

    @UseGuards(AuthGuard)
    @UsePipes(
        new JoiValidationPipe({
            campaignId: Joi.string().required()
        })
    )
    @Post('/end')
    async endCampaign(@Body() body) {
        return await this.service.endCampaign(body.campaignId);
    }

    @UseGuards(AuthGuard)
    @Get('/:campaignId')
    async queryVoteResult(@Param('campaignId') campaignId: string) {
        return await this.service.queryVoteResult(campaignId);
    }
}
