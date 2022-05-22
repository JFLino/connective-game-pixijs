import Config from '../config.js';

export default class Manager {
    timer = 0;
    timeToConsider = 0;
    waitTime = 0;

    constructor(ticker, game) {
        this.game = game;
        this.ticker = ticker;

        this.text = new PIXI.Text(``);
        this.text.x = 400;
        this.text.y = 0;

        this.ticker.add(this.updateText.bind(this));
    }

    getTimeBoard() {
        return this.text;
    }

    updateConsiderTime() {
        this.timeToConsider = Config.timeToConsider + 1;
    }

    updateWaitTime() {
        this.waitTime = Config.waitTimeAfterEnd;
        this.updateConsiderTime();
    }

    updateText() {
        this.timer += 1;
        if (parseInt(this.timer % 60) == 0) {
            if (this.waitTime >= 0) {
                this.text.text = `Загрузка новой игры ${this.waitTime}`;
                this.waitTime--;
                if (this.waitTime < 0) {
                    this.game.deleteAll();
                    this.game.start();
                }
            } else if (this.timeToConsider > 0) {
                this.timeToConsider--;
                this.text.text = `Запомните карты (${this.timeToConsider}) с`;
                if (this.timeToConsider == 0) this.game.closeAll();
                this.timer = 0;
            } else {
                let seconds = parseInt((this.timer / 60) % 60);
                let minutes = parseInt(this.timer / (60 * 60) % 60);
                seconds = (seconds < 10) ? '0' + seconds : seconds;
                minutes = (minutes < 10) ? '0' + minutes : minutes;
                this.text.text = minutes + ':' + seconds;
            }
        }
    }
}