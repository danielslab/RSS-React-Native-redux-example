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
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    cellContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    text: {
        fontSize: 16,
    }
});
export default class TagsMaskManager extends Component {
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
        }
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            dataSource: this.state.dataSource.cloneWithRows(nextProps.tagsMask),
        });
    }


    _renderCell = (data) => {
        return (
            <View style={styles.cellContainer}>
                <Text style={styles.text}>{data.name}</Text>
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
                style={{flex: 1}}
                dataSource={this.state.dataSource}
                renderRow={(rowData) => this._renderCell(rowData)}
                />
        );
    }
}