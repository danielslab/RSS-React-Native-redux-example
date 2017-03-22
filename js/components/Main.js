/**
 * Created by denissamohvalov on 16.03.17.
 */
import React, {Component, PropTypes} from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    Navigator,
    Alert,
    Platform
} from 'react-native';

import {MAIN_COLOR, icons} from '../constants';

import * as allActions from '../actions/allActions';
import * as tagsActions from '../actions/tagsActions';
import * as channelsActions from '../actions/channelsActions';

import All from './All';
import ManageChannels from './ManageChannels';
import Tags from './Tags';
import ChannelForm from './ChannelForm';
import TagsMaskManager from './TagsMaskManager';

const topPanelMarginTop = () => {
    if (Platform.OS === 'ios') {
        return 66;
    } else {
        return 56;
    }
};
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
        marginTop: topPanelMarginTop(),
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
        const {openDrawer} = this.props;
        if (route && route.title) {
            return (
                <TouchableOpacity style={styles.leftIcon} onPress={() =>
                    {
                        navigator.pop();
                    }
                }>
                    <Icon name={icons.arrowBack} size={24} color="white"/>
                </TouchableOpacity>
            );
        }
        return (
            <TouchableOpacity style={styles.leftIcon} onPress={() => openDrawer()}>
                <Icon name={icons.menu} size={24} color="white"/>
            </TouchableOpacity>
        );
    };

    _renderRightButton = (route, navigator, index, navState) => {
        if (!this.props.tagsState.tagsCommitted) {
            return (
                <TouchableOpacity style={styles.leftIcon}
                                  onPress={() => this._confirmCommit(this.props.tagsActions.commitTags)}>
                    <MaterialIcon name={"save"} size={24} color="white"/>
                </TouchableOpacity>
            );
        }
         else {
            return <View/>;
        }
    };

    _confirmCommit = (commit) => {
        Alert.alert(
            'Save changes',
            'Are you sure you want to save changes?',
            [
                {text: 'Cancel', onPress: () => this.props.tagsActions.getTags()},
                {text: 'OK', onPress: () => commit()}
            ]
        );
    };

    _renderTitle = (route, navigator, index, navState) => {
        const {isAllSelected, isTagsSelected, isManageChannelsSelected} = this.props;
        let title = '';
        if (route && route.title) {
            title = route.title;
        } else
        if (isAllSelected) {
            title = 'All';
        } else if (isTagsSelected) {
            title = 'Tags';
        } else if (isManageChannelsSelected) {
            title = 'Manage Channels';
        }
        return <Text style={styles.titleText}>{title}</Text>;
    };

    _renderContent = (navigator, route) => {
        const {isAllSelected, isManageChannelsSelected, isTagsSelected} = this.props;
        const {allActions, allState} = this.props;
        const {tagsActions, tagsState} = this.props;
        const {channelsActions, channelsState} = this.props;
        if (route && route.title === 'Add Channel') {
            return <ChannelForm
                        navigator={navigator}
                        type="add"
                        {...channelsActions}
                        {...channelsState}/>;
        } else if (route && route.title === 'Edit Channel') {
            return <ChannelForm
                        navigator={navigator}
                        type="edit"
                        {...channelsActions}
                        {...channelsState}/>;
        } else if (route && route.title === 'Edit Tags') {
            return <TagsMaskManager
                        channelId={channelsState.id}/>
        }
        if (isAllSelected) {
            return <All
                navigator={navigator}
                {...allActions}
                {...allState}/>;
        } else if (isManageChannelsSelected) {
            return <ManageChannels
                navigator={navigator}
                {...channelsActions}
                {...channelsState}/>
        } else if (isTagsSelected) {
            return <Tags
                navigator={navigator}
                showCheckboxes={false}
                {...tagsActions}
                {...tagsState}/>;
        }
    };

    render() {
        return (
            <Navigator
                renderScene={(route, navigator) => (<View style={styles.content}>{this._renderContent(navigator, route)}</View>) }
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
    state => {
        return {
            allState: state.allState,
            tagsState: state.tagsState,
            channelsState: state.channelsState,
        }
    },
    dispatch => ({
        allActions: bindActionCreators({...allActions}, dispatch),
        tagsActions: bindActionCreators({...tagsActions}, dispatch),
        channelsActions: bindActionCreators({...channelsActions}, dispatch),
    })
)(Main);