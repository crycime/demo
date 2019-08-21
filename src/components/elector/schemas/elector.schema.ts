/**
 * Created with Cocos2d-x3.0 jsb.
 * User: lizizhen
 * Date: 2019/8/19
 * Time: 20:48
 *
 */

import mongoose from 'mongoose';

const ElectorSchema = new mongoose.Schema({
    name: { type: String },
    campaign: { type: mongoose.Schema.Types.ObjectId, ref: 'campaign' }
});

export { ElectorSchema };
