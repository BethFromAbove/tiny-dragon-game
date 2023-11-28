import 'phaser';

export default class PreloaderScene extends Phaser.Scene {
    constructor () {
        super('Preloader');
    }

    preload () {
        // add logo image
        var logo = this.add.image(400, 120, 'Logo');
        logo.setScale(0.45);

        // display progress bar
        var progressBar = this.add.graphics();
        var progressBox = this.add.graphics();
        progressBox.fillStyle(0x222222, 0.8);
        progressBox.fillRect(240, 270, 320, 50);

        var width = this.cameras.main.width;
        var height = this.cameras.main.height;
        var loadingText = this.make.text({
            x: width / 2,
            y: height / 2 - 50,
            text: 'Loading...',
            style: {
                font: '20px monospace',
                fill: '#ffffff'
            }
        });
        loadingText.setOrigin(0.5, 0.5);

        var percentText = this.make.text({
            x: width / 2,
            y: height / 2 - 5,
            text: '0%',
            style: {
                font: '18px monospace',
                fill: '#ffffff'
            }
        });
        percentText.setOrigin(0.5, 0.5);

        var assetText = this.make.text({
            x: width / 2,
            y: height / 2 + 50,
            text: '',
            style: {
                font: '18px monospace',
                fill: '#ffffff'
            }
        });
        assetText.setOrigin(0.5, 0.5);

        // update progress bar
        this.load.on('progress', function (value) {
            percentText.setText(parseInt(value * 100) + '%');
            progressBar.clear();
            progressBar.fillStyle(0xffffff, 1);
            progressBar.fillRect(250, 280, 300 * value, 30);
        });

        // update file progress text
        this.load.on('fileprogress', function (file) {
            assetText.setText('Loading asset: ' + file.key);
        });

        // remove progress bar when complete
        this.load.on('complete', function () {
            progressBar.destroy();
            progressBox.destroy();
            loadingText.destroy();
            percentText.destroy();
            assetText.destroy();
        });

        // load assets needed in our game

        this.load.audio('titleMusic', ['assets/sound/music/8bit Romance Loopable.mp3']);
        this.load.audio('gameMusic', ['assets/sound/music/newer-wave.mp3']);
        this.load.audio('coinSound', ['assets/sound/fx/coin.wav']);

        this.load.spritesheet('coin', 'assets/img/coin.png', { frameWidth: 16, frameHeight: 16 });

        // Treasures 
        this.load.image('brooch', 'assets/img/treasure/broochSmall.png');
        this.load.image('diamond', 'assets/img/treasure/diamond.png');
        this.load.image('earbud', 'assets/img/treasure/earbud.png');
        this.load.image('earring1', 'assets/img/treasure/earring1.png');
        this.load.image('earring2', 'assets/img/treasure/earring2.png');
        this.load.image('key', 'assets/img/treasure/key.png');
        this.load.image('pearl', 'assets/img/treasure/pearlSmall.png');
        this.load.image('ring', 'assets/img/treasure/ringSmall.png');
        this.load.image('usb', 'assets/img/treasure/usbSmall.png');
        this.load.image('wallet', 'assets/img/treasure/walletSmall.png');
        this.load.image('watch', 'assets/img/treasure/watch.png');
        
        // Platforms
        this.load.image('longPlatform', 'assets/img/longPlatform.png');
        this.load.image('longPlatformInvis', 'assets/img/longPlatformInvis.png');
        this.load.image('shortPlatform', 'assets/img/shortPlatform.png');
        this.load.image('shortPlatformInvis', 'assets/img/shortPlatformInvis.png');
        this.load.image('mediumPlatform', 'assets/img/mediumPlatform.png');
        this.load.image('mediumPlatformInvis', 'assets/img/mediumPlatformInvis.png');
        this.load.image('medLongPlatform', 'assets/img/medLongPlatform.png');
        this.load.image('medLongPlatformInvis', 'assets/img/medLongPlatformInvis.png');
        this.load.image('tinyPlatform', 'assets/img/tinyPlatform.png');
        this.load.image('tinyPlatformInvis', 'assets/img/tinyPlatformInvis.png');
        this.load.image('floorplatform', 'assets/img/floorPlatform.png');


        //Backgrounds
        this.load.image('menuBG', 'assets/img/menuBackground.png');
        this.load.image('optionsBG', 'assets/img/optionsBackground.png');
        this.load.image('aboutBG', 'assets/img/aboutBackground.png');
        this.load.image('introBG', 'assets/img/introBackground.png');

        this.load.image('livingRoom', 'assets/img/livingRoom3200x1700.png');

        //this.load.spritesheet('flyingL', 'assets/img/flying.png', { frameWidth: 250, frameHeight: 200 });
        //this.load.spritesheet('flyingR', 'assets/img/flyingRight.png', { frameWidth: 250, frameHeight: 200 });
        this.load.spritesheet('walk', 'assets/img/walkingSpritenew.png', { frameWidth: 88, frameHeight: 115 });
        this.load.image('standing', 'assets/img/standing.png');
        this.load.spritesheet('flying', 'assets/img/flyingSpriteTall.png', { frameWidth: 125, frameHeight: 115 });


        this.load.image('deathScene', 'assets/img/deathScene.png');

        this.load.image('Button', 'assets/img/button1.png');
        this.load.image('ButtonPressed', 'assets/img/button1selected.png');
        this.load.image('optionsCog', 'assets/img/optionsCog.png');
        this.load.image('box', 'assets/img/box.png');
        this.load.image('checkedBox', 'assets/img/checked1.png');

        // remove progress bar when complete
        this.load.on('complete', function () {
            progressBar.destroy();
            progressBox.destroy();
            loadingText.destroy();
            percentText.destroy();
            assetText.destroy();
            this.game.registry.set('titleMusic', this.sound.add('titleMusic', { volume: 0.5, loop: true }));
            this.game.registry.set('gameMusic', this.sound.add('gameMusic', { volume: 0.5, loop: true }));
            this.game.registry.set('tills', this.sound.add('tills', { volume: 0.5 }));
            this.game.registry.set('crash-1', this.sound.add('crash-1', { volume: 0.5 }));
            this.game.registry.set('crash-2', this.sound.add('crash-2', { volume: 0.5 }));
            this.game.registry.set('crash-3', this.sound.add('crash-3', { volume: 0.5 }));
            this.game.registry.set('coinSound', this.sound.add('coinSound', { volume: 0.5 }));
            this.ready();
        }.bind(this));

        this.timedEvent = this.time.delayedCall(3000, this.ready, [], this);
    }

    create () {
    }

    init () {
        this.readyCount = 0;
    }

    ready () {
        this.scene.start('Title');
    }
};
