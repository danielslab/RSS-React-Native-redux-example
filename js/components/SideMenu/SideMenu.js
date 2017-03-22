/**
 * Created by denissamohvalov on 16.03.17.
 */
import Drawer from 'react-native-drawer'
import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {
    StyleSheet,
    Platform,
    View,
    Text,
    TouchableOpacity
} from 'react-native';
import ContentPanel from './ContentPanel';
import * as actions from '../../actions/sideMenuActions';
import Main from '../Main';

const drawerStyles = {
    main: {
        shadowColor: '#ffffff',
        shadowOpacity: 0.3,
        shadowRadius: 15
    },
};

class SideMenu extends Component {
    constructor(props) {
        super(props);
    }


    render() {
        const {sideMenuActions, sideMenuState} = this.props;
        return (
            <Drawer
                ref={(ref) => this._drawer = ref}
                type="overlay"
                content={<ContentPanel
                            {...sideMenuActions}
                            {...sideMenuState}
                             closeDrawer={() => this._drawer.close()} /> }
                tapToClose={true}
                openDrawerOffset={0.2}
                panCloseMask={0.2}
                closedDrawerOffset={-3}
                styles={drawerStyles}
                tweenHandler={(ratio) => ({ main: { opacity:(2-ratio)/2 }})}>
                <Main
                    openDrawer={() => {
                        this._drawer.open();
                        this.props.sideMenuActions.getFeedsStat();
                    }}
                    {...sideMenuState}/>
            </Drawer>
        );
    }
}

export default connect(
    state => {
        return {
            sideMenuState: state.sideMenuState,
        }
    },
    (dispatch) => ({
        sideMenuActions: bindActionCreators({...actions}, dispatch),
    }),
)(SideMenu);