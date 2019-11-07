import GameStore from './game';

const initStores = () => ({
	game: new GameStore(),
});

export { initStores };