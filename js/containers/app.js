import React, {Component} from 'react';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';

import * as reducers from '../reducers';
import Rss from './index';

const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);
const reducer = combineReducers(reducers);
const store = createStoreWithMiddleware(reducer);
import realm from '../db';

export default class App extends Component {
    fillDB() {
        realm.write(() => {
            realm.delete(realm.objects('Tag'));
            let tags = ["Apple", "Google", "Oracle", "Baidu", "Alibaba", "Yahoo", "McKinsey&Co", "The Boston Consulting Group"];
            for (tag of tags) {
                realm.create('Tag', {name: tag});
            }
        });
    }

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
        realm.write(() => {
            realm.delete(realm.objects('Channel'));
            for (channel of channels) {
                realm.create('Channel',{
                    url: channel.url,
                    name: channel.name,
                    id: channel.id,
                    faviconUrl: channel.faviconUrl,
                })
            }
        });

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
