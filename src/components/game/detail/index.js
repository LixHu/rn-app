import React from 'react';
import { View,ScrollView, Text, Image, TouchableOpacity } from 'react-native';
import { inject, observer } from 'mobx-react'

import styles from './style'

@inject('game', 'api', 'storage')
export default class DetailScreen extends React.Component {

    static navigationOptions = ({ navigation }) => {
        return {
            title: navigation.getParam('title', 'The Game Page'),
        };
    };

    constructor(props) {
        super(props);
        this.state = {
            game_name: '',
            icon: '',
            time: '',
            uri: 'https://demo'
        };

        const { navigation } = this.props
        const id = navigation.getParam('id')
        const channel = navigation.getParam('channel')
        this.props.api.game.getGameInfo(id).then((data) => {
            this.setState({
                game_name: data.gameName,
                time: data.time,
                icon: data.icon,
                uri: data.gameURI
            })
        })
    }

    _handleStart(){
        const { api, storage } =  this.props;
        storage.load({
            key: 'userId',
        }).then(ret => {
            this.props.navigation.navigate('GamePage', {
                url: this.state.uri + '&openid=' + ret.openId
            })
        }).catch(err => {
            this.props.navigation.navigate('Login', {
                callback: () => this._handleStart(),
                // url: this.state.uri
            })
        })
    }

    render() {
        const { gameInfo } = this.props.game;
        return (
            <View style={ [styles.wrapper] }>
                <View style={{flex: 1,width: '100%'}}>
                    <View style={{ flexDirection: 'row', padding: 20 }}>
                        <View>
                            <Image
                                style={ styles.icon }
                                source={{ uri: this.state.icon }}
                            />
                        </View>
                        <View>
                            <View>
                                <Text style={{fontSize: 16,fontWeight: 'bold'}}>{ this.state.game_name }</Text>
                            </View>
                            {/*<View style={{marginTop: 5, flexDirection: 'row'}}>*/}
                            {/*    <Image style={{width: 16,height: 16, marginRight: 3}} source={require('../../../images/huo.png')} />*/}
                            {/*    <Text style={{fontSize: 12,}}>仙侠类 | 982257人在玩</Text>*/}
                            {/*</View>*/}
                            <View style={{marginTop: 5,flexDirection: 'row'}}>
                                <Image style={ {width: 16,height: 16, marginRight: 3 }} source={require('../../../images/rili.png')}/>
                                <Text style={{ fontSize: 12, }}>{ this.state.time }</Text>
                            </View>
                        </View>
                    </View>
                    <View>
                        {/*<View style={{ flexDirection: 'row', justifyContent: 'space-around', borderBottomColor: '#eee', borderBottomWidth: 1, paddingBottom: 8 }}>*/}
                        {/*    <TouchableOpacity>*/}
                        {/*        <Text style={{ color: '#999',fontSize: 15 }}>详情</Text>*/}
                        {/*    </TouchableOpacity>*/}
                        {/*    <TouchableOpacity>*/}
                        {/*        <Text style={{ color: '#999',fontSize: 15 }}>礼包</Text>*/}
                        {/*    </TouchableOpacity>*/}
                        {/*    <TouchableOpacity>*/}
                        {/*        <Text style={{ color: '#999',fontSize: 15 }}>资讯</Text>*/}
                        {/*    </TouchableOpacity>*/}
                        {/*    <TouchableOpacity>*/}
                        {/*        <Text style={{ color: '#999',fontSize: 15 }}>开服</Text>*/}
                        {/*    </TouchableOpacity>*/}
                        {/*</View>*/}
                        {/* 这里应该是swiper里面包裹着scrollview */}
                        {/*<ScrollView style={{paddingLeft: 20}}>*/}
                        {/*    <Text>1233333</Text>*/}
                        {/*</ScrollView>*/}
                    </View>
                </View>
                <View style={[styles.startBox]}>
                    <TouchableOpacity style={ [styles.startBtn] } onPress={ this._handleStart.bind(this) } >
                        <Text style={ [styles.startText] }>开始游戏</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}
