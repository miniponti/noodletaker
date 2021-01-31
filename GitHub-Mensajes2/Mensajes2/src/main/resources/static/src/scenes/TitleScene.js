var stompClient = null;
function conexion(){
    var socket = new SockJS('/ws');
    stompClient = Stomp.over(socket);
    stompClient.connect({}, onConnected, onError);
    
    //JSON.stringify({sender: username, id: 1234});
   // stompClient.send("/game/search", {}, JSON.stringify({'name': "Dake"}));
   // stompClient.send("/game/search", {}, JSON.stringify({'name': "Dake"}));
}

function onConnected(){
    stompClient.subscribe('/topic/searching', onMessageReceived);

    var chatMessage = {
        positionX: 0,
	    positionY: 0,
	    speedX: 0,
	    pspeedY: 0,
	    attacking: false,
	    saltando: false,
	    player: 'Dake'
    };

    stompClient.send("/app/search", {}, JSON.stringify(chatMessage)); 
}
function onError(){
    console.log("Me voy a pegar un puto tiro");
}

function onMessageReceived(message){
    console.log("Mensaje recibido:")
    console.log(message);
}
class TitleScene extends Phaser.Scene {

    constructor() {
        super({ key: 'TITLE_SCENE_KEY' });
    }

    preload() {
        //FONDO
        this.load.image('TITLE_BG', 'assets/sprites/TITLE_BACKGROUND.png');

        //BOTONES
        this.load.image('START_BUTTON', 'assets/sprites/buttons/START_BUTTON.png');
        this.load.image('START_BUTTON_HOVER', 'assets/sprites/buttons/START_BUTTON_HOVER.png');
        this.load.image('START_BUTTON_DOWN', 'assets/sprites/buttons/START_BUTTON_DOWN.png');

        this.load.image('CONTROLS_BUTTON', 'assets/sprites/buttons/CONTROLS_BUTTON.png');
        this.load.image('CONTROLS_BUTTON_HOVER', 'assets/sprites/buttons/CONTROLS_BUTTON_HOVER.png');
        this.load.image('CONTROLS_BUTTON_DOWN', 'assets/sprites/buttons/CONTROLS_BUTTON_DOWN.png');

        this.load.image('MUSIC_BUTTON', 'assets/sprites/buttons/AUDIO_BUTTON.png');
        this.load.image('MUTED_BUTTON', 'assets/sprites/buttons/AUDIO_BUTTON_MUTED.png');

        this.load.image('TUTORIAL_BUTTON', 'assets/sprites/buttons/TUTORIAL_BUTTON.png');
        this.load.image('TUTORIAL_BUTTON_HOVER', 'assets/sprites/buttons/TUTORIAL_BUTTON_HOVER.png');
        this.load.image('TUTORIAL_BUTTON_DOWN', 'assets/sprites/buttons/TUTORIAL_BUTTON_DOWN.png');

        this.load.image('CHAT_BUTTON', 'assets/sprites/buttons/CHAT_BUTTON.png');
        this.load.image('CHAT_BUTTON_HOVER', 'assets/sprites/buttons/CHAT_BUTTON_HOVER.png');
        this.load.image('CHAT_BUTTON_DOWN', 'assets/sprites/buttons/CHAT_BUTTON_DOWN.png');

        this.load.image('OFFLINE_BUTTON','assets/sprites/buttons/OFFLINE_BUTTON.png');
        this.load.image('OFFLINE_BUTTON_HOVER','assets/sprites/buttons/OFFLINE_BUTTON_HOVER.png');
        this.load.image('OFFLINE_BUTTON_DOWN','assets/sprites/buttons/OFFLINE_BUTTON_DOWN.png');

        this.load.image('ONLINE_BUTTON','assets/sprites/buttons/ONLINE_BUTTON.png');
        this.load.image('ONLINE_BUTTON_HOVER','assets/sprites/buttons/ONLINE_BUTTON_HOVER.png');
        this.load.image('ONLINE_BUTTON_DOWN','assets/sprites/buttons/ONLINE_BUTTON_DOWN.png');
        
        //AUDIO
        this.load.audio('TITLESCENE_MUSIC', 'assets/audio/TITLE_BGM.mp3');
        this.load.audio('START_SFX', 'assets/audio/START_SFX.mp3');
    }

