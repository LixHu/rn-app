class User {
    constructor(url) {
        this.url = url;
    }

    async getUserInfo(data) {
        let url = this.url + '&a=getUserInfo' + '&code=' + data.code + '&token=' + data.token;
        return await fetch(url).then((response) => response.json())
    }

    async getOrderInfo(orderId, openId) {
        let url = this.url + '&a=getOrderInfo&open_id=' + openId + '&order_id=' + orderId
        return await fetch(url).then((response) => response.json())
    }

    async unifiedOrder(data) {
        let url = this.url + '&a=unifiedOrder';
        return await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }).then((response) => response.json());
    }

    async getOpenIdInfo(openId) {
        let url = this.url + '&a=getOpenIdInfo' + '&open_id=' + openId;
        return await fetch(url).then((response) => response.json());
    }

    async userLogin(data) {
        let url = this.url + '&a=userLogin';
        return await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }).then((response) => response.json())
    }

    async userReg(data) {
        let url = this.url + '&a=userReg';
        return await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }).then((response) => response.json())
    }

    async sendSmsCode(data) {
        let url = this.url + '&a=sendSmsCode';
        return fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }).then((response) => response.json())
    }
}
export default User;