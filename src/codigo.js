let config = {
    type: Phaser.AUTO,
    width: 1376,
    height: 736,
    backgroundColor: '#303fb1',
    physics: {
        default: 'arcade',
        arcade: {
            gravity: {y: 400},
            debug: false
        }
    },
    scene: [TitleScene, ControlesScene, GameScene, ResumeScene]
};

let game = new Phaser.Game(config);
