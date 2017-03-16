/**
 * Created by denissamohvalov on 16.03.17.
 */
import {
    ON_ALL_SELECTED,
    ON_MANAGE_CHANNELS_SELECTED,
    ON_TAGS_SELECTED,
} from '../constants';

export function onAllSelected() {
    return {
        type: ON_ALL_SELECTED,
    }
}

export function onTagsSelected() {
    return {
        type: ON_TAGS_SELECTED,
    }
}

export function onManageChannelsSelected() {
    return {
        type: ON_MANAGE_CHANNELS_SELECTED,
    }
}