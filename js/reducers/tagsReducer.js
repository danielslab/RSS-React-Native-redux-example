/**T
 * Created by denissamohvalov on 18.03.17.
 */
import realm from '../db';

import {
    GET_TAGS,
    ADD_TAG,
    DELETE_TAG,
    SELECT_TAG,
    COMMIT_TAGS,
    GET_CHANNEL_TAGS_MASK,
    COMMIT_CHANNEL_TAGS_MASK,
} from '../constants';


let initialState = {
    tags: [],
    channelTagsMask: [],
    tagsCommitted: true,
    maskCommitted: true,
    channelId: null,
};


function getTags() {
    let objects = realm.objects('Tag');
    console.log(objects);
    let out = [];
    for (let i = 0; i < objects.length; ++i) {
        out.push(objects[i].name);
    }
    return out;
}

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


function commitTags(tags) {
    let channels = realm.objects('Channel');
    realm.write(() => {
        for (let i = 0; i < channels.length; ++i) {
            for (let j = 0; j < tags.length; ++j) {
                let tag = channels[i].tagsMask.filtered('name = "' + tags[i] + '"')
                if (!tag) {
                    channels[i].tagsMask.push({name: tags[i], isChecked: false});
                }
            }
        }
        let oldTags = realm.objects('Tag');
        realm.delete(oldTags);
        for (let i = 0; i < tags.length; ++i) {
            realm.create('Tag', {name: tags[i]});
        }
    });
}

function getChannelTagsMask(channelId) {
    let out = [];
    let channel = realm.objects('Channel').filtered('id = "' + channelId + '"')[0];
    for (let i = 0; i < channel.tagsMask; ++i) {
        out.push({
            name: channel[i].name,
            isChecked: channel[i].isChecked,
        });
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

function commitChannelTagsMask(tagsMask, channelId) {
    let channel = realm.objects('Channel').filtered('id = "' + channelId + '"')[0];
    realm.write(() => {
        realm.delete(channel.tagsMask);
        for (let i = 0; i < tagsMask.length; ++i) {
            channel.tagsMask.push({name: tagsMask[i].name, isChecked: tagsMask[i].isChecked});
        }
    });
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
            return { // TODO
                ...state,
                tagsCommitted: true,
            };
        case GET_CHANNEL_TAGS_MASK:
            return {
                ...state,
                maskCommitted: true,
                channelTagsMask: getChannelTagsMask(action.channelId)
            };
        case SELECT_TAG:
            return {
                ...state,
                channelTagsMask: editChannelTagsMask(state.channelTagsMask, action.tag, action.isChecked),
                maskCommitted: false,
            };
        case COMMIT_CHANNEL_TAGS_MASK:
            commitChannelTagsMask(state.channelTagsMask, state.channelId);
            return {
                ...state,
                maskCommited: true,
            };
        default:
            return state;
    }
}