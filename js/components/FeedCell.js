/**
 * Created by denissamohvalov on 17.03.17.
 */
import React, {Component, PropTypes} from 'react';
import Icon from 'react-native-vector-icons/Ionicons';

import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    Image
} from 'react-native';
import {enhanceStr} from '../utils';
import {icons, STAR_COLOR, MAIN_COLOR} from '../constants';
const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#E0E0E0',
        padding: 7,
        margin: 5,
    },
    textIconContainer: {
        flex: 0.9,
        marginLeft: 8,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    textContainer: {
        flex: 1,
        marginLeft: 20,
    },
    icon: {
        height: 50,
        width: 50,
        borderRadius: 25,
        overlayColor: 'white',
    },
    title: {
        fontSize: 16,
        color: MAIN_COLOR,
        opacity: 0.87,
        marginBottom: 1,
    },
    subtitle: {
        fontSize: 12,
        color: 'black',
        opacity: 0.54,
    },
    starContainer: {
        flex: 0.1,
        alignItems: 'flex-end'
    }
});
const defaultFavicon = 'https://cdn2.iconfinder.com/data/icons/basic-office-snippets/170/Basic_Office-7-512.png';
export default class FeedCell extends Component {
    static propTypes = {
        id: PropTypes.string,
        title: PropTypes.string,
        description: PropTypes.string,
        is_bookmarked: PropTypes.bool,
        onTapStar: PropTypes.func,
        onPress: PropTypes.func,
        faviconUrl: PropTypes.string,
    };

    static defaultProps = {
        faviconUrl: 'https://cdn2.iconfinder.com/data/icons/basic-office-snippets/170/Basic_Office-7-512.png',
    };

    _getStarColor = () => {
        if (this.props.is_bookmarked) {
            return STAR_COLOR;
        } else {
            return '#9E9E9E';
        }
    };

    render() {
        const {title, description, onTapStar, onFeedPress, faviconUrl, id} = this.props;
        console.log(title, description);
        return (
            <View style={styles.container}>
                <TouchableOpacity style={styles.textIconContainer} onPress={() => onFeedPress(id)}>
                    <Image source={{uri: faviconUrl || defaultFavicon}} style={styles.icon} />
                    <View style={styles.textContainer}>
                        <Text  style={styles.title} numberOfLines={1}>{enhanceStr(title)}</Text>
                        <Text  style={styles.description} numberOfLines={3}>{enhanceStr(description)}</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity style={styles.starContainer}  onPress={() => onTapStar(id)}>
                    <Icon
                        name={icons.star}
                        size={24}
                        color={this._getStarColor()} />
                </TouchableOpacity>
            </View>
        );
    }
}