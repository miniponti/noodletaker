class ResumeScene extends Phaser.Scene {

    constructor() {
        super({key:'RESUME_SCENE'});
    }
    
    preload() {
        //IMAGENES
        this.load.image('TITLE_BG', 'assets/sprites/TITLE_BACKGROUND.png');
        this.load.image('RESTART_BUTTON','assets/sprites/buttons/RESTART_BUTTON.png');

        //AUDIO
        this.load.audio('START_SFX','assets/audio/START_SFX.mp3');
    }
    
    create() {
        let bg = this.add.sprite(0, 0, 'TITLE_BG');
        bg.setOrigin(0,0);

        //AUDIO
        this.startSFX = this.sound.add('START_SFX');

        //BOTON
        let restartButton = this.add.image(config.width / 2, 500, 'RESTART_BUTTON');
        restartButton.setInteractive({useHandCursor: true});
        restartButton.on("pointerdown", () => this.restartGame());

        this.loseText = this.add.text(config.width / 2, config.height / 2, 'YOU BOTH LOST THE NOODLES...', { font: '72px japaneseFont' });
        this.loseText.setStroke('#ff5757', 16);
        Phaser.Display.Align.In.Center(this.loseText, bg);
    }
    
    restartGame(){

        this.startSFX.play();
        this.scene.start('TITLE_SCENE_KEY');
    }
}
