export default class Sprite {
    constructor(texture, defaultTexture, x, y) {
        this.spr = new PIXI.Sprite(texture);
        this.spr.interactive = true;
        this.spr.x = x;
        this.spr.y = y;

        this.defaultTexture = defaultTexture;
        this.initTexture = texture;
    }

    setTexture(texture) {
        this.spr.texture = texture;
    }

    getTexture() {
        return this.spr.texture;
    }

    isClose() {
        if (this.getTexture() == this.defaultTexture) return true;
        return false;
    }

    close() {
        this.setTexture(this.defaultTexture);
    }

    open() {
        this.setTexture(this.initTexture);
    }

    destroy() {
        this.spr.destroy();
    }

    switchOff() {
        this.spr.interactive = false;
    }

    isActive() {
        return this.spr.interactive;
    }
}