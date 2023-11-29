import 'phaser';
import Button from '../Objects/Button';

var cursors;

var player;
var treasures;
var platforms;

var coin;
var totalTreasure = 0;
var treasureCollectedText;

export default class GameScene extends Phaser.Scene {
    constructor () {
        super('Game');
    }

    create () {
        var config = this.game.config;

        var gameWidth = game.config.width;
        var gameHeight = game.config.height;

        // Set the boundaries of the gameworld - worldScaleFactor * dimensions of the browser viewport
        var worldScaleFactor = 4;
        var gameWorld = this.physics.world;
        var gameWorldWidth = 3200;
        var gameWorldHeight = 1700;
        gameWorld.setBounds(0, 0, gameWorldWidth, gameWorldHeight);
        this.cameras.main.setBounds(0, 0, gameWorldWidth, gameWorldHeight);

        var background = this.add.image(0, 0, 'livingRoom');
        background.setOrigin(0, 0);

         // Animations
        this.anims.create({
            key: 'flyR',
            frames: this.anims.generateFrameNumbers('flying', { start: 0, end: 2 }),
            frameRate: 5,
            repeat: -1
        });
        this.anims.create({
            key: 'flyL',
            frames: this.anims.generateFrameNumbers('flying', { start: 3, end: 5 }),
            frameRate: 5,
            repeat: -1
        });
        this.anims.create({
            key: 'walkL',
            frames: this.anims.generateFrameNumbers('walk', { start: 0, end: 1 }),
            frameRate: 5,
            repeat: -1
        });
        this.anims.create({
            key: 'walkR',
            frames: this.anims.generateFrameNumbers('walk', { start: 2, end: 3 }),
            frameRate: 5,
            repeat: -1
        });
        this.anims.create({
            key: 'spin',
            frames: this.anims.generateFrameNumbers('coin', { start: 0, end: 5 }),
            frameRate: 10,
            repeat: -1
        });

        // Input Events
        cursors = this.input.keyboard.createCursorKeys();

        // Walkable surfaces
        platforms = this.physics.add.staticGroup();
        platforms.create(1780, 290, 'longPlatformInvis'); //curtain rail
        platforms.create(1715, 1120, 'longPlatformInvis'); // sofa back
        platforms.create(1760, 1388, 'longPlatformInvis'); //sofa cushion
        platforms.create(430, 1060, 'longPlatformInvis'); // cabinet top
        platforms.create(3000, 290, 'longPlatformInvis'); // Door top
        platforms.create(755, 940, 'shortPlatformInvis'); // leafy cabinet plant pot
        platforms.create(230, 850, 'shortPlatformInvis'); // small cabinet frame
        platforms.create(115, 930, 'shortPlatformInvis'); // round cabinet plant pot
        platforms.create(1270, 1270, 'shortPlatformInvis'); // left sofa arm
        platforms.create(2240, 1270, 'shortPlatformInvis'); // right sofa arm
        platforms.create(2450, 1050, 'shortPlatformInvis'); // lamp top
        platforms.create(2750, 960, 'shortPlatformInvis'); // door handle
        platforms.create(490, 795, 'mediumPlatformInvis'); // big cabinet frame
        platforms.create(2370, 370, 'mediumPlatformInvis'); // higher hanging frame
        platforms.create(2370, 625, 'mediumPlatformInvis'); // lower hanging frame
        platforms.create(1030, 1465, 'mediumPlatformInvis'); // floor plant pot
        platforms.create(2010, 1190, 'mediumPlatformInvis'); // sofa cushion
        platforms.create(2470, 1330, 'medLongPlatformInvis'); // lamp table
        platforms.create(1160, 420, 'medLongPlatformInvis'); // big wall frame

        platforms.create(1600, 1650,'floorplatform');

        player = this.physics.add.sprite(100, 950, 'walk');
        player.setCollideWorldBounds(true);
        player.setMaxVelocity(400, 400)
        player.play('walkR');

        // Treasures to collect
        var pearl = this.physics.add.sprite(1270, 1230, 'pearl'); // sofa arm
        var diamond = this.physics.add.sprite(2000, 1070, 'diamond'); // top of the sofa
        var key = this.physics.add.sprite(3130, 230, 'key'); // on top of door
        var wallet = this.physics.add.sprite(2515, 1270, 'wallet'); // lamp table
        var earbud = this.physics.add.sprite(800, 900, 'earbud'); // counter plant
        var earring1 = this.physics.add.sprite(2150, 230, 'earring1'); // curtain rail
        var earring2 = this.physics.add.sprite(1050, 380, 'earring2'); // on picture frame
        var brooch = this.physics.add.sprite(1010, 1420, 'brooch'); // in big plant pot
        var usb = this.physics.add.sprite(130, 1580, 'usb'); // under counter
        var ring = this.physics.add.sprite(280, 1000, 'ring'); // on the counter
        var watch = this.physics.add.sprite(2125, 1320, 'watch'); // behind sofa cushion

        treasures = this.physics.add.group();
        treasures.add(brooch);
        treasures.add(diamond);
        treasures.add(key);
        treasures.add(ring);
        treasures.add(earbud);
        treasures.add(earring1);
        treasures.add(earring2);
        treasures.add(pearl);
        treasures.add(usb);
        treasures.add(wallet);
        treasures.add(watch);

        // Colliders
        this.physics.add.overlap(player, treasures, collectItem, null, this);
        this.physics.add.collider(player, platforms, null, checkOneWay, this);
        this.physics.add.collider(treasures, platforms);

        // Display Treasures collected per room
        treasureCollectedText = this.add.text(
            config.width * 0.03,
            config.height * 0.05,
            "Treasure collected: " + totalTreasure + "/11",
            {align: 'center',
             fontSize: '24px',
             fill: '#FFF',
             backgroundColor: 'rgba(0,0,0,0.5)'}
        );
        treasureCollectedText.setScrollFactor(0);
    }

