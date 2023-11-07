import 'phaser';
import Button from '../Objects/Button';

var cursors;

var player;
var treasures;
var platforms;

var coin;
var totalScore = 0;
var scoreText;

export default class GameScene extends Phaser.Scene {
    constructor () {
        super('Game');
    }

    create () {
        var config = this.game.config;

        var gameWidth = game.config.width;
        var gameHeight = game.config.height;

        // Set the boundaries of the gameworld - worldScaleFactor * dimensions of the browser viewport
        var worldScaleFactor = 2;
        var gameWorld = this.physics.world;
        gameWorld.setBounds(0, 0, gameWidth * worldScaleFactor, gameHeight * worldScaleFactor);
        this.cameras.main.setBounds(0, 0, 1600, 1200);

        var background = this.add.image(0, 0, 'livingRoom');
        background.setOrigin(0, 0);

        player = this.physics.add.sprite(0, 0, 'standing');
        player.setCollideWorldBounds(true);

        // Input Events
        cursors = this.input.keyboard.createCursorKeys();

        // Walkable surfaces
        platforms = this.physics.add.staticGroup();
        platforms.create(400, 568, 'Button').setScale(2).refreshBody();
        platforms.create(600, 400, 'Button');
        platforms.create(50, 250, 'Button');
        platforms.create(750, 220, 'Button');
        platforms.create(800, 1100,'floorplatform');

        // Treasures to collect
        var redCar = this.physics.add.sprite(600, 300, 'redCar');
        var orangeCar = this.physics.add.sprite(470, 205, 'orangeCar');
        var bin1 = this.physics.add.sprite(50, 200, 'bin');
        var trafCone1 = this.physics.add.sprite(90, 200, 'trafCone');

        treasures = this.physics.add.group();
        treasures.add(redCar);
        treasures.add(orangeCar);
        treasures.add(bin1);
        treasures.add(trafCone1);

        // Colliders
        this.physics.add.overlap(player, treasures, collectItem, null, this);
        this.physics.add.collider(player, platforms);
        this.physics.add.collider(treasures, platforms);

        // Animations
        this.anims.create({
            key: 'flyR',
            frames: this.anims.generateFrameNumbers('flyingR', { start: 0, end: 2 }),
            frameRate: 5,
            repeat: -1
        });
        this.anims.create({
            key: 'flyL',
            frames: this.anims.generateFrameNumbers('flyingL', { start: 0, end: 2 }),
            frameRate: 5,
            repeat: -1
        });
        this.anims.create({
            key: 'spin',
            frames: this.anims.generateFrameNumbers('coin', { start: 0, end: 5 }),
            frameRate: 10,
            repeat: -1
        });

        // Play the game music
        this.model = this.sys.game.globals.model;
        if (this.model.musicOn === true) {
            this.sound.stopAll();
            this.bgMusic = this.sound.add('gameMusic', { volume: 0.5, loop: true });
            this.bgMusic.play();
            this.model.bgMusicPlaying = true;
            this.sys.game.globals.bgMusic = this.bgMusic;
        }
        var scoreCoin = this.physics.add.sprite(config.width * 0.035, config.height * 0.08, 'coin');
        scoreCoin.anims.play('spin', true);
        scoreCoin.setScrollFactor(0);
        scoreCoin.setScale(2);
        scoreCoin.setImmovable(true);
        scoreCoin.body.setAllowGravity(false);

        // Display scoreboard
        totalScore = 0;
        scoreText = this.add.text(
            config.width * 0.07,
            config.height * 0.05,
            totalScore,
            {align: 'center',
             fontSize: '48px',
             fill: '#FFF',
             backgroundColor: 'rgba(0,0,0,0.5)'}
        );
        scoreText.setScrollFactor(0);
    }

    update ()
    {
        var config = this.game.config;

        if (cursors.left.isDown)
        {
            player.setVelocityX(-160);
            player.anims.play('flyL', true);

            //player.anims.play('left', true);
        }
        else if (cursors.right.isDown)
        {
            player.setVelocityX(160);
            player.anims.play('flyR', true);

            //player.anims.play('right', true);
        }
        else
        {
            player.setVelocityX(0);
            //player.anims.play('flyR', false);
            //player.anims.play('turn');
            player.setTexture('standing');
        }

        if (cursors.up.isDown && player.body.touching.down)
        {
            player.setVelocityY(-330);
        }
        else if (cursors.up.isDown && !player.body.touching.down)
        {
            player.setVelocityY(-150);
        }

        this.cameras.main.centerOn(player.x, player.y);
    }
};

function collectItem (player, item) {

    item.destroy();

    //coin sprite
    coin = this.physics.add.sprite(player.x, player.y, 'coin');
    coin.anims.play('spin', true);

    this.model = this.sys.game.globals.model;
    if (this.model.soundOn === true)
    {
        this.sound.play('coinSound');
    }

    this.tweens.add({
        targets: coin,
        y: coin.y - 50,
        yoyo: true,
        duration: 500,
        ease: "Sine.easeOut",
        callbackScope: this,
        onComplete: function(tween, c){
            this.time.addEvent({
                delay: 500,
                callback: () => {c[0].destroy();}
            });
        }
    });

    this.tweens.add({
        targets: coin,
        x: coin.x + (Phaser.Math.RND.sign()*Phaser.Math.RND.between(30, 50)),
        duration: 1000
    });

    totalScore = totalScore + 5;
    scoreText.setText(totalScore);
}

