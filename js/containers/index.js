import React, {Component} from 'react';
import {StyleSheet, Platform} from 'react-native';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';


class Mgimo extends Component {
    render() {
        return <View/>;
    }
}

export default connect((state) => {
        return state
    },
    (dispatch) => ({
        settingsActions: bindActionCreators(settingsActions, dispatch),
        tabBarActions: bindActionCreators(tabBarActions, dispatch),
        sdkActions: bindActionCreators(sdkActions, dispatch),
    })
)(Mgimo);
