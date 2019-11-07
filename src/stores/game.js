import {
    observable,
    action
} from 'mobx'

class GameStore {
    @observable banners = []
    @observable gameLists = []
    @observable currentGame = {}
    @observable loginStatus = false
    @observable gameInfo = {}

    @action setBanners = (data) => {
        this.banners = data
    }

    @action setGameList = (data) => {
        this.gameLists = data
    }

    @action setCurrentGame = (data) => {
        this.currentGame = data
    }

    @action setLoginStatus = (data) => {
        this.loginStatus = data
    }

    @action setGameInfo = (data) => {
        this.gameInfo = data;
    }
    
}

export default GameStore;