import React, {Component} from 'react';
import {StyleSheet, Platform} from 'react-native';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import SideMenu from '../components/SideMenu/SideMenu';

export default class Rss extends Component {
    render() {
        return <SideMenu/>;
    }
}

