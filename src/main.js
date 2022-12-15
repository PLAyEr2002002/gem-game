/**@type {import("../typings/phaser")} */
let diamonds;

let player;
let score = 0;
let scoreText = '';
let cursors;
let timer = 0;
let cond = true;

const CST = {
    SCENES: {
        LOAD: "LOAD",
        MENU: "MENU",
        LEVELS: "LEVELS",
        LEVEL1: "LEVEL1",
        LEVEL2: "LEVEL2",
        LEVEL3: "LEVEL3",
        LEVEL4: "LEVEL4",
        LEVEL5: "LEVEL5"
    }
}
class LoadScene extends Phaser.Scene {
    constructor() {
        super({
            key: CST.SCENES.LOAD
        })
    }
    init() { }
    preload() {
        //CONTROLS pics in level 1 //
        this.load.image('cmd1', './assets/cmd1.png');
        this.load.image('cmd2', './assets/cmd2.png');
        this.load.image('enemywarning', './assets/enemywarning.png');
        this.load.image('arrowkeys', './assets/arrowkeys1.png');
        this.load.image('wasd', './assets/wasd1.png');

        this.load.image('title', './assets/title.png');
        this.load.image('loadingtxt', './assets/loadingtxt.png');

        this.load.image('play', './assets/play.png');
        this.load.image('levels', './assets/levels.png');
        this.load.image('diamond', './assets/diamond.png');
        this.load.image('background', './assets/background.png');
        this.load.image('menu', './assets/backcity.png');
        this.load.image('square', './assets/square.png');

        this.load.spritesheet('hoody', './assets/hoody.png', {
            frameHeight: 32,
            frameWidth: 32
        });
        this.load.audio('music', './assets/background.mp3');
        this.load.audio('buttonsnd', './assets/buttonsound.mp3');
        this.load.audio('buttonclk', './assets/buttonclick.mp3');

        this.load.audio('jump', './assets/jumping.mp3');
        this.load.audio('gim', './assets/gim.mp3');

        this.load.audio('forest', './assets/forestsound.mp3');
        this.load.image('lv1layer1', './assets/woods/background/layer1.png');
        this.load.image('lv1layer2', './assets/woods/background/layer2.png');
        this.load.image('lv1layer3', './assets/woods/background/layer3.png');

        this.load.image('lvl1mid', './assets/lvl1mid.png');
        this.load.image('lvl1side', './assets/lvl1side.png');

        this.load.spritesheet('shop', './assets/shop.png', {
            frameHeight: 128,
            frameWidth: 118
        });
        this.load.spritesheet('key', './assets/key.png', {
            frameHeight: 32,
            frameWidth: 32
        });

        this.load.image('lv1layer1', './assets/woods/background/layer1.png');
        this.load.image('lv1layer2', './assets/woods/background/layer2.png');
        this.load.image('lv1layer3', './assets/woods/background/layer3.png');
        this.load.image('rock', './assets/woods/decorations/rock_3.png');
        this.load.image('fence', './assets/woods/decorations/fence_1.png');
        this.load.image('lamp', './assets/woods/decorations/lamp.png');
        this.load.image('grass', './assets/woods/decorations/grass_3.png');

        let loadingBar = this.add.graphics({
            fillStyle: {
                color: 0xffffff
            }
        })

        this.load.on('progress', (percent) => {
            loadingBar.fillRect(0, this.game.renderer.height / 2, this.game.renderer.width * percent, 50);
            console.log(percent);
        })

        this.load.on("complete", () => {
            console.log('done');
        })
    }
    create() { this.scene.start(CST.SCENES.MENU) }
}

let soundcond = false;
let finished = false;

class MenuScene extends Phaser.Scene {
    constructor() {
        super({
            key: CST.SCENES.MENU
        })
    }
    init() { }

    create() {
        this.add.image
        this.add.image(0, 0, 'menu').setOrigin(0);
        this.add.image(this.game.renderer.width / 2, this.game.renderer.height * 0.3, 'title').setScale(2);
        let playbtn = this.add.image(this.game.renderer.width / 2, this.game.renderer.height * 0.5, 'play').setScale(1);
        let optionbtn = this.add.image(this.game.renderer.width / 2, this.game.renderer.height * 0.7, 'levels').setScale(0.8);

        player = this.add.sprite(100, 100, 'hoody');
        player.setScale(4);
        player.setVisible(false);
        if (!soundcond) {
            this.sound.play('music', { loop: true });
            soundcond = true;
        }

        this.anims.create({
            key: 'walk',
            frames: this.anims.generateFrameNumbers("hoody", {
                frames: [0, 1, 8, 9, 0, 1, 8, 9, 0, 1, 8, 9, 56, 57, 58, 59, 60, 61, 62, 63]
            })
            ,
            frameRate: 4
        });

        playbtn.setInteractive();

        playbtn.on('pointerover', () => {
            this.sound.play('buttonsnd');

            player.setVisible(true);
            player.play('walk');
            player.x = playbtn.x - playbtn.width - 5
            player.y = playbtn.y
            console.log('hovered')
        })
        playbtn.on('pointerout', () => {
            console.log('out')
            player.setVisible(false);
        })

        optionbtn.setInteractive();
        optionbtn.on('pointerover', () => {
            this.sound.play('buttonsnd');
            player.setVisible(true);
            player.play('walk');

            player.x = optionbtn.x - optionbtn.width - 5
            player.y = optionbtn.y
            console.log('hovered')
        })
        optionbtn.on('pointerout', () => {
            console.log('out')
            player.setVisible(false);

        })

        playbtn.on("pointerup", () => {
            console.log("startplaying");
            this.game.sound.stopAll();
            this.sound.play('buttonclk');

            this.scene.start(CST.SCENES.LEVEL1)
        })
        optionbtn.on("pointerup", () => {
            console.log("optplaying");
            this.sound.play('buttonclk');
            if (finished) {
                // soundcond = false;
                this.scene.start(CST.SCENES.LEVELS)
            }
        })
    }
}

class levels extends Phaser.Scene {
    constructor() {
        super({
            key: CST.SCENES.LEVELS
        })
    }
    init() { }
    preload() {
        this.load.image('lvl1', './assets/file/level1.png');
        this.load.image('lvl2', './assets/file/LEVEL 2.png');
        this.load.image('lvl3', './assets/file/LEVEL 3.png');
        this.load.image('lvl4', './assets/file/LEVEL 4.png');
        this.load.image('lvl5', './assets/file/LEVEL 5.png');
    }
    create() {
        if (!soundcond) {
            this.sound.play('music', { loop: true });
            soundcond = true;
        }
        this.add.image(0, 0, 'menu').setOrigin(0);

        let lvl1 = this.add.image(this.game.renderer.width / 3 - 200, this.game.renderer.height * 0.3, 'lvl1').setScale(0.7);

        let lvl2 = this.add.image(this.game.renderer.width * 2 / 3 - 200, this.game.renderer.height * 0.3, 'lvl2').setScale(0.7);

        let lvl3 = this.add.image(this.game.renderer.width - 200, this.game.renderer.height * 0.3, 'lvl3').setScale(0.7);

        let lvl4 = this.add.image(this.game.renderer.width / 3 - 200, this.game.renderer.height * 0.4, 'lvl4').setScale(0.7);

        let lvl5 = this.add.image(this.game.renderer.width * 2 / 3 - 200, this.game.renderer.height * 0.4, 'lvl5').setScale(0.7);

        lvl1.setInteractive();
        lvl2.setInteractive();
        lvl3.setInteractive();
        lvl4.setInteractive();
        lvl5.setInteractive();

        lvl1.on("pointerup", () => {
            this.game.sound.stopAll();
            this.scene.start(CST.SCENES.LEVEL1)
        })
        lvl2.on("pointerup", () => {
            this.game.sound.stopAll();
            this.scene.start(CST.SCENES.LEVEL2)
        })
        lvl3.on("pointerup", () => {
            this.game.sound.stopAll();
            this.scene.start(CST.SCENES.LEVEL3)
        })
        lvl4.on("pointerup", () => {
            this.game.sound.stopAll();
            this.scene.start(CST.SCENES.LEVEL4)
        })
        lvl5.on("pointerup", () => {
            this.game.sound.stopAll();
            this.scene.start(CST.SCENES.LEVEL5)
        })
    }
}

