class Game {
    constructor(url) {
        this.url = url;
    }
    // get Game List
    async getGameList() {
        const url = this.url + '&a=getGameList';
//        url = this.url + '/gameList';
        try {
            let response = await fetch(url);
            let responseJson = await response.json();
            return responseJson;
        } catch(error) {
            console.error(error);
        }
        return fetch(this.url).then((response) => response.json());
    }
    // get Banner
    async getBannerList() {
//        url = this.url + '/gameBanner';
        const url = this.url + '&a=getBannerList';
        try {
            let response = await fetch(url);
            let responseJson = await response.json();
            return responseJson;
        } catch(error) {
            console.error(error)
        }
    }
    // get Game Info
    async getGameInfo(id) {
//        url = this.url + '/gameInfo/' + id
        const url = this.url + '&a=getGameInfo&id=' + id;
        try {
            let response = await fetch(url);
            let responseJson = await response.json();
            return responseJson;
        } catch(error) {
            console.error(error)
        }
    }
}

export default Game