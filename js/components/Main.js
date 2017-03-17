/**
 * Created by denissamohvalov on 16.03.17.
 */
import React, {Component, PropTypes} from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    Navigator
} from 'react-native';
import {MAIN_COLOR, icons} from '../constants';
import * as allActions from '../actions/allActions';
import All from './All';
import ManageChannels from './ManageChannels';
import Tags from './Tags';

const styles = StyleSheet.create({
    titleText: {
        marginTop: 16,
        fontSize: 16,
        color: 'white',
    },
    navBar: {
        backgroundColor: MAIN_COLOR,
        justifyContent: 'center',
    },
    leftIcon: {
        marginTop: 16,
        marginLeft: 16,
    },
    rightIcon: {
        marginTop: 16,
        marginRight: 16,
    },
    content: {
        flex: 1,
        marginTop: 56,
    }
});

class Main extends Component {

    static propTypes = {
        isAllSelected: PropTypes.bool,
        isTagsSelected: PropTypes.bool,
        isManageChannelsSelected: PropTypes.bool,
        openDrawer: PropTypes.func,
        refreshFeeds: PropTypes.func,
    };

    _renderLeftButton = (route, navigator, index, navState) => {
        const { openDrawer } = this.props;
        return (
            <TouchableOpacity style={styles.leftIcon} onPress={() => openDrawer()}>
                <Icon name={icons.menu} size={24} color="white"/>
            </TouchableOpacity>
        );
    };

    _renderRightButton = (route, navigator, index, navState) => {
        if (this.props.isAllSelected) {
            return (
                <TouchableOpacity style={styles.rightIcon} onPress={() => this.props.allActions.refreshFeeds()}>
                    <Icon name={icons.refresh} size={24} color="white"/>
                </TouchableOpacity>
            );
        } else {
            return <View/>;
        }
    };

    _renderTitle = (route, navigator, index, navState) => {
        const {isAllSelected, isTagsSelected, isManageChannelsSelected} = this.props;
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

    _renderContent = () => {
        const {isAllSelected, isManageChannelsSelected, isTagsSelected} = this.props;
        const {allActions, allState} = this.props;
        if (isAllSelected) {
            return <All allActions={allActions} allState={allState}/>;
        }
        if (isManageChannelsSelected) {
            return <ManageChannels/>
        }
        if (isTagsSelected) {
            return <Tags/>;
        }
    };

    render() {
        return (
            <Navigator
                renderScene={(route, navigator) => (<View style={styles.content}>{this._renderContent()}</View>) }
                navigationBar={
                    <Navigator.NavigationBar
                        routeMapper={{
                             LeftButton: this._renderLeftButton,
                             RightButton: this._renderRightButton,
                             Title: this._renderTitle,}}
                        style={styles.navBar}
                    />
                 }
            />);

    }
}

export default connect(
    state => ({
        allState: state.allState
    }),
    dispatch => ({
        allActions: bindActionCreators({...allActions}, dispatch)
    })
)(Main);