class Level1 extends Phaser.Scene {
    constructor() {
        super({
            key: CST.SCENES.LEVEL1
        })
    }
    init() { }
    preload() { }
    create() {
        if (!soundcond) {
            this.sound.play('music', { loop: true });
            soundcond = true;
        }
        this.add.image(0, 0, 'lv1layer1').setOrigin(0).setScale(6);
        this.add.image(0, 0, 'lv1layer2').setOrigin(0).setScale(6);
        this.add.image(0, 0, 'lv1layer3').setOrigin(0).setScale(6);
        this.sound.play('forest', { loop: true });
        this.add.image(1700, 910, 'rock').setScale(4);
        this.add.image(400, 910, 'lamp').setScale(3);
        this.add.image(500, 910, 'fence').setScale(3);
        this.add.image(600, 910, 'lamp').setScale(3);

        //commands pics//
        this.add.image(1300, 190, 'cmd1').setScale(0.3);
        //  this.add.image(1300, 250, 'cmd2').setScale(0.3);
        this.add.image(1100, 300, 'arrowkeys').setScale(0.4);
        this.add.image(1400, 300, 'wasd').setScale(0.5);
        ///////////////////tiles 
        var platforms = this.physics.add.staticGroup();
        let x = 0;
        while (x != 80) {
            x = x + 1
            let y = platforms.create(24 * x, 965, 'lvl1mid');
            y.body.immovable = true;
        }
        platforms.create(40, 1010, 'lvl1side').setScale(3)
        platforms.create(40, 1030, 'lvl1side').setScale(3)
        x = 0;
        while (x != 28) {
            x = x + 1;
            let ins = platforms.create(40 + (24 * 3 * x), 1010, 'lvl1mid').setScale(3);
            platforms.create(40 + (24 * 3 * x), 1030, 'lvl1mid').setScale(3);

            ins.body.immovable = true;
        }

        platforms.enableBody = true

        let wall = this.physics.add.staticGroup();

        wall.create(1900, 200, 'lvl1side').setScale(3)
        wall.create(1900, 300, 'lvl1side').setScale(3)
        wall.create(1900, 400, 'lvl1side').setScale(3)
        wall.create(1900, 500, 'lvl1side').setScale(3)
        wall.create(1900, 600, 'lvl1side').setScale(3)
        wall.create(1900, 700, 'lvl1side').setScale(3)
        wall.create(1900, 800, 'lvl1side').setScale(3)
        wall.create(1900, 900, 'lvl1side').setScale(3)
        wall.create(1400, 920, 'lvl1side').setScale(3)

        wall.create(900, 750, 'lvl1mid')
        wall.create(900, 800, 'lvl1mid').setScale(3)
        this.add.image(900, 650, 'lamp').setScale(3);

        wall.create(1200, 600, 'lvl1mid')
        wall.create(1200, 650, 'lvl1mid').setScale(3)
        wall.create(1500, 550, 'lvl1mid')
        wall.create(1500, 600, 'lvl1mid').setScale(3)
        wall.create(900, 750, 'lvl1mid')
        wall.create(900, 800, 'lvl1mid').setScale(3)
        wall.create(600, 450, 'lvl1mid')
        wall.create(600, 500, 'lvl1mid').setScale(3)
        this.add.image(600, 410, 'grass').setScale(3);
        this.add.image(600, 420, 'grass').setScale(3);
        this.add.image(610, 420, 'grass').setScale(3);
        this.add.image(590, 420, 'grass').setScale(3);

        /////////////////////tiles

        let shop = this.add.sprite(200, 750, 'shop').setScale(3);
        player = this.physics.add.sprite(200, 750, 'hoody').setScale(2.5);
        player.body.gravity.y = 1000;

        let key = this.physics.add.sprite(570, 350, 'key').setScale(2.5);

        player.setBounce = 0.2;

        player.body.setCollideWorldBounds(true);
        this.physics.add.collider(player, wall);

        this.physics.add.collider(player, platforms);

        this.physics.add.collider(key, wall);

        /////////////////////////////////////////////////animations
        this.anims.create({
            key: 'key',
            frames: this.anims.generateFrameNumbers('key', { start: 0, end: 11 }),
            frameRate: 5,
            repeat: -1
        });
        key.play('key');
        this.anims.create({
            key: 'cook',
            frames: this.anims.generateFrameNumbers("shop", {
                frames: [0, 1, 2, 3, 4, 5]
            })
            ,
            frameRate: 4,
            repeat: -1
        });
        shop.play('cook');

        this.anims.create({
            key: 'left',
            frames: this.anims.generateFrameNumbers('hoody', { start: 16, end: 19 }),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'walk',
            frames: this.anims.generateFrameNumbers("hoody", {
                frames: [0, 1, 8, 9, 0, 1, 8, 9, 0, 1, 8, 9, 0, 1, 8, 9, 0, 1, 8, 9, 0, 1, 8, 9, 0, 1, 8, 9, 0, 1, 8, 9, 0, 1, 8, 9, 56, 57, 58, 59, 60, 61, 62, 63, 63, 63, 63, 63, 63, 63, 63, 63, 63, 63, 63, 63,]
            })
            ,
            frameRate: 4
        });

        this.anims.create({
            key: 'right',
            frames: this.anims.generateFrameNumbers('hoody', { start: 24, end: 31 }),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'jump',
            frames: this.anims.generateFrameNumbers('hoody', { start: 40, end: 47 }),
            frameRate: 3,
            repeat: -1
        });

        //////////////////////////////////////////////////////////////////animations

        player.play('walk');

        diamonds = this.physics.add.group({
            key: 'diamond',
            repeat: 0,
            setXY: { x: 1900, y: 0, stepX: 200 }
        });
        this.physics.add.collider(diamonds, platforms);
        this.physics.add.collider(diamonds, wall);

        diamonds.children.iterate(function (child) {

            child.setBounceY(0.5);

        });
        scoreText = this.add.text(16, 16, 'score: 0', { fontSize: '40px', fill: '#ffffff' });
        this.physics.add.overlap(player, diamonds, this.collectdiamond, null, this);
        this.physics.add.overlap(player, key, this.getkey, null, this);

        cursors = this.input.keyboard.createCursorKeys();
        this.keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        this.keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        this.keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);

        let num = 0
        while (num != 18) {
            num = num + 1
            this.add.image(10 + (num * 30), 950, 'grass').setScale(5);
            this.add.image(10 + (num * 30), 970, 'grass').setScale(5);
        }
    }
    update() {
        if (cursors.left.isDown || this.keyA.isDown) {
            player.setVelocityX(-500);
            if (player.body.touching.down) { player.anims.play('left', true); }
        }
        else if (cursors.right.isDown || this.keyD.isDown) {
            player.setVelocityX(500);
            if (player.body.touching.down) { player.anims.play('right', true); }
        }
        else {
            player.setVelocityX(0);
            if (player.body.touching.down) { player.anims.play('walk', true); }
            ;
        }
        if ((cursors.up.isDown || this.keyW.isDown) && player.body.touching.down)// jump
        {
            player.setVelocityY(-900);//unplayable with value of 800, so i changed to 900
            player.anims.play('jump', true);
            this.sound.play('jump');
        }
    }
    collectdiamond(player, diamond) {
        diamond.disableBody(true, true);
        this.sound.play('gim');

        score = score + 10
        scoreText.setText('Score: ' + score);
        this.game.sound.stopAll();

        this.scene.start(CST.SCENES.LEVEL2)
    }
    getkey(player, key) {
        key.disableBody(true, true);
        this.sound.play('gim');

        score = score + 10
        scoreText.setText('Score: ' + score);
        diamonds.setVelocityX(-100);

    }
}



let fire;
timer = 0;
cond = true;
let wizard;
let wizardrev;
let muscond = false;

class Level2 extends Phaser.Scene {
    constructor() {
        super({
            key: CST.SCENES.LEVEL2
        })
    }
    init() { }
    preload() {
        this.load.audio('lost', './assets/file/lost.mp3');
        this.load.audio('levelup', './assets/file/levelup.mp3');

        this.load.spritesheet('fire', './assets/file/trap.png', {
            frameHeight: 41,
            frameWidth: 32
        });
        this.load.image('rockfloor1', './assets/file/rockfloor.png');

        this.load.image('rockfloor', './assets/file/rockfloor1.png');
        this.load.image('dirtfloor', './assets/file/dirtfloor.png');
        this.load.image('squarerock', './assets/file/squarerock.png');
        this.load.image('woods', './assets/file/woods.png');
        this.load.image('woods1', './assets/file/woods1.png');
        this.load.image('bushes', './assets/file/bushes.png');
        this.load.image('bushes1', './assets/file/bushes1.png');

        this.load.image('lavender', './assets/file/lavender.png');

        this.load.spritesheet('wizard', './assets/file/wizard.png', {
            frameHeight: 59,
            frameWidth: 80
        });
        this.load.spritesheet('wizardrev', './assets/file/wizardrev.png', {
            frameHeight: 56,
            frameWidth: 80
        });
    }

