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
    StyleSheet,
    RefreshControl,
    ActivityIndicator,
    Text
} from 'react-native';
import FeedCell from './FeedCell';
import {MAIN_COLOR} from '../constants';

const styles = StyleSheet.create({
    underline: {
        backgroundColor: 'white',
        height: 2,
    },
    loader: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
    },
    segmentedControl: {
        marginTop: 10,
        marginLeft: 20,
        marginRight: 20,
    }
});

export default class All extends Component {
    static propTypes = {
        allFeeds: PropTypes.array,
        bookmarkedFeed: PropTypes.array,
        tag: PropTypes.string,
        channelId: PropTypes.string,
        isRefreshing: PropTypes.bool,
        refresh: PropTypes.func,
        onTapStar: PropTypes.func,
        onFeedPress: PropTypes.func,
    };

    constructor(props) {
        super(props);
        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            dataSourceAllFeeds: ds.cloneWithRows(this.props.allFeeds),
            dataSourceBookmarkedFeeds: ds.cloneWithRows(this.props.bookmarkedFeeds),
        };
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            dataSourceAllFeeds: this.state.dataSourceAllFeeds.cloneWithRows(nextProps.allFeeds),
            dataSourceBookmarkedFeeds: this.state.dataSourceBookmarkedFeeds.cloneWithRows(nextProps.bookmarkedFeeds),
        });
    }

    _isData = () => {
        return !(this.props.allFeeds.length === 0);
    }
    componentDidMount() {
        const {refresh} = this.props;
        if (!this._isData()) {
            refresh(this.props.tag, this.props.channelId);
        }
    }


    _getListView = dataSource => {
        return (
            dataSource ?
                (<ListView style={{flex: 1}}
                           dataSource={dataSource}
                           renderRow={(rowData) => <FeedCell
                                                        {...rowData}
                                                        onPress={this.props.onFeedPress}
                                                        onTapStar={this.props.onTapStar}/>}
                      refreshControl={
                          <RefreshControl
                                refreshing={this.props.isRefreshing}
                                onRefresh={() => this.props.refresh(this.props.tag, this.props.channelId)}/>}
                />)
                : (<ActivityIndicator
                                animating={isRefreshing}
                                size="large"/>
                    )
        );
    };

    _getTabLayout = (allListView, bookmarkedListView) => {
        const {selectFeedTab} = this.props;
        const {selectedFeedTabIndex} = this.props;
        if (Platform.OS === 'ios') {
            return (
                <View style={{flex: 1}}>
                    <View style={styles.segmentedControl}>
                        <SegmentedControlIOS
                            tintColor={MAIN_COLOR}
                            values={['Feeds', 'Favorites']}
                            selectedIndex={selectedFeedTabIndex}
                            onChange={(event) => { selectFeedTab(event.nativeEvent.selectedSegmentIndex)}}
                        />
                    </View>
                    {selectedFeedTabIndex === 0 ? allListView : bookmarkedListView}
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


