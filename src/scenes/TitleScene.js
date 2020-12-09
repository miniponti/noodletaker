class TitleScene extends Phaser.Scene {

    constructor() {
        super({key:'TITLE_SCENE_KEY'});
    }

    preload() {
        //FONDO
        this.load.image('TITLE_BG', 'assets/sprites/TITLE_BACKGROUND.png');

        //BOTONES
        this.load.image('START_BUTTON','assets/sprites/buttons/START_BUTTON.png');
        this.load.image('START_BUTTON_HOVER','assets/sprites/buttons/START_BUTTON_HOVER.png');
        this.load.image('START_BUTTON_DOWN','assets/sprites/buttons/START_BUTTON_DOWN.png');
        this.load.image('CONTROLS_BUTTON','assets/sprites/buttons/CONTROLS_BUTTON.png');
        this.load.image('CONTROLS_BUTTON_HOVER','assets/sprites/buttons/CONTROLS_BUTTON_HOVER.png');
        this.load.image('CONTROLS_BUTTON_DOWN','assets/sprites/buttons/CONTROLS_BUTTON_DOWN.png');
        this.load.image('MUSIC_BUTTON','assets/sprites/buttons/AUDIO_BUTTON.png');
        this.load.image('MUTED_BUTTON','assets/sprites/buttons/AUDIO_BUTTON_MUTED.png');

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
        this.startSFX = this.sound.add('START_SFX');

        //BOTON START--------------------------------------------------------------------------------------
        this.startButton = this.add.sprite(config.width / 2 - 200, 500, 'START_BUTTON');
        this.startButton.setInteractive({useHandCursor: true});
        this.startButton.on('pointerover', () => this.startButtonOver());

        this.startHover = this.add.sprite(config.width / 2 - 200, 500, 'START_BUTTON_HOVER');
        this.startHover.setInteractive({useHandCursor: true});
        this.startHover.on('pointerdown', () => this.startButtonDown());
        this.startHover.on('pointerout', () => this.startOut());
        this.startHover.setVisible(false);

        this.startDown = this.add.sprite(config.width / 2 - 200, 500, 'START_BUTTON_DOWN');
        this.startDown.setInteractive({useHandCursor: true});
        this.startDown.on('pointerup', () => this.startUp());
        this.startDown.setVisible(false);

        //BOTON AUDIO-------------------------------------------------------------------------------------
        this.musicButton = this.add.image(config.width - 100, 650, 'MUSIC_BUTTON');
        this.musicButton.setInteractive({useHandCursor: true});
        this.musicButton.on('pointerdown', () => this.volume());

        this.musicMuted = this.add.image(config.width - 100, 650, 'MUTED_BUTTON');
        this.musicMuted.setInteractive({useHandCursor: true});
        this.musicMuted.on('pointerdown', () => this.volume());
        this.musicMuted.setVisible(false);


        //BOTON CONTROLES---------------------------------------------------------------------------------
        this.controlsButton = this.add.image(config.width / 2 + 200, 500, 'CONTROLS_BUTTON');
        this.controlsButton.setInteractive({useHandCursor: true});
        this.controlsButton.on('pointerover', () => this.controlsHover());
        
        this.controlsButtonHover = this.add.image(config.width / 2 + 200, 500, 'CONTROLS_BUTTON_HOVER');
        this.controlsButtonHover.setInteractive({useHandCursor: true});
        this.controlsButtonHover.on('pointerdown', () => this.controlsDown());
        this.controlsButtonHover.on('pointerout', () => this.controlsOut());
        this.controlsButtonHover.setVisible(false);

        this.controlsButtonDown = this.add.image(config.width / 2 + 200, 500, 'CONTROLS_BUTTON_DOWN');
        this.controlsButtonDown.setInteractive({useHandCursor: true});
        this.controlsButtonDown.on('pointerup', () => this.controlsUp());
        this.controlsButtonDown.setVisible(false);

        this.startTitle();        
    }

    update(time,delta){
        
    }

    //FUNCION QUE CONTROLA EL AUDIO
    volume(){
        if(!this.titleBGM.mute){
            this.titleBGM.mute = true;
            this.musicMuted.setVisible(true);
        }
        else{
            this.titleBGM.mute = false;
            this.musicMuted.setVisible(false);
        }
    }

    //FUNCIONES PARA EL BOTON START----------------------------------------------------
    //PARA CUANDO PASA POR ENCIMA
    startButtonOver(){
        console.log('START hovered');
        this.startHover.setVisible(true);
    }
    //PARA CUANDO NO ESTA ENCIMA
    startOut(){
        console.log('start not over');
        this.startHover.setVisible(false);
    }
    //PARA CUANDO SE PULSA
    startButtonDown(){
        console.log('start clicked');
        this.startDown.setVisible(true);
        this.startSFX.play();
    }
    //PARA CUANDO DEJA DE PULSARSE
    startUp(){
        console.log('start up');
        this.scene.start('GAME_SCENE_KEY');
        this.titleBGM.stop();
    }
    

    //FUNCIONES PARA EL BOTON DE CONTROLES---------------------------------------------
    //PARA CUANDO SE PASA POR ENCIMA
    controlsHover(){    
        console.log('controls hovered');
        this.controlsButtonHover.setVisible(true);
    }
    //PARA CUANDO NO ESTA ENCIMA
    controlsOut(){      
        console.log('controls not hovered');
        this.controlsButtonHover.setVisible(false);
    }
    //PARA CUANDO SE PULSA
    controlsDown(){
        console.log('controls clicked');
        this.controlsButtonDown.setVisible(true);
    }
    //PARA CUANDO SE DEJA DE HACER CLICK
    controlsUp(){
        console.log('controls up');
        this.controlsButtonDown.setVisible(false);
        this.scene.pause('TITLE_SCENE_KEY');
        this.scene.run('CONTROL_KEYS_SCENE_KEY');
    }
    //-----------------------------------------------------------------------------------

    //FUNCION QUE PONE EN MARCHA LA PANTALLA DEL TITULO
    startTitle(){
        this.titleBGM.play();
        console.log('start title funciona');
    }
    
}