    create() {
        if (!soundcond) {
            this.sound.play('music', { loop: true });
            soundcond = true;
        }
        this.add.image(0, 0, 'lv1layer1').setOrigin(0).setScale(6);
        this.add.image(0, 0, 'lv1layer2').setOrigin(0).setScale(6);
        this.add.image(0, 0, 'lv1layer3').setOrigin(0).setScale(6);
        if (!muscond) {
            this.sound.play('forest', { loop: true, volume: 0.5 });
            muscond = true;
        }

        this.sound.play('levelup', { volume: 0.5 });

        ///////////////////tiles 
        var platforms = this.physics.add.staticGroup();
        let x = 0;
        while (x != 10) {
            x = x + 1
            let y = platforms.create(24 * x * 3, 965, 'rockfloor').setScale(2);

            y.body.immovable = true;
            y = platforms.create(24 * x * 3, 1080, 'dirtfloor').setScale(2);

            y.body.immovable = true;

        }
        let y = platforms.create(24 * (x + 1) * 3, 1080, 'dirtfloor').setScale(2);
        y.body.immovable = true;
        y = platforms.create(24 * (x + 2) * 3, 1080, 'dirtfloor').setScale(2);
        y.body.immovable = true;

        platforms.enableBody = true;

        this.add.image(830, 1050, 'dirtfloor');
        x = 12
        while (x != 25) {
            x = x + 1
            let y = platforms.create(25 * x * 3, 1060, 'rockfloor').setScale(2);

            y = platforms.create(25 * x * 3, 1030, 'rockfloor').setScale(2);

            y = platforms.create(25 * x * 3, 1000, 'rockfloor').setScale(2);

            y = platforms.create(25 * x * 3, 970, 'rockfloor').setScale(2);
        }
        y = platforms.create(1920, 800, 'rockfloor').setScale(2);

        platforms.create(1400, 650, 'squarerock').setScale(2);
        platforms.create(1100, 650, 'squarerock').setScale(2);

        y = platforms.create(490, 600, 'rockfloor1').setScale(2);
        y = platforms.create(700, 600, 'rockfloor').setScale(2);
        platforms.create(607, 670, 'squarerock').setScale(2);
        platforms.create(20, 500, 'woods').setScale(1);
        platforms.create(680, 300, 'woods1').setScale(1);
        platforms.create(1570, 300, 'woods1').setScale(1);
        platforms.create(400, 300, 'squarerock').setScale(2);
        platforms.create(1050, 400, 'squarerock').setScale(2);
        platforms.create(1250, 400, 'squarerock').setScale(2);

        x = 0;
        while (x != 20) {
            platforms.create(100 * x, 30, 'woods1').setScale(1);
            x = x + 1;
        }

        /////////////////////tiles
        fire = this.physics.add.sprite(830, 1010, 'fire').setScale(2.5);

        player = this.physics.add.sprite(200, 750, 'hoody').setScale(2.5);
        player.body.gravity.y = 1000;

        wizard = this.physics.add.sprite(1300, 340, 'wizard').setScale(2);
        wizardrev = this.physics.add.sprite(300, 400, 'wizardrev').setScale(2.5);

        let key = this.physics.add.sprite(1600, 200, 'key').setScale(2.5);

        player.setBounce = 0.2;
        player.body.gravity.y = 1000;

        player.body.setCollideWorldBounds(true);
        wizard.body.allowGravity = false;
        wizardrev.body.allowGravity = false;

        this.physics.add.collider(player, platforms);
        this.physics.add.collider(fire, platforms);
        this.physics.add.collider(key, platforms);


        /////////////////////////////////////////////////animations

        this.anims.create({
            key: 'key',
            frames: this.anims.generateFrameNumbers('key', { start: 0, end: 11 }),
            frameRate: 5,
            repeat: -1
        });

        this.anims.create({
            key: 'left',
            frames: this.anims.generateFrameNumbers('hoody', { start: 16, end: 19 }),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: 'fire',
            frames: this.anims.generateFrameNumbers('fire', { start: 3, end: 10 }),
            frameRate: 7,
            repeat: -1
        });
        fire.play('fire')

        this.anims.create({
            key: 'walk',
            frames: this.anims.generateFrameNumbers("hoody", {
                frames: [0, 1, 8, 9, 0, 1, 8, 9, 0, 1, 8, 9, 0, 1, 8, 9, 0, 1, 8, 9, 0, 1, 8, 9, 0, 1, 8, 9, 0, 1, 8, 9, 0, 1, 8, 9, 56, 57, 58, 59, 60, 61, 62, 63, 63, 63, 63, 63, 63, 63, 63, 63, 63, 63, 63, 63,]
            })
            ,
            frameRate: 4
        });

        this.anims.create({
            key: 'right',
            frames: this.anims.generateFrameNumbers('hoody', { start: 24, end: 31 }),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'jump',
            frames: this.anims.generateFrameNumbers('hoody', { start: 40, end: 47 }),
            frameRate: 3,
            repeat: -1
        });

        this.anims.create({
            key: 'attackwiz',
            frames: this.anims.generateFrameNumbers('wizard', {
                frames: [0, 1, 2, 3, 4, 5, 4, 5, 4, 5, 4, 5, 4, 5, 4, 5, 4, 5, 4, 5, 4, 5, 4, 5, 4, 5, 4, 5]
            }),
            frameRate: 5,
            repeat: -1
        });

        this.anims.create({
            key: 'stopkwiz',
            frames: this.anims.generateFrameNumbers('wizard', { start: 0, end: 0 }),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'attackwizrev',
            frames: this.anims.generateFrameNumbers('wizardrev', {
                frames: [5, 4, 3, 2, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0]
            }),
            frameRate: 5,
            repeat: -1
        });

        this.anims.create({
            key: 'stopwizrev',
            frames: this.anims.generateFrameNumbers('wizardrev', { start: 5, end: 5 }),
            frameRate: 10,
            repeat: -1
        });

        //////////////////////////////////////////////////////////////////animations

        player.play('walk');

        key.play('key');

        diamonds = this.physics.add.group({
            key: 'diamond',
            repeat: 0,
            setXY: { x: 30, y: 1000, stepX: 200 }
        });
        this.physics.add.collider(diamonds, platforms);

        diamonds.children.iterate(function (child) {

            child.setBounceY(0.5);
        });

        scoreText = this.add.text(16, 16, 'Score: ' + score, { fontSize: '40px', fill: '#ffffff' });
        this.physics.add.overlap(player, diamonds, this.collectdiamond, null, this);
        this.physics.add.overlap(player, key, this.getkey, null, this);
        this.physics.add.overlap(player, key, this.gamereset, null, this);
        this.physics.add.overlap(player, wizard, this.gamereset, null, this);
        this.physics.add.overlap(player, wizardrev, this.gamereset, null, this);
        this.physics.add.overlap(player, fire, this.gamereset, null, this);

        cursors = this.input.keyboard.createCursorKeys();
        this.keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        this.keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        this.keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);

        wizard.setVelocityX(-150);
        wizardrev.setVelocityX(150);

        wizard.anims.play('attackwiz', true);
        wizardrev.anims.play('attackwizrev', true);

        this.add.image(0, 1010, 'bushes').setOrigin(0).setScale(1);
        this.add.image(0, 900, 'bushes').setOrigin(0).setScale(1);
        this.add.image(1000, 890, 'fence').setOrigin(0).setScale(3);
        this.add.image(1200, 890, 'fence').setOrigin(0).setScale(3);
        this.add.image(1400, 890, 'fence').setOrigin(0).setScale(3);
        this.add.image(900, 780, 'lamp').setOrigin(0).setScale(3);
        this.add.image(1480, 220, 'bushes1').setOrigin(0).setScale(1);
        this.add.image(1480, 200, 'bushes1').setOrigin(0).setScale(1);
        this.add.image(1050, 930, 'grass').setOrigin(0).setScale(5);

