class TitleScene extends Phaser.Scene {

    constructor() {
        super({key:"TITLE_SCENE_KEY"});
    }

    preload() {
        //FONDO
        this.load.image('TITLE_BG', 'assets/sprites/TITLE_BACKGROUND.png');

        //BOTONES
        this.load.image('START_BUTTON','assets/sprites/buttons/START_BUTTON.png');
        this.load.spritesheet('CONTROLS_BUTTON','assets/sprites/buttons/CONTROLS_BUTTON.png',
        {
            frameWidth: 320, 
            frameHeight: 70
        });
        this.load.image('MUSIC_BUTTON','assets/sprites/buttons/AUDIO_BUTTON.png');

        //AUDIO
        this.load.audio('TITLESCENE_MUSIC','assets/audio/TITLE_BGM.mp3');
        this.load.audio('START_SFX','assets/audio/START_SFX.mp3');
    }

    create() {
        //FONDO
        let bg = this.add.sprite(0, 0, 'TITLE_BG');
        bg.setOrigin(0,0);

        //AUDIO
        this.titleBGM = this.sound.add('TITLESCENE_MUSIC');
        this.startSFX = this.sound.add("START_SFX");

        //BOTON START
        this.startButton = this.add.sprite(config.width / 2 - 200, 500, 'START_BUTTON');
        this.startButton.setInteractive({useHandCursor: true});
        this.startButton.on("pointerdown", () => this.startGame());
        

        //BOTON AUDIO
        this.MUSIC_BUTTON = this.add.image(config.width - 100, 650, 'MUSIC_BUTTON');
        this.MUSIC_BUTTON.setInteractive({useHandCursor: true});
        this.MUSIC_BUTTON.on("pointerdown", () => this.volumen());

        //BOTON CONTROLES
        this.controlsButton = this.add.image(config.width / 2 + 200, 500, 'CONTROLS_BUTTON');
        this.controlsButton.setInteractive({useHandCursor: true});
        this.controlsButton.on("pointerdown", () => this.showControlsScene());
        this.controlsButton.on('pointerover', () => this.startButtonOver());

        this.startTitle();
        

        
    }

    update(time,delta){
        

    }
    startButtonOver(){
        console.log("START hovered");
        this.startButton.setFrame(0);
    }

    //FUNCION QUE PONE EN MARCHA LA PANTALLA DEL TITULO
    startTitle(){
        this.titleBGM.play();
        console.log("start title funciona");
    }
    //FUNCION PARA EL BOTON START
    startGame(){
        console.log("clickButton FUNCIONA");
        this.startSFX.play();
        this.scene.start('GAME_SCENE_KEY');
        this.titleBGM.stop();
    }

    //FUNCION PARA EL BOTON DE CONTROLES
    showControlsScene(){
        console.log("showControlsScene FUNCIONA");
        this.scene.pause('TITLE_SCENE_KEY');
        this.scene.run('CONTROL_KEYS_SCENE_KEY');
    }
}

