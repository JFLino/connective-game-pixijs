import Config from '../config.js';

export default class SoundPlayer {
    constructor() {
        PIXI.sound.add('cardPressed', Config.soundsPath + 'cardPressed.mp3');
        PIXI.sound.add('endOfGame', Config.soundsPath + 'endOfGame.mp3');
    }

    cardPressed() {
        PIXI.sound.play('cardPressed');
    }

    endOfGame() {
        PIXI.sound.play('endOfGame');
    }
}