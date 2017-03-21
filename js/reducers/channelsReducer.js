/**
 * Created by denissamohvalov on 20.03.17.
 */

import {
    GET_CHANNELS,
    DELETE_CHANNEL,
    EDIT_CHANNEL,
    SHOW_ADD_CHANNEL_DIALOG,
    ADD_CHANNEL,
    RESET_FORM,
    SHOW_EDIT_CHANNEL_DIALOG,
    SHOW_EDIT_TAGS_DIALOG
} from '../constants';
import {deleteChannel, editChannel, getChannels, getChannelById, addChannel, getChannelTagsMask} from '../db/handlers';

let initialState = {
    channels: [],
    isChannelValid: null,
    error: null,
    url: '',
    id: '',
    name: '',
    faviconUrl: '',
    channelMask: []
};


export default function channelsState(state = initialState, action = {}) {
    switch (action.type) {
        case GET_CHANNELS:
            return {
                ...state,
                channels: getChannels()
            };
        case EDIT_CHANNEL:
            if (action.isChannelValid === 'invalid') {
                return {
                    ...state,
                    isChannelValid: action.isChannelValid,
                    error: action.error,
                }
            } else if (action.isChannelValid === 'valid') {
                editChannel(action.id, action.url, action.name, action.faviconUrl);
                return {
                    ...state,
                    isChannelValid: 'valid',
                    channels: getChannels(),
                };
            }
            return state;
        case DELETE_CHANNEL:
            deleteChannel(action.id);
            return {
                ...state,
                channels: getChannels()
            };
        case SHOW_ADD_CHANNEL_DIALOG:
            return {
                ...state,
            };
        case SHOW_EDIT_CHANNEL_DIALOG:
            return {
                ...state,
                ...getChannelById(action.id),
            };
        case SHOW_EDIT_TAGS_DIALOG:
            return {
                ...state,
                id: action.id,
            };
        case ADD_CHANNEL:
            if (action.isChannelValid === 'invalid') {
                return {
                    ...state,
                    isChannelValid: action.isChannelValid,
                    error: action.error,
                }
            } else if (action.isChannelValid === 'valid') {
                addChannel(action.id, action.url, action.name, action.faviconUrl);
                return {
                    ...state,
                    isChannelValid: 'valid',
                    channels: getChannels(),
                };
            }
            return state;
        case RESET_FORM:
            return {
                ...initialState,
                channels: state.channels,
            };
        default:
            return state;
    }
}