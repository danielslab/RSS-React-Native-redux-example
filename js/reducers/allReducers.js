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
import * as handlers from '../db/handlers';

let initialState = {
    allFeeds: [],
    bookmarkedFeeds: [],
    tag: null,
    channelId: null,
    feedToShow: null,
    selectedFeedTabIndex: 0,
    isRefreshing: false,
    error: null,
};


export default function allState(state = initialState, action = {}) {
    switch (action.type) {
        case ON_FEED_PRESS:
            return {
                ...state,
                feedToShow: handlers.getFeedById(action.id),
            };
        case ON_TAP_STAR:
            handlers.changeFeedBookmark(action.id);
            return {
                ...state,
                allFeeds: handlers.getFeeds(action.tag, action.channelId),
                bookmarkedFeeds: handlers.getFeeds(action.tag, action.channelId, true),
            };
        case REFRESH_FEEDS_LOADING:
            return {
                ...state,
                isRefreshing: true,
            };
        case REFRESH_FEEDS_RECEIVED:
            return {
                ...state,
                isRefreshing: false,
                allFeeds: handlers.getFeeds(action.tag, action.channelId),
                bookmarkedFeeds: handlers.getFeeds(action.tag, action.channelId, true),
            };
        case REFRESH_FEEDS_ERROR:
            return {
                ...state,
                isRefreshing: false,
                error: action.error
            };
        case SELECT_FEED_TAB:
            return {
                ...state,
                selectedFeedTabIndex: action.index,
            };
        default:
            return state;
    }
}