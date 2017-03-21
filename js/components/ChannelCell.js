/**
 * Created by denissamohvalov on 20.03.17.
 */

import React, {Component, PropTypes} from 'react';
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    Linking,
    Image,
    Alert
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';

import {icons} from '../constants';

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
        overflow: 'hidden',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    textContainer: {
        marginLeft: 20,
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
    url: {
        fontSize: 14,
        color: '#0000FF',
        textDecorationLine: 'underline',
        opacity: 0.54,
    },
    iconsContainer: {
        flex: 0.25,
        paddingLeft: 8,
        flexDirection: 'row',
        justifyContent: 'space-around'
    }
});
const defaultFavicon = 'https://cdn2.iconfinder.com/data/icons/basic-office-snippets/170/Basic_Office-7-512.png';
export default class ChannelCell extends Component {
    static propTypes = {
        id: PropTypes.string,
        name: PropTypes.string,
        url: PropTypes.string,
        faviconUrl: PropTypes.string,
        onPressChannel: PropTypes.func,
        editChannel: PropTypes.func,
        getChannelTagsMask: PropTypes.func,
        deleteChannel: PropTypes.func,
    };

    static defaultProps = {
        faviconUrl: 'https://cdn2.iconfinder.com/data/icons/basic-office-snippets/170/Basic_Office-7-512.png',
    };

    _goToUrl = () => {
        Linking.openURL(this.props.url);
    };

    _confirmDelete = (id) => {
        Alert.alert(
            'Confirmation',
            'Are you sure you want to delete channel?',
            [
                {text: 'Cancel', onPress: () => {}},
                {text: 'OK', onPress: () => this.props.deleteChannel(id)}
            ]
        );
    };

    render() {
        console.log('FAVICON URL', this.props.faviconUrl);
        const {id, name, url, faviconUrl, onPressChannel, editChannel, getChannelTagsMask} = this.props;
        return (
            <View style={styles.container}>
                <TouchableOpacity style={styles.textIconContainer} onPress={() => onPressChannel(id)}>
                    <Image source={{uri: faviconUrl || defaultFavicon}} style={styles.icon} />
                    <View style={styles.textContainer}>
                        <View style={{flex: 1}}>
                            <Text style={styles.title} numberOfLines={1}>{name}</Text>
                        </View>
                        <TouchableOpacity style={{flex: 1}} onPress={this._goToUrl}>
                            <Text style={styles.url} numberOfLines={1}>{url}</Text>
                        </TouchableOpacity>
                    </View>
                </TouchableOpacity>
                <View style={styles.iconsContainer}>
                    <TouchableOpacity  onPress={() => getChannelTagsMask(id)}>
                        <Icon
                            name={icons.priceTags}
                            size={24} />
                    </TouchableOpacity>
                    <TouchableOpacity  onPress={() => editChannel(id)}>
                        <MaterialIcon
                            name="edit"
                            size={24} />
                    </TouchableOpacity>
                    <TouchableOpacity  onPress={() => this._confirmDelete(id)}>
                        <Icon
                            name={icons.trash}
                            size={24} />
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}