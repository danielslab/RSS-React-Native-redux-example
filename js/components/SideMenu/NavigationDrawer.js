/**
 * Created by denissamohvalov on 16.03.17.
 */
import Drawer from 'react-native-drawer'
import React, {Component, PropTypes} from 'react';
import {
    StyleSheet,
    Platform,
    View,
    Text,
    TouchableOpacity
} from 'react-native';


const drawerStyles = {
    drawer: {
        shadowColor: '#000000',
        shadowOpacity: 0.8,
        shadowRadius: 3
    },
    main: {
        paddingLeft: 3
    },
};

export default class SideMenu extends Component {
    constructor(props) {
        super(props);
        if (Platform.OS === 'ios') {
            this.type = "static";
        } else {
            this.type = "overlay";
        }
    }


    render() {
        console.log(this.type);
        return (
            <Drawer
                ref={(ref) => this._drawer = ref}
                type={this.type}
                content={<View style={{backgroundColor: 'white', flex: 1}}><Text>Here we are</Text></View>}
                tapToClose={true}
                openDrawerOffset={0.2} // 20% gap on the right side of drawer
                panCloseMask={0.2}
                closedDrawerOffset={-3}
                styles={{main: {shadowColor: '#ffffff', shadowOpacity: 0.3, shadowRadius: 15}}}
                tweenHandler={(ratio) => ({ main: { opacity:(2-ratio)/2 }})}>
                <View style={{backgroundColor: 'red'}}>
                    <Text>"here wew are"</Text>
                    <TouchableOpacity onPress={() => this._drawer.open()}><Text>Hey</Text></TouchableOpacity>
                </View>
            </Drawer>

        );
    }
}