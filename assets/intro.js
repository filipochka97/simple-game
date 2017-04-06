let introMail;
let introBack;
let introBtn;
let btnSound;
let Intro = {
    preload: function () {
        game.load.image('background', './assets/img/intro-back.png');
        game.load.image('mail', './assets/img/intro-mail.png');
        game.load.image('next-btn', './assets/img/next-button.png');
        game.load.audio('button-sound', './assets/sounds/button-sound.mp3')
    },

    create: function () {
        btnSound = game.add.audio('button-sound');
        // left side
        introMail = game.add.sprite(0, 0, 'mail');
        introMail.width = game.width * 0.43;
        introMail.height = game.height;
        // right side
        introBack = game.add.sprite(introMail.width, 0, 'background');
        introBack.width = game.width * 0.57;
        introBack.height = game.height;
        // next button
        introBtn = game.add.button(introMail.width / 2 -
            ((introMail.width * 0.45) / 2),
            introMail.height - introMail.height * 0.35, 'next-btn',
            this.startMainPage, this);
        introBtn.width = introMail.width * 0.45;
        introBtn.height = (introMail.width * 0.45) * 0.24;
    },

    startMainPage: function () {
        btnSound.play();
        this.state.start('Start');
    },
};
