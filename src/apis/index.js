import Game from './game'
import User from './user'

class Api {
    constructor(props) {
        this.url =  'https://docater1.cn/index.php?g=Application&m=Game';
//        this.url = 'http://demo.test';
        this.game = new Game(this.url);
        this.user = new User(this.url);
    }

}
export default Api;
