class P1WinnerScene extends Phaser.Scene {

    constructor() {
        super({key:"WINNER_P1_SCENE"});
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

        this.P1WinnerText = this.add.text(config.width / 2, config.height / 2, 'P1 TOOK THE NOODLES!', { font: '72px japaneseFont' });
        this.P1WinnerText.setStroke('#ff5757', 16);
        Phaser.Display.Align.In.Center(this.P1WinnerText, bg);
    }
    
    restartGame(){
        this.tutunTitulo.play();
        //this.tutunTitulo.onStop(this.scene.switch('TitleScene'));
        this.scene.start('TITLE_SCENE_KEY');
        //this.scene.stop('juegoEscena');
        //this.titleBGM.stop();

    }
}