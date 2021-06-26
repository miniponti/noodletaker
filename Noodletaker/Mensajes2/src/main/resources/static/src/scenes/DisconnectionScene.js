class DISCONNECTION_SCENE extends Phaser.Scene {

    constructor() {
        super({key:"DISCONNECTION:SCENEScene"});
    }
    
    preload() {
        //IMAGENES
        this.load.image('DISCONNECTION', 'assets/interface/DISCONNECTION.png');
       
        //AUDIO
        this.load.audio("tituloAudio","assets/audio/TITLE_BGM.mp3");
    }
    
    
    diconnectionGame(){
        this.tutunTitulo.play();
        //this.tutunTitulo.onStop(this.scene.switch('TitleScene'));
        this.scene.start('TITLE_SCENE_KEY');
        //this.scene.stop('juegoEscena');
        //this.titleBGM.stop();

    }


}