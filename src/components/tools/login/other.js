import React, { Component } from 'react'
import { View,Text,TouchableOpacity,Image } from 'react-native'

export default class Other extends Component {

    constructor(props) {
        super(props);
    }

    handleWxClick() {
        this.props.wxClick();
    }

    render(){
        return (
            <View>

                <View style={{ flexDirection: 'row',justifyContent: 'center',alignItems: 'center',marginTop: 20 }}>
                    <Text
                        style={{ width: 100,height: 1,backgroundColor: '#ccc' }}
                    ></Text>
                    <Text
                        style={{
                            paddingHorizontal: 16, 
                            fontSize: 15,
                        }}
                    >其他登录方式</Text>
                    <Text
                        style={{width: 100,height: 1,backgroundColor: '#ccc'}}
                    ></Text>
                </View>

                <View style={{paddingHorizontal: 20,marginTop: 16,flexDirection: 'row',alignItems: 'center',justifyContent: 'space-around'}}>
                    {/*<TouchableOpacity*/}
                    {/*    style={{width: 50,height: 50,}}*/}
                    {/*>*/}
                    {/*<Image*/}
                    {/*        style={{width: 50,height: 50}}*/}
                    {/*        source={require('../../../images/qq.png')}*/}
                    {/*    />*/}
                    {/*</TouchableOpacity>*/}
                    <TouchableOpacity
                        style={{
                            width: 50,
                            height: 50,
                        }}
                        onPress={ this.handleWxClick.bind(this) }
                    >
                    <Image
                            style={{width: 50,height: 50}}
                            source={require('../../../images/wx.png')}
                        />
                    </TouchableOpacity>
                    {/*<TouchableOpacity*/}
                    {/*    style={{*/}
                    {/*        width: 50,*/}
                    {/*        height: 50,*/}
                    {/*    }}*/}
                    {/*>*/}
                    {/*<Image*/}
                    {/*        style={{width: 50,height: 50}}*/}
                    {/*        source={require('../../../images/phone2.png')}*/}
                    {/*    />*/}
                    {/*</TouchableOpacity>*/}
                    {/*<TouchableOpacity*/}
                    {/*    style={{*/}
                    {/*        width: 50,*/}
                    {/*        height: 50,*/}
                    {/*    }}*/}
                    {/*>*/}
                    {/*<Image*/}
                    {/*        style={{width: 50,height: 50}}*/}
                    {/*        source={require('../../../images/dark.png')}*/}
                    {/*    />*/}
                    {/*</TouchableOpacity>*/}
                </View>
            </View>
        )
    }
}