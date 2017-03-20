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
        }
    } else {
        return {
            paperPlane: 'md-paper-plane',
            priceTags: 'md-pricetags',
            settings: 'md-settings',
            menu: 'md-menu',
            refresh: 'md-refresh',
            star: 'md-star'
        }
    }
};
export const icons = getIcons();

//actions
export const ON_ALL_SELECTED = 'ON_ALL_SELECTED';
export const ON_TAGS_SELECTED = 'ON_TAGS_SELECTED';
export const ON_MANAGE_CHANNELS_SELECTED = 'ON_MANAGE_CHANNELS_SELECTED';
export const GET_FEEDS = 'GET_FEEDS';
export const ON_FEED_PRESS = 'ON_FEED_PRESS';
export const ON_TAP_STAR = 'ON_TAP_STAR';
export const SELECT_FEED_TAB = 'SELECT_FEED_TAB';
export const REFRESH_FEEDS = 'REFRESH_FEEDS';
export const SAVE_TAGS = 'SAVE_TAGS';
export const SAVE_TAGS_FOR_FEED = 'SAVE_TAGS_FOR_FEED';
export const GET_TAGS = 'GET_TAGS';
