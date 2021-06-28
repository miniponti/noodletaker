class BadEndingScene extends Phaser.Scene {

    constructor() {
        super({key:'BADENDING_SCENE_KEY'});
    }
    
    preload() {
        //IMAGENES
        this.load.image('BACKGROUND_BE', 'assets/interface/BAD_ENDING.png');
        this.load.image('RESTART_BUTTON','assets/sprites/buttons/RESTART_BUTTON.png');

        //AUDIO
        this.load.audio('START_SFX','assets/audio/START_SFX.mp3');
    }
    
    create() {
        let bg = this.add.sprite(0, 0, 'BACKGROUND_BE');
        bg.setOrigin(0,0);

        //AUDIO
        this.startSFX = this.sound.add('START_SFX');

        //BOTON
        let restartButton = this.add.image(config.width / 2, 600, 'RESTART_BUTTON');
        restartButton.setInteractive({useHandCursor: true});
        restartButton.on('pointerdown', () => this.restartGame());
    }
    
    restartGame(){
        this.startSFX.play();
        this.scene.start('TITLE_SCENE_KEY');
    }
}
