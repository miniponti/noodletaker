class TitleScene extends Phaser.Scene {

    constructor() {
        super({key:"TitleScene"});
    }

    preload() {
        //IMAGENES
        this.load.image('fondoTitulo', 'assets/sprites/fondo.png');
        this.load.image('botonSTART','assets/sprites/START.png');
        this.load.image('botonCtrl','assets/sprites/CONTROLES.png');
        this.load.image('botonAudio','assets/sprites/audio.png');

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

        //BOTON START
        let botonStart = this.add.image(config.width / 2 - 200, 500, 'botonSTART');
        botonStart.setInteractive({useHandCursor: true});
        botonStart.on("pointerdown", () => this.startGame());

        //BOTON CONTROLES
        let botonCtrl = this.add.image(config.width / 2 + 200, 500, 'botonCtrl');
        botonCtrl.setInteractive({useHandCursor: true});
        botonCtrl.on("pointerdown", () => this.mostrarControles());
        /*
        //BOTON AUDIO
        let botonAudio = this.add.image(config.width - 100, 650, 'botonAudio');
        botonAudio.setInteractive({useHandCursor: true});
        botonAudio.on("pointerdown", () => this.volumen());
        */
    }

    update(time,delta){
        //this.titleBGM.play();
    }

    //FUNCION DEL BOTON
    clickButton(){
        console.log("clickButton FUNCIONA");
        //this.tutunTitulo.play();
        //this.scene.start('juegoEscena');
        //this.tutunTitulo.onStop(this.scene.switch('juegoEscena'));
        //this.titleBGM.stop();

    }

    mostrarControles(){
        console.log("mostrarControles FUNCIONA");
        //this.scene.start('controlsScene');
    }
}
