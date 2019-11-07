import React, {Component} from 'react'
import { StyleSheet, View, Text, Image, TouchableOpacity, TextInput } from 'react-native'
import { Provider, Toast, Button, WhiteSpace, WingBlank, List, InputItem, } from '@ant-design/react-native';
import { inject, observer } from 'mobx-react'
//wechat
import * as Wechat from 'react-native-wechat';
Wechat.registerApp('wxe06ab3728390d6be');

@inject('storage', 'api') @observer
export default class Reg extends Component {
    static navigationOptions = {
        header: null
    }
    constructor(props){
        super(props)
        this.state = {
            username: '',
            password: '',
            code: '',
            codeDisable: '',
            sendTime: '',
            codeText: '发送验证码',
            subDisable: false
        }
    }

    _back() {
        this.props.navigation.goBack()
    }

    sendSms() {
        const { api } = this.props;
        let data = {
            mobile: this.state.username
        };
        api.user.sendSmsCode(data).then((responseJson) => {
            console.warn(responseJson)
            if(responseJson.status == 1001) {
                Toast.info('发送成功');
                this.setState({ sendTime: 60, codeDisable: true, codeText: '60秒'});
                let that = this
                let time = 60
                let interval = setInterval(() =>  {
                    time--
                    that.setState({ sendTime: time , codeText: time + '秒'})
                    if(time <= 0) {
                        that.setState({ codeDisable: false, codeText: '发送验证码' })
                        clearInterval(interval)
                    }
                }, 1000)
            }
        })
    }

    handleReg() {
        const { api, storage, navigation } = this.props;
        let data = {
            username: this.state.username,
            password: this.state.password,
            code: this.state.code
        };
        this.setState({ subDisable: true })
        api.user.userReg(data).then((responseJson) => {
            if(responseJson.status == 1001) {
                Toast.info('注册成功,请登录', 3)
                setTimeout(function(){
                    this.setState({ subDisable: false })
                    navigation.goBack()
                }, 3000)
            }
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
                        onPress={ this._back.bind(this) }
                    >
                        <Text style={{fontSize: 16,color: '#000'}}>取消</Text>
                    </TouchableOpacity>
                </View>

                <View style={{ paddingHorizontal: 15 }} behavior="padding">
                    <Text style={{
                        paddingVertical: 12,
                        fontSize: 22,
                        fontWeight: 'bold'
                    }}>注册</Text>
                    <InputItem type="phone" clear value={ this.state.username } onChange={ value => { this.setState({ username: value })}} >手机号：</InputItem>
                    <InputItem type="number" maxLength={6} clear value={ this.state.code} onChange={ value => { this.setState({ code: value })}} extra={<View><Button onPress={ () => this.sendSms() } type='primary' disabled={ this.state.codeDisable } style={{ width: 125, height: 35 }}>{ this.state.codeText }</Button></View>}>验证码：</InputItem>
                    <InputItem type="password" value={ this.state.password} onChange={ value => { this.setState({ password: value })}}>密码：</InputItem>
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
                        onPress={ this.handleReg.bind(this) }
                        disabled={ this.state.subDisable }
                    >
                        <Text
                            style={{
                                fontSize: 18,
                                color: '#fff'
                            }}
                        >注册</Text>
                    </TouchableOpacity>

                    <View style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        paddingVertical: 16
                    }}>
                    </View>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({

})