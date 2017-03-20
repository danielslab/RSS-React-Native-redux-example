/**
 * Created by denissamohvalov on 17.03.17.
 */
import React, {Component, PropTypes} from 'react';
import {
    ListView
} from 'react-native';
import ChannelCell from './ChannelCell';
export default class ManageChannels extends Component {
    static propTypes = {
        channels: PropTypes.object,
        editChannel: PropTypes.func,
        deleteChannel: PropTypes.func,
        getChannelTagsMask: PropTypes.func,
        onPressChannel: PropTypes.func,
        getChannels: PropTypes.func,
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

    render() {
        const {editChannel, deleteChannel, editChannelTags, onPressChannel} = this.props;
        return (
            <ListView
                style={{flex: 1}}
                dataSource={this.state.dataSource}
                renderRow={(rowData) =>
                            <ChannelCell
                                editChannel={editChannel}
                                deleteChannel={deleteChannel}
                                getChannelTagsMask={getChannelTagsMask}
                                onPressChannel={onPressChannel}
                                {...rowData}/> }
            />
        )
    }
}