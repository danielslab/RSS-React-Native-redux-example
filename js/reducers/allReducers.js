/**
 * Created by denissamohvalov on 17.03.17.
 */
import {
    ON_FEED_PRESS,
    ON_TAP_STAR,
    SELECT_FEED_TAB,
    REFRESH_FEEDS_LOADING,
    REFRESH_FEEDS_RECEIVED,
    REFRESH_FEEDS_ERROR,
    RESET_ALL_STATE
} from '../constants';
import * as handlers from '../db/handlers';

let initialState = {
    allFeeds: [],
    bookmarkedFeeds: [],
    feedToShow: null,
    selectedFeedTabIndex: 0,
    isRefreshing: false,
    error: null,
};


export default function allState(state = initialState, action = {}) {
    switch (action.type) {
        case ON_FEED_PRESS:
            handlers.setFeedSeen(action.id);
            return {
                ...state,
                feedToShow: handlers.getFeedById(action.id),
            };
        case ON_TAP_STAR:
            handlers.changeFeedBookmark(action.id);
            let newFeedToShow;
            if (state.feedToShow) {
                newFeedToShow = handlers.getFeedById(action.id);
            }
            return {
                ...state,
                allFeeds: handlers.getFeeds(state.tag, state.channelId),
                bookmarkedFeeds: handlers.getFeeds(state.tag, state.channelId, true),
                feedToShow: newFeedToShow,
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
                tag: action.tag,
                channelId: action.channelId,
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
        case RESET_ALL_STATE:
            return {
                allFeeds: [],
                bookmarkedFeeds: [],
                feedToShow: null,
                selectedFeedTabIndex: 0,
                isRefreshing: false,
                error: null,
            };
        default:
            return state;
    }
}