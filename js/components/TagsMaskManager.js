/**
 * Created by denissamohvalov on 21.03.17.
 */
import React, {Component, PropTypes} from 'react';
import {
    ListView,
    Switch,
    StyleSheet,
    View,
    Text
} from 'react-native';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as tagsMaskManagerActions from '../actions/tagsMaskManagerActions';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    cellContainer: {
        flex: 1,
        backgroundColor: 'white',
        alignSelf: 'stretch',
        borderBottomWidth: 1,
        borderBottomColor: '#E0E0E0',
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 8,
    },
    text: {
        fontSize: 16,
    }
});
class TagsMaskManager extends Component {
    static propTypes = {
        channelId: PropTypes.string,
        tagsMask: PropTypes.array,
        selectTag: PropTypes.func,
        getTagsMask: PropTypes.func,
    };

    constructor(props) {
        super(props);
        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            dataSource: ds.cloneWithRows(this.props.tagsMask),
        };
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            dataSource: this.state.dataSource.cloneWithRows(nextProps.tagsMask),
        });
    }

    componentDidMount() {
         this.props.getTagsMask(this.props.channelId);
    }

    _renderCell = (data) => {
        return (
            <View style={styles.cellContainer}>
                <Text style={styles.text} numberOfLines={1}>{data.name}</Text>
                <Switch
                    value={data.isChecked}
                    onValueChange={(value) => this.props.selectTag(this.props.channelId, data.name, value)}
                />
            </View>
        );
    };

    render() {
        return(
            <ListView
                style={styles.container}
                dataSource={this.state.dataSource}
                renderRow={(rowData) => this._renderCell(rowData)}
                />
        );
    }
}

export default connect(
    state => {
        return {
            ...state.tagsMaskManagerState,
        }
    },
    dispatch => ({
        ...bindActionCreators({...tagsMaskManagerActions}, dispatch)
    })
)(TagsMaskManager);