/**
 * Created by denissamohvalov on 16.03.17.
 */
import {
    ON_ALL_SELECTED,
    ON_TAGS_SELECTED,
    ON_MANAGE_CHANNELS_SELECTED
} from '../constants';

let initialState = {
    isAllSelected: true,
    isManageChannelsSelected: false,
    isTagsSelected: false,
};

export default function sideMenuState(state = initialState, action)
{
    switch (action.type) {
        case ON_ALL_SELECTED:
            return {
                isAllSelected: true,
                isManageChannelsSelected: false,
                isTagsSelected: false,
            };
        case ON_TAGS_SELECTED:
            return {
                isTagsSelected: true,
                isAllSelected: false,
                isManageChannelsSelected: false,
            };
        case ON_MANAGE_CHANNELS_SELECTED:
            return {
                isManageChannelsSelected: true,
                isAllSelected: false,
                isTagsSelected: false,
            };
        default:
            return state;
    }
}

