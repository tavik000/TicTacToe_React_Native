import React, { Component } from 'react';
import {
    AppRegistry,
} from 'react-native';
import App from "./components/App";

export default class TicTacToe_Key extends Component {
    render() {
        return (
            <App />
        );
    }
}


AppRegistry.registerComponent('TicTacToe_Key', () => TicTacToe_Key);
