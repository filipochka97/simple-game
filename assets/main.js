let game;

let _width = window.innerWidth;
let _height = window.innerHeight;

game = new Phaser.Game(1200, 672, Phaser.AUTO, '');
game.state.add('Intro', Intro);
game.state.add('Start', Start);
game.state.add('Game', Game);
game.state.add('GameOver', GameOver);
game.state.start('Intro');
