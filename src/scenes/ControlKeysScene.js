class ControlKeysScene extends Phaser.Scene{
    constructor() {
        super({key: "CONTROL_KEYS_SCENE_KEY"});
    }

    preload(){
        console.log("CONTROL_KEYS_SCENE PRELOAD");

        this.load.image('CONTROLS_MENU','assets/interface/CONTROLS_MENU.png');
        this.load.image('CONTROLS_BG','assets/sprites/TITLE_BACKGROUND.png');
        this.load.image('EXIT_BUTTON','assets/sprites/buttons/EXIT_BUTTON.png');
    }

    create(){
        console.log("CONTROL_KEYS_SCENE CREATE");
        this.add.sprite(0,0,'CONTROLS_BG').setOrigin(0,0);
        this.add.sprite(config.width/2, config.height/2, 'CONTROLS_MENU');

        //BOTON SALIDA
        let EXIT_BUTTON = this.add.image(config.width - 250, 100, 'EXIT_BUTTON');
        EXIT_BUTTON.setInteractive({useHandCursor: true});
        EXIT_BUTTON.on("pointerdown", () => this.returnToTitle());
    }

    update(){

    }

    //FUNCION QUE PERMITE VOLVER A LA PANTALLA DEL TITULO
    returnToTitle(){
        console.log("returnToTitle FUNCIONA");
        this.scene.start('TITLE_SCENE_KEY');
    }
}
