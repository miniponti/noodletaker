var config = {
    type: Phaser.AUTO,
    width: 1400,
    height: 750,
    backgroundColor: '#2ce6ff',
    physics: {
        default: 'arcade',
        arcade: {
            gravity: {y: 200},
            debug: false
        }
    },
    scene: [TitleScene,GameScene]
};

var game = new Phaser.Game(config);
