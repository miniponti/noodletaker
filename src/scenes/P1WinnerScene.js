class P1WinnerScene extends Phaser.Scene {

    constructor() {
        super({key:'WINNER_P1_SCENE'});
    }
    
    preload() {
        //IMAGENES
        this.load.image('BACKGROUND', 'assets/sprites/P1_WINS.png');
        this.load.image('RESTART_BUTTON','assets/sprites/buttons/RESTART_BUTTON.png');

        //AUDIO
        this.load.audio('START_SFX','assets/audio/START_SFX.mp3');
    }
    
    create() {
        let bg = this.add.sprite(0, 0, 'BACKGROUND');
        bg.setOrigin(0,0);

        //AUDIO
        this.titleSFX = this.sound.add('START_SFX');

        //BOTON
        let restartButton = this.add.image(config.width / 2, 650, 'RESTART_BUTTON');
        restartButton.setInteractive({useHandCursor: true});
        restartButton.on('pointerdown', () => this.restartGame());

<<<<<<< Updated upstream
        this.P1WinnerText = this.add.text(config.width / 2, config.height / 2, 'P1 TOOK THE NOODLES!', { font: '72px japaneseFont' });
        this.P1WinnerText.setStroke('#ff5757', 16);
        Phaser.Display.Align.In.Center(this.P1WinnerText, bg);
=======
>>>>>>> Stashed changes
    }
    
    restartGame(){
        this.titleSFX.play();
        this.scene.start('TITLE_SCENE_KEY');

    }
}
