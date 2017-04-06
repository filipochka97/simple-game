let startDescription;
let startBackground;
let startWidth;
let startBtn;
let startBtnSound;
let Start = {
    preload : function() {
        game.load.image('background', './assets/img/start-back.png');
        game.load.image('description', './assets/img/start.png');
        game.load.image('start', './assets/img/start-btn.png');
        game.load.audio('button-sound', './assets/sounds/button-sound.mp3')
    },

    create: function () {
        startBtnSound = game.add.audio('button-sound');
        // background
        startBackground = game.add.sprite(0, 0, 'background');
        startBackground.width = game.width;
        startBackground.height = game.height;
        // description post
        startDescription = game.add.sprite(window.innerWidth * 0.12,
            window.innerHeight * 0.02, 'description');
        startWidth = window.innerWidth * 0.3;
        startDescription.width = window.innerWidth * 0.3;
        startDescription.height = startWidth * 1.56;
        // start game button
        startBtn = game.add.button(startDescription.x + 70, startDescription.y
            + startDescription.height - 100, 'start', this.startGame, this);
        startBtn.width = startDescription.width * 0.6;
        startBtn.height = (startDescription.width * 0.6) * 0.27;
    },

    startGame: function () {
        startBtnSound.play();
        this.state.start('Game');
    }
};