        x = 0
        while (x != 10) {
            this.add.image(1100 + (x * 50), 930, 'grass').setOrigin(0).setScale(5);
            x = x + 1

        }
        this.add.image(1800, 900, 'rock').setOrigin(0).setScale(3);

    }
    update() {
        timer = timer + 1;
        console.log(timer)
        if (cond == true && (timer % 300 == 0)) {
            wizard.setVelocityX(150);
            wizardrev.setVelocityX(-150);

            cond = false
            wizard.anims.play('stopkwiz', true);
            wizardrev.anims.play('stopwizrev', true);

        } else if (cond == false && (timer % 300 == 0)) {
            wizard.anims.play('attackwiz', true);
            wizardrev.anims.play('attackwizrev', true);

            wizardrev.setVelocityX(150);

            wizard.setVelocityX(-150);
            cond = true
        }
        if (cursors.left.isDown || this.keyA.isDown) {
            player.setVelocityX(-500);
            if (player.body.touching.down) { player.anims.play('left', true); }
        }
        else if (cursors.right.isDown || this.keyD.isDown) {
            player.setVelocityX(500);
            if (player.body.touching.down) { player.anims.play('right', true); }
        }
        else {
            player.setVelocityX(0);
            if (player.body.touching.down) { player.anims.play('walk', true); }
            ;
        }

        if ((cursors.up.isDown || this.keyW.isDown) && player.body.touching.down)// jump
        {
            player.setVelocityY(-800);
            player.anims.play('jump', true);
            this.sound.play('jump');
        }
    }
    collectdiamond(player, diamond) {
        diamond.disableBody(true, true);
        this.sound.play('gim');

        score = score + 10
        scoreText.setText('Score: ' + score);
        this.game.sound.stopAll();
        this.scene.start(CST.SCENES.LEVEL3)
    }
    getkey(player, key) {
        key.disableBody(true, true);
        fire.disableBody(true, true);
        this.sound.play('gim');

        score = score + 10
        scoreText.setText('Score: ' + score);
        diamonds.setVelocityX(100);
    }
    gamereset(player, key) {
        this.sound.play('lost');
        this.scene.start(CST.SCENES.LEVEL2)
    }
}
/////////////HAMMAAD'S LEVEL/////////
let spike;
let spike1;
let fire2;
//following are taken from (level 2 , asims level) they only need to be shown once before any level
// let timer=0;
// let cond=true;
// let wizard;
// let wizardrev;
// let muscond=false;
//following are taken from (level 2 , asims level)
class Level3 extends Phaser.Scene {
    constructor() {
        super({
            key: CST.SCENES.LEVEL3
        })
    }
    init() { }
    preload() {
        this.load.audio('lost', './assets/file/lost.mp3'); //gameover sound
        // this.load.audio('seaside','./assets/seaside-soft-waves.mp3');

        this.load.image('background3', './assets/level3/background-beach.png');

        this.load.image('rockfloor', './assets/file/rockfloor.png');
        this.load.image('dirtfloor', './assets/file/dirtfloor.png');
        this.load.image('squarerock', './assets/file/squarerock.png');
        this.load.image('beachrock', './assets/level3/ssquare.png');
        this.load.image('sand', './assets/level3/sand.png');

        this.load.image('tree2', './assets/level3/tree2.png');
        this.load.image('tree1', './assets/level3/tree1.png');
        this.load.image('tree3', './assets/level3/tree3.png');
        this.load.image('tree4', './assets/level3/tree4.png');

        this.load.image('veg1', './assets/level3/veg1.png');
        this.load.image('veg2', './assets/level3/veg2.png');
        this.load.image('veg3', './assets/level3/veg3.png');
        this.load.image('vegsmall', './assets/level3/vegsmall.png');

        //CHANGE SIZE OF SPIKESSS///
        this.load.spritesheet('spike', './assets/level3/spikes.png', {
            frameHeight: 41,
            frameWidth: 32
        }); //spike or trap same thing

        this.load.spritesheet('spikelong', './assets/level3/trap_spike.png', {
            frameHeight: 41,
            frameWidth: 32
        });

        this.load.spritesheet('wizard', './assets/file/wizard.png', {
            frameHeight: 59,
            frameWidth: 80
        });
        this.load.spritesheet('wizardrev', './assets/file/wizardrev.png', {
            frameHeight: 56,
            frameWidth: 80
        });
    }

