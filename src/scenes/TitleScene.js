class TitleScene extends Phaser.Scene {

    constructor() {
        super({key:"TitleScene"});
    }

    preload() {
        //IMAGENES
        this.load.image('fondoTitulo', 'assets/sprites/fondo.png');
        this.load.image('botonSTART','assets/sprites/START.png');

        //AUDIO
        this.load.audio("tituloAudio","assets/audio/titulo.mp3");
        this.load.audio("tutun","assets/audio/tutunTITULO.mp3");
    }

    create() {
        //FONDO
        let bg = this.add.sprite(0, 0, 'fondoTitulo');
        bg.setOrigin(0,0);

        //AUDIO
        //this.titleBGM = this.sound.add("tituloAudio");
        this.tutunTitulo = this.sound.add("tutun");



        //BOTON
        let botonStart = this.add.image(config.width / 2, 500, 'botonSTART');
        botonStart.setInteractive({useHandCursor: true});
        botonStart.on("pointerdown", () => this.clickButton());


    }

    update(time,delta){
        //this.titleBGM.play();
    }


    //FUNCION DEL BOTON
    clickButton(){
        this.tutunTitulo.play();
        this.tutunTitulo.onStop(this.scene.switch('juegoEscena'));
        //this.titleBGM.stop();

    }
    cambiarEscena(){

    }


}