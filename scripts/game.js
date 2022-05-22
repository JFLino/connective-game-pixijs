import Config from '../config.js';
import Sprite from "./sprite.js";
import Manager from "./manager.js";
import SoundPlayer from './soundPlayer.js';

export default class Game {
    textures = [];
    sprites = [];

    constructor(app) {
        this.gameStage = app.stage;

        this.soundPlayer = new SoundPlayer();
        this.manager = new Manager(app.ticker, this);
        this.gameStage.addChild(this.manager.getTimeBoard());

        this.defaultTexture = PIXI.Texture.from(Config.assets + Config.defaultImage);
        for (let image of Config.images) {
            const texture = PIXI.Texture.from(Config.assets + image);
            this.textures.push(texture);
        }

        this.manager.updateWaitTime();
    }

    start() {
        this.init();
    }

    init() {
        this.createCards();

        for (let sprite of this.sprites) {
            sprite.spr.on("pointertap", async () => {
                if (sprite.isClose()) {
                    this.soundPlayer.cardPressed();
                    let otherOpenSprite = this.getOpen();
                    sprite.open();

                    if (!otherOpenSprite) return;
                    await this.wait();
                    if (otherOpenSprite.getTexture() == sprite.getTexture()) {
                        otherOpenSprite.switchOff();
                        sprite.switchOff();

                        if (this.isVictory()) {
                            this.soundPlayer.endOfGame();
                            this.closeAll();
                            this.manager.updateWaitTime();
                        }
                    } else {
                        otherOpenSprite.close();
                        sprite.close();
                    }
                }
            });
        }
    }

    isVictory() {
        for (let sprite of this.sprites) {
            if (sprite.isClose()) return false;
        }
        return true;
    }

    deleteAll() {
        for (let sprite of this.sprites) {
            sprite.destroy();
        }
        this.sprites = [];
    }

    wait() {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve();
            }, 300);
        });
    }

    createCards() {
        let tmpTexture = this.textures.concat(this.textures);
        let i = 0,
            j = 0;

        while (tmpTexture.length != 0) {
            let rndIndex = Math.floor(Math.random() * tmpTexture.length);
            this.createSprite(tmpTexture[rndIndex], i * Config.imageWidth, j * Config.imageHeight);
            tmpTexture.splice(rndIndex, 1);
            j++;

            if (j == Config.dimension) {
                i++;
                j = 0;
            }
        }
    }

    createSprite(texture, x, y) {
        let sprite = new Sprite(texture, this.defaultTexture, x, y);

        this.gameStage.addChild(sprite.spr);
        this.sprites.push(sprite);
    }

    closeAll() {
        for (let sprite of this.sprites) {
            sprite.close();
        }
    }

    getOpen() {
        for (let sprite of this.sprites) {
            if (!sprite.isClose() && sprite.isActive()) return sprite;
        }
    }

}