import React from 'react';
import { Image, ScrollView, View, Text, StyleSheet, TouchableHighlight } from 'react-native';
import { List, Radio, Button, Modal, Toast, Provider, WhiteSpace, WingBlank } from '@ant-design/react-native';

import * as Wechat from 'react-native-wechat';
Wechat.registerApp('wxe06ab3728390d6be');


import { inject, observer } from 'mobx-react'

const Item = List.Item;
const RadioItem = Radio.RadioItem;
const Brief = Item.Brief;

const styles = StyleSheet.create({
    scrolls: {
        flex: 1,
        backgroundColor: '#f5f5f9'
    },
    button: {
        backgroundColor: '#04D94F',
    }
})

@inject('api', 'storage') @observer
export default class PayInfo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            couponList: [],
            orderInfo: {},
            sureCoupon: [],
            notCoupon: [],
            couponId: '',
            couponPrice: '',
            orderPrice: '',
            payType: 1
        };
        const orderId = this.props.navigation.getParam('orderId')
        // 初始化获取订单详情
        this.getOrderInfo(orderId)
    }
    // 发起支付
    onPay(orderInfo) {
        const { api, navigation } = this.props;
        let data = {};
        data.token = 'wzyytj1572000905';
        data.order_id = orderInfo.orderid;
        api.user.unifiedOrder(data).then((res) => {
            Wechat.pay({
                partnerId: String(res.partnerid),  // 商家向财付通申请的商家id
                prepayId: String(res.prepay_id),   // 预支付订单
                nonceStr: String(res.noncestr),   // 随机串，防重发
                timeStamp: String(res.timestamp),  // 时间戳，防重发
                package: String(res.package),    // 商家根据财付通文档填写的数据和签名
                sign: String(res.paySign)        // 商家根据微信开放平台文档对数据做的签名
            }).then((res) => {
                navigation.goBack()
            }).catch((err) => {

            })
        })
    }
    // 获取订单详情
    getOrderInfo(orderId) {
        const { api, storage } = this.props;
        storage.load({
            key: 'userId'
        }).then(ret => {
            const { openId } = ret
            this.props.api.user.getOrderInfo(orderId, openId).then((res) => {
                this.setState({ orderInfo: res.data, sureCoupon: res.sureCoupon, notCoupon: res.notCoupon, orderPrice: res.data.price })
            }).catch(err => {
                Toast.info(err)
            })
        }).catch(err => {
            Toast.info(err)
        })
    }
    // 关闭窗口
    onClose = () => {
        this.setState({
            visible: false,
        });
    };
    // 优惠券选择时
    handleSelectCoupon(id, couponPrice) {
        const { orderPrice, couponId } = this.state
        const { price } = this.state.orderInfo
        if(couponId !== id) {
            this.setState({ orderPrice: price })
            this.setState({ couponId: id, couponPrice: couponPrice, visible: false, orderPrice: price - couponPrice  })
        }else {
            this.setState({ visible: false })
        }
    }
    render() {
        const { orderInfo, notCoupon, sureCoupon } = this.state
        return (
            <View style={{ flex: 1 }} >
                <View style={{ flex: 1 }}>
                    <List renderHeader={ '支付信息' }>
                        <Item disabled extra={ `￥ ${ orderInfo.price }` } >
                            支付金额
                        </Item>
                        <Item extra={ this.state.couponPrice && `￥ ${ this.state.couponPrice }` } arrow="horizontal" onPress={ () => { this.setState({ visible: true })} }>
                            优惠券
                        </Item>
                    </List>
                    <List renderHeader={ '选择支付方式' }>
                        <RadioItem
                            extra={ Radio }
                            name="payType"
                            defaultChecked
                            checked={ this.state.payType === 1}
                            onChange={ event => {
                                if(event.target.checked) {
                                    this.setState({ payType: 1})
                                }
                            }}
                        >
                            <Image source={ require('../../../images/wx.png') } style={{ width: 18, height: 18 }} />   微信支付
                        </RadioItem>
                    </List>

                <Provider>
                    <Modal
                        transparent={ false }
                        visible={ this.state.visible }
                        animationType="slide-up"
                        onClose={ () => this.onClose }
                    >
                        <ScrollView style={{ Height: '80%'}}>
                            <List renderHeader={ '可使用优惠券' }>
                                { this.state.sureCoupon && this.state.sureCoupon.map((val, key) => (
                                    <Item extra={
                                        <View>
                                            <Text style={{ fontSize: 12, textAlign: 'right'}}>满{ val.condition } - { val.price }优惠券</Text>
                                            <Brief style={{ textAlign: 'right' }}>{ `有效期：${ val.start_time } - ${ val.end_time }` }</Brief>
                                        </View>
                                        } multipleLine key={ key }
                                        onPress={ () => this.handleSelectCoupon(val.id, val.price) }
                                        >
                                        { val.desc }
                                    </Item>
                                ))}
                            </List>
                            <List renderHeader={ '不可使用优惠券' }>
                                { this.state.notCoupon && this.state.notCoupon.map((val, key) => (
                                    <Item extra={
                                        <View>
                                            <Text style={{ fontSize: 12, textAlign: 'right'}}>满{ val.condition } - { val.price }优惠券</Text>
                                            <Brief style={{ textAlign: 'right' }}>{ `有效期：${ val.start_time } - ${ val.end_time }` }</Brief>
                                        </View>
                                        } multipleLine key={ key }>
                                        { val.desc }
                                    </Item>
                                ))}
                            </List>
                        </ScrollView>
                    </Modal>
                </Provider>
                </View>
                <Button
                    style={ styles.button }
                    onPressIn={ () =>  this.onPay(this.state.orderInfo) }
                >
                    <Text style={{ color: '#fff' }}>
                        支付{ this.state.orderPrice }元
                    </Text>
                </Button>
            </View>
        );
    }
}