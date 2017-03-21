/**
 * Created by denissamohvalov on 18.03.17.
 */

import {
    COMMIT_TAGS,
    COMMIT_CHANNEL_TAGS_MASK,
    GET_CHANNEL_TAGS_MASK,
    DELETE_TAG,
    ADD_TAG,
    SELECT_TAG,
    GET_TAGS,
    ON_PRESS_TAG
} from '../constants';

export function commitTags() {
    return {
        type: COMMIT_TAGS,
    }
}

export function commitChannelTagsMask() {
    return {
        type: COMMIT_CHANNEL_TAGS_MASK,
        tagsMask,
        channelId
    }
}

export function getTags() {
    return {
        type: GET_TAGS,
    }
}

export function getChannelTagsMask(id) {
    return {
        type: GET_CHANNEL_TAGS_MASK,
        id,
    }
}

export function deleteTag(tag) {
    return {
        type: DELETE_TAG,
        tag
    }
}

export function addTag(tag) {
    return {
        type: ADD_TAG,
        tag
    }
}

export function selectTag(tag, isChecked) {
    return {
        type: SELECT_TAG,
        tag,
        isChecked,
    }
}

export function onPressTag(tag) {
    return {
        type: ON_PRESS_TAG,
        tag
    }
}