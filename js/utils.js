/**
 * Created by denissamohvalov on 16.03.17.
 */

import {STAR_COLOR} from './constants';

export function getStarColor(is_bookmarked, navigator)  {
    if (is_bookmarked) {
        return STAR_COLOR;
    } else {
        if (navigator) {
            return 'white'
        } else {
            return '#9E9E9E';
        }
    }
}

export function enhanceStr(str) {
    let newStr = str.replace('\n', '');
    while(newStr[0] === ' ') {
        newStr = newStr.replace(' ', '');
    }
    return newStr
}