    create() {
        if (!soundcond) {
            this.sound.play('music', { loop: true });
            soundcond = true;
        }
        this.add.image(0, 0, 'background3').setOrigin(0).setScale(6);
        //    this.add.image(0,0,'lv1layer2').setOrigin(0).setScale(6);
        //     this.add.image(0,0,'lv1layer3').setOrigin(0).setScale(6);

        if (!muscond) {
            this.sound.play('forest', { loop: true, volume: 0.5 });
            muscond = true;
        }
        // this.sound.play('forest',{loop:true});
        // this.add.image(1700,910,'rock').setScale(4);
        // this.add.image(400,910,'lamp').setScale(3);
        // this.add.image(500,910,'fence').setScale(3);
        // this.add.image(600,910,'lamp').setScale(3);
        this.add.image(1100, 750, 'tree2').setScale(4);
        this.add.image(1500, 750, 'tree3').setScale(4);
        this.add.image(200, 750, 'tree1').setScale(4);
        this.add.image(1800, 750, 'tree4').setScale(4);

        this.add.image(1050, 370, 'veg1').setScale(4);
        this.add.image(1050, 370, 'veg2').setScale(4);
        this.add.image(1050, 370, 'veg3').setScale(4);

        this.add.image(1250, 570, 'veg1').setScale(4);
        this.add.image(1250, 570, 'veg2').setScale(4);
        this.add.image(1250, 570, 'veg3').setScale(4);


        ///////////////////tiles 
        var platforms = this.physics.add.staticGroup();

        //idk what this code does//
        let x = 0;
        while (x != 80) {
            x = x + 1
            let y = platforms.create(24 * x, 965, 'lvl1mid');
            y.body.immovable = true;
        }//idk what this code does//

        // platforms.create(1000,350, 'lvl1side').setScale(2)// NEW TILE 1 (for key)
        platforms.create(50, 500, 'beachrock').setScale(2) //(for key)

        platforms.create(900, 750, 'beachrock').setScale(2)//SQB1
        platforms.create(800, 550, 'beachrock').setScale(2)//SQB2

        platforms.create(1800, 550, 'beachrock').setScale(2)//SQB3
        platforms.create(1900, 400, 'beachrock').setScale(2)// SQB4

        platforms.create(400, 500, 'beachrock').setScale(2)// SQB5

        //FLOOR for key and above player spawn//
        platforms.create(40, 700, 'dirtfloor').setScale(1.5)
        platforms.create(100, 700, 'dirtfloor').setScale(1.5)
        platforms.create(200, 700, 'dirtfloor').setScale(1.5)
        platforms.create(300, 700, 'dirtfloor').setScale(1.5)
        platforms.create(400, 700, 'dirtfloor').setScale(1.5)
        platforms.create(500, 700, 'dirtfloor').setScale(1.5)
        platforms.create(600, 700, 'dirtfloor').setScale(1.5)
        //FLOOR for key and above player spawn//

        //rockfloor beneath diamond
        platforms.create(1590, 290, 'rockfloor').setScale(1.5)
        platforms.create(1690, 290, 'rockfloor').setScale(1.5)

        //rockfloor in middle of map
        platforms.create(1050, 450, 'rockfloor').setScale(1.5)
        platforms.create(1250, 650, 'rockfloor').setScale(1.5)
        // platforms.create(1100,450, 'rockfloor').setScale(1.5)

        // platforms.create(1200,450, 'rockfloor').setScale(1.5)
        //rockfloor in middle of map

        // platforms.create(24*x*3,400, 'rockfloor').setScale(2);
        x = 0;
        while (x != 28) {
            x = x + 1;
            let ins = platforms.create(40 + (24 * 3 * x), 975, 'sand').setScale(3);
            platforms.create(40 + (24 * 3 * x), 975, 'sand').setScale(3);

            ins.body.immovable = true;
        }

        platforms.enableBody = true

        let wall = this.physics.add.staticGroup();



        //wall for blockin key//
        wall.create(630, 355, 'squarerock').setScale(2.5)
        wall.create(630, 405, 'squarerock').setScale(2.5)
        wall.create(630, 455, 'squarerock').setScale(2.5)
        wall.create(630, 505, 'squarerock').setScale(2.5)
        wall.create(630, 555, 'squarerock').setScale(2.5)
        wall.create(630, 595, 'squarerock').setScale(2.5)
        wall.create(630, 655, 'squarerock').setScale(2.5)
        //wall for blockin key//

        //wall for blockin DIAMOND//
        wall.create(1550, 100, 'squarerock').setScale(2)
        wall.create(1550, 150, 'squarerock').setScale(2)
        wall.create(1550, 200, 'squarerock').setScale(2)
        wall.create(1550, 250, 'squarerock').setScale(2)
        // wall.create(1550,555, 'squarerock').setScale(2)
        // wall.create(1550,595, 'squarerock').setScale(2)
        // wall.create(1550,655, 'squarerock').setScale(2)
        //wall for blockin diamond//

        // wall.create(1900,200, 'lvl1side').setScale(3)
        // wall.create(1900,300, 'lvl1side').setScale(3)
        // wall.create(1900,400, 'lvl1side').setScale(3)
        // wall.create(1900,500, 'lvl1side').setScale(3)
        // wall.create(1900,600, 'lvl1side').setScale(3)
        // wall.create(1900,700, 'lvl1side').setScale(3)
        // wall.create(1900,800, 'lvl1side').setScale(3)
        // wall.create(1900,900, 'lvl1side').setScale(3)
        // wall.create(1400,920, 'lvl1side').setScale(3)

        //new wall//
        wall.create(1600, 200, 'lvl1side').setScale(1.3) //(for diamond)
        // wall.create(1700,300, 'lvl1side').setScale(1.3)
        // wall.create(1700,400, 'lvl1side').setScale(1.3)
        // wall.create(1700,500, 'lvl1side').setScale(3)
        // wall.create(1700,600, 'lvl1side').setScale(3)
        // wall.create(1700,700, 'lvl1side').setScale(1.3)
        // wall.create(1700,800, 'lvl1side').setScale(1.3)
        // wall.create(1700,900, 'lvl1side').setScale(1.3)
        // wall.create(1400,920, 'lvl1side').setScale(1.3)

        //new wall//


        // wall.create(900,750, 'lvl1mid')
        // wall.create(900,800, 'lvl1mid').setScale(3)
        // this.add.image(900,650,'lamp').setScale(3);

        // wall.create(1200,650, 'lvl1mid')
        // wall.create(1200,700, 'lvl1mid').setScale(3)
        // wall.create(1500,550, 'lvl1mid')
        // wall.create(1500,600, 'lvl1mid').setScale(3)
        // wall.create(900,750, 'lvl1mid')
        // wall.create(900,800, 'lvl1mid').setScale(3)
        // wall.create(600,450, 'lvl1mid')
        // wall.create(600,500, 'lvl1mid').setScale(3)
        // this.add.image(600,460,'grass').setScale(3);
        // this.add.image(600,470,'grass').setScale(3);
        // this.add.image(610,470,'grass').setScale(3);
        // this.add.image(590,470,'grass').setScale(3);



        /////////////////////tiles

        //fire or spikes

        spike = this.physics.add.sprite(400, 450, 'spike').setScale(1.5);
        spike1 = this.physics.add.sprite(1900, 350, 'spike').setScale(1.5);
        fire2 = this.physics.add.sprite(1500, 910, 'spikelong').setScale(2);

        wizard = this.physics.add.sprite(1800, 600, 'wizard').setScale(1.5);
        wizard.setX(2000)
        wizard.setY(600)
        wizardrev = this.physics.add.sprite(250, 200, 'wizardrev').setScale(1.7);

        // let shop=this.add.sprite(200,750,'shop').setScale(3);

        player = this.physics.add.sprite(200, 750, 'hoody').setScale(2.5); //old value 2.5

        let key = this.physics.add.sprite(50, 400, 'key').setScale(1);//original values were 600,400

        player.setBounce = 0.2;
        player.body.gravity.y = 1000;// abbad new line

        spike.body.allowGravity = false;
        spike1.body.allowGravity = false;
        fire2.body.allowGravity = false;

        wizard.body.allowGravity = false;
        wizardrev.body.allowGravity = false;

        player.body.setCollideWorldBounds(true);

        this.physics.add.collider(player, wall);

        this.physics.add.collider(player, platforms);

        this.physics.add.collider(key, wall);

        this.physics.add.collider(spike, platforms);

        this.physics.add.collider(spike1, platforms);
        this.physics.add.collider(fire2, platforms);

        /////////////////////////////////////////////////animations
        this.anims.create({
            key: 'key',
            frames: this.anims.generateFrameNumbers('key', { start: 0, end: 11 }),
            frameRate: 5,
            repeat: -1
        });
        key.play('key');
        // this.anims.create({
        //     key: 'cook',
        //     frames: this.anims.generateFrameNumbers("shop",{
        //     frames:[0,1,2,3,4,5]
        //     })
        //     ,
        //     frameRate: 4,
        //     repeat:-1  
        // });
        // shop.play('cook');

        this.anims.create({
            key: 'left',
            frames: this.anims.generateFrameNumbers('hoody', { start: 16, end: 19 }),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'walk',
            frames: this.anims.generateFrameNumbers("hoody", {
                frames: [0, 1, 8, 9, 0, 1, 8, 9, 0, 1, 8, 9, 0, 1, 8, 9, 0, 1, 8, 9, 0, 1, 8, 9, 0, 1, 8, 9, 0, 1, 8, 9, 0, 1, 8, 9, 56, 57, 58, 59, 60, 61, 62, 63, 63, 63, 63, 63, 63, 63, 63, 63, 63, 63, 63, 63,]
            })
            ,
            frameRate: 4
        });

        this.anims.create({
            key: 'right',
            frames: this.anims.generateFrameNumbers('hoody', { start: 24, end: 31 }),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'jump',
            frames: this.anims.generateFrameNumbers('hoody', { start: 40, end: 47 }),
            frameRate: 3,
            repeat: -1
        });

        //fire animation
        //fire


        // this.anims.create({
        //     key: 'fire',
        //     frames: this.anims.generateFrameNumbers('fire', { start: 3, end: 10 }),
        //     frameRate: 7,
        //     repeat: -1
        // });
        // fire.play('fire')
        // fire1.play('fire')

        this.anims.create({
            key: 'attackwiz',
            frames: this.anims.generateFrameNumbers('wizard', {
                frames: [0, 1, 2, 3, 4, 5, 4, 5, 4, 5, 4, 5, 4, 5, 4, 5, 4, 5, 4, 5, 4, 5, 4, 5, 4, 5, 4, 5]
            }),
            frameRate: 5,
            repeat: -1
        });

        this.anims.create({
            key: 'stopkwiz',
            frames: this.anims.generateFrameNumbers('wizard', { start: 0, end: 0 }),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'attackwizrev',
            frames: this.anims.generateFrameNumbers('wizardrev', {
                frames: [5, 4, 3, 2, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0]
            }),
            frameRate: 5,
            repeat: -1
        });

        this.anims.create({
            key: 'stopwizrev',
            frames: this.anims.generateFrameNumbers('wizardrev', { start: 5, end: 5 }),
            frameRate: 10,
            repeat: -1
        });

        //
        //////////////////////////////////////////////////////////////////animations

        player.play('walk');

        diamonds = this.physics.add.group({
            key: 'diamond',
            repeat: 0,
            setXY: { x: 1600, y: 0, stepX: 500 }
        });
        this.physics.add.collider(diamonds, platforms);
        this.physics.add.collider(diamonds, wall);
        this.physics.add.collider(key, platforms);

        diamonds.children.iterate(function (child) {

            child.setBounceY(0.5);

        });
        scoreText = this.add.text(16, 16, 'score: 0', { fontSize: '40px', fill: '#ffffff' });
        this.physics.add.overlap(player, diamonds, this.collectdiamond, null, this);
        this.physics.add.overlap(player, key, this.getkey, null, this);

        this.physics.add.overlap(player, spike, this.gamereset, null, this);
        this.physics.add.overlap(player, spike1, this.gamereset, null, this);
        this.physics.add.overlap(player, fire2, this.gamereset, null, this);

        this.physics.add.overlap(player, wizard, this.gamereset, null, this);
        this.physics.add.overlap(player, wizardrev, this.gamereset, null, this);

        cursors = this.input.keyboard.createCursorKeys();
        this.keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        this.keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        this.keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);

        wizard.setVelocityX(-500);
        wizardrev.setVelocityY(150);

        wizard.anims.play('attackwiz', true);
        wizardrev.anims.play('attackwizrev', true);

