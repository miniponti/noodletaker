let config = {
    type: Phaser.AUTO,
    width: 1400,
    height: 750,
    backgroundColor: '#303fb1',
    physics: {
        default: 'arcade',
        arcade: {
            gravity: {y: 400},
            debug: false
        }
    },
    scene: [TitleScene, GameScene]
};

let game = new Phaser.Game(config);
