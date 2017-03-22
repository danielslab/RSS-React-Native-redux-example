/**
 * Created by denissamohvalov on 20.03.17.
 */
import React, {Component, PropTypes} from 'react';
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
} from 'react-native';
import {icons} from '../constants';
import Icon from 'react-native-vector-icons/Ionicons';

const styles = StyleSheet.create({
    tag: {
        flexDirection: 'row',
        alignSelf: 'flex-start',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 14,
        overflow: 'hidden',
        backgroundColor: '#EEEEEE',
        padding: 4,
        paddingLeft: 12,
        margin: 2,
        height: 32,
        elevation: 2,
    },
    tagText: {
        color: 'black',
        opacity: 0.87,
        fontFamily: icons.serif,
        fontSize: 13,
        marginRight: 4,
    },

});
export default class Tag extends Component {
    static propTypes = {
        tag: PropTypes.string,
        deleteTag: PropTypes.func,
        onPressTag: PropTypes.func,
    };

    render() {
        const {tag,  deleteTag, onPressTag} = this.props;
        return (
            <TouchableOpacity onPress={this.props.onPressTag}>
                <View style={styles.tag}>
                    <Text style={styles.tagText}>{tag}</Text>
                    <TouchableOpacity onPress={() => deleteTag(tag)}>
                        <Icon size={24} name={icons.close}/>
                    </TouchableOpacity>
                </View>
            </TouchableOpacity>
        );
    };
}