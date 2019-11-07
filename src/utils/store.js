import React from 'react';

const loadStoreDataFromApi = ({ game }, api, query) => {
    api.game.getGameList().then((data) => {
        game.setGameList(data)
    })

    api.game.getBannerList().then((data) => {
        game.setBanners(data)
    })
}

export default loadStoreDataFromApi