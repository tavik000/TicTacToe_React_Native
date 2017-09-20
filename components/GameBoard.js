import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableWithoutFeedback,
    TouchableOpacity
} from 'react-native';

import Circle from './Circle'
import Cross from './Cross'
import {centerPoints, areas, conditions} from "../constants/game";


export default class GameBoard extends Component {
    constructor() {
        super();
        this.state = {
            userInputs: [],
            AIInputs: [],
            result: -1  // result: -1=Game in progress; 0=player win; 1=AI win; 2=Draw
        }
    }

    restart() {
        this.setState({
            userInputs: [],
            AIInputs: [],
            result: -1
        })
    }

    boarcClickHandler(e) {
        const {locationX, locationY} = e.nativeEvent;
        const {userInputs, AIInputs, result} = this.state;
        const inputs = userInputs.concat(AIInputs);

        const area = areas.find(d =>
            (locationX >= d.startX && locationX <= d.endX) &&
            (locationY >= d.startY && locationY <= d.endY)
        );

        if (area &&
            inputs.every(d => d !== area.id) &&
            result === -1
        ) {
            this.setState({userInputs: userInputs.concat(area.id)})
            setTimeout(() => {
                this.componentDidUpdate();
                setTimeout(() => {
                        this.AIAction();
                    }, 3)
            }, 2)
        }
    }

    AIAction() {
        const {result} = this.state
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

        if (inputs.length >= 9 && result === -1) {
            this.setState({result: 2});
        }
    }

    render() {
        const {userInputs, AIInputs, result} = this.state;
        return (
            <View style={styles.container}>
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
                        result !== -1 &&
                        <TouchableOpacity onPress={() => this.restart()}>
                            <Text style={styles.instructions}>
                                Click here to restart
                            </Text>
                        </TouchableOpacity>
                    }
                </View>
            </View>
        );
    }
}


const styles = StyleSheet.create({
    container: {
        marginTop: 120,
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
        fontSize:40
    }
});
