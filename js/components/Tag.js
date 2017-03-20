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
import {MAIN_COLOR} from '../constants';
const styles = StyleSheet.create({
    tag: {
        flexDirection: 'row',
        alignSelf: 'flex-start',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 14,
        overflow: 'hidden',
        backgroundColor: MAIN_COLOR,
        padding: 2,
        paddingLeft: 4,
        paddingRight: 4,
        margin: 2
    },
    tagText: {
        color: 'white',
        overflow: 'hidden',
        fontSize: 14,
    },
    removeText: {
        color: 'white',
        fontSize: 19,
    },
    removeTextContainer: {
        width: 15,
        height: 15,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 7.5,
        backgroundColor: 'black',
        opacity: 0.87,
        marginLeft: 2,
    },

});
export default class Tags extends Component {
    static propTypes = {
        tag: PropTypes.object,
        selectTag: PropTypes.func,
        deleteTag: PropTypes.func,
        onPress: PropTypes.func,
        showCheckBox: PropTypes.bool,
        showDelete: PropTypes.bool,
    };

    static defaultProps = {
        onPress: () => {},
    };

    _renderTag = () => {
        const {tag, selectTag, deleteTag, showCheckBox, showDelete, id} = this.props;
        return (
            <View style={styles.tag}>
                {showCheckBox &&
                <CheckBox
                    label={tag.name}
                    checked={tag.isChecked}
                    onChange={(checked) => selectTag(tag.id, checked)}
                />}
                <Text style={styles.tagText}>{tag.name}</Text>
                {showDelete &&
                <TouchableOpacity style={{marginLeft: 2}} onPress={() => deleteTag(tag.id)}>
                    <Text style={styles.removeText}>×</Text>
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
                <TouchableOpacity onPress={this.props.onPress}>
                    {this._renderTag()}
                </TouchableOpacity>
            );
        }
    };
}