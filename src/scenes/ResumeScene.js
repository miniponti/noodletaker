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
        let botonRestart = this.add.image(config.width / 2, 500, 'botonRESTART');
        botonRestart.setScale(0.1, 0.1);
        botonRestart.setInteractive({useHandCursor: true});
        botonRestart.on("pointerdown", () => this.restartGame());

        this.p1WinsText = this.add.text(100, 100, 'PLAYER 1 WINS!');
        this.p1WinsText.setTint(0xff00ff, 0xffff00, 0x0000ff, 0xff0000);
        //this.p1WinsText.setVisible(false);
        //this.p1WinsText.setTint(0xff00ff, 0xffff00, 0x0000ff, 0xff0000);

        this.p2WinsText = this.add.text(100, 100, 'PLAYER 2 WINS!');
        this.p2WinsText.setTint(0xff00ff, 0xffff00, 0x0000ff, 0xff0000);
        //this.p2WinsText.setVisible(false);
        //this.p2WinsText.setTint(0xff00ff, 0xffff00, 0x0000ff, 0xff0000);
    }
    
    restartGame(){
        this.tutunTitulo.play();
        //this.tutunTitulo.onStop(this.scene.switch('TitleScene'));
        this.scene.start('TitleScene');
        //this.scene.stop('juegoEscena');
        //this.titleBGM.stop();

    }

    setWinnerText(index){
        if (index === 1){
            console.log("P1 WINS");
            //this.p1WinsText.setVisible(true);
            
        } else if (index === 2) {
            console.log("P2 WINS");
            //this.p2WinsText.setVisible(true);

        }
    }
}
