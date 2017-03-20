/**
 * Created by denissamohvalov on 18.03.17.
 */

import {
    SAVE_TAGS,
    SAVE_TAGS_FOR_FEED,
    GET_TAGS
} from '../constants';

export function saveTags(tags) {
    return {
        type: SAVE_TAGS,
        tags,
    }
}

export function saveTagsForFeed(tags, feedId) {
    return {
        type: SAVE_TAGS_FOR_FEED,
        tags,
        feedId
    }
}

export function getTags() {
    console.log("GET_TAGS");
    return {
        type: GET_TAGS,
    }
}
