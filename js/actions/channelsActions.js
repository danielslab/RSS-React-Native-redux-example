/**
 * Created by denissamohvalov on 20.03.17.
 */
import {
    EDIT_CHANNEL,
    DELETE_CHANNEL,
    GET_CHANNELS,
    SHOW_ADD_CHANNEL_DIALOG,
    ADD_CHANNEL,
    SHOW_EDIT_CHANNEL_DIALOG,
    SHOW_EDIT_TAGS_DIALOG,
    RESET_FORM
} from '../constants';

import {parseRSSHeader} from '../api';
import realm from '../db/schemas';
import validUrl from 'valid-url';


function checkChannel(channel, oldChannel) {
    if (validUrl.isUri(channel)) {
        let channels = realm.objects('Channel').filtered('url = "' + channel +'"');
        if (channels.length === 0 || (oldChannel && channel == oldChannel)) {
            return 'valid';
        } else {
            return 'URL is Already in list';
        }
    } else {
        return 'Invalid URL';
    }
}

export function editChannel(id, url, name, oldUrl) {
    let check = checkChannel(url, oldUrl);
    if (check !== 'valid') {
        return {
            type: EDIT_CHANNEL,
            isChannelValid: 'invalid',
            error: check
        }
    }
    return (dispatch, getState) => {
        return parseRSSHeader(url)
            .then(
                result => {
                    if (!name) {
                        name = result.title;
                    }
                    dispatch(
                        {
                            type: EDIT_CHANNEL,
                            faviconUrl: result.faviconUrl,
                            isChannelValid: 'valid',
                            url,
                            name,
                            id,
                        }
                    )
                },
                reject => {
                    dispatch(
                        {
                            type: EDIT_CHANNEL,
                            isChannelValid: 'invalid',
                            error: 'Not a rss url'
                        }
                    )
                }
            ).catch((error) => {
                dispatch({type: EDIT_CHANNEL, isChannelValid: 'invalid', error: "Verify the internet connection"})
            });
    }
}

export function deleteChannel(id) {
    return {
        type: DELETE_CHANNEL,
        id
    }
}

export function getChannels() {
    return {
        type: GET_CHANNELS,
    }
}

export function showAddChannelDialog() {
    return {
        type: SHOW_ADD_CHANNEL_DIALOG,
    }
}

export function showEditChannelDialog(id){
    return {
        type: SHOW_EDIT_CHANNEL_DIALOG,
        id
    }
}

export function showEditTagsDialog(id) {
    return {
        type: SHOW_EDIT_TAGS_DIALOG,
        id
    }
}

export function resetForm() {
    return {
        type: RESET_FORM,
    }
}
export function addChannel(url, name){
    let check = checkChannel(url);
    if (check !== 'valid') {
        return {
            type: ADD_CHANNEL,
            isChannelValid: 'invalid',
            error: check
        }
    }
    return (dispatch, getState) => {
        return parseRSSHeader(url)
            .then(
                result => {
                    if (!name) {
                        name = result.title;
                    }
                    dispatch(
                        {
                            type: ADD_CHANNEL,
                            id: result.id,
                            faviconUrl: result.faviconUrl,
                            isChannelValid: 'valid',
                            url,
                            name,
                        }
                    )
                },
                reject => {
                    dispatch(
                        {
                            type: ADD_CHANNEL,
                            isChannelValid: 'invalid',
                            error: 'Not a rss url'
                        }
                    )
                }
            ).catch((error) => {
                dispatch({type: ADD_CHANNEL, isChannelValid: 'invalid', error: "Verify the internet connection"})
            });
    }
}