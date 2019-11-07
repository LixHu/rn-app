import React, { Component } from 'react'
import Router from './navigation'

import { Provider } from 'mobx-react'

import { initStores } from './stores'
const stores = initStores();

import Api from './apis'
import loadStoreDataFromApi from './utils/store'
// Config
import Config from 'react-native-config'
// storage
import Storage from 'react-native-storage'
import AsyncStorage from '@react-native-community/async-storage'

// 下载包路径
console.warn('param:', Config.TUNNEL_ID)

const storage = new Storage({
    size: 1000,
    storageBackend: AsyncStorage,
    defaultExpires: 1000 * 3600 * 24,
    enableCache: true,
    sync: {

    }
})
// storage.remove({
//     key: 'userId'
// })
const apis = new Api();
loadStoreDataFromApi(stores, apis, '123');

export default class App extends Component {
    render(){
        return (
            <Provider game={ stores.game } api={ apis } storage={ storage } >
                <Router />
            </Provider>
        )
    }
}