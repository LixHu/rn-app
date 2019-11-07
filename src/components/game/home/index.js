import React from 'react';
import { View, Text, Button, ScrollView } from 'react-native';
import SwiperComponent from '../../../components/swiper'
import ListComponent from '../../../components/list'

import styles from './style';

import { observer, inject } from 'mobx-react'

@inject('game') @observer
class HomeScreen extends React.Component {

    static navigationOptions = {
        title: '王者应用推荐'
    }

    render() {
        const { gameLists } = this.props.game
        return (
            <ScrollView style={ styles.wrapper }>
                <SwiperComponent navigation={ this.props.navigation } style={{ height: 300 }} />
                {
                    (gameLists && gameLists !== undefined ) && gameLists.map((item, index)=>(
                        <View key={ index } style={{ marginTop: 12 }}>
                            <ListComponent border navigation={ this.props.navigation } title={ item.title } lists={ item.game }/>
                        </View>
                    ))
                }
            </ScrollView>
        );
    }
}
export default HomeScreen