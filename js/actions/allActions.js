/**
 * Created by denissamohvalov on 17.03.17.
 */
import {
    ON_FEED_PRESS,
    ON_TAP_STAR,
    SELECT_FEED_TAB,
    REFRESH_FEEDS_LOADING,
    REFRESH_FEEDS_RECEIVED,
    REFRESH_FEEDS_ERROR
} from '../constants';

import {getChannels, getChannelById, getChannelsByTag, addFeeds} from '../db/handlers';
import {parseRss} from '../api'
export function onFeedPress(id) {
    return {
        type: ON_FEED_PRESS,
        id
    }
}

export function onTapStar(id) {
    return {
        type: ON_TAP_STAR,
        id
    }
}

export function selectFeedTab(index) {
    return {
        type: SELECT_FEED_TAB,
        index,
    }
}

export function refresh(tag, channelId) {
    return (dispatch, getState) => {
        dispatch({type: REFRESH_FEEDS_LOADING});
        let channels;
        if (tag) {
            channels = getChannelsByTag(tag);
        } else if (channelId) {
            channels = getChannelById(channelId);
        } else {
            channels = getChannels();
        }
        for (let i = 0; i < channels.length; ++i){
            let url = channels[i].url;
            parseRss(url).then(
                result => {
                    addFeeds(result, channels[i]);
                    if (i === channels.length - 1) {
                        dispatch({type: REFRESH_FEEDS_RECEIVED, tag, channelId})
                    }
                }
            ).catch(error => dispatch({type: REFRESH_FEEDS_ERROR, error}));
        }
    }

}