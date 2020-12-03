class ControlesScene extends Phaser.Scene{
    constructor() {
        super({key: "controlsScene"});
    }

    preload(){
        console.log("ControlesScene PRELOAD");

        this.load.image('pantallaControles','assets/sprites/fondoControles.png');
        this.load.image('menuControles','assets/sprites/menuControles.png');
    }

    create(){
        console.log("ControlesScene CREATE");
        this.add.sprite(100,100,'pantallaControles').setOrigin(0, 0);
        this.add.sprite(100, 100, 'menuControles').setOrigin(0, 0);
    }

    update(){
        console.log("ControlesScene UPDATE");

    }
}
