class ResumeScene extends Phaser.Scene {

    constructor() {
        super({key:"resumenScene"});
    }
    
    preload() {
        //IMAGENES
        this.load.image('fondoTitulo', 'assets/sprites/fondo.png');
        this.load.image('botonRESTART','assets/sprites/RESTART.png');

        //AUDIO
        this.load.audio("tituloAudio","assets/audio/titulo.mp3");
        this.load.audio("tutun","assets/audio/tutunTITULO.mp3");
    }
    
    create() {
        let bg = this.add.sprite(0, 0, 'fondoTitulo');
        bg.setOrigin(0,0);

        //AUDIO
        //this.titleBGM = this.sound.add("tituloAudio");
        this.tutunTitulo = this.sound.add("tutun");



        //BOTON
        let botonStart = this.add.image(config.width / 2, 500, 'botonRESTART');
        botonStart.setInteractive({useHandCursor: true});
        botonStart.on("pointerdown", () => this.clickButton());
    }
    
    clickButton(){
        this.tutunTitulo.play();
        //this.tutunTitulo.onStop(this.scene.switch('TitleScene'));
        this.scene.start('TitleScene');
        //this.scene.stop('juegoEscena');
        //this.titleBGM.stop();

    }
}
