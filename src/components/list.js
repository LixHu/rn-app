import React, { Component } from 'react'
import { Text, View, Image, TouchableOpacity } from 'react-native'
import styles from './style'

import { inject, observer } from 'mobx-react'

@inject('game') @observer
export default class ListComponent extends Component {
    _onPressButton(item){
        this.props.game.setCurrentGame(item)
        this.props.navigation.navigate('Detail', { id: item.id, title: item.game_name, channel: item.channel_id })
    }

    render(){
        const { title, lists, border } = this.props
        return (
            <View style={ styles.wrapper }>
                <View style={ styles.title }>
                    <Text style={ border && styles.border }></Text>
                    <Text>{ title }</Text>
                </View>
                <View style={ styles.flex }>
                    {
                        lists && lists.map((item, index)=>(
                            <TouchableOpacity key={ index } onPress={ ()=>this._onPressButton(item) } style={ styles.item }>
                                <Image
                                    style={{ width: 72, height: 72 }}
                                    source={{ uri: item.icon }}
                                />
                                <Text>{ item.game_name }</Text>
                            </TouchableOpacity>
                        ))
                    }
                </View>
            </View>
        )
    }
}
