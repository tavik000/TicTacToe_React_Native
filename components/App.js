/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity
} from 'react-native';

import Header from './Header'
import GameBoard from './GameBoard'

export default class App extends Component {
    constructor(props){
        super(props);
        this.state={
            gameStarted: false
        }
    }

    startGame(){
        this.setState({ gameStarted: true })
    }


    render() {
        const { gameStarted } = this.state;
        return (
            <View style={styles.container}>
                <Header/>
                {
                    gameStarted ? (
                        <GameBoard/>
                    ) : (
                     <View>
                         <Text style={styles.welcome}>
                             Welcome to the game!
                         </Text>
                         <TouchableOpacity onPress={() => this.startGame()}>
                             <Text style={styles.instructions}>
                                 Click here to start
                             </Text>
                         </TouchableOpacity>
                     </View>
                    )
                }
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        flex: 1,
        backgroundColor: '#F5FCFF',
    },
    welcome: {
        fontSize: 20,
        marginTop: 150,
    },
    instructions: {
        marginTop: 20,
        marginLeft: 30,
        color: 'grey',
        marginBottom: 5,
    },
});
