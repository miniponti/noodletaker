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
        this.load.image('CONTROLS_BUTTON_HOVER','assets/sprites/buttons/CONTROLS_BUTTON_HOVER.png');
        this.load.image('CONTROLS_BUTTON_DOWN','assets/sprites/buttons/CONTROLS_BUTTON_DOWN.png');
        this.load.image('MUSIC_BUTTON','assets/sprites/buttons/AUDIO_BUTTON.png');
        this.load.image('MUTED_BUTTON','assets/sprites/buttons/MUTED_BUTTON.png');

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
        this.startButton = this.add.sprite(config.width / 2 - 100, 250, 'START_BUTTON');
        this.startButton.setInteractive({useHandCursor: true});
        this.startButton.on("pointerdown", () => this.startGame());
        

        //BOTON AUDIO
        this.musicButton = this.add.image(config.width - 100, 350, 'MUSIC_BUTTON');
        this.musicButton.setInteractive({useHandCursor: true});
        this.musicButton.on("pointerdown", () => this.volumen());

        this.mutedButton = this.add.image(config.width - 100, 350, 'MUTED_BUTTON');
        this.mutedButton.setInteractive({useHandCursor: true});
        this.mutedButton.on("pointerdown", () => this.volumen());
        this.mutedButton.setVisible(false);

        //BOTON CONTROLES
        this.controlsButton = this.add.image(config.width / 2 + 100, 250, 'CONTROLS_BUTTON');
        this.controlsButton.setInteractive({useHandCursor: true});
        this.controlsButton.on("pointerdown", () => this.showControlsScene());
        this.controlsButton.on('pointerover', () => this.startButtonOver());

        this.controlsButtonHover = this.add.image(config.width / 2 + 100, 250, 'CONTROLS_BUTTON_HOVER');
        this.controlsButtonHover.setInteractive({useHandCursor: true});
        this.controlsButtonHover.on("pointerdown", () => this.showControlsScene());
        this.controlsButtonHover.on('pointerover', () => this.startButtonOver());
        this.controlsButtonHover.setVisible(false);

        this.controlsButtonDown = this.add.image(config.width / 2 + 100, 250, 'CONTROLS_BUTTON_DOWN');
        this.controlsButtonDown.setInteractive({useHandCursor: true});
        this.controlsButtonDown.on("pointerdown", () => this.showControlsScene());
        this.controlsButtonDown.on('pointerover', () => this.startButtonOver());
        this.controlsButtonDown.setVisible(false);

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

    //FUNCION PARA SILENCIAR EL AUDIO
    volumen(){
        if (!this.titleBGM.mute) 
        {
            this.titleBGM.mute = true;
            this.mutedButton.setVisible(true);
        } 
        else 
        {
            this.titleBGM.mute = false;
            this.mutedButton.setVisible(false);
        }
    }
}

