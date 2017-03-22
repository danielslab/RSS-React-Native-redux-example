import {Platform} from 'react-native';

// styles
export const MAIN_COLOR = '#2196F3';
export const IOS_BACKGROUND_COLOR = '#efeff4';
export const STAR_COLOR = '#FFD600';

// icons
const getIcons = () => {
    if (Platform.OS === 'ios') {
        return {
            paperPlane: 'ios-paper-plane',
            priceTags: 'ios-pricetags',
            settings: 'ios-settings',
            menu: 'ios-menu',
            refresh: 'ios-refresh',
            star: 'ios-star',
            trash: 'ios-trash',
            close: 'ios-close-circle',
            arrowBack: 'ios-arrow-round-back',
        }
    } else {
        return {
            paperPlane: 'md-paper-plane',
            priceTags: 'md-pricetags',
            settings: 'md-settings',
            menu: 'md-menu',
            refresh: 'md-refresh',
            star: 'md-star',
            trash: 'md-trash',
            close: 'md-close-circle',
            arrowBack: 'md-arrow-round-back'
        }
    }
};
export const icons = getIcons();

//fonts
const getFonts = () => {
    if (Platform.OS === 'ios') {
        return {
            serif: 'Helvetica'
        }
    } else {
        return {
            serif: 'sans-serif',
        }
    }
};

export const fonts = getFonts();

//actions
export const ON_ALL_SELECTED = 'ON_ALL_SELECTED';
export const ON_TAGS_SELECTED = 'ON_TAGS_SELECTED';
export const ON_MANAGE_CHANNELS_SELECTED = 'ON_MANAGE_CHANNELS_SELECTED';
export const GET_FEEDS = 'GET_FEEDS';
export const ON_FEED_PRESS = 'ON_FEED_PRESS';
export const ON_TAP_STAR = 'ON_TAP_STAR';
export const SELECT_FEED_TAB = 'SELECT_FEED_TAB';
export const COMMIT_TAGS = 'COMMIT_TAGS';
export const COMMIT_CHANNEL_TAGS_MASK = 'COMMIT_CHANNEL_TAGS_MASK';
export const GET_TAGS = 'GET_TAGS';
export const GET_CHANNEL_TAGS_MASK = "GET_CHANNEL_TAGS_MASK";
export const DELETE_TAG = "DELETE_TAG";
export const ADD_TAG = "ADD_TAG";
export const SELECT_TAG = "SELECT_TAG";
export const ON_PRESS_TAG = "ON_PRESS_TAG";
export const EDIT_CHANNEL = "EDIT_CHANNEL";
export const DELETE_CHANNEL = "DELETE_CHANNEL";
export const GET_CHANNELS = "GET_CHANNELS";
export const SHOW_ADD_CHANNEL_DIALOG = "SHOW_ADD_CHANNEL_DIALOG";
export const ADD_CHANNEL = "ADD_CHANNEL";
export const SHOW_EDIT_CHANNEL_DIALOG = "SHOW_EDIT_CHANNEL_DIALOG";
export const SHOW_EDIT_TAGS_DIALOG = "SHOW_EDIT_TAGS_DIALOG";
export const RESET_FORM = "RESET_FORM";
export const GET_TAGS_MASK = "GET_TAGS_MASK";
export const REFRESH_FEEDS_LOADING = "REFRESH_FEEDS_LOADING";
export const REFRESH_FEEDS_RECEIVED = "REFRESH_FEEDS_RECEIVED";
export const REFRESH_FEEDS_ERROR = "REFRESH_FEEDS_ERROR";