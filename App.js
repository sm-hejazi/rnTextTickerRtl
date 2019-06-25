/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {AsyncStorage, I18nManager, Platform, StyleSheet, Switch, Text, View} from 'react-native';

import TextTicker from 'react-native-text-ticker';

import RNRestart from 'react-native-restart';

const instructions = Platform.select({
    ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
    android:
        'Double tap R on your keyboard to reload,\n' +
        'Shake or press menu button for dev menu',
});

type Props = {};
export default class App extends Component<Props> {
    constructor(props) {
        super(props);
        this.state = {
            isRtlLang: false
        };


    }

    async componentDidMount() {
        const value = await AsyncStorage.getItem(RTL_KEY);
        console.warn("************ value RTL is: ", value);
        this.setState({isRtlLang: value === "true"});
        applyRTL(value === "true");
    }

    render() {
        console.warn("************ I18nManager.isRTL: ", I18nManager.isRTL);
        return (
            <View style={styles.container}>
                <Text style={styles.welcome}>Welcome to React Native!</Text>
                <View style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: '#007e74',
                    marginVertical: 13
                }}
                >
                    <View
                        style={{
                            borderWidth: .7,
                            borderColor: 'white',
                            margin: 7,
                            paddingVertical: 7
                        }}
                    >
                        <TextTicker
                            style={{
                                color: 'white',
                                fontSize: 20,
                                paddingHorizontal: 13,
                            }}
                            duration={3000}
                            loop
                            repeatSpacer={50}
                            marqueeDelay={1000}
                            animationType={'bounce'}
                        >
                            {this.state.isRtlLang ?
                                'لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است.' :
                                'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus ac semper lacus, eget'
                            }
                        </TextTicker>
                    </View>

                    <View
                        style={{flexDirection: 'row'}}
                    >
                        <Text style={{
                            borderWidth: .7,
                            color: 'white',
                            fontSize: 17,
                            paddingHorizontal: 13,
                        }}>LTR</Text>
                        <Switch
                            onValueChange={val => {
                                this.setState({isRtlLang: val});
                                applyRTL(val)
                            }}
                            value={this.state.isRtlLang}/>
                        <Text style={{
                            borderWidth: .7,
                            color: 'white',
                            fontSize: 17,
                            paddingHorizontal: 13,
                        }}>RTL</Text>

                    </View>
                </View>

                <Text style={styles.instructions}>To get started, edit App.js</Text>
                <Text style={styles.instructions}>{instructions}</Text>
            </View>
        );
    }
}
const RTL_KEY = '@RNTextTicker:isRTL';
async function applyRTL(rtl) {
    I18nManager.allowRTL(rtl);
    I18nManager.forceRTL(rtl);

    const expected = '' + rtl;

    const value = await AsyncStorage.getItem(RTL_KEY);
    if (value !== expected) {
        await AsyncStorage.setItem(RTL_KEY, expected);
        RNRestart.Restart();
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
});
