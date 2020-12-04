class ResumeScene extends Phaser.Scene {

    constructor() {
        super({key:"resumenScene"});
    }
    
    preload() {
        //IMAGENES
        this.load.image('fondoTitulo', 'assets/sprites/TITLE_BACKGROUND.png');
        this.load.image('botonRESTART','assets/sprites/buttons/RESTART_BUTTON.png');

        //AUDIO
        this.load.audio("tituloAudio","assets/audio/TITLE_BGM.mp3");
        this.load.audio("tutun","assets/audio/START_SFX.mp3");
    }
    
    create() {
        let bg = this.add.sprite(0, 0, 'fondoTitulo');
        bg.setOrigin(0,0);

        //AUDIO
        //this.titleBGM = this.sound.add("tituloAudio");
        this.tutunTitulo = this.sound.add("tutun");

        //BOTON
        let botonRestart = this.add.image(config.width / 2, 500, 'botonRESTART');
        botonRestart.setInteractive({useHandCursor: true});
        botonRestart.on("pointerdown", () => this.restartGame());
    }
    
    restartGame(){
        this.tutunTitulo.play();
        //this.tutunTitulo.onStop(this.scene.switch('TitleScene'));
        this.scene.start('TitleScene');
        //this.scene.stop('juegoEscena');
        //this.titleBGM.stop();

    }

    setWinnerText(index){
        if (index = 1){
            this.p1WinsText = this.add.text(250, 300, 'PLAYER 1 WINS!', {
                fontSize: '32px',
                fill: '#000'
            });
            
        } else if (index = 2) {
            this.p2WinsText = this.add.text(250, 300, 'PLAYER 2 WINS!', {//Mostramos por pantalla el texto de victoria
                fontSize: '32px',
                fill: '#000'
            });
        }
    }
}
