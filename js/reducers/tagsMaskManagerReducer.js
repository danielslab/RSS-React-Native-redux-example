/**
 * Created by denissamohvalov on 21.03.17.
 */
import * as constants from '../constants';
import * as handlers from '../db/handlers';
let initialState = {
    tagsMask: [],
};

export default function tagsMaskManagerState(state = initialState, action = {}) {
    switch(action.type) {
        case constants.GET_TAGS_MASK:
          //  console.log('HERE WE ARE', handlers.getChannelTagsMask(action.channelId));
            return {
               ...state,
                tagsMask: handlers.getChannelTagsMask(action.channelId),
            };
        case constants.SELECT_TAG:
            handlers.editTagMask(action.channelId, action.tag, action.value);
            return {
                ...state,
                tagsMask: handlers.getChannelTagsMask(action.channelId),
            };
        default:
            return state;
    }
}