/**
 * Created with Cocos2d-x3.0 jsb.
 * User: lizizhen
 * Date: 2019/8/19
 * Time: 20:22
 *
 */

import { Document, Schema } from 'mongoose';

export interface elector extends Document {
    readonly electorId: Schema.Types.ObjectId;
    readonly vote_num: Number;
}

export interface Campaign extends Document {
    readonly elector: [elector];
    readonly status: string;
    readonly vote_max: Number;
    readonly vote_min: Number;
}
