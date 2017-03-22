/**
 * Created by denissamohvalov on 21.03.17.
 */
import React, {Component, PropTypes} from 'react';
import {
    View,
    TextInput,
    Button,
    StyleSheet,
    Alert,
    Text,
    Platform,
} from 'react-native';
import {MAIN_COLOR} from '../constants';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    button: {
        alignSelf: 'center',
        marginTop: 40
    },
    textInput: {
        height: 40,
        marginLeft: 20,
        marginRight: 20,
        borderBottomColor: MAIN_COLOR,
        borderBottomWidth: 1
    }
});

export default class AddChannel extends Component {
    static propTypes = {
        addChannel: PropTypes.func,
        editChannel: PropTypes.func,
        type: PropTypes.string,
        url: PropTypes.string,
        id: PropTypes.string,
        name: PropTypes.string,
        isChannelValid: PropTypes.string,
        error: PropTypes.string,
        navigator: PropTypes.object,
        resetForm: PropTypes.func,
    };

    constructor(props) {
        super(props);
        if (props.type === 'add') {
            this.state = {
                url: '',
                name: '',
            }
        } else if (props.type === 'edit') {
            this.state = {
                url: props.url,
                name: props.name,
                oldUrl: props.url,
            }
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.isChannelValid === 'valid') {
            this.props.navigator.pop();
            setTimeout(this.props.resetForm, 1000);
        }
        if (nextProps.isChannelValid === 'invalid') {
            Alert.alert('Error', nextProps.error);
        }
    }

    _onSave = () => {
        const {type, id, addChannel, editChannel} = this.props;
        if (type === 'add') {
            addChannel(this.state.url, this.state.name)
        } else if (type === 'edit') {
            editChannel(id, this.state.url, this.state.name, this.state.oldUrl);
        }
    };

    render() {
        return (
            <View style={styles.container}>
                <TextInput
                    style={styles.textInput}
                    onChangeText={(name) => this.setState({name})}
                    value={this.state.name}
                    placeholder="Name:"
                    underlineColorAndroid={'transparent'}
                />
                <TextInput
                    style={styles.textInput}
                    onChangeText={(url) => this.setState({url})}
                    value={this.state.url}
                    placeholder="URL:"
                    underlineColorAndroid={'transparent'}
                />
                {this.state.url !== '' &&
                <View style={styles.button}>
                    <Button title="Save" onPress={this._onSave}/>
                </View>
                }
            </View>
        );
    }
}