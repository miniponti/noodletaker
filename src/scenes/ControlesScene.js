class ControlesScene extends Phaser.Scene{
    constructor() {
        super({key: "controlsScene"});
    }

    preload(){
        console.log("ControlesScene PRELOAD");

        //this.load.image('pantallaControles','assets/sprites/fondoControles.png');
        this.load.image('menuControles','assets/sprites/menuControles.png');
        this.load.image('botonEXIT','assets/sprites/EXIT.png');
    }

    create(){
        console.log("ControlesScene CREATE");
        //this.add.sprite(100,100,'pantallaControles').setOrigin(0, 0);
        this.add.sprite(100, 100, 'menuControles').setOrigin(0, 0);

        //BOTON SALIDA
        let botonEXIT = this.add.image(config.width - 200, 100, 'botonEXIT');
        botonEXIT.setScale(0.1, 0.1);
        botonEXIT.setInteractive({useHandCursor: true});
        botonEXIT.on("pointerdown", () => this.returnToTitle());
    }

    update(){

    }

    returnToTitle(){
        console.log("returnToTitle FUNCIONA");
        //this.tutunTitulo.play();
        this.scene.start('TitleScene');
        //this.tutunTitulo.onStop(this.scene.switch('juegoEscena'));
        //this.titleBGM.stop();

    }
}
