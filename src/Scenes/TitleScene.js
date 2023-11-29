import 'phaser';
import Button from '../Objects/Button';


export default class TitleScene extends Phaser.Scene {
    constructor () {
	super('Title');
    }

    create () {
	    var config = this.game.config;

        this.add.image(config.width/2, config.height/2, 'menuBG');

        // Game
        this.gameButton = new Button(this, config.width*0.25, config.height*0.85, 'Button', 'ButtonPressed', 'Play', 'Game');

        // Options
        this.optionsButton = new Button(this, config.width*0.95, config.height*0.07, 'optionsCog', 'optionsCog', '', 'Options');

        this.model = this.sys.game.globals.model;
        if (this.model.musicOn === true && this.model.bgMusicPlaying === false) {
            this.bgMusic = this.sound.add('gameMusic', { volume: 0.5, loop: true });
            this.bgMusic.play();
            this.model.bgMusicPlaying = true;
            this.sys.game.globals.bgMusic = this.bgMusic;
        }
    }

    update () {
        var config = this.game.config;
    }
};
