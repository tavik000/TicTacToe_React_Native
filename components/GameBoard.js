import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableWithoutFeedback,
    TouchableOpacity
} from 'react-native';


import App from './App'
import Circle from './Circle'
import Cross from './Cross'
import {centerPoints, areas, conditions} from "../constants/game";

let round = 0; //for multiplayer used round = 0 is player1 round; round = 2 is player2 round

export default class GameBoard extends Component {

    constructor() {
        super();
        this.state = {
            gameEnd: false,
            userInputs: [],
            AIInputs: [], // if gameMode = 1 (multiplayer) then AIInputs set to be Player2 Inputs
            result: -1  // result: -1=Game in progress; 0=player win; 1=AI win; 2=Draw
            // result: 3=multiplayer circle Win; 4=multiplayer cross win
        }
    }

    endGame() {
        this.setState({
            gameEnd: true
        });
    }

    restart() {
        const {gameMode} = this.props;
        this.setState({
            userInputs: [],
            AIInputs: [],
            result: -1
        });
        if (gameMode === 1) {
            round = 0
        }
    }

    clickSound() {
        // Import the react-native-sound module
        var Sound = require('react-native-sound');

// Enable playback in silence mode (iOS only)
        Sound.setCategory('Playback');

// Load the sound file 'click.mp3' from the app bundle
// See notes below about preloading sounds within initialization code below.
        var click = new Sound('click.mp3', Sound.MAIN_BUNDLE, (error) => {
            if (error) {
                console.log('failed to load the sound', error);
                return;
            } else {
                click.play((success) => {
                    if (success) {
                        // console.log('successfully finished playing');
                    } else {
                        console.log('playback failed due to audio decoding errors');
                        // reset the player to its uninitialized state (android only)
                        // this is the only option to recover after an error occured and use the player again
                        click.reset();
                    }
                });
            }
            // loaded successfully
            // console.log('duration in seconds: ' + whoosh.getDuration() + 'number of channels: ' + whoosh.getNumberOfChannels());
        });

// Set sound volume
        click.setVolume(1);

// Position the sound to the full right in a stereo field
//         click.setPan(1);

// Loop indefinitely until stop() is called
        click.setNumberOfLoops(-1);

// Release the audio player resource
        click.release();
    }

    boarcClickHandler(e) {
        const {locationX, locationY} = e.nativeEvent;
        const {userInputs, AIInputs, result} = this.state;
        const inputs = userInputs.concat(AIInputs);
        const {gameMode} = this.props;


        const area = areas.find(d =>
            (locationX >= d.startX && locationX <= d.endX) &&
            (locationY >= d.startY && locationY <= d.endY)
        );

        if (area &&
            inputs.every(d => d !== area.id) &&
            result === -1
        ) {
            if (gameMode === 0) {
                this.setState({userInputs: userInputs.concat(area.id)});
                this.clickSound();
                setTimeout(() => {
                    this.componentDidUpdate();
                    setTimeout(() => {
                        this.AIAction();
                    }, 3)
                }, 2)
            } else if (gameMode === 1) {
                this.clickSound();
                if (round === 0) {
                    this.setState({userInputs: userInputs.concat(area.id)});
                    round = 1
                } else if (round === 1) {
                    this.setState({AIInputs: AIInputs.concat(area.id)});
                    round = 0
                }

            }
        }
    }

    AIAction() {
        const {result} = this.state;
        while (result === -1) {
            const {userInputs, AIInputs} = this.state;
            const randomNumber = Number.parseInt(Math.random() * 9);

            if (userInputs.concat(AIInputs).every(d => d !== randomNumber)) {
                this.setState({AIInputs: AIInputs.concat(randomNumber)});
                break
            }
        }
    }


    judgeWinner(inputs) {
        return conditions.some(d => d.every(item => inputs.indexOf(item) !== -1))
    }

