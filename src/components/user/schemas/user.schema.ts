/**
 * Created with Cocos2d-x3.0 jsb.
 * User: lizizhen
 * Date: 2019/8/19
 * Time: 20:48
 *
 */

import mongooseFieldEncryption from '../../../common/plugins/mongoose-field-encryption';
import mongoose from 'mongoose';

const UserVoteSchema = new mongoose.Schema({
    campaignId: { type: mongoose.Schema.Types.ObjectId, ref: 'campaign' },
    elector: [{ type: mongoose.Schema.Types.ObjectId, ref: 'elector' }]
});

const UserSchema = new mongoose.Schema(
    {
        user: { type: String },
        password: { type: String },
        status: { type: String, default: '0' }, // 0:未验证 1：验证
        vote: [UserVoteSchema]
    },
    { timestamps: { createdAt: 'created', updatedAt: 'updated' } }
);

//字段加密
UserSchema.plugin(mongooseFieldEncryption, { fields: ['password'], secret: 'asdarwqdasda' });
UserSchema.index({ user: -1 }, { unique: true });
export { UserSchema };
