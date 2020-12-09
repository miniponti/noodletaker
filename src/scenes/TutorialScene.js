class TutorialScene extends Phaser.Scene{
    constructor() {
        super({key: 'TUTORIAL_SCENE_KEY'});
    }

    preload(){
        console.log('TUTORIAL SCENE PRELOAD');

        this.load.image('TUTORIAL_1','assets/interface/TUTORIAL_1.png');
        this.load.image('TUTORIAL_2','assets/interface/TUTORIAL_2.png');
        this.load.image('TUTORIAL_BG','assets/sprites/TITLE_BACKGROUND.png');
        this.load.image('EXIT_BUTTON','assets/sprites/buttons/EXIT_BUTTON.png');
    }

    create(){
        console.log('TUTORIAL SCENE CREATE');
        //FONDO
        this.add.sprite(0,0,'TUTORIAL_BG').setOrigin(0,0);

        //PRIMER PANEL DEL TUTORIAL
        this.tutorial1 = this.add.sprite(config.width/2, config.height/2, 'TUTORIAL_1');
        this.tutorial1.setInteractive({useHandCursor: true});
        this.tutorial1.on('pointerdown', () => this.nextPanel());


        //SEGUNDO PANEL DEL TUTORIAL
        this.tutorial2 = this.add.sprite(config.width/2, config.height/2, 'TUTORIAL_2');
        this.tutorial2.setVisible(false);

        //BOTON SALIDA
        this.exitButton = this.add.image(config.width - 250, 100, 'EXIT_BUTTON');
        this.exitButton.setInteractive({useHandCursor: true});
        this.exitButton.on('pointerdown', () => this.returnToTitle());
    }

    update(){

    }

    //FUNCION QUE PASA AL SIGUIENTE PANEL
    nextPanel(){
        this.tutorial2.setVisible(true);
    }

    //FUNCION QUE PERMITE VOLVER A LA PANTALLA DEL TITULO
    returnToTitle(){
        //console.log("returnToTitle FUNCIONA");
        this.scene.stop('TUTORIAL_SCENE_KEY');
        this.scene.resume('TITLE_SCENE_KEY');
    }
}