    componentDidUpdate() {
        const {userInputs, AIInputs, result} = this.state;
        const inputs = userInputs.concat(AIInputs);
        const {gameMode} = this.props;

        if (gameMode === 0) {
            if (inputs.length >= 5) {
                let res = this.judgeWinner(userInputs);
                if (res && result !== 0) {
                    this.setState({result: 0});
                    return
                }
                res = this.judgeWinner(AIInputs);
                if (res && result !== 1) {
                    this.setState({result: 1});
                    return
                }
            }
        } else if (gameMode === 1)
            if (inputs.length >= 5) {
                let res = this.judgeWinner(userInputs);
                if (res && result !== 3) {
                    this.setState({result: 3});
                    return
                }
                res = this.judgeWinner(AIInputs);
                if (res && result !== 4) {
                    this.setState({result: 4});
                    return
                }
            }


        if (inputs.length >= 9 && result === -1) {
            this.setState({result: 2});
        }
    }

    render() {
        const {gameEnd, userInputs, AIInputs, result} = this.state;
        const {gameMode} = this.props;
        return (
            <View>
                {
                    gameEnd ? (
                        <App gameEnd={true}/>
                    ) : (

                        <View style={styles.container}>
                            <View style={[styles.JudgeMessage, styles.roundIndicator]}>
                                {gameMode === 1 && <View>
                                    {
                                        round === 0 && <Text style={styles.Text}>Circle Turn</Text>
                                    }
                                    {
                                        round === 1 && <Text style={styles.Text}>Cross Turn</Text>
                                    }</View>
                                }
                            </View>
                            <TouchableWithoutFeedback onPress={e => this.boarcClickHandler(e)}>
                                <View style={styles.board}>
                                    <View style={[styles.line, {
                                        width: 3,
                                        height: 306,
                                        transform: [
                                            {translateX: 100}
                                        ]
                                    }]}/>
                                    <View style={[styles.line, {
                                        width: 3,
                                        height: 306,
                                        transform: [
                                            {translateX: 203}
                                        ]
                                    }]}/>
                                    <View style={[styles.line, {
                                        width: 306,
                                        height: 3,
                                        transform: [
                                            {translateY: 100}
                                        ]
                                    }]}/>
                                    <View style={[styles.line, {
                                        width: 306,
                                        height: 3,
                                        transform: [
                                            {translateY: 203}
                                        ]
                                    }]}/>
                                </View>
                            </TouchableWithoutFeedback>
                            {
                                userInputs.map((d, i) => (
                                    <Circle
                                        key={i}
                                        xTranslate={centerPoints[d].x}
                                        yTranslate={centerPoints[d].y}
                                        color='deepskyblue'
                                    />
                                ))
                            }
                            {
                                AIInputs.map((d, i) => (
                                    <Cross
                                        key={i}
                                        xTranslate={centerPoints[d].x}
                                        yTranslate={centerPoints[d].y}
                                        color='red'
                                    />
                                ))
                            }
                            <View style={styles.JudgeMessage}>
                                {
                                    result === 2 && <Text style={styles.Text}>Draw</Text>
                                }
                                {
                                    result === 0 && <Text style={styles.Text}>You Win</Text>
                                }
                                {
                                    result === 1 && <Text style={styles.Text}>You Lose</Text>
                                }
                                {
                                    result === 3 && <Text style={styles.Text}>Circle Win</Text>
                                }
                                {
                                    result === 4 && <Text style={styles.Text}>Cross Win</Text>
                                }
                                {
                                    result !== -1 &&
                                    <View>
                                        <TouchableOpacity onPress={() => this.restart()}>
                                            <View style={styles.menuButton}>
                                            <Text>
                                                Click here to restart
                                            </Text>
                                            </View>
                                        </TouchableOpacity>
                                        <TouchableOpacity onPress={() => this.endGame()}>
                                            <View style={styles.menuButton}>
                                            <Text>
                                                Back to Menu
                                            </Text>
                                            </View>
                                        </TouchableOpacity>
                                    </View>
                                }
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
        marginTop: 120
    },
    roundIndicator: {
        position: 'absolute',
        transform: [
            {translateX: 60},
            {translateY: -60},
        ]
    },
    board: {
        width: 312,
        height: 312,
        borderWidth: 3,
        borderColor: '#000'
    },
    line: {
        position: 'absolute',
        backgroundColor: '#000'
    },
    JudgeMessage: {
        alignItems: 'center',
        justifyContent: 'center'
    },
    Text: {
        fontSize: 40
    },
    menuButton: {
        height: 30,
        alignItems: 'center'
    }
});
