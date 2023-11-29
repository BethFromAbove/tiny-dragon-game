import 'phaser';
import Button from '../Objects/Button';

export default class EndScene extends Phaser.Scene {
    constructor () {
        super('End');
    }


    create () {
        var config = this.game.config;
        this.model = this.sys.game.globals.model;

        var popup = this.add.image(config.width/2, config.height/2, 'endScene');
        var menuButton = new Button(this, 250, 500, 'Button', 'ButtonPressed', 'Menu', 'Title');
    }
};