    create() {
        //FONDO
        let bg = this.add.sprite(0, 0, 'TITLE_BG');
        bg.setOrigin(0, 0);

        //AUDIO
        this.titleBGM = this.sound.add('TITLESCENE_MUSIC');
        this.startSFX = this.sound.add('START_SFX');

        //BOTON ONLINE--------------------------------------------------------------------------------------
        this.onlineButton = this.add.sprite(config.width / 2 + 200, 450, 'ONLINE_BUTTON');
        this.onlineButton.setInteractive({ useHandCursor: true });
        this.onlineButton.on('pointerover', () => this.onlineHover());

        this.onlineButtonHover = this.add.sprite(config.width / 2 + 200, 450, 'ONLINE_BUTTON_HOVER');
        this.onlineButtonHover.setInteractive({ useHandCursor: true });
        this.onlineButtonHover.on('pointerdown', () => this.onlineDown());
        this.onlineButtonHover.on('pointerout', () => this.onlineOut());
        this.onlineButtonHover.setVisible(false);

        this.onlineButtonDown = this.add.sprite(config.width / 2 + 200, 450, 'ONLINE_BUTTON_DOWN');
        this.onlineButtonDown.setInteractive({ useHandCursor: true });
        this.onlineButtonDown.on('pointerup', () => this.onlineUp());
        this.onlineButtonDown.setVisible(false);

        //BOTON OFFLINE--------------------------------------------------------------------------------------
        this.offlineButton = this.add.sprite(config.width / 2 - 200, 450, 'OFFLINE_BUTTON');
        this.offlineButton.setInteractive({ useHandCursor: true });
        this.offlineButton.on('pointerover', () => this.offlineHover());

        this.offlineButtonHover = this.add.sprite(config.width / 2 - 200, 450, 'OFFLINE_BUTTON_HOVER');
        this.offlineButtonHover.setInteractive({ useHandCursor: true });
        this.offlineButtonHover.on('pointerdown', () => this.offlineDown());
        this.offlineButtonHover.on('pointerout', () => this.offlineOut());
        this.offlineButtonHover.setVisible(false);

        this.offlineButtonDown = this.add.sprite(config.width / 2 - 200, 450, 'OFFLINE_BUTTON_DOWN');
        this.offlineButtonDown.setInteractive({ useHandCursor: true });
        this.offlineButtonDown.on('pointerup', () => this.offlineUp());
        this.offlineButtonDown.setVisible(false);

        //BOTON AUDIO-------------------------------------------------------------------------------------
        this.musicButton = this.add.image(config.width - 100, 650, 'MUSIC_BUTTON');
        this.musicButton.setInteractive({ useHandCursor: true });
        this.musicButton.on('pointerdown', () => this.volume());

        this.musicMuted = this.add.image(config.width - 100, 650, 'MUTED_BUTTON');
        this.musicMuted.setInteractive({ useHandCursor: true });
        this.musicMuted.on('pointerdown', () => this.volume());
        this.musicMuted.setVisible(false);


        //BOTON CONTROLES---------------------------------------------------------------------------------
        this.controlsButton = this.add.image(config.width / 2, 650, 'CONTROLS_BUTTON');
        this.controlsButton.setInteractive({ useHandCursor: true });
        this.controlsButton.on('pointerover', () => this.controlsHover());

        this.controlsButtonHover = this.add.image(config.width / 2, 650, 'CONTROLS_BUTTON_HOVER');
        this.controlsButtonHover.setInteractive({ useHandCursor: true });
        this.controlsButtonHover.on('pointerdown', () => this.controlsDown());
        this.controlsButtonHover.on('pointerout', () => this.controlsOut());
        this.controlsButtonHover.setVisible(false);

        this.controlsButtonDown = this.add.image(config.width / 2, 650, 'CONTROLS_BUTTON_DOWN');
        this.controlsButtonDown.setInteractive({ useHandCursor: true });
        this.controlsButtonDown.on('pointerup', () => this.controlsUp());
        this.controlsButtonDown.setVisible(false);

        //BOTON TUTORIAL---------------------------------------------------------------------------------
        this.tutorialButton = this.add.image(config.width/2, 550, 'TUTORIAL_BUTTON');
        this.tutorialButton.setInteractive({ useHandCursor: true });
        this.tutorialButton.on('pointerover', () => this.tutorialHover());

        this.tutorialButtonHover = this.add.image(config.width/2, 550, 'TUTORIAL_BUTTON_HOVER');
        this.tutorialButtonHover.setInteractive({ useHandCursor: true });
        this.tutorialButtonHover.on('pointerdown', () => this.tutorialDown());
        this.tutorialButtonHover.on('pointerout', () => this.tutorialOut());
        this.tutorialButtonHover.setVisible(false);

        this.tutorialButtonDown = this.add.image(config.width/2, 550, 'TUTORIAL_BUTTON_DOWN');
        this.tutorialButtonDown.setInteractive({ useHandCursor: true });
        this.tutorialButtonDown.on('pointerup', () => this.tutorialUp());
        this.tutorialButtonDown.setVisible(false);

        //BOTON CHAT---------------------------------------------------------------------------------
        this.chatButton = this.add.image(50, 50, 'CHAT_BUTTON');
        this.chatButton.setInteractive({useHandCursor: true});
        this.chatButton.on('pointerover', () => this.chatHover());

        this.chatButtonHover = this.add.image(50, 50, 'CHAT_BUTTON_HOVER');
        this.chatButtonHover.setInteractive({useHandCursor: true});
        this.chatButtonHover.on('pointerdown', () => this.chatDown());
        this.chatButtonHover.on('pointerout', () => this.chatOut());
        this.chatButtonHover.setVisible(false);

        this.chatButtonDown = this.add.image(50, 50, 'CHAT_BUTTON_DOWN');
        this.chatButtonDown.setInteractive({useHandCursor: true});
        this.chatButtonDown.on('pointerup', () => this.chatUp());
        this.chatButtonDown.setVisible(false);

        this.startTitle();
    }

