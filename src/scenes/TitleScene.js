class TitleScene extends Phaser.Scene {

    constructor() {
        super({key:"TitleScene"});
    }

    preload() {
        this.load.image('fondoTitulo', 'assets/sprites/fondo.png');
        this.load.image('botonSTART','assets/sprites/START.png');
    }

    create() {
        let bg = this.add.sprite(0, 0, 'fondoTitulo');
        bg.setOrigin(0,0);

        let botonStart = this.add.image(config.width / 2, 500, 'botonSTART');
        botonStart.setInteractive({useHandCursor: true});
        botonStart.on("pointerdown", () => this.clickButton());


    }

    update(time,delta){

    }

    clickButton(){
        this.scene.switch('juegoEscena');
    }

}