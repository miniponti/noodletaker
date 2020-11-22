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
        //Carga de las animaciones, indicando el ancho y alto de cada sprite dentro del sprite sheet
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
        this.load.spritesheet('powerup', 'assets/sprites/ETM.png', {
            frameWidth: 871,
            frameHeight: 1303
        });
    }

    create() {
        //FONDO DEL JUEGO

        //INICIALIZACION FONDO
        this.bg = this.add.tileSprite(0, 0, game.config.width, game.config.height, 'fondo');
        this.bg.setOrigin(0,0);  //SE CAMBIA EL ORIGEN A LA ESQUINA SUPERIOR IZQ

        //SUELO ESTATICO
        this.suelo = this.physics.add.staticGroup();
        this.suelo.create(0, 750, 'suelo').setScale(2).refreshBody(); //INICIALIZACION SUELO
        

        //JUGADOR 1
        this.player1 = this.physics.add.sprite(450, 550, 'j1');  //INICIALIZACION J1
        this.player1.setScale(0.15,0.15);                        //ESCALADO J1
        
        //ANIMACIONES JUGADOR 1
        this.anims.create({                                     
            key: "j1_anim",
            frames: this.anims.generateFrameNumbers("j1"),
            frameRate: 20,
            repeat: -1
        });
        this.anims.create({                                      //ANIMACION SPRITE J1
            key: "j1_stand",
            frames: [{key: 'j1', frame: 3}],
            frameRate: 20,
        });
        this.player1.play("j1_stand");
        this.player1.setVelocityX(-100);

        //JUGADOR 2
        this.player2 = this.physics.add.sprite(500, 550, 'j2');  //INICIALIZACION J2
        this.player2.setScale(0.15,0.15);                        //ESCALADO J2

        //ANIMACIONES JUGADOR 2
        this.anims.create({                                      
            key: "j2_anim",
            frames: this.anims.generateFrameNumbers("j2"),
            frameRate: 20,
            repeat: -1
        });
        this.anims.create({                                      //ANIMACION SPRITE J1
            key: "j2_stand",
            frames: [{key: 'j2', frame: 3}],
            frameRate: 20,
        });
        this.player2.play("j2_stand");
        this.player2.setVelocityX(-100);

        //SAMURAI
        this.samurai = this.physics.add.sprite(100, 545, 'samurai');  //INICIALIZACION SAMURAI
        this.samurai.setScale(0.15, 0.15);                          //ESCALADO SAMURA
        
        //PowerUps
        this.powerUps = this.physics.add.group();

        //El todo mitico
    
        this.todoMitico = this.powerUps.create(900, 550, 'powerup');
        this.todoMitico.setScale(0.15, 0.15);

        //TECLAS
        this.keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        this.keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        this.keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        this.keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        this.keyUP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
        this.keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        this.keyDOWN = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);
        this.keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);

        //Colisiones con los límites del canvas
        this.player1.setCollideWorldBounds(true);
        this.player2.setCollideWorldBounds(true);
        this.samurai.setCollideWorldBounds(true);
        this.todoMitico.setCollideWorldBounds(true);

        //COLISIONES CON SUELO
        this.physics.add.collider(this.samurai, this.suelo);         
        this.physics.add.collider(this.player2, this.suelo);     
        this.physics.add.collider(this.player1, this.suelo);     
        this.physics.add.collider(this.powerUps, this.suelo);

        //COLISIONES ENTRE ELEMENTOS
        this.physics.add.collider(this.player1, this.samurai, this.gameOverP1, null, this);
        this.physics.add.collider(this.player2, this.samurai, this.gameOverP2, null, this);
        this.physics.add.collider(this.player1, this.player2);
        this.physics.add.collider(this.player1, this.powerUps);
        this.physics.add.collider(this.player2, this.powerUps);
        
        //Variables
        this.velocidadJugador = 200;
        this.velocidadMundo = 100;
        this.velocidadSalto = 400
        this.finJuego = false;
    }

    movePlayers(){
        if(!finjuego){
            //MOVIMIENTOS DEL JUGADOR 1 (NINJA AZUL)
            if(this.keyW.isDown && this.player1.body.touching.down){
                this.player1.setVelocityY(-this.velocidadSalto);
            }
            else if (this.keyA.isDown){
                this.player1.setVelocityX(-(this.velocidadJugador+this.velocidadMundo));
                this.player1.play("j1_anim", true); 
                this.player1.setFlip(true,false)
            }
            else if(this.keyS.isDown){
                this.player1.play("j1_stand", true);
                this.player1.setVelocityX(-this.velocidadMundo);
            }
            else if (this.keyD.isDown){
                this.player1.setVelocityX(this.velocidadJugador);
                this.player1.play("j1_anim", true);
                this.player1.setFlip(false,false) 
            }

            //MOVIMIENTOS DEL JUGADOR 2 (NINJA VERDE)
            if(this.keyUP.isDown && this.player2.body.touching.down){
                this.player2.setVelocityY(-this.velocidadSalto);
            }
            else if (this.keyLEFT.isDown){
                this.player2.setVelocityX(-(this.velocidadJugador+this.velocidadMundo));
                this.player2.play("j2_anim", true); 
                this.player2.setFlip(true,false)
            }
            else if(this.keyDOWN.isDown){
                this.player2.play("j2_stand", true); 
                this.player2.setVelocityX(-this.velocidadMundo);
            }
            else if (this.keyRIGHT.isDown){
                this.player2.setVelocityX(this.velocidadJugador);
                this.player2.play("j2_anim", true);
                this.player2.setFlip(false,false) 
            }
        }
    }

    update() {
        
        this.movePlayers();
        this.bg.tilePositionX += 3; //MOVIMIENTO CONSTANTE DEL FONDO
    }


    end() {

    }


    gameOverP1() {
        //Los jugadores ya no pueden moverse
        this.physics.pause();
        this.gameOver = true;                                                   //Fin del juego
        this.thisp2WinsText = this.add.text(250, 300, 'PLAYER 2 WINS!', {       //Mostramos por pantalla el texto de victoria
            fontSize: '32px',
            fill: '#000'
        });

        //Ponemos animaciones de un solo frame para que el jugador no se siga moviendo
        this.player2.play("j2_stand");                                          
        this.player1.play("j1_stand");
        this.finJuego = true;
    }

    gameOverP2() {
        //Los jugadores ya no pueden moverse
        this.physics.pause();
        this.gameOver = true;
        this.p1WinsText = this.add.text(250, 300, 'PLAYER 1 WINS!', {
            fontSize: '32px',
            fill: '#000'
        });


        //Ponemos animaciones de un solo frame para que el jugador no se siga moviendo
        this.player2.play("j2_stand");
        this.player1.play("j1_stand");
        this.finJuego = true;
    }
}