        let num = 0
        while (num != 18) {
            num = num + 1
            this.add.image(10 + (num * 30), 950, 'grass').setScale(5);
            this.add.image(10 + (num * 30), 970, 'grass').setScale(5);
        }
    }
    update() {
        timer = timer + 1;
        console.log(timer)
        if (cond == true && (timer % 100 == 0)) {
            // wizard.setVelocityX(150);//increase speed, dec time
            wizardrev.setVelocityY(-150);

            cond = false
            // wizard.anims.play('stopkwiz', true);
            wizardrev.anims.play('stopwizrev', true);

        } else if (cond == false && (timer % 100 == 0)) {
            // wizard.anims.play('attackwiz', true);
            wizardrev.anims.play('attackwizrev', true);

            wizardrev.setVelocityY(150);

            // wizard.setVelocityX(-150);
            cond = true
        }

        console.log(timer)
        if (cond == true && (timer % 200 == 0)) {
            wizard.setVelocityX(500);//increase speed, dec time
            // wizardrev.setVelocityY(-150);

            cond = false
            wizard.anims.play('stopkwiz', true);
            // wizardrev.anims.play('stopwizrev', true);

        } else if (cond == false && (timer % 200 == 0)) {
            wizard.anims.play('attackwiz', true);
            // wizardrev.anims.play('attackwizrev', true);

            // wizardrev.setVelocityY(150);

            wizard.setVelocityX(-500);
            cond = true
        }
        if (cursors.left.isDown || this.keyA.isDown) {
            player.setVelocityX(-500);
            if (player.body.touching.down) { player.anims.play('left', true); }
        }
        else if (cursors.right.isDown || this.keyD.isDown) {
            player.setVelocityX(500);
            if (player.body.touching.down) { player.anims.play('right', true); }
        }
        else {
            player.setVelocityX(0);
            if (player.body.touching.down) { player.anims.play('walk', true); }
            ;
        }

        if ((cursors.up.isDown || this.keyW.isDown) && player.body.touching.down)// jump
        {
            player.setVelocityY(-780);//old value -400
            player.anims.play('jump', true);
            this.sound.play('jump');
        }
    }

    collectdiamond(player, diamond) {
        diamond.disableBody(true, true);
        this.sound.play('gim');

        score = score + 10
        scoreText.setText('Score: ' + score);
        this.game.sound.stopAll();

        this.scene.start(CST.SCENES.LEVEL4)
    }

    getkey(player, key) {
        key.disableBody(true, true);
        this.sound.play('gim');
        spike.disableBody(true, true);
        spike1.disableBody(true, true);
        score = score + 10
        scoreText.setText('Score: ' + score);
        //  diamonds.setVelocityX(-10);
        //  diamonds.setVelocityY(-10);

    }

    gamereset(player, key) {
        this.sound.play('lost');
        this.scene.start(CST.SCENES.LEVEL3)

    }
}
//end of HAMMAAD'S LEVEL//

class Level4 extends Phaser.Scene {
    constructor() {
        super({
            key: CST.SCENES.LEVEL4
        });
        this.obj
    }
    init() { }
    preload() {
        this.load.image('lv2layer1', './assets/lvl2/background.png');
        this.load.spritesheet('hoodysp', './assets/lvl2/hoody_spring.png', {
            frameHeight: 32,
            frameWidth: 32
        });
        this.load.image('wall', './assets/lvl2/wall.png');
        this.load.image('surface', './assets/lvl2/earth_wall.png');
        this.load.image('fence', './assets/lvl2/fence.png')
        this.load.image('key1', './assets/lvl2/key.png')
        this.load.image('dim', './assets/lvl2/dim.png')
        this.load.image('bullet', './assets/lvl2/bullet.png')
        this.load.image('trap', './assets/lvl2/trap.png')
        //this.load.image('trap1','./assets/lvl2/untitled2.png')
        this.load.image('block', './assets/lvl2/block.png')
        this.load.spritesheet('wizard', './assets/lvl2/wizard.png', {
            frameHeight: 59,
            frameWidth: 80
        });
        this.load.spritesheet('wizardrev', './assets/lvl2/wizardrev.png', {
            frameHeight: 56,
            frameWidth: 80
        });//
    }
    create() {
        if (!soundcond) {
            this.sound.play('music', { loop: true });
            soundcond = true;
        }
        this.add.image(0, 0, 'lv2layer1').setOrigin(0).setScale(6);


        var platforms = this.physics.add.staticGroup();
        for (let i = 0; i < 1920; i++) {
            platforms.create(i, 1080, 'surface').setScale(1);
        }
        platforms.enableBody = true;

        //////////////////////////////////////walls
        let wall = this.physics.add.staticGroup();
        wall.enableBody = true;

        wall.create(this.cameras.main.width / 2, 100, 'fence').setScale(3, 2.5);

        //this.obj1 = this.add.image(this.cameras.main.width/2,this.cameras.main.height/2,'object1').scale(16,1);

        //random cube
        let s = [];
        let q = [];
        for (let i = 0; i < 6; i++) {
            let m = Math.random() * 1920;
            let n = Math.random() * (999 - 880) + 880;
            if (s.includes(m)) {
                wall.create(m + 8, n + 7, 'block').setScale(7, 3);
            } else {
                wall.create(m, n, 'block').setScale(7, 3);
            }
            s.push(m);
            q.push(n);
        }

        for (let i = 0; i < 1720; i++) {
            wall.create(i, 840, 'fence').setScale(3, 2.5);
            i += 130;
        };

        for (let i = 1900; i > 130; i--) {
            wall.create(i, 640, 'fence').setScale(3, 2.5);
            i -= 130;
        };

        for (let i = 0; i < 1300; i++) {
            wall.create(i, 400, 'fence').setScale(3, 2.5);
            i += 130;
        };
        for (let i = 1600; i < 1900; i++) {
            wall.create(i, 400, 'fence').setScale(3, 2.5);
            i += 130;
        };
        //////////////////////////////////////////////////////////////////////////

        ////////////////////////////////////////tiles

        //key

        let keyy = this.physics.add.sprite(this.cameras.main.width / 2, 70, 'key1').setScale(3);
        keyy.body.setGravityY(-300);

        let dim1 = this.physics.add.sprite(200, 360, 'dim').setScale(3);
        dim1.body.gravity.y = -300;

        // let dim2 = this.physics.add.sprite(1800,470,'dim').setScale(1);
        // dim2.body.gravity.y = -500;

        let bullet = this.physics.add.sprite(1920, 980, 'bullet').setScale(0.8);
        bullet.body.allowGravity = false;

        let bullet1 = this.physics.add.sprite(1920, 960, 'bullet').setScale(0.8);
        bullet1.body.allowGravity = false;

        let bullet2 = this.physics.add.sprite(1920, 980, 'bullet').setScale(0.8);
        bullet2.body.allowGravity = false;

        let trap = this.physics.add.sprite(1200, 820, 'trap').setScale(6, 6);
        let trap1 = this.physics.add.sprite(1000, 655, 'trap').setScale(6, 6);
        trap1.body.gravity.y = -300;

        let trap2 = this.physics.add.sprite(800, 820, 'trap').setScale(6, 6);
        let trap3 = this.physics.add.sprite(900, 1045, 'trap').setScale(6, 6);
        trap3.body.gravity.y = -300;

        let wizard = this.physics.add.sprite(1600, 550, 'wizard').setScale(2.5);

        wizard.body.allowGravity = false;

        player = this.physics.add.sprite(100, 900, 'hoodysp').setScale(2.5);
        player.body.gravity.y = 1000;

        player.body.setCollideWorldBounds(true);
        this.physics.add.collider(player, wall);
        this.physics.add.collider(player, platforms);
        keyy.body.setCollideWorldBounds(true);
        dim1.body.setCollideWorldBounds(true);
        //trap.body.setCollideWorldBounds(true);
        // dim2.body.setCollideWorldBounds(true);
        this.physics.add.collider(trap, wall);
        this.physics.add.collider(trap, platforms);
        this.physics.add.collider(trap1, wall);
        this.physics.add.collider(trap1, platforms);
        this.physics.add.collider(trap2, wall);
        this.physics.add.collider(trap2, platforms);
        this.physics.add.collider(trap3, wall);
        this.physics.add.collider(trap3, platforms);
        this.physics.add.collider(keyy, wall);
        this.physics.add.collider(keyy, platforms);
        this.physics.add.collider(dim1, wall);
        this.physics.add.collider(dim1, platforms);
        // this.physics.add.collider(dim2,wall);
        // this.physics.add.collider(dim2,platforms);

        ////////animation/////////////////////////////////////////////////////

        this.anims.create({
            key: 'left',
            frames: this.anims.generateFrameNumbers('hoodysp', { start: 16, end: 19 }),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'walk',
            frames: this.anims.generateFrameNumbers("hoodysp", {
                frames: [0, 1, 8, 9, 0, 1, 8, 9, 0, 1, 8, 9, 0, 1, 8, 9, 0, 1, 8, 9, 0, 1, 8, 9, 0, 1, 8, 9, 0, 1, 8, 9, 0, 1, 8, 9, 56, 57, 58, 59, 60, 61, 62, 63, 63, 63, 63, 63, 63, 63, 63, 63, 63, 63, 63, 63,]
            })
            ,
            frameRate: 4
        });

        this.anims.create({
            key: 'right',
            frames: this.anims.generateFrameNumbers('hoodysp', { start: 24, end: 31 }),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'jump',
            frames: this.anims.generateFrameNumbers('hoodysp', { start: 40, end: 47 }),
            frameRate: 3,
            repeat: -1
        });

        this.anims.create({
            key: 'attackwiz',
            frames: this.anims.generateFrameNumbers('wizard', {
                frames: [0, 1, 2, 3, 4, 5, 4, 5, 4, 5, 4, 5, 4, 5, 4, 5, 4, 5, 4, 5, 4, 5, 4, 5, 4, 5, 4, 5]
            }),
            frameRate: 5,
            repeat: -1
        });

        this.anims.create({
            key: 'stopkwiz',
            frames: this.anims.generateFrameNumbers('wizard', { start: 0, end: 0 }),
            frameRate: 10,
            repeat: -1
        });

        ///////////////////////////////////////////////////////////////////////////////////////////////
        player.play('walk');
        this.physics.add.overlap(player, trap, this.gamereset, null, this);
        this.physics.add.overlap(player, bullet, this.gamereset, null, this);
        this.physics.add.overlap(player, keyy, this.collectdiamond, null, this);
        this.physics.add.overlap(player, dim1, this.getkey, null, this);
        this.physics.add.overlap(player, bullet1, this.gamereset, null, this);
        this.physics.add.overlap(player, bullet2, this.gamereset, null, this);
        this.physics.add.overlap(player, trap1, this.gamereset, null, this);
        this.physics.add.overlap(player, trap2, this.gamereset, null, this);
        this.physics.add.overlap(player, trap3, this.gamereset, null, this);
        this.physics.add.overlap(player, wizard, this.gamereset, null, this);

        cursors = this.input.keyboard.createCursorKeys();
        this.keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        this.keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        this.keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);

