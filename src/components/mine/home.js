import React, { Component } from 'react'
import { StyleSheet, View, Text, FlatList, Image } from 'react-native'
import { Toast } from '@ant-design/react-native'
import { inject, observer } from "mobx-react";

@inject('api', 'storage') @observer
export default class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            openId: '',
            userInfo: {}
        };
        this.getUser();
    }

    static navigationOptions = {
        header: null
    }

    getUser() {
        const { storage, api } = this.props
        storage.load({
            key: 'userId'
        }).then((res) => {
            api.user.getOpenIdInfo(res.openId).then((responseJson) => {
                if(responseJson.status === 1001) {
                    this.setState({ userInfo: responseJson.data })
                }else {
                    Toast.info('未登录');
                }
            })
        })
    }

    goToLogin() {
        this.props.navigation.navigate('Login', {
            callback: () => this.getUser()
        })
    }

    render(){
        const { userInfo } = this.state;

        return (
            <View style={ styles.wrapper }>
                {/* 头像-昵称 */}
                <View style={[ styles.top, styles.ai_center, styles.jc_between, styles.flex_row ]} onStartShouldSetResponder={ userInfo.wechaname ? () => {} : () => this.goToLogin()}>
                    <View style={[ styles.flex_row, styles.ai_center ]}>
                        <Image 
                            style={{ width: 66, height: 66, marginRight: 12, borderRadius: 33 }}
                            source={{ uri: userInfo.portrait ? userInfo.portrait : 'https://fx-rs.zamerp.com.cn/uploads/d/dsxygl1571278456/f/e/d/4/5dc1311f14c89.png' }}
                        />
                        { userInfo.wechaname ? (
                            <View>
                                <Text style={{ color: '#fff' }}>{ userInfo.wechaname }</Text>
                                <Text style={{ color: '#fff', marginTop: 3 }}>ID: { userInfo.id }</Text>
                            </View>
                        ):(
                            <View>
                                <Text style={{ color: '#fff' }} onPress={ () => this.goToLogin() }>点击登录</Text>
                            </View>
                        )}
                    </View>
                    <View>
                    <Image 
                        style={{width: 26, height: 26, borderRadius: 33}}
                        source={require('../../images/right.png')}
                    />
                    </View>
                </View>

                {/* 碎片-积分-礼包 */}
                {/*<View style={[ styles.center, styles.flex_row, styles.ai_center, styles.jc_around ]}>*/}
                {/*    <View style={[styles.ai_center]}>*/}
                {/*        <Text>0</Text>*/}
                {/*        <Text>碎片</Text>*/}
                {/*    </View>*/}
                {/*    <View style={[styles.ai_center]}>*/}
                {/*        <Text>0</Text>*/}
                {/*        <Text>积分</Text>*/}
                {/*    </View>*/}
                {/*    <View style={[styles.ai_center]}>*/}
                {/*        <Text>0</Text>*/}
                {/*        <Text>礼包</Text>*/}
                {/*    </View>*/}
                {/*</View>*/}

                {/* 列表 */}
                <View style={styles.lists}>
                    <FlatList
                        data={[
                            {title: '签到', src: require('../../images/sign.png')},
                            {title: '绑定手机', src: require('../../images/phone.png')},
                            {title: '联系客服', src: require('../../images/contact.png')},
                            {title: '实名认证', src: require('../../images/confirm.png')},
                            {title: '设置', src: require('../../images/shezhi.png')},
                        ]}
                        renderItem={({item}) =>(
                            <View style={[styles.item, styles.flex_row, styles.ai_center, styles.jc_between]}>
                                <View style={styles.flex_row}>
                                    <Image 
                                        style={{width: 20, height: 20, marginRight: 12}}
                                        source={item.src}
                                    />
                                    <Text>{item.title}</Text>
                                </View>
                                <View>
                                    <Image 
                                        style={{width: 12, height: 12, marginRight: 12, borderRadius: 33}}
                                        source={require('../../images/right2.png')}
                                    />
                                </View>
                            </View>
                        )}
                        />
                </View>
            </View>
        )
    }
}


const styles = StyleSheet.create({
    wrapper: {
        backgroundColor: '#f7f7f7',
        minHeight: '100%'
    },
    top: {
        height: 180,
        paddingLeft: 30,
        paddingRight: 30,
        backgroundColor: '#038C8C',
    },
    center: {
        height: 80,
        backgroundColor: '#fff'
    },
    flex_row: {
        flexDirection: 'row',
    },
    ai_center: {
        alignItems: 'center',
    },
    jc_between: {
        justifyContent: 'space-between'
    },
    jc_around: {
        justifyContent: 'space-around'
    },
    lists: {
     flex: 1,
     marginTop: 12
    },
    item: {
      fontSize: 18,
      paddingHorizontal: 20,
      paddingVertical: 16,
      borderBottomWidth: 1,
      borderBottomColor: '#eee',
      backgroundColor: '#fff',
    },
  })