class TitleScene extends Phaser.Scene {

    constructor() {
        super({key:"TITLE_SCENE_KEY"});
    }

    preload() {
        //FONDO
        this.load.image('TITLE_BG', 'assets/sprites/TITLE_BACKGROUND.png');

        //BOTONES
        this.load.image('START_BUTTON','assets/sprites/buttons/START_BUTTON.png');
        this.load.image('CONTROLS_BUTTON','assets/sprites/buttons/CONTROLS_BUTTON.png');
        this.load.image('MUSIC_BUTTON','assets/sprites/buttons/AUDIO_BUTTON.png');

        //AUDIO
        this.load.audio("TITLESCENE_MUSIC","assets/audio/TITLE_BGM.mp3");
        this.load.audio("START_SFX","assets/audio/START_SFX.mp3");
    }

    create() {
        //FONDO
        let bg = this.add.sprite(0, 0, 'TITLE_BG');
        bg.setOrigin(0,0);

        //AUDIO
        //this.titleBGM = this.sound.add("TITLESCENE_MUSIC");
        this.startSFX = this.sound.add("START_SFX");

        //BOTON START
        let startButton = this.add.image(config.width / 2 - 200, 500, 'START_BUTTON');
        startButton.setInteractive({useHandCursor: true});
        startButton.on("pointerdown", () => this.startGame());

        //BOTON CONTROLES
        let controlsButton = this.add.image(config.width / 2 + 200, 500, 'CONTROLS_BUTTON');
        controlsButton.setInteractive({useHandCursor: true});
        controlsButton.on("pointerdown", () => this.showControlsScene());

        /*
        //BOTON AUDIO
        let MUSIC_BUTTON = this.add.image(config.width - 100, 650, 'MUSIC_BUTTON');
        MUSIC_BUTTON.setInteractive({useHandCursor: true});
        MUSIC_BUTTON.on("pointerdown", () => this.volumen());
        */
    }

    update(time,delta){
        //this.titleBGM.play();
    }

    //FUNCION PARA EL BOTON START
    startGame(){
        console.log("clickButton FUNCIONA");
        this.startSFX.play();
        this.scene.start('GAME_SCENE_KEY');
        //this.START_SFXTitulo.onStop(this.scene.switch('juegoEscena'));
        //this.titleBGM.stop();

    }

    //FUNCION PARA EL BOTON DE CONTROLES
    showControlsScene(){
        console.log("showControlsScene FUNCIONA");
        this.scene.start('CONTROL_KEYS_SCENE_KEY');
    }
}
