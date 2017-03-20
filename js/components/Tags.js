/**
 * Created by denissamohvalov on 17.03.17.
 */
import React, {Component, PropTypes} from 'react';
import Prompt from 'react-native-prompt';
import {
    StyleSheet,
    View,
    ScrollView,
    Text,
    Button,
    TextInput,
    TouchableOpacity
} from 'react-native';
import Tag from './Tag';
import ActionButton from 'react-native-action-button';
import {MAIN_COLOR} from '../constants';

const styles = StyleSheet.create({
    outerContainer: {
        flex: 1,
    },
    container: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        flexWrap: 'wrap',
        paddingLeft: 3,
        paddingRight: 3,
    },
    scrollContainer: {
        justifyContent: 'space-between',
    },
    modalContainer: {
        borderRadius: 5,
        flexGrow: 1,
        height: 65,
        alignSelf: 'stretch',
        justifyContent: 'center',
        alignItems: 'flex-start',
        overflow: 'hidden',
    }
});
export default class Tags extends Component {
    static propTypes = {
        tags: PropTypes.array,
        getTags: PropTypes.func,
        deleteTag: PropTypes.func,
        addTag: PropTypes.func,
        onPressTag: PropTypes.func,
        selectTag: PropTypes.func,
        commitTags: PropTypes.func,
    };

    constructor(props) {
        super(props);
        this.state = {
            promptVisible: false,
        }
    }

    componentDidMount() {
        this.props.getTags();
    }

    render() {
        const {deleteTag, onPressTag, selectTag, tags} = this.props;
        return (
            <View style={styles.outerContainer}>
                <ScrollView style={{flex: 1}}>
                    <View style={styles.container}>
                        {tags.map((tag, key) => {
                            return (
                                <Tag
                                    key={key}
                                    tag={tag}
                                    selectTag={selectTag}
                                    deleteTag={deleteTag}
                                    onPressTag={onPressTag}
                                    showCheckBox={this.props.showCheckboxes}
                                    showDelete={!this.props.showCheckboxes}
                                />
                            );
                        })}
                    </View>
                </ScrollView>
                <ActionButton buttonColor={MAIN_COLOR} onPress={() => this.setState({promptVisible: true})}/>
                <Prompt
                    title="Type the tag name"
                    placeholder="Tag name"
                    visible={this.state.promptVisible}
                    onCancel={() => this.setState({
                                  promptVisible: false,
                                })}
                    onSubmit={(value) => {
                        this.props.addTag(value);
                        this.props.commitTags();
                        this.setState({
                                  promptVisible: false,
                                });
                        }
                    }/>
            </View>
        );
    }
}