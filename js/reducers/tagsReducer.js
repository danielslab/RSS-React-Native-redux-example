/**T
 * Created by denissamohvalov on 18.03.17.
 */
import {getTags, commitTags, commitChannelTagsMask, getChannelTagsMask} from '../db/handlers';
import {
    GET_TAGS,
    ADD_TAG,
    DELETE_TAG,
    COMMIT_TAGS,
    ON_PRESS_TAG,
} from '../constants';


let initialState = {
    tags: [],
    tagsCommitted: true,
    channelId: null,
    tag: null,
};


function addTag(tag, tags) {
    let out = new Set([...tags, tag]);
    return [...out];
}

function deleteTag(tag, tags) {
    let out = [];
    for (let i = 0; i < tags.length; ++i) {
        if (tags[i] !== tag) {
            out.push(tags[i]);
        }
    }
    return out;
}

function editChannelTagsMask(tagsMask, name, isChecked) {
    let out = [];
    for (var i = 0; i < tagsMask.length; ++i) {
        if (tagsMask[i].name === name) {
            out.push({
                ...tagsMask[i],
                isChecked
            })
        } else {
            out.push({...tagsMask[i]});
        }
    }
    return out;
}



export default function tagsState(state = initialState, action) {
    switch (action.type) {
        case GET_TAGS:
            return {
                ...state,
                tagsCommitted: true,
                tags: getTags(),
            };
        case ADD_TAG:
            return {
                ...state,
                tags: addTag(action.tag, state.tags),
            };
        case DELETE_TAG:
            return {
                ...state,
                tags: deleteTag(action.tag, state.tags),
                tagsCommitted: false,
            };
        case COMMIT_TAGS:
            commitTags(state.tags);
            return {
                ...state,
                tagsCommitted: true,
            };
        case ON_PRESS_TAG:
            return {
                ...state,
                tag: action.tag,
            };
        default:
            return state;
    }
}