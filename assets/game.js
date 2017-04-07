let spaceValue;
let firstaids;
let spacefield;
let trees;
let bird;
let scoreText;
let score;
let weapon;
let cannonball;
let apples;
let plums;
let grapes;
let pears;
let keys;
let memory;
let progress;
let loadingWidth;


let Game = {
    preload: function() {
        game.load.image('parallax-back', 'assets/img/parallax-back.png');
        game.load.image('parallax-front', 'assets/img/parallax-front.png');
        game.load.image('message', 'assets/img/letter.png');
        game.load.image('firstaids', 'assets/img/firstaid.png');
        game.load.image('bullet', 'assets/img/bullet.png');
        game.load.image('cannonball', 'assets/img/core.png');
        game.load.image('apples', 'assets/img/apple.png');
        game.load.image('pears', 'assets/img/pear.png');
        game.load.image('plums', 'assets/img/plum.png');
        game.load.image('grapes', 'assets/img/grape.png');


        game.load.spritesheet('rain', 'assets/img/rain.png');
        game.load.spritesheet('bird', 'assets/img/pigeon.png', 211, 211);

        game.load.audio('wings-sound', './assets/sounds/wings-sound.mp3');

    },

    create: function() {
        game.physics.startSystem(Phaser.Physics.ARCADE);
        game.scale.fullScreenScaleMode = Phaser.ScaleManager.SHOW_ALL;
        game.input.onDown.add(() => game.scale.startFullScreen());
        // add audio
        startBtnSound = game.add.audio('wings-sound');
        startBtnSound.play();

        spacefield = game.add.tileSprite(0, 0, 1200, 672, 'parallax-back');
        trees = game.add.tileSprite(0, 0, 1200, 672, 'parallax-front');

        letter = game.add.sprite(170, 65, 'message');
        game.physics.arcade.enable(letter);
        letter.scale.set(0.4);

        bird = game.add.sprite(50, 672 / 4, 'bird');
        bird.scale.set(0.5);
        game.physics.arcade.enable(bird);
        bird.animations.add('fly', [0, 1, 2, 3], 8, true);
        bird.body.collideWorldBounds = true;
        bird.addChild(letter);

        firstaids = game.add.group();
        apples = game.add.group();
        pears = game.add.group();
        plums = game.add.group();
        grapes = game.add.group();

        memory = {
            pears,
            apples,
            grapes,
            firstaids,
            plums
        }

        keys = Object.keys(memory);

        for (let key in memory) {
            memory[key].enableBody = true;
        }

        game.time.events.repeat(Phaser.Timer.SECOND * 5, 100, this.fallingSubjects, this, memory);


        // create rain emitter
        emitter = game.add.emitter(game.world.centerX, 0, 400);
        emitter.width = game.world.width;
        emitter.makeParticles('rain');
        emitter.minParticleScale = 0.1;
        emitter.maxParticleScale = 0.3;
        emitter.setYSpeed(300, 500);
        emitter.setXSpeed(-5, 5);
        emitter.minRotation = 0;
        emitter.maxRotation = 0;
        emitter.start(false, 1600, 5, 0);

        weapon = game.add.weapon(1, 'bullet');
        game.time.events.add(Phaser.Timer.SECOND * 2, this.addBulletsToWeapon, this);

        cannonball = game.add.weapon(1, 'cannonball');
        game.time.events.add(Phaser.Timer.SECOND * 5, this.addBulletsToCannonBall, this);


        cursors = game.input.keyboard.createCursorKeys();
        cursors.space = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

        // add progress bar
        progress = game.add.graphics(0, 0);
        progress.lineStyle(4, '0x00ff06');
        progress.drawRoundedRect(game.world.width - 330, 30, 300, 30, 9);
        loadingWidth = 296;

        progress.lineStyle(0);
        progress.beginFill('0xf6ff00');
        progress.drawRoundedRect(game.world.width - 328, 32, loadingWidth, 26, 9);
        progress.endFill();

        game.time.events.repeat(Phaser.Timer.SECOND * 0.5, 300, this.loadProgress, this);

        scoreText = game.add.text(game.world.width - 230, 80, 'score: 0', {
            font: '40px Helvetica',
            fill: 'red'
        });

        spaceValue = false;
        score = 0;
        // game.time.events.add(Phaser.Timer.SECOND * 10, this.pigeonDeath, this);

    },


    update: function() {
        for (let key in memory) {
            game.physics.arcade.overlap(bird, memory[key], this.collectObjects);
            game.physics.arcade.collide(weapon.bullets, memory[key], (first, second) => second.kill());
            game.physics.arcade.collide(cannonball.bullets, memory[key], (first, second) => second.kill());
        }

        game.physics.arcade.collide(bird, weapon.bullets, (first, second) => {
            second.kill();
            loadingWidth -= 0.1 * 296;
        });

        game.physics.arcade.collide(bird, cannonball.bullets, (first, second) => loadingWidth = 0);

        game.physics.arcade.collide(weapon.bullets, cannonball.bullets, (weapon, cannonball) => weapon.kill());

        // if (spaceValue) {
        //  letter.body.gravity.y = 5000;
        //  letter.body.velocity.x = -30;
        //  letter.angle += 1;
        // } else {
        //  letter.body.velocity.x = 0;
        // }

        // letter.body.velocity.y = 0;

        bird.body.velocity.x = 0;
        bird.body.velocity.y = 0;
        bird.animations.play('fly');
        bird.animations.getAnimation('fly').speed = 8;


        spacefield.tilePosition.x -= 1.5;
        trees.tilePosition.x -= 2.25;


        for (let key in memory) {
            memory[key].setAll('body.velocity.x', -200);
        }


        if (cursors.up.isDown) {
            bird.body.velocity.y = -300;
            bird.animations.getAnimation('fly').speed = 12;
        }

        if (cursors.down.isDown) {
            bird.body.velocity.y = 300;
            bird.animations.getAnimation('fly').speed = 6;
        }

        if (cursors.left.isDown) {
            spacefield.tilePosition.x -= -1;
            trees.tilePosition.x -= -1.5;
            for (let key in memory) {
                memory[key].setAll('body.velocity.x', -120);
            }
        } 

        if (cursors.right.isDown) {
            spacefield.tilePosition.x -= 2;
            trees.tilePosition.x -= 3;
            bird.animations.getAnimation('fly').speed = 12;
            for (let key in memory) {
                memory[key].setAll('body.velocity.x', -280);
            }

            loadingWidth -= 0.01 * 296 / 60;
        } 

        if (cursors.space.isDown) {
            spaceValue = true;
        }

        weapon.x = (Math.random() * 0.8 * 1200) + 0.2 * 1200;
        cannonball.x = (Math.random() * 0.7 * 1200) + 0.3 * 1200;

        this.loadProgress();

    },

    pigeonDeath: function () {
        bird.kill()
        startBtnSound.stop();
        game.state.start('GameOver');
    },


    fallingSubjects: function(memory) {
        let number = Math.floor(Math.random() * keys.length);
        let example = memory[keys[number]].create((Math.random() * 0.5 * 1200) +
            0.2 * 1200, -2, keys[number]);
        example.body.velocity.y = 150;
    },

    collectObjects: function(first, second) {
        second.kill();
        score += 10;
        scoreText.text = 'score: ' + score;
        loadingWidth += 0.05 * 296;
    },

    addBulletsToCannonBall: function() {
        cannonball.bullets.forEach((bul) => bul.scale.set(0.25));
        cannonball.bulletKillType = Phaser.Weapon.KILL_WORLD_BOUNDS;
        cannonball.bulletSpeed = 700;
        cannonball.fireRate = 5000;
        cannonball.fireAngle = 230;
        cannonball.fireFrom.setTo(game.world.width - game.world.width / 3, game.world.height);
        cannonball.autofire = true;
        cannonball.bulletGravity.y = 300;
    },

    addBulletsToWeapon: function() {
        weapon.bullets.forEach((bul) => bul.scale.set(0.2));
        weapon.bulletKillType = Phaser.Weapon.KILL_WORLD_BOUNDS;
        weapon.bulletSpeed = 700;
        weapon.fireRate = 1500;
        weapon.fireAngle = 210;
        weapon.bulletAngleOffset = 160;
        weapon.fireFrom.setTo(0, game.world.height);
        weapon.autofire = true;
    },

    loadProgress() {
        progress.clear();

        progress.lineStyle(4, '0x00ff06');
        progress.drawRoundedRect(game.world.width - 330, 30, 300, 30, 9);

        progress.lineStyle(0);
        progress.beginFill('0xf6ff00');
        progress.drawRoundedRect(game.world.width - 328, 32, loadingWidth, 26, 9); 
        progress.endFill();

        loadingWidth -= 0.01 * 296 / 60;

        if (loadingWidth > 296) {
            loadingWidth = 296;
        }          

        if (loadingWidth < 0) {
            this.pigeonDeath();
        }
    }

    // render: function () {
    //     game.debug.text('Level timer: ' + game.time.events.duration, 32, 32);
    // }
};
