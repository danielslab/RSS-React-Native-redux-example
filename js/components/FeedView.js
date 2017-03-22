/**
 * Created by denissamohvalov on 22.03.17.
 */
import React, {Component, PropTypes} from 'react';
import {
    View,
    Image,
    Text,
    Button,
    StyleSheet,
    Linking,
    ScrollView
} from 'react-native';
import {MAIN_COLOR} from '../constants';
import dateformat from 'dateformat';
import {enhanceStr} from '../utils';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        margin: 5,
        backgroundColor: 'white',
    },
    content: {
        alignItems: 'center',
    },
    title: {
        fontSize: 34,
        color: 'black',
        opacity: 0.87,
    },
    textContainer: {
        flexWrap: 'wrap',
        paddingLeft: 10,
        paddingRight: 10,
    },
    titleDateContainer: {
        marginBottom: 10,
    },
    dateText: {
        fontSize: 12,
        color: MAIN_COLOR,
        opacity: 0.87,
    },

    description: {
        fontSize: 16,
        color: 'black',
        opacity: 0.54,
    },
    button: {
        alignSelf: 'center',
    },
    image: {
        marginTop: 10,
        marginBottom: 10,
        height: 200,
        width: 300
    }
});

export default class FeedView extends Component {
    static propTypes = {
        url: PropTypes.string,
        title: PropTypes.string,
        description: PropTypes.string,
        faviconUrl: PropTypes.string,
        date: PropTypes.date,
    };

    _onPress = () => {
        Linking.openURL(this.props.url);
    };

    render() {
        const {title, description, faviconUrl, date} = this.props;
        return (
            <ScrollView style={styles.container} contentContainerStyle={styles.content}>
                <View style={styles.titleDateContainer}>
                    <Text style={styles.title}>{enhanceStr(title)}</Text>
                    <Text style={styles.dateText}>{dateformat(date, 'mediumDate')} {dateformat(date, 'shortTime')}</Text>
                </View>
                {(faviconUrl && faviconUrl !== '') &&
                    <Image style={styles.image} source={{uri: faviconUrl}}/>}
                <View style={styles.textContainer}>
                    <Text style={styles.description}>{enhanceStr(description)}</Text>
                </View>
                <Button onPress={this._onPress} title={"Read entire topic"}/>
            </ScrollView>
        )
    }
}