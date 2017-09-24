import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity
} from 'react-native';

import GameBoard from './GameBoard'

export default class GameOption extends Component {

    constructor(props) {
        super(props);
        this.state = {
            gameStarted: false,
            gameMode: 0 // 0: single player; 1: multiplayer
        }
    }

    startGame(e) {
        const mode = e;
        this.setState({
            gameMode: mode
        });
        setTimeout(() => {
            this.setState({
                gameStarted: true
            })
        }, 2)
    }

    render() {
        const {gameStarted, gameMode} = this.state;
        return (
            <View>
                {
                    gameStarted ? (
                        <GameBoard gameMode={gameMode}/>
                    ) : (
                        <View style={styles.container}>
                            <View style={styles.boxContainer}>
                            </View>
                            <View style={styles.boxContainer}>
                                <TouchableOpacity style={styles.btn} onPress={(e) => this.startGame(0)}>
                                    <Text style={styles.btnText}>
                                        Single Player
                                    </Text>
                                </TouchableOpacity>
                            </View>
                            <View style={styles.boxContainer}>
                                <TouchableOpacity style={styles.btn} onPress={(e) => this.startGame(1)}>
                                    <Text style={styles.btnText}>
                                        Multiplayer
                                    </Text>
                                </TouchableOpacity>
                            </View>
                            <View style={styles.boxContainer}>
                            </View>
                            <View style={styles.boxContainer}>
                            </View>
                        </View>
                    )
                }
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#F5FCFF'
    },
    btn: {
        width: 250,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        backgroundColor: 'skyblue',
        borderRadius: 10

    },

    btnText: {
        fontSize: 18
    },

    boxContainer: {
        flex: 1, // 1:2
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    }
});
