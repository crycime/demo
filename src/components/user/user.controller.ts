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
import { UserService } from './user.service';

@Controller('/user')
export class UserController {
    constructor(private readonly service: UserService) {}

    @Post()
    @UsePipes(
        new JoiValidationPipe({
            user: Joi.string()
                .email({ minDomainAtoms: 2 })
                .required(),
            password: Joi.string()
                .min(6)
                .max(15)
                .required()
        })
    )
    async register(@Body() body) {
        return await this.service.register(body);
    }

    @Post('/login')
    @UsePipes(
        new JoiValidationPipe({
            user: Joi.string()
                .email({ minDomainAtoms: 2 })
                .required(),
            password: Joi.string()
                .min(6)
                .max(15)
                .required()
        })
    )
    async login(@Body() body) {
        return await this.service.login(body);
    }

    @Get('/:id/verification-email')
    async verificationEmail(@Param('id') id: string) {
        return await this.service.verificationEmail(id);
    }

    @UseGuards(AuthGuard)
    @UsePipes(
        new JoiValidationPipe({
            userId: Joi.string().required(),
            campaignId: Joi.string().required(),
            electorId: Joi.string().required()
        })
    )
    @Post('/vote')
    async vote(@Body() body) {
        return await this.service.vote(body);
    }
}
