/**
 * Created by denissamohvalov on 17.03.17.
 */
import React, {Component, PropTypes} from 'react';
import {
    ListView,
    View
} from 'react-native';
import ChannelCell from './ChannelCell';
import {MAIN_COLOR} from '../constants';
import ActionButton from 'react-native-action-button';

export default class ManageChannels extends Component {
    static propTypes = {
        channels: PropTypes.object,
        deleteChannel: PropTypes.func,
        onPressChannel: PropTypes.func,
        getChannels: PropTypes.func,
        showAddChannelDialog: PropTypes.func,
        showEditChannelDialog: PropTypes.func,
        showEditTagsDialog: PropTypes.func,
    };

    constructor(props) {
        super(props);
        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            dataSource: ds.cloneWithRows(this.props.channels),
        }
    }

    componentDidMount() {
        this.props.getChannels();
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            dataSource: this.state.dataSource.cloneWithRows(nextProps.channels),
        });
    }

    _showAdd = () => {
        this.props.showAddChannelDialog()
        this.props.navigator.push({title: 'Add Channel'});
    };

    _showEdit = (id) => {
        this.props.showEditChannelDialog(id);
        this.props.navigator.push({title: 'Edit Channel'});
    };

    _showTags = (id) => {
        this.props.showEditTagsDialog(id)
        this.props.navigator.push({title: 'Edit Tags'});
    };

    render() {
        const {deleteChannel, onPressChannel} = this.props;
        return (
            <View style={{flex: 1}}>
                <ListView
                    style={{flex: 1}}
                    dataSource={this.state.dataSource}
                    renderRow={(rowData) =>
                                <ChannelCell
                                    editChannel={this._showEdit}
                                    deleteChannel={deleteChannel}
                                    getChannelTagsMask={this._showTags}
                                    onPressChannel={onPressChannel}
                                    {...rowData}/> }
                />
                <ActionButton buttonColor={MAIN_COLOR} onPress={this._showAdd}/>
            </View>
        )
    }
}