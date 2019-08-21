/**
 * Created with Cocos2d-x3.0 jsb.
 * User: lizizhen
 * Date: 2019/8/19
 * Time: 20:48
 *
 */

import mongoose from 'mongoose';

const electorSchema = new mongoose.Schema({
    electorId: { type: mongoose.Schema.Types.ObjectId, ref: 'elector' },
    vote_num: { type: Number, default: 0 }
});

const CampaignSchema = new mongoose.Schema(
    {
        elector: [electorSchema],
        status: { type: String, default: '1' } // 1：开始  2：结束
    },
    { timestamps: { createdAt: 'created', updatedAt: 'updated' } }
);

CampaignSchema.set('toObject', { getters: true, virtuals: true });
CampaignSchema.set('toJSON', { getters: true, virtuals: true });

//限制最大投票数
CampaignSchema.virtual('vote_max').get(function() {
    let max = 5;
    if (this.elector) {
        max = Math.floor(this.elector.length / 2);
    }
    if (max > 5) {
        max = 5;
    }
    if (max < 2) {
        max = 2;
    }
    return max;
});

export { CampaignSchema };
