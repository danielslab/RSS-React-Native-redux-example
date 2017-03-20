/**
 * Created by denissamohvalov on 16.03.17.
 */
import React, {Component, PropTypes} from 'react';
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    Platform
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import {MAIN_COLOR, icons} from '../../constants';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    headerContainer: {
        flex: 0.15,
        justifyContent: 'flex-end',
        alignItems: 'flex-start',
        backgroundColor: MAIN_COLOR,
    },
    headerText: {
        fontSize: 22,
        margin: 10,
        color: 'white',
    },
    contentContainer: {
        flex: 0.85,
    },
    itemContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        height: 48,
        marginTop: 8,
    },
    itemTextContainer: {
        marginLeft: 24,
    },
    itemText: {
        fontSize: 14,
    },
    iconContainer: {
        marginLeft: 16,
    }
});
export default class ContentPanel extends Component {
    static propTypes = {
        closeDrawer: PropTypes.func,
        onAllSelected: PropTypes.func,
        onTagsSelected: PropTypes.func,
        onManageChannelsSelected: PropTypes.func,
        isAllSelected: PropTypes.bool,
        isTagsSelected: PropTypes.bool,
        isManageChannelsSelected: PropTypes.bool,
        unreadCount: PropTypes.number,
        totalCount: PropTypes.number,
    };

    static defaultProps = {
        unreadCount: 3,
        totalCount: 15,
    };

    _getItemBackgroundColor = isSelected => {
        if (isSelected) {
            return "#EEEEEE";
        } else {
            return 'transparent';
        }
    };

    _getItemContentColor = isSelected => {
        if (isSelected) {
            return MAIN_COLOR;
        } else {
            return 'rgba(0, 0, 0, 0.87)';
        }
    };

    _getIconName = name => {
        if (name === 'All') {
            return icons.paperPlane;
        }

        if (name === 'Tags') {
            return icons.priceTags;
        }

        if (name === 'Manage Channels') {
            return icons.settings;
        }
    };

    _renderItem = (name, isSelected, onPress) => {
        let iconName = this._getIconName(name);
        let backgrondColor = this._getItemBackgroundColor(isSelected);
        let contentColor = this._getItemContentColor(isSelected);
        if (name === 'All') {
            name = 'All (' +  this.props.unreadCount + '/' + this.props.totalCount + ')';
        }
        return (
            <View style={[styles.itemContainer,
                                {backgroundColor: backgrondColor}]}>
                <TouchableOpacity style={styles.itemContainer} onPress={() => {this.props.closeDrawer(); setTimeout(onPress, 400); }}>
                    <View style={styles.iconContainer}>
                        <Icon name={iconName} size={24} color={contentColor} />
                    </View>
                    <View style={styles.itemTextContainer}>
                        <Text style={[styles.itemText,
                                              {color: contentColor}]}>
                            {name}
                        </Text>
                    </View>
                </TouchableOpacity>
            </View>
        );
    };


    render() {
        const {onAllSelected, onTagsSelected, onManageChannelsSelected} = this.props;
        const {isAllSelected, isTagsSelected, isManageChannelsSelected} = this.props;
        return (
            <View style={styles.container}>
                <View style={styles.headerContainer}>
                    <Text style={styles.headerText}>RSS App</Text>
                </View>
                <View style={styles.contentContainer}>
                    {this._renderItem('All', isAllSelected, onAllSelected)}
                    {this._renderItem('Tags', isTagsSelected, onTagsSelected)}
                    {this._renderItem('Manage Channels', isManageChannelsSelected, onManageChannelsSelected)}
                </View>
            </View>
        );
    }
}