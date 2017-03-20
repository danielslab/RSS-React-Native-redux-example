/**
 * Created by denissamohvalov on 17.03.17.
 */
import {
    GET_FEEDS,
    ON_FEED_PRESS,
    ON_TAP_STAR,
    SELECT_FEED_TAB
} from '../constants';

let initialState = {
    allFeeds: [
        {
            id: 1,
            title: 'Apple',
            subtitle: 'Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit..',
            isBookmarked: false,
            faviconUrl: 'https://www.apple.com/ac/structured-data/images/knowledge_graph_logo.png?201701250108',
            tags: [],
        },
        {
            id: 2,
            title: 'Google',
            subtitle: 'Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit..',
            isBookmarked: false,
            faviconUrl: 'https://www.ferra.ru/580x3000/images/456/456481.jpg',
            tags: [],
        },
        {
            id: 3,
            title: 'Oracle',
            subtitle: 'Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit..',
            isBookmarked: false,
            faviconUrl: 'https://ucare.timepad.ru/02580b3f-5f98-444a-a14e-065127ee1aa1/poster_event_246708.png',
            tags: [],
        }

    ],
    bookmarkedFeeds: [],
    feedToShow: null,
    selectedFeedTabIndex: 0,
};

const findFeedById = (id, feeds) => {
    for (let i = 0; i < feeds.length; ++i) {
        if (feeds[i].id === id) {
            return feeds[i];
        }
    }
};

const modifyFeedStarState = (id, feeds) => {
    let out = [];
    for (let i = 0; i < feeds.length; ++i) {
        if (feeds[i].id === id) {
            out.push({
                ...feeds[i],
                isBookmarked: !feeds[i].isBookmarked,
            });
        } else {
            out.push(feeds[i]);
        }
    }
    return out;
};

const extractBookmarkedFeeds = (feeds) => {
    let out = [];
    for (let i = 0; i < feeds.length; ++i) {
        if (feeds[i].isBookmarked) {
            out.push(feeds[i]);
        }
    }
    return out;
};

export default function allState(state = initialState, action = {}) {
    switch (action.type) {
        case GET_FEEDS:
            return {
                ...state,
                allFeeds: state.allFeeds, // TODO
                bookmarkedFeeds: state.bookmarkedFeeds,
            };
        case ON_FEED_PRESS:
            return {
                ...state,
                feedToShow: findFeedById(action.id, state.allFeeds),
            };
        case ON_TAP_STAR:
            let allFeeds = modifyFeedStarState(action.id, state.allFeeds);
            let bookmarkedFeeds = extractBookmarkedFeeds(allFeeds);
            return {
                ...state,
                allFeeds,
                bookmarkedFeeds
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