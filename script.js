import Config from './config.js';
import Game from './scripts/game.js'

const app = new PIXI.Application({
    width: Config.fieldWidth,
    height: Config.fieldHeight,
    backgroundColor: 0xffffff
});
document.body.appendChild(app.view);

new Game(app);