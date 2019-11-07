import React, {Component} from 'react'
import { StyleSheet, View, Text, Image, TouchableOpacity, TextInput } from 'react-native'
import { Provider, Button, Toast, WhiteSpace, WingBlank, portal, } from '@ant-design/react-native';
import Other from './other'
import { inject, observer } from 'mobx-react'
//wechat
import * as Wechat from 'react-native-wechat';
Wechat.registerApp('wxe06ab3728390d6be');

@inject('storage', 'api')
export default class Login extends Component {
    static navigationOptions = {
        header: null
    }
    constructor(props){
        super(props)
        this.state = {
            username: '',
            password: ''
        }
        this.props.storage.load({
            key: 'userId'
        }).then((res) => {
            if(res.openId) {
                Toast.info('请勿重复登录')
                this.props.navigation.goBack();
            }
        })
    }

    _back(){
        this.props.navigation.goBack()
    }

    _handleUsernameInput(text){
        this.setState({
            username: text
        })
    }

    _handlePasswordInput(text){
        this.setState({
            password: text
        })
    }
    goReg() {
        this.props.navigation.navigate('Reg')
    }

    // 手机号登陆
    handleLogin() {
        const { api, storage, navigation } = this.props;
        let { username, password } = this.state;
        let data = {
            username: username,
            password: password
        }
        api.user.userLogin(data).then((responseJson) => {
            if(responseJson.status === 1001) {
                storage.save({
                    key: 'userId',
                    data: {
                        'openId': responseJson.data
                    }
                })
                this.setState({ username: '', password: '' })
                navigation.state.params.callback();
                navigation.goBack();
            }else {
                Toast.info('账号或密码错误')
            }
        })
    }
    // 微信登录
    _handleWxLogin(){
        const { storage, api, navigation } = this.props
        storage.load({
            key: 'userId'
        }).then(res => {
            this.props.navigation.navigate('GamePage', {
                url: this.props.navigation.getParam('url') + res.openId
            })
        }).catch(err => {
            let scope = 'snsapi_userinfo';
            let state = 'wechat_sdk_demo';
            Wechat.isWXAppInstalled().then((isInstalled) => {
                if(isInstalled) {
                    Wechat.sendAuthRequest(scope, state).then((response) => {
                        let data = {
                            token: 'wzyytj1572000905',
                            code: response.code
                        }
                        api.user.getUserInfo(data).then((responseJson) => {
                            storage.save({
                                key: 'userId',
                                data: {
                                    openId: responseJson.openid,
                                    userId: responseJson.userId
                                }
                            })
                            navigation.state.params.callback();
                            navigation.goBack();
                            // this.props.navigation.navigate('GamePage', {
                            //     url: this.props.navigation.getParam('url') + '&openid=' + responseJson.openid
                            // })
                        })
                    })
                }
            })
        })
    }

    render(){
        return (
            <View>
                <Provider>
                    <WingBlank style={{ marginTop: 80 }}>
                        <WhiteSpace />

                        <WhiteSpace />
                    </WingBlank>
                </Provider>
                <View >
                    <TouchableOpacity
                        style={{padding: 30,}}
                        onPress={this._back.bind(this)}
                    >
                        <Text style={{fontSize: 16,color: '#000'}}>取消</Text>
                    </TouchableOpacity>
                </View>

                <View style={{ paddingHorizontal: 20 }} behavior="padding">
                    <Text style={{
                        paddingVertical: 12,
                        fontSize: 22,
                        fontWeight: 'bold'
                    }}>游戏登录</Text>
                    <TextInput
                        style={{
                            height: 40, 
                            borderBottomColor: '#eee', 
                            borderBottomWidth: 1,
                            color: '#aaa',
                            fontSize: 16
                        }}
                        placeholder="手机号/账号"
                        keyboardType="numeric"
                        onChangeText={(text)=>this._handleUsernameInput(text)}
                        value={this.state.username}
                    />
                    <TextInput
                        style={{
                            marginTop: 9,
                            height: 40, 
                            borderBottomColor: '#eee', 
                            borderBottomWidth: 1,
                            color: '#aaa',
                            fontSize: 16
                        }}
                        placeholder="请输入密码"
                        secureTextEntry={ true }
                        onChangeText={(text)=>this._handlePasswordInput(text)}
                        value={ this.state.password }
                    />
                    <TouchableOpacity
                        style={{
                            width: '100%',
                            height: 44,
                            borderRadius: 6,
                            backgroundColor: 'red',
                            marginTop: 20,
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}
                        onPress={ () => this.handleLogin() }
                    >
                        <Text
                            style={{
                                fontSize: 18,
                                color: '#fff'
                            }}
                        >登录</Text>
                    </TouchableOpacity>

                    <View style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        paddingVertical: 16
                    }}>
                        <TouchableOpacity onPress={ () => this.goReg()}>
                            <Text>注册账号</Text>
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <Text>忘记密码</Text>
                        </TouchableOpacity>
                    </View>

                   <Other wxClick={ this._handleWxLogin.bind(this) }/>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({

})