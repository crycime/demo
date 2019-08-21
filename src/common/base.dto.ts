/**
 * Created with Cocos2d-x3.0 jsb.
 * User: lizizhen
 * Date: 2019/8/20
 * Time: 19:06
 *
 */

import { Model } from 'mongoose';
import { DBError } from './helpers/forbidden.exception';

export default class BaseDto<T> {
    private readonly model: Model<any>;

    constructor(model: Model<any>) {
        this.model = model;
    }

    async create(data: T): Promise<T> {
        try {
            const createdCat = new this.model(data);
            return await createdCat.save();
        } catch (e) {
            throw new DBError(e.message);
        }
    }

    async findById(id: string, projection?: any | null): Promise<T> {
        try {
            return await this.model.findById(id, projection).exec();
        } catch (e) {
            throw new DBError(e.message);
        }
    }

    async find(query, projection?: any | null): Promise<T[]> {
        try {
            return await this.model.find(query, projection).exec();
        } catch (e) {
            throw new DBError(e.message);
        }
    }

    async findOne(query, projection?: any | null): Promise<T> {
        try {
            return await this.model.findOne(query, projection).exec();
        } catch (e) {
            throw new DBError(e.message);
        }
    }

    async update(conditions: any, doc: any) {
        try {
            return await this.model.update(conditions, doc);
        } catch (e) {
            throw new DBError(e.message);
        }
    }

    async findByIdAndUpdate(id: string, update: any): Promise<T> {
        try {
            return await this.model.findByIdAndUpdate(id, update);
        } catch (e) {
            throw new DBError(e.message);
        }
    }

    async findByIdAndDelete(id: string): Promise<T> {
        try {
            return await this.model.findByIdAndDelete(id);
        } catch (e) {
            throw new DBError(e.message);
        }
    }

    async deleteOne(query) {
        try {
            return await this.model.deleteOne(query);
        } catch (e) {
            throw new DBError(e.message);
        }
    }
}
