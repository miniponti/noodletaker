class GameScene extends Phaser.Scene {

    constructor() {
        super("juegoEscena");
    }

    init() {

    };

    preload() {
        //CARGA DE TODAS LAS IMAGENES
        this.load.image('fondo', 'assets/sprites/casas.png');
        this.load.image('suelo', 'assets/sprites/plataforma.png');
        this.load.image('obstaculo', 'assets/sprites/plataforma.png');
        this.load.spritesheet('j1', 'assets/sprites/AZUL_CORRIENDO.png', {
            frameWidth: 697,
            frameHeight: 1004
        });
        this.load.spritesheet('j2', 'assets/sprites/VERDE_CORRIENDO.png', {
            frameWidth: 697,
            frameHeight: 1004
        });
        this.load.spritesheet('samurai', 'assets/sprites/samurai.png', {
            frameWidth: 1161,
            frameHeight: 1387
        });
    }

    create() {
        //FONDO DEL JUEGO
        //INICIALIZACION FONDO
        this.bg = this.add.tileSprite(0, 0, game.config.width, game.config.height, 'fondo');
        this.bg.setOrigin(0,0);  //SE CAMBIA EL ORIGEN A LA ESQUINA SUPERIOR IZQ

        //SUELO CON COLLIDERS
        this.suelo = this.physics.add.image(0, 750, 'suelo'); //INICIALIZACION SUELO
        this.suelo.setCollideWorldBounds(true);               //COLISIONES CON EL BORDE DEL "CANVAS"

        //JUGADOR 1
        this.player1 = this.physics.add.sprite(400, 550, 'j1');  //INICIALIZACION J1
        this.player1.setScale(0.15,0.15);                        //ESCALADO J1
        this.physics.add.collider(this.player1, this.suelo);     //COLISIONES CON SUELO
        this.anims.create({                                      //ANIMACION SPRITE J1
            key: "j1_anim",
            frames: this.anims.generateFrameNumbers("j1"),
            frameRate: 20,
            repeat: -1
        });
        this.player1.play("j1_anim");

        //JUGADOR 2
        this.player2 = this.physics.add.sprite(500, 550, 'j2');  //INICIALIZACION J2
        this.player2.setScale(0.15,0.15);                        //ESCALADO J2
        this.physics.add.collider(this.player2, this.suelo);     //COLISIONES CON SUELO
        this.anims.create({                                      //ANIMACION SPRITE J2
            key: "j2_anim",
            frames: this.anims.generateFrameNumbers("j2"),
            frameRate: 20,
            repeat: -1
        });
        this.player2.play("j2_anim");

        //SAMURAI
        this.samurai = this.physics.add.sprite(0, 450, 'samurai');  //INICIALIZACION SAMURAI
        this.samurai.setScale(0.15, 0.15);                          //ESCALADO SAMURAI
        this.samurai.setOrigin(0,0);
        this.physics.add.collider(this.samurai, this.suelo);         //COLISIONES CON SUELO

        //TECLAS
        this.keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        this.keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        this.keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        this.keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        this.keyUP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
        this.keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        this.keyDOWN = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);
        this.keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);

    }

    movePlayers(){
        //MOVIMIENTOS DEL JUGADOR 1 (NINJA AZUL)
        if(this.keyW.isDown){
            this.player1.setVelocityY(-200);
        }
        else if (this.keyA.isDown){
            this.player1.setVelocityX(-200);
        }
        else if(this.keyS.isDown){
            //añadir cambio de sprite
        }
        else if (this.keyD.isDown){
            this.player1.setVelocityX(200);
        }

        //MOVIMIENTOS DEL JUGADOR 2 (NINJA VERDE)
        if(this.keyUP.isDown){
            this.player2.setVelocityY(-200);
        }
        else if (this.keyLEFT.isDown){
            this.player2.setVelocityX(-200);
        }
        else if(this.keyDOWN.isDown){
            //añadir cambio de sprite
        }
        else if (this.keyRIGHT.isDown){
            this.player2.setVelocityX(200);
        }
    }

    update() {
        this.movePlayers();
        this.bg.tilePositionX += 2; //MOVIMIENTO CONSTANTE DEL FONDO
    }


    end() {

    }

}
