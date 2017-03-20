import React, {Component} from 'react';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';

import * as reducers from '../reducers';
import Rss from './index';

const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);
const reducer = combineReducers(reducers);
const store = createStoreWithMiddleware(reducer);
import {realm} from '../db';

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
    componentDidMount() {
        // this.fillDB();
    }
  render() {
    return (
      <Provider store={store}>
        <Rss/>
      </Provider>
    );
  }
}
