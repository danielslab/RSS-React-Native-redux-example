/**
 * Created by denissamohvalov on 18.03.17.
 */

import {
    GET_TAGS,
    SAVE_TAGS_FOR_FEED,
    SAVE_TAGS
} from '../constants';

let initialState = {
    tags: ["Apple", "Google", "Oracle", "Baidu", "Alibaba", "Yahoo", "McKinsey&CO", "The Boston Consulting Group"],
    tagsForFeed: {}
};

function saveTagsForFeed(feedId, tagsForFeed) {
    return tagsForFeed; // TODO
}

export default function tagsState(state = initialState, action) {
    switch (action.type) {
        case GET_TAGS:
            console.log(state.tags);
            return {
                ...state,
                tags: state.tags // TODO
            };
        case SAVE_TAGS:
            return { // TODO
                ...state,
                tags: action.tags,
            };
        case SAVE_TAGS_FOR_FEED:
            return {
                ...state,
                tagsForFeed: saveTagsForFeed(action.feedId, action.tagsForFeed),
            };
        default:
            return state;
    }
}