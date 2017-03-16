/**
 * Created by denissamohvalov on 16.03.17.
 */
import React, {Component, PropTypes} from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {
    StyleSheet,
    Platform,
    View,
    Text,
    TouchableOpacity,
    Navigator
} from 'react-native';
import mainColor from '../constants';

const styles = StyleSheet.create({
    titleText: {
        fontSize: 16,
        color: 'white',
    }
});

const routes = [
    {title: 'First Scene', index: 0},
    {title: 'Second Scene', index: 1},
];

export default class Main extends Component {

    static propTypes = {
        isAllSelected: PropTypes.bool,
        isTagsSelected: PropTypes.bool,
        isManageChannelsSelected: PropTypes.bool,
        openDrawer: PropTypes.func,
        refreshFeeds: PropTypes.func,
    };

    _renderLeftButton = (route, navigator, index, navState) => {
        const { openDrawer } = this.props;
        console.log('Route', route);
        if (route === 0 || route === 1 || route === 2) {
            if (Platform.OS === 'ios') {
                return (
                    <TouchableOpacity onPress={() => openDrawer()}>
                        <Icon name="ios-menu" size={30} color="white" />
                    </TouchableOpacity>
                );
            } else {
                return (
                    <TouchableOpacity onPress={() => openDrawer()}>
                        <Icon name="md-menu" size={30} color="white" />
                    </TouchableOpacity>
                );
            }
        }
    };

    _renderRightButton = (route, navigator, index, navState) => {
        const {refreshFeeds} = this.props;
        if (route === 0) {
            if (Platform.OS === 'ios') {
                return (
                    <TouchableOpacity onPress={() => refreshFeeds()}>
                        <Icon name="ios-refresh" size={30} color="white"/>
                    </TouchableOpacity>
                );
            } else {
                return (
                    <TouchableOpacity onPress={() => refreshFeeds()}>
                        <Icon name="md-refresh" size={30} color="white"/>
                    </TouchableOpacity>
                );
            }
        } else {
            return <View/>;
        }
    };


    _renderTitle = (route, navigator, index, navState) => {
        const {isAllSelected, isTagsSelected, isManageChannelsSelected} = this.props;
        console.log('here we are', isAllSelected);
        let title = '';
        if (isAllSelected) {
            title = 'All';
        }
        if (isTagsSelected) {
            title = 'Tags';
        }
        if (isManageChannelsSelected) {
            title = 'Manage Channels';
        }
        return <Text style={styles.titleText}>{title}</Text>;
    };


    render() {
        return (
            <Navigator
                initialRoute={routes[0]}
                initialRouteStack={routes}
                renderScene={(route, navigator) => { }}
                navigationBar={
                    <Navigator.NavigationBar
                        routeMapper={{
                             LeftButton: this._renderLeftButton,
                             RightButton: this._renderRightButton,
                             Title: this._renderTitle,}}
                        style={{height: 56, backgroundColor: mainColor}}
                    />
                 }
            />);
    }
}