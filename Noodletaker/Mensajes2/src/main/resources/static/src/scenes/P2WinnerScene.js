class P2WinnerScene extends Phaser.Scene {

    constructor() {
        super({key:'WINNER_P2_SCENE'});
    }
    
    preload() {
        //IMAGENES
        this.load.image('BACKGROUND_P2', 'assets/interface/P2_WINS.png');
        this.load.image('RESTART_BUTTON','assets/sprites/buttons/RESTART_BUTTON.png');

        //AUDIO
        this.load.audio('START_SFX','assets/audio/START_SFX.mp3');
    }
    
    create() {
        let bg = this.add.sprite(0, 0, 'BACKGROUND_P2');
        bg.setOrigin(0,0);

        //AUDIO
        this.titleSFX = this.sound.add('START_SFX');

        //BOTON
        let restartButton = this.add.image(config.width / 2, 650, 'RESTART_BUTTON');
        restartButton.setInteractive({useHandCursor: true});
        restartButton.on('pointerdown', () => this.restartGame());
    }
    
    restartGame(){
        this.titleSFX.play();
        this.scene.start('TITLE_SCENE_KEY');
    }
}
