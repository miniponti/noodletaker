let config = {
    type: Phaser.AUTO,
    width: 700,
    height: 400,
    backgroundColor: '#303fb1',
    style: {
        fontFamily: 'japaneseFont'
    },
    physics: {
        default: 'arcade',
        arcade: {
            gravity: {y: 400},
            debug: false
        }
    },
    scene: [TitleScene, ControlKeysScene, GameScene, ResumeScene]
};

let game = new Phaser.Game(config);
