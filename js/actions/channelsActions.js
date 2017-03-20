/**
 * Created by denissamohvalov on 20.03.17.
 */
import {
    EDIT_CHANNEL,
    DELETE_CHANNEL,
    GET_CHANNELS,
} from '../constants';

export function editChannel(channelId) {
    return {
        type: EDIT_CHANNEL,
        channelId
    }
}

export function deleteChannel(channelId) {
    return {
        type: DELETE_CHANNEL,
        channelId
    }
}

export function getChannels() {
    return {
        type: GET_CHANNELS,
    }
}