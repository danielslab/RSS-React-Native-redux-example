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
import {icons, STAR_COLOR} from '../constants';
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
        flex: 0.75,
        marginLeft: 8,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    textContainer: {
        marginLeft: 24,
        flexWrap: 'wrap',
    },
    icon: {
        height: 50,
        width: 50,
        borderRadius: 25,
        overlayColor: 'white',
    },
    title: {
        fontSize: 16,
        color: 'black',
        opacity: 0.87,
    },
    subtitle: {
        fontSize: 14,
        color: 'black',
        opacity: 0.54,
    },
    starContainer: {
        flex: 0.25,
        alignItems: 'flex-end'
    }
});
export default class FeedCell extends Component {
    static propTypes = {
        id: PropTypes.string,
        title: PropTypes.string,
        subtitle: PropTypes.string,
        isStarPressed: PropTypes.bool,
        onTapStar: PropTypes.func,
        onPress: PropTypes.func,
        faviconUrl: PropTypes.string,
    };

    static defaultProps = {
        faviconUrl: 'https://cdn2.iconfinder.com/data/icons/basic-office-snippets/170/Basic_Office-7-512.png',
    };

    _getStarColor = () => {
        if (this.props.isBookmarked) {
            return STAR_COLOR;
        } else {
            return '#9E9E9E';
        }
    };

    render() {
        const {title, subtitle, onTapStar, onFeedPress, faviconUrl, id} = this.props;
        return (
            <View style={styles.container}>
                <TouchableOpacity style={styles.textIconContainer} onPress={() => onFeedPress(id)}>
                    <Image source={{uri: faviconUrl}} style={styles.icon} />
                    <View style={styles.textContainer}>
                        <Text style={styles.title} numberOfLines={1}>{title}</Text>
                        <Text style={styles.subtitle} numberOfLines={1}>{subtitle}</Text>
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