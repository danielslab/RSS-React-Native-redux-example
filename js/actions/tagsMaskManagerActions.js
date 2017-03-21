/**
 * Created by denissamohvalov on 21.03.17.
 */
import * as constants from '../constants';

export function getTagsMask(channelId) {
    return {
        type: constants.GET_TAGS_MASK,
        channelId,
    }
}

export function selectTag(channelId, tag, value) {
    return {
        type: constants.SELECT_TAG,
        channelId,
        tag,
        value,
    }
}