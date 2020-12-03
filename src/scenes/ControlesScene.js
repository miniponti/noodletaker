class ControlesScene extends Phaser.Scene{
    constructor() {
        super({key: "ControlScene"});
    }

    preload(){
        this.load.image('pantallaControles','assets/sprites/controlesmenu.png');
    }

    create(){
        let menuControles = this.add.sprite(100,100,'pantallaControles').setOrigin(0,0);
    }

    update(){

    }

}