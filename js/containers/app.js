import React, {Component} from 'react';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';

import * as reducers from '../reducers';
import Rss from './index';

const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);
const reducer = combineReducers(reducers);
const store = createStoreWithMiddleware(reducer);
import realm from '../db/schemas';
import {addChannel} from '../db/handlers';
export default class App extends Component {
    fillChannels() {
        let channels = [
            {
                url: 'https://meduza.io/rss/all',
                faviconUrl: 'https://meduza.io/images/rss-logo.png',
                name: 'Meduza',
                id: '1',
            },
            {
                url: 'https://tvrain.ru/export/rss/programs/1045.xml',
                faviconUrl: '',
                name: 'Rain',
                id: '2',
            },
            {
                url: 'https://www.vedomosti.ru/rss/news',
                faviconUrl: 'https://cdn.vedomosti.ru/assets/rss_logo.gif',
                name: 'Vedomosti',
                id: '3'
            }
        ];
        let channel = realm.objects('Channel')[0];
        if (!channel) {
            for (channel of channels) {
                addChannel(channel.id, channel.url, channel.name, channel.faviconUrl);
            }
        }
    }

    componentDidMount() {
         this.fillChannels();
    }

  render() {
    return (
      <Provider store={store}>
        <Rss/>
      </Provider>
    );
  }
}
