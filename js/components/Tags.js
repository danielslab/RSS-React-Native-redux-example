/**
 * Created by denissamohvalov on 17.03.17.
 */
import React, {Component, PropTypes} from 'react';
import {
    StyleSheet,
    View,
    ScrollView,
    Text
} from 'react-native';
import Tag from './Tag';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        flexWrap: 'wrap',
        paddingLeft: 3,
        paddingRight: 3,
    }
});
export default class Tags extends Component {
    static propTypes = {
        tags: PropTypes.array,
        getTags: PropTypes.func,
        showCheckboxes: PropTypes.bool,
        tagsSelectedMask: PropTypes.array,
        feedId: PropTypes.string,
        addTag: PropTypes.func,
        saveTags: PropTypes.func,
    };

    constructor(props) {
        super(props);
        this.state = {
            tags: [],
        };
    }

    componentDidMount() {
        this.props.getTags();
        this._initState(this.props);
    }

    componentWillReceiveProps(nextProps) {
        this._initState(nextProps);
    }

    _initState = (props) => {
        const {tags, tagsSelectedMask} = props;
        let stateTags = [];
        for (let i = 0; i < tags.length; ++i) {
            let tag = {
                name: tags[i],
                id: i,
                isChecked: tagsSelectedMask && tagsSelectedMask[i],
            };
            stateTags.push(tag);
        }
        this.setState({
            tags: stateTags,
        })
    };

    _deleteTag = (tagId) => {
        let newTags = this.state.tags.slice();
        for (let i = 0; i < newTags.length; ++i) {
            if (newTags[i].id == tagId) {
                newTags.splice(i, 1);
                break;
            }
        }
        this.setState({
            tags: newTags
        });
    };

    _selectTag = (tagId, checked) => {
        let newTags = this.state.tags.slice();
        for (let i = 0; i < newTags.length; ++i) {
            if (newTags[i].id == tagId) {
                newTags[i].isChecked = checked;
            }
        }
        this.setState({
            tags: newTags
        });
    };


    render() {
        return (
            <ScrollView style={{flex: 1}}>
                <View style={styles.container}>
                    {this.state.tags.map((tag, id) => {
                        return (
                         //   {/*<View style={{flex: 1}}>*/}
                            <Tag
                                tag={tag}
                                selectTag={this._selectTag}
                                deleteTag={this._deleteTag}
                                showCheckBox={this.props.showCheckboxes}
                                showDelete={!this.props.showCheckboxes}
                            />
                          //  {/*</View>*/}
                        );
                    })}
                </View>
            </ScrollView>
        );
    }
}