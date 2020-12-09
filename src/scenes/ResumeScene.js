class ResumeScene extends Phaser.Scene {

    constructor() {
        super({key:"resumenScene"});
    }
    
    preload() {
        //IMAGENES
        this.load.image('fondoTitulo', 'assets/sprites/TITLE_BACKGROUND.png');
        this.load.image('botonRESTART','assets/sprites/buttons/RESTART_BUTTON.png');

        //AUDIO
        this.load.audio("tituloAudio","assets/audio/TITLE_BGM.mp3");
        this.load.audio("tutun","assets/audio/START_SFX.mp3");
    }
    
    create() {
        let bg = this.add.sprite(0, 0, 'fondoTitulo');
        bg.setOrigin(0,0);

        //AUDIO
        this.titleBGM = this.sound.add("tituloAudio");
        this.tutunTitulo = this.sound.add("tutun");

        //BOTON
        let botonRestart = this.add.image(config.width / 2, 500, 'botonRESTART');
        botonRestart.setInteractive({useHandCursor: true});
        botonRestart.on("pointerdown", () => this.restartGame());

        this.loseText = this.add.text(config.width / 2, config.height / 2, 'YOU BOTH LOST THE NOODLES...', { font: '72px japaneseFont' });
        this.loseText.setStroke('#ff5757', 16);
        Phaser.Display.Align.In.Center(this.loseText, bg);
    }
    
    restartGame(){
        this.tutunTitulo.play();
        this.scene.start('TITLE_SCENE_KEY');
    }
}
