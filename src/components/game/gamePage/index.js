import React from 'react';
import { WebView } from 'react-native-webview';
import { Text } from 'react-native';
import { Provider, Toast,  WingBlank, WhiteSpace } from '@ant-design/react-native';



export default class gameScreen extends React.Component {
    static navigationOptions = {
        title: '玩会儿游戏',
    }

    constructor(props) {
        super(props)
    }
    componentDidMount() {
        Toast.loading('加载中...', 3, () => { Toast.info('加载完成', 1) })
    }

    handleMessage(event) {
        let orderId = event.nativeEvent.data;
        this.props.navigation.navigate('payInfo', {
            orderId: orderId
        })
    }

    render() {
        // const url = this.props.navigation.getParam('url')
       const url = 'http://test.docater1.cn/Wap/App/game_new/?channel=test&openid=olupuwMwSa2iAS6q4PP-Li-1l_C0'
        return (
            <Provider>
                <WingBlank >
                </WingBlank>
                <WebView
                    ref='webView'
                    source={{ uri: url }}
                    style={{ zIndex: 1 }}
                    onMessage={ this.handleMessage.bind(this) }
                />
            </Provider>
        );
    }
}