        this.bulletsp(bullet, bullet1, bullet2);
        wizard.setVelocityX(-150);

        wizard.anims.play('attackwiz', true);
    }

    bulletsp(bull, bull1, bull2) {

        bull.setVelocityX(-600);
        bull1.setVelocityX(-400);
        bull2.setVelocityX(-200);
        if (bull.y < 0) {
            this.resbullet(bull)
        }

    }
    resbullet(bull) {
        bull.x = 1920;
        bull.y = 980;
        cond = true;

    }
    update() {
        if (cursors.left.isDown || this.keyA.isDown) {
            player.setVelocityX(-500);
            if (player.body.touching.down) { player.anims.play('left', true); }
        }
        else if (cursors.right.isDown || this.keyD.isDown) {
            player.setVelocityX(500);
            if (player.body.touching.down) { player.anims.play('right', true); }
        }
        else {
            player.setVelocityX(0);
            if (player.body.touching.down) { player.anims.play('walk', true); }
        }
        if ((cursors.up.isDown || this.keyW.isDown) && player.body.touching.down)// jump
        {
            player.setVelocityY(-800);
            player.anims.play('jump', true);
        }
    }
    getkey(player, dim1) {
        dim1.disableBody(true, true);

        player.body.setGravityY(100);
    }
    collectdiamond(player, keyy) {
        keyy.disableBody(true, true);
        finished = true;
        this.scene.start(CST.SCENES.LEVEL5);
    }
    gamereset(player, key) {
        //this.sound.play('lost');
        this.scene.start(CST.SCENES.LEVEL4)
    }
}

let timerForLVL4 = 0;
let block1;
let block2;
let block3;
let block1Surface;
let block2Surface;
let block3Surface;
let block1Counter = 2;
let block2Counter = 3;
let block3Counter = 4;
let movingChangeSpotsWhich = 2;
let blocksIn = 0;
let WinMessage = '';
let countDown = '';
let timeLimit = 25;
class Level5 extends Phaser.Scene {
    constructor() {
        super({
            key: CST.SCENES.LEVEL5
        })
    }
    init() { }
    preload() {
        this.load.audio('lost', './assets/file/lost.mp3');

        this.load.audio('jump', './assets/jumping.mp3');
        this.load.audio('gim', './assets/gim.mp3');
        this.load.audio('forest', './assets/forestsound.mp3');

        this.load.image('lv1layer1', './assets/woods/background/layer1.png');
        this.load.image('lv1layer2', './assets/woods/background/layer2.png');
        this.load.image('lv1layer3', './assets/woods/background/layer3.png');

        this.load.image('spike', './assets/assetsLevel4/spikePatch.png')
        this.load.image('floor', './assets/assetsLevel4/floor.png')
        this.load.image('movingSurface', './assets/assetsLevel4/movingSurface.png')
        this.load.image('movingChangeSpots', './assets/assetsLevel4/movingChangeSpots.png')
        this.load.image('pressurePlate', './assets/assetsLevel4/PressurePlates.png')
        this.load.image('block1', './assets/assetsLevel4/Block1.png')
        this.load.image('block2', './assets/assetsLevel4/Block2.png')
        this.load.image('block3', './assets/assetsLevel4/Block3.png')
        this.load.image('block1Surface', './assets/assetsLevel4/Block1Surface.png')
        this.load.image('block2Surface', './assets/assetsLevel4/Block2Surface.png')
        this.load.image('block3Surface', './assets/assetsLevel4/Block3Surface.png')
    }
    create() {
        if (!soundcond) {
            this.sound.play('music', { loop: true });
            soundcond = true;
        }
        this.add.image(0, 0, 'lv1layer1').setOrigin(0).setScale(6);
        this.sound.play('forest', { loop: true });
        var platforms = this.physics.add.staticGroup();
        for (let i = 1; i < 10; i++) {
            if (i != 3 && i != 6 && i != 9) {
                let ins = platforms.create(96 + (192 * i), 1010, 'floor');
                ins.body.immovable = true;
            }
        }

        let PressurePlateDrop = this.physics.add.image(384, 935, 'pressurePlate')
        let PressurePlateStay = this.physics.add.image(960, 935, 'pressurePlate')
        let PressurePlateUp = this.physics.add.image(1536, 935, 'pressurePlate')
        PressurePlateDrop.body.allowGravity = false;
        PressurePlateDrop.body.immovable = true;
        PressurePlateStay.body.allowGravity = false;
        PressurePlateStay.body.immovable = true;
        PressurePlateUp.body.allowGravity = false;
        PressurePlateUp.body.immovable = true;

        let movingSurfaces = this.physics.add.staticGroup();
        for (let i = 2; i < 9; i++) {
            if (i != 5 && i != 7) {
                movingSurfaces.create((192 * i), 125, 'movingSurface')
            }
            if (i != 3 && i != 5) {
                movingSurfaces.create((192 * i), 250, 'movingSurface')
            }
            if (i != 6) {
                movingSurfaces.create((192 * i), 375, 'movingSurface')
            }
            if (i != 2) {
                movingSurfaces.create((192 * i), 500, 'movingSurface')
            }
        }

        let spikes = this.physics.add.staticGroup();
        for (let i = 0; i < 4; i++) {
            let spike = spikes.create(96 + (i * 192 * 3), 1030, 'spike').setScale(4);
            spike.body.allowGravity = false;
            spike.body.immovable = true;
        }

        let movingChangeSpots = this.physics.add.staticGroup();
        movingChangeSpots.create((192 * 5), 125, 'movingChangeSpots')
        movingChangeSpots.create((192 * 7), 125, 'movingChangeSpots')
        movingChangeSpots.create((192 * 3), 250, 'movingChangeSpots')
        movingChangeSpots.create((192 * 5), 250, 'movingChangeSpots')
        movingChangeSpots.create((192 * 6), 375, 'movingChangeSpots')
        movingChangeSpots.create((192 * 2), 500, 'movingChangeSpots')

        block1 = this.physics.add.image((192 * 2), 81, 'block1')
        block2 = this.physics.add.image((192 * 3), 81, 'block2')
        block3 = this.physics.add.image((192 * 4), 81, 'block3')
        block1.body.allowGravity = false;
        block1.body.immovable = true;
        block2.body.allowGravity = false;
        block2.body.immovable = true;
        block3.body.allowGravity = false;
        block3.body.immovable = true;

        block1Surface = this.physics.add.image((192 * 3), 500, 'block1Surface')
        block2Surface = this.physics.add.image((192 * 5), 500, 'block2Surface')
        block3Surface = this.physics.add.image((192 * 7), 500, 'block3Surface')
        block1Surface.body.allowGravity = false;
        block2Surface.body.allowGravity = false;
        block3Surface.body.allowGravity = false;
        block1Surface.body.immovable = true;
        block2Surface.body.immovable = true;
        block3Surface.body.immovable = true;

        player = this.physics.add.sprite(820, 750, 'hoody').setScale(2.5);
        player.setBounce = 0.2;
        player.body.gravity.y = 1000;

        player.body.setCollideWorldBounds(true);
        this.physics.add.collider(player, movingSurfaces);
        this.physics.add.collider(player, platforms);

        this.anims.create({
            key: 'left',
            frames: this.anims.generateFrameNumbers('hoody', { start: 16, end: 19 }),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: 'walk',
            frames: this.anims.generateFrameNumbers("hoody", {
                frames: [0, 1, 8, 9, 0, 1, 8, 9, 0, 1, 8, 9, 0, 1, 8, 9, 0, 1, 8, 9, 0, 1, 8, 9, 0, 1, 8, 9, 0, 1, 8, 9, 0, 1, 8, 9, 56, 57, 58, 59, 60, 61, 62, 63, 63, 63, 63, 63, 63, 63, 63, 63, 63, 63, 63, 63,]
            })
            ,
            frameRate: 4
        });
        this.anims.create({
            key: 'right',
            frames: this.anims.generateFrameNumbers('hoody', { start: 24, end: 31 }),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: 'jump',
            frames: this.anims.generateFrameNumbers('hoody', { start: 40, end: 47 }),
            frameRate: 3,
            repeat: -1
        });
        player.play('walk');
        countDown = this.add.text(16, 16, 'Countdown: 25', { fontSize: '40px', fill: '#ffffff' });
        WinMessage = this.add.text(810, 600, '', { fontSize: '70px', fill: '#ffffff' });

        this.physics.add.overlap(player, PressurePlateDrop, this.PressurePlateDropTrigger, null, this)
        this.physics.add.overlap(player, PressurePlateStay, this.PressurePlateStayTrigger, null, this)
        this.physics.add.overlap(player, PressurePlateUp, this.PressurePlateUpTrigger, null, this)

        this.physics.add.overlap(block1, movingChangeSpots, this.movingChangeSpotsBlock1Trigger, null, this)
        this.physics.add.overlap(block2, movingChangeSpots, this.movingChangeSpotsBlock2Trigger, null, this)
        this.physics.add.overlap(block3, movingChangeSpots, this.movingChangeSpotsBlock3Trigger, null, this)

        this.physics.add.overlap(block1, block1Surface, this.block1InTrigger, null, this)
        this.physics.add.overlap(block2, block1Surface, this.Death, null, this)
        this.physics.add.overlap(block3, block1Surface, this.Death, null, this)
        this.physics.add.overlap(block1, block2Surface, this.Death, null, this)
        this.physics.add.overlap(block2, block2Surface, this.block2InTrigger, null, this)
        this.physics.add.overlap(block3, block2Surface, this.Death, null, this)
        this.physics.add.overlap(block1, block3Surface, this.Death, null, this)
        this.physics.add.overlap(block2, block3Surface, this.Death, null, this)
        this.physics.add.overlap(block3, block3Surface, this.block3InTrigger, null, this)

        this.physics.add.overlap(block1, movingSurfaces, this.movingSurfaceBlock1, null, this)
        this.physics.add.overlap(block2, movingSurfaces, this.movingSurfaceBlock2, null, this)
        this.physics.add.overlap(block3, movingSurfaces, this.movingSurfaceBlock3, null, this)

        this.physics.add.overlap(player, spikes, this.Death, null, this)

        cursors = this.input.keyboard.createCursorKeys();
        this.keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        this.keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        this.keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);

