/**
 * Created by denissamohvalov on 20.03.17.
 */
import {
    GET_CHANNELS,
    DELETE_CHANNEL,
    EDIT_CHANNEL,
} from '../constants';

let initialState = {
  channels: [],
};

function deleteChannel(channelId, channels) {

}

function editChannels(channelId, channels) {

}

export default function channelsState(state = initialState, action = {}) {
  switch(action.type) {
      case GET_CHANNELS:
          return {
              ...state,
              channels: state.channels
          };
      case EDIT_CHANNEL:
        return {
            ...state,
            channels: editChannels(action.channelId, state.channels),
        };
      case DELETE_CHANNEL:
        return {
            ...state,
            channels: deleteChannel(action.channelId, state.channels)
        }
  }
}