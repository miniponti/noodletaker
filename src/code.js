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
<<<<<<< Updated upstream
    scene: [TitleScene, ControlKeysScene, GameScene, ResumeScene]
=======
    scene: [TitleScene, ControlKeysScene, TutorialScene, GameScene, P1WinnerScene, P2WinnerScene]
>>>>>>> Stashed changes
};

let game = new Phaser.Game(config);
