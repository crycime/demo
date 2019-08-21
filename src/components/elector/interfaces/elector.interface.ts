/**
 * Created with Cocos2d-x3.0 jsb.
 * User: lizizhen
 * Date: 2019/8/19
 * Time: 20:22
 *
 */

import { Document } from 'mongoose';

export interface Elector extends Document {
    readonly name: string;
    readonly campaign: string;
}
