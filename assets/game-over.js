let gameOverBack;
let gameOverBack2;
let restartBtn;
let mainMenu;

let GameOver = {
    preload: function () {
        game.load.image('parallax-back', 'assets/img/parallax-back.png');
        game.load.image('parallax-front', 'assets/img/parallax-front.png');
        game.load.image('restart-button', 'assets/img/restart.png');
        game.load.image('main-menu-button', 'assets/img/main-menu.png');
    },

    create: function () {
        gameOverBack = game.add.tileSprite(0, 0, 1200, 672, 'parallax-back');
        gameOverBack2 = game.add.tileSprite(0, 0, 1200, 672, 'parallax-front');
        restartBtn = this.add.button(350, 200,
            'restart-button', this.restartGame, this);
        mainMenu = this.add.button(650, 200,
            'main-menu-button', this.mainMenu, this);
    },

    restartGame: function () {
        this.state.start('Game');
    },

    mainMenu: function () {
        location.reload();
    }
};
