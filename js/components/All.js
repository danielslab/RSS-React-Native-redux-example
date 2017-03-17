/**
 * Created by denissamohvalov on 17.03.17.
 */
import React, {Component, PropTypes} from 'react';
import ScrollableTabView, {DefaultTabBar, ScrollableTabBar} from 'react-native-scrollable-tab-view';
import {
    ListView,
    SegmentedControlIOS,
    Platform,
    ScrollView,
    View,
    StyleSheet
} from 'react-native';
import FeedCell from './FeedCell';
import {MAIN_COLOR} from '../constants';

const styles = StyleSheet.create({
    underline: {
        backgroundColor: 'white',
        height: 2,
    },
});

export default class All extends Component {
    static propTypes = {
        allState: PropTypes.object,
        allActions: PropTypes.object,
    };

    constructor(props) {
        super(props);
        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            dataSourceAllFeeds: ds.cloneWithRows(this.props.allState.allFeeds),
            dataSourceBookmarkedFeeds: ds.cloneWithRows(this.props.allState.bookmarkedFeeds),
        };
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            dataSourceAllFeeds: this.state.dataSourceAllFeeds.cloneWithRows(nextProps.allState.allFeeds),
            dataSourceBookmarkedFeeds: this.state.dataSourceBookmarkedFeeds.cloneWithRows(nextProps.allState.bookmarkedFeeds),
        });
    }

    _getListView = dataSource => {
        return (
            <ListView style={{flex: 1}}
                      dataSource={dataSource}
                      renderRow={(rowData) => <FeedCell {...rowData} {...this.props.allActions}/>}
            />
        );
    };

    _getTabLayout = (allListView, bookmarkedListView) => {
        const {selectFeedTab} = this.props.allActions;
        const {selectedFeedTabIndex} = this.props.allState;
        if (Platform.OS === 'ios') {
            return (
                <View style={{flex: 1}}>
                    <View style={{margin: 20}}>
                        <SegmentedControlIOS
                            tintColor={MAIN_COLOR}
                            values={['Feeds', 'Favorites']}
                            selectedIndex={selectedFeedTabIndex}
                            onChange={(event) => { selectFeedTab(event.nativeEvent.selectedSegmentIndex)}}
                        />
                    </View>
                    {selectedFeedTabIndex === 0 && allListView}
                    {selectedFeedTabIndex === 1 && bookmarkedListView}
                </View>
            );
        } else {
            return (
                <ScrollableTabView
                    prerenderingSiblingsNumber={1}
                    tabBarBackgroundColor={MAIN_COLOR}
                    tabBarActiveTextColor="white"
                    tabBarInactiveTextColor="rgba(255, 255, 255, 0.7)"
                    onChangeTab={(obj) => selectFeedTab(obj.i)}
                    tabBarTextStyle={{fontFamily: 'Roboto', fontSize: 14}}
                    renderTabBar={() => <DefaultTabBar style={{height: 48}}/>}
                    tabBarUnderlineStyle={styles.underline}
                >
                    <View tabLabel="Feeds" style={{flex: 1}}>
                        {allListView}
                    </View>
                    <View tabLabel="Favorites" style={{flex: 1}}>
                        {bookmarkedListView}
                    </View>
                </ScrollableTabView>
            )
        }
    };

    render() {
        let allListView = this._getListView(this.state.dataSourceAllFeeds);
        let bookmarkedListView = this._getListView(this.state.dataSourceBookmarkedFeeds);
        return this._getTabLayout(allListView, bookmarkedListView);
    }
}

