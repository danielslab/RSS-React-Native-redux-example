/**
 * Created by denissamohvalov on 16.03.17.
 */

export function enhanceStr(str) {
    let newStr = str.replace('\n', '');
    while(newStr[0] === ' ') {
        newStr = newStr.replace(' ', '');
    }
    return newStr;
}