        timerForLVL4 = 0;
        block1Counter = 2;
        block2Counter = 3;
        block3Counter = 4;
        movingChangeSpotsWhich = 2;
        blocksIn = 0;
    }
    update() {
        timerForLVL4 = timerForLVL4 + 1;
        if (timerForLVL4 % 60 == 0) {
            let currentTime = 25 - (timerForLVL4 / 60);
            countDown.setText('Countdown: ' + currentTime)
        }
        if (cursors.left.isDown || this.keyA.isDown) {
            player.setVelocityX(-500);
            if (player.body.touching.down) { player.anims.play('left', true); }
        }
        else if (cursors.right.isDown || this.keyD.isDown) {
            player.setVelocityX(500);
            if (player.body.touching.down) { player.anims.play('right', true); }
        }
        else {
            player.setVelocityX(0);
            if (player.body.touching.down) { player.anims.play('walk', true); }
        }
        if ((cursors.up.isDown || this.keyW.isDown) && player.body.touching.down)// jump
        {
            player.setVelocityY(-800);
            player.anims.play('jump', true);
            this.sound.play('jump');
        }
        if (blocksIn >= 3) {
            WinMessage.setText('You won!')
            countDown.setText('')
            this.WonTheGame();
        } else if (block1.y > 456 || block2.y > 456 || block3.y > 456) {
            this.Death()
        } else if (block1.y <= 0 || block2.y <= 0 || block3.y <= 0) {
            this.Death()
        } else if ((timerForLVL4 / 60) == 25) {
            this.Death()
        }
    }
    PressurePlateDropTrigger() {
        movingChangeSpotsWhich = 1;
    }
    PressurePlateStayTrigger() {
        movingChangeSpotsWhich = 2;
    }
    PressurePlateUpTrigger() {
        movingChangeSpotsWhich = 3;
    }
    movingSurfaceBlock1() {
        if (timerForLVL4 % 60 == 0) {
            if (block1.x >= 1536) {
                block1.x = 192 * 2;
                block1Counter = 2;
            }
            block1.x = 192 * (block1Counter);
            block1Counter++;
        }
    }
    movingSurfaceBlock2() {
        if (timerForLVL4 % 60 == 0) {
            if (block2.x >= 1536) {
                block2.x = 192 * 2;
                block2Counter = 2;
            }
            block2.x = 192 * (block2Counter);
            block2Counter++;
        }
    }
    movingSurfaceBlock3() {
        if (timerForLVL4 % 60 == 0) {
            if (block3.x >= 1536) {
                block3.x = 192 * 2;
                block3Counter = 2;
            }
            block3.x = 192 * (block3Counter);
            block3Counter++;
        }
    }
    movingChangeSpotsBlock1Trigger() {
        if (timerForLVL4 % 60 == 0 && movingChangeSpotsWhich == 1) {
            block1.y += 125;
        } else if (timerForLVL4 % 60 == 0 && movingChangeSpotsWhich == 3) {
            block1.y -= 125;
        } else {
            this.movingSurfaceBlock1();
        }
    }
    movingChangeSpotsBlock2Trigger() {
        if (timerForLVL4 % 60 == 0 && movingChangeSpotsWhich == 1) {
            block2.y += 125;
        } else if (timerForLVL4 % 60 == 0 && movingChangeSpotsWhich == 3) {
            block2.y -= 125;
        } else {
            this.movingSurfaceBlock2();
        }
    }
    movingChangeSpotsBlock3Trigger() {
        if (timerForLVL4 % 60 == 0 && movingChangeSpotsWhich == 1) {
            block3.y += 125;
        } else if (timerForLVL4 % 60 == 0 && movingChangeSpotsWhich == 3) {
            block3.y -= 125;
        } else {
            this.movingSurfaceBlock3();
        }
    }
    block1InTrigger() {
        if (timerForLVL4 % 60 == 0) {
            block1.disableBody(true, true)
            block1Surface.disableBody(true, true)
            blocksIn++;
            console.log(blocksIn)
        }
    }
    block2InTrigger() {
        if (timerForLVL4 % 60 == 0) {
            block2.disableBody(true, true)
            block2Surface.disableBody(true, true)
            blocksIn++;
            console.log(blocksIn)
        }
    }
    block3InTrigger() {
        if (timerForLVL4 % 60 == 0) {
            block3.disableBody(true, true)
            block3Surface.disableBody(true, true)
            blocksIn++;
            console.log(blocksIn)
        }
    }
    Death() {
        this.sound.play('lost');
        timerForLVL4 = 0;
        block1Counter = 2;
        block2Counter = 3;
        block3Counter = 4;
        movingChangeSpotsWhich = 2;
        blocksIn = 0;
        this.scene.start(CST.SCENES.LEVEL5)
    }
    WonTheGame() {
        finished = true;
        if (timerForLVL4 / 60 == timeLimit + 5) {
            this.scene.start(CST.SCENES.MENU)
        }
    }
}

var config = {
    type: Phaser.AUTO,
    scale: {
        mode: Phaser.Scale.FIT,
        parent: 'phaser-example',
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: 1920,
        height: 1080
    },
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 300 },
            debug: false
        }
    },
    scene: [
        LoadScene, MenuScene, levels, Level1, Level2, Level3, Level4, Level5
    ],
    render: {
        pixelArt: true
    }
};

let game = new Phaser.Game(config);