import React, { Component } from 'react'
import { StyleSheet, View, Image, TouchableOpacity } from 'react-native'

import { observer, inject } from 'mobx-react'

import Swiper from 'react-native-swiper'

@inject('game')
export default class SwiperComponent extends Component {
    _handleClick(item){
//        this.props.game.setCurrentGame(item)
        this.props.navigation.navigate('Detail', { id: item.id, title: item.game_name, channel: item.channel_id })
    }
    render() {
        const { banners } = this.props.game
        return (
            <View style={{ height: this.props.height || 180 }}>
                <Swiper style={ styles.wrapper } showsButtons={ true } autoplay={ true }>
                {
                    (banners && banners != undefined) && banners.map((item, index)=>(
                        <TouchableOpacity key={ index } onPress={ () => this._handleClick(item) } style={{ flex: 1 }}>
                            <Image
                                style={{ width: '100%', height: '100%' }}
                                source={{ uri: item.cover }}
                            />
                        </TouchableOpacity>
                    ))
                }
                </Swiper>
            </View>
        )
    }
}



const styles = StyleSheet.create({
    wrapper: {
    },
    slide1: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#9DD6EB'
    },
    slide2: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#97CAE5'
    },
    slide3: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#92BBD9'
    },
    text: {
      color: '#fff',
      fontSize: 30,
      fontWeight: 'bold'
    }
  })