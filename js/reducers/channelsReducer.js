/**
 * Created by denissamohvalov on 20.03.17.
 */

import {
    GET_CHANNELS,
    DELETE_CHANNEL,
    EDIT_CHANNEL,
    SHOW_ADD_CHANNEL_DIALOG,
    ADD_CHANNEL,
    RESET_FORM,
    SHOW_EDIT_CHANNEL_DIALOG
} from '../constants';
import realm from '../db';

let initialState = {
    channels: [],
    isChannelValid: null,
    error: null,
    url: '',
    id: '',
    name: '',
    faviconUrl: '',
};

function deleteChannel(id, channels) {
    let out = [];
    let toDelete = realm.objects('Channel').filtered('id = "' + id + '"');
    console.log(toDelete);
    realm.write(() => {
        realm.delete(toDelete);
    });
    for (let i = 0; i < channels.length; ++i) {
        if (channels[i].id !== id) {
            out.push(channels[i]);
            console.log(channels[i]);
        }
    }
    return out;
}

function editChannel(id, url, name, faviconUrl) {
    realm.write(() => {
        let toEdit = realm.objects('Channel').filtered('id = "' + id + '"')[0];
        toEdit.url = url;
        toEdit.name = name;
        toEdit.faviconUrl = faviconUrl || '';
    });
}

function getChannels() {
    let out = [];
    let channels = realm.objects('Channel');
    console.log("Channels", channels);
    for (let i = 0; i < channels.length; ++i) {
        out.push({
            id: channels[i].id,
            url: channels[i].url,
            name: channels[i].name,
            faviconUrl: channels[i].faviconUrl,
        });
    }
    return out;
}

function getChannelById(id) {
    let channel = realm.objects('Channel').filtered('id = "' + id + '"')[0];
    return channel;
}
function addChannel(id, url, name, faviconUrl) {
    realm.write(() => {
        realm.create('Channel', {id, url, name, faviconUrl: faviconUrl || ''});
    });
}

export default function channelsState(state = initialState, action = {}) {
  switch(action.type) {
      case GET_CHANNELS:
          return {
              ...state,
              channels: getChannels()
          };
      case EDIT_CHANNEL:
          if (action.isChannelValid === 'invalid') {
              return {
                  ...state,
                  isChannelValid: action.isChannelValid,
                  error: action.error,
              }
          } else if (action.isChannelValid === 'valid') {
              editChannel(action.id, action.url, action.name, action.faviconUrl);
              let chan = getChannels();
              console.log(chan);
              return {
                  ...state,
                  isChannelValid: 'valid',
                  channels: getChannels(),
              };
          }
          return state;
      case DELETE_CHANNEL:
        return {
            ...state,
            channels: deleteChannel(action.id, state.channels)
        };
      case SHOW_ADD_CHANNEL_DIALOG:
          return {
              ...state,
          };
      case SHOW_EDIT_CHANNEL_DIALOG:
          return {
              ...state,
              ...getChannelById(action.id),
          };
      case ADD_CHANNEL:
          if (action.isChannelValid === 'invalid') {
              return {
                  ...state,
                  isChannelValid: action.isChannelValid,
                  error: action.error,
              }
          } else if (action.isChannelValid === 'valid') {
              addChannel(action.id, action.url, action.name, action.faviconUrl);
              return {
                  ...state,
                  isChannelValid: 'valid',
                  channels: getChannels(),
              };
          }
          return state;
      case RESET_FORM:
          return {
              ...initialState,
              channels: state.channels,
          };
      default:
          return state;
  }
}