    update(time, delta) {

    }

    //FUNCION QUE CONTROLA EL AUDIO
    volume() {
        if (!this.titleBGM.mute) {
            this.titleBGM.mute = true;
            this.musicMuted.setVisible(true);
        }
        else {
            this.titleBGM.mute = false;
            this.musicMuted.setVisible(false);
        }
    }

    //FUNCIONES PARA LOS BOTONES ONLINE Y OFFLINE----------------------------------------
    //------------ONLINE-------------------
    //PARA CUANDO PASA POR ENCIMA
    onlineHover() {
        //console.log('online hovered');
        this.onlineButtonHover.setVisible(true);
    }
    //PARA CUANDO NO ESTA ENCIMA
    onlineOut() {
        //console.log('online not over');
        this.onlineButtonHover.setVisible(false);
    }
    //PARA CUANDO SE PULSA
    onlineDown() {
        //console.log('online clicked');
        this.onlineButtonDown.setVisible(true);
        this.startSFX.play();
    }
    //PARA CUANDO DEJA DE PULSARSE
    onlineUp() {
        //console.log('online up');
        conexion();
        this.scene.start('MATCHMAKING_SCENE_KEY');
        this.titleBGM.stop();
    }

    //-------------OFFLINE---------------
    offlineHover() {
        //console.log('offline over');
        this.offlineButtonHover.setVisible(true);
    }
    //PARA CUANDO NO ESTA ENCIMA
    offlineOut() {
        //console.log('offline not over');
        this.offlineButtonHover.setVisible(false);
    }
    //PARA CUANDO SE PULSA
    offlineDown() {
        //console.log('offline clicked');
        this.offlineButtonDown.setVisible(true);
        this.startSFX.play();
    }
    //PARA CUANDO DEJA DE PULSARSE
    offlineUp() {
        //console.log('offline up');
        conexion();
        this.scene.start('GAME_SCENE_KEY');
        this.titleBGM.stop();
    }


    //FUNCIONES PARA EL BOTON DE CONTROLES---------------------------------------------
    //PARA CUANDO SE PASA POR ENCIMA
    controlsHover() {
        //console.log('controls hovered');
        this.controlsButtonHover.setVisible(true);
    }
    //PARA CUANDO NO ESTA ENCIMA
    controlsOut() {
        //console.log('controls not hovered');
        this.controlsButtonHover.setVisible(false);
    }
    //PARA CUANDO SE PULSA
    controlsDown() {
        //console.log('controls clicked');
        this.controlsButtonDown.setVisible(true);
    }
    //PARA CUANDO SE DEJA DE HACER CLICK
    controlsUp() {
        //console.log('controls up');
        this.controlsButtonDown.setVisible(false);
        this.scene.pause('TITLE_SCENE_KEY');
        this.scene.run('CONTROL_KEYS_SCENE_KEY');
    }

    //FUNCIONES PARA EL BOTON DEL TUTORIAL---------------------------------------------
    //PARA CUANDO SE PASA POR ENCIMA
    tutorialHover() {
        //console.log('controls hovered');
        this.tutorialButtonHover.setVisible(true);
    }
    //PARA CUANDO NO ESTA ENCIMA
    tutorialOut() {
        //console.log('controls not hovered');
        this.tutorialButtonHover.setVisible(false);
    }
    //PARA CUANDO SE PULSA
    tutorialDown() {
        //console.log('controls clicked');
        this.tutorialButtonDown.setVisible(true);
    }
    //PARA CUANDO SE DEJA DE PULSAR
    tutorialUp() {
        //console.log('controls up');
        this.tutorialButtonDown.setVisible(false);
        this.scene.pause('TITLE_SCENE_KEY');
        this.scene.run('TUTORIAL_SCENE_KEY');
    }

    //FUNCIONES PARA EL BOTON DEL CHAT---------------------------------------------
    //PARA CUANDO NO ESTA ENCIMA
    chatHover() {
        //console.log('controls not hovered');
        this.chatButtonHover.setVisible(true);
    }
    chatOut() {
        //console.log('controls not hovered');
        this.chatButtonHover.setVisible(false);
    }
    //PARA CUANDO SE PULSA
    chatDown() {
        //console.log('controls clicked');
        this.chatButtonDown.setVisible(true);
    }
    //PARA CUANDO SE DEJA DE PULSAR
    chatUp() {
        this.chatButtonDown.setVisible(false);
        document.getElementById('chat').style.display = 'block'
        
        //console.log('controls up');
        
        this.scene.pause('TITLE_SCENE_KEY');
        this.scene.run('CHAT_SCENE_KEY');
        
    }

    //FUNCION QUE PONE EN MARCHA LA PANTALLA DEL TITULO
    startTitle() {
        this.titleBGM.play();
        //console.log('start title funciona');
    }

    
}