    update ()
    {
        var config = this.game.config;

        player.setAcceleration(0, 0);
        var x = player.body.velocity.x;

        if (cursors.left.isDown)
        {
            
            if (player.body.touching.down)
            {
                player.setAccelerationX(-2000);
                player.anims.play('walkL', true);
            }
            else
            {
                player.setAccelerationX(-1000);
                player.anims.play('flyL', true);
            }
        }
        else if (cursors.right.isDown)
        {
            
            if (player.body.touching.down)
            {
                player.setAccelerationX(2000);
                player.anims.play('walkR', true);
            }
            else
            {
                player.setAccelerationX(1000);
                player.anims.play('flyR', true);
            }
        }
        else
        {
            if (x < -30)
            {
                player.setAccelerationX(4000);
            }
            else if (x > 30)
            {
                player.setAccelerationX(-4000);
            }
            else
            {
                player.setVelocityX(0);
                if (player.body.touching.down) // causes the sprite to change to walking when landing
                {
                    if (player.anims.currentAnim.key == 'flyR')
                    {
                        player.anims.play('walkR', true);
                    }
                    else if (player.anims.currentAnim.key == 'flyL')
                    {
                        player.anims.play('walkL', true);
                    }
                    player.anims.stop();
                }
            }
            
        }
        
        if (cursors.up.isDown)
        {
            player.setAccelerationY(-4000);
            if (x < 0)
            {
                player.anims.play('flyL', true);
            }
            else
            {
                player.anims.play('flyR', true);
            }
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

    totalTreasure = totalTreasure + 1;
    treasureCollectedText.setText("Treasure collected: " + totalTreasure + "/11");

    if (totalTreasure == 11)
    {
        totalTreasure = 0;
        this.scene.start('End');
    }
}

function checkOneWay(player, oneway) {
    //if player is higher up the screen then the plaform then enable the collision
    // + 50 to make it the feet of the player
    if ((player.y + 50) < oneway.y) {
        // disable collision if down is held
        if (cursors.down.isDown) {
            return false;
        }
        else {
            return true;
        }
    }
    //otherwise disable collision
    return false;
}

