/**
 * Created with Cocos2d-x3.0 jsb.
 * User: lizizhen
 * Date: 2019/4/17
 * Time: 8:49
 *
 */
import * as _ from 'lodash';

const changeKeyNames = function(obj, namesMap) {
    let res;
    if (Array.isArray(obj)) {
        res = arrMapKey(obj, namesMap);
    } else {
        res = objMapKey(obj, namesMap);
    }
    return res;
};

const arrMapKey = function(obj, namesMap) {
    let res = _.map(obj, ele => {
        ele = _.transform(ele, function(result, value, key) {
            if (namesMap[key]) {
                result[namesMap[key]] = value;
            } else {
                result[key] = value;
            }
            ele = result;
        });
        return ele;
    });
    return res;
};

const objMapKey = function(obj, namesMap) {
    var res = _.transform(obj, function(result, value, key) {
        if (namesMap[key]) {
            result[namesMap[key]] = value;
        } else {
            result[key] = value;
        }
        res = result;
    });
    return res;
};

export { changeKeyNames, arrMapKey, objMapKey };
