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
        fontFamily: 'sans-serif',
        fontSize: 13,
        marginRight: 4,
    },

});
export default class Tags extends Component {
    static propTypes = {
        tag: PropTypes.string,
        selectTag: PropTypes.func,
        deleteTag: PropTypes.func,
        onPressTag: PropTypes.func,
        isChecked: PropTypes.bool,
        showCheckBox: PropTypes.bool,
        showDelete: PropTypes.bool,
    };

    _renderTag = () => {
        const {tag, selectTag, deleteTag, showCheckBox, showDelete, id} = this.props;
        return (
            <View style={styles.tag}>
                {showCheckBox &&
                <CheckBox
                    label={tag}
                    checked={isChecked}
                    onChange={(checked) => selectTag(tag, checked)}
                />}
                <Text style={styles.tagText}>{tag}</Text>
                {showDelete &&
                <TouchableOpacity onPress={() => deleteTag(tag)}>
                    <Icon size={24} name={icons.close}/>
                </TouchableOpacity>}
            </View>
        );
    };

    render() {
        if (this.props.showCheckBox) {
            return this._renderTag();
        }
        if (this.props.showDelete) {
            return (
                <TouchableOpacity onPress={this.props.onPressTag}>
                    {this._renderTag()}
                </TouchableOpacity>
            );
        }
    };
}