/**
 * Created by denissamohvalov on 17.03.17.
 */
import {
    GET_FEEDS,
    ON_FEED_PRESS,
    ON_TAP_STAR,
    SELECT_FEED_TAB,
    REFRESH_FEEDS,
} from '../constants';

export function getFeeds() {
    return {
        type: GET_FEEDS
    }
}

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

export function refreshFeeds() {
    return {
        type: REFRESH_FEEDS,
    }
}