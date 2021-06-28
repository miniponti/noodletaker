
class GameScene extends Phaser.Scene {

    constructor() {
        super('GAME_SCENE_KEY');
    }

    init() {

    }

    preload() {

        //CARGA DE TODAS LAS IMAGENES
        // this.load.image('BG1', 'assets/sprites/Background1.png');
        // this.load.image('BG2', 'assets/sprites/Background3.png');
        this.load.image('BGCALERO', 'assets/sprites/Background2.png')
        this.load.image('ROAD', 'assets/sprites/plataforma.png');
        this.load.image('OBSTACLE', 'assets/sprites/PLATFORM2.png');
        this.load.image('FINISHLINE', 'assets/sprites/FINISHLINE.png');
        this.load.image('NOODLES', 'assets/sprites/NOODLECUP.png');
        this.load.image('ELTODOMITICO', 'assets/sprites/ETM.png');

        //Carga de las animaciones, indicando el ancho y alto de cada sprite dentro del sprite sheet
        this.load.spritesheet('P1', 'assets/sprites/BLUE_SPRITESHEET.png', {
            frameWidth: 697,
            frameHeight: 1004
        });
        this.load.spritesheet('P2', 'assets/sprites/GREEN_SPRITESHEET.png', {
            frameWidth: 697,
            frameHeight: 1004
        });
        this.load.spritesheet('SAMURAI', 'assets/sprites/samurai.png', {
            frameWidth: 1161,
            frameHeight: 1387
        });
        this.load.spritesheet('POWERUP', 'assets/sprites/POWERUP.png', {
            frameWidth: 871,
            frameHeight: 1303
        });

        //AUDIO
        this.load.audio('GAME_AUDIO', 'assets/audio/GAME_BGM.mp3');
        this.load.audio('GAMEOVER_AUDIO', 'assets/audio/gameover.mp3');
        this.load.audio('GONG_SFX', 'assets/audio/GONG.mp3');
        this.load.audio('LITTLE_GONG_SFX', 'assets/audio/littleGONG.mp3');
        this.load.audio('PUNCH_SFX', 'assets/audio/punch.mp3');
        this.load.audio('JUMP_SFX', 'assets/audio/JUMP.mp3');
        this.load.audio('SAMURAI_SFX', 'assets/audio/samuraiDEAD.mp3');
    }

    create() {

        if(this.keyA != undefined || this.keyDOWN != undefined){
            console.log("Reseteando escena");
            this.resetKeys();
        }
        
        console.log("Jugador: " + jugador + " online?:" + online);
        //Variables
        this.playerSpeed = 375;
        this.fastSpeed = 400;
        this.worldSpeed = 298;
        this.jumpSpeed = 450;
        this.platformSpawnSpeed = 1500;
        this.powerupSpawnSpeed = 6000;
        this.fondoSpeed1 = 3;
        this.fondoSpeed2 = 5;
        this.gameOver = false;
        this.startGameBool = false;
        this.p1Moving = true;
        this.p2Moving = true;
        this.timerP1 = this.time.now;
        this.timerP2 = this.time.now;
        this.p1canAtack = true;
        this.p2canAtack = true;
        this.attackTimerP1 = this.time.now;
        this.attackTimerP2 = this.time.now;
        this.p1Jump = true;
        this.p2Jump = true;
        this.jumpTimerP1 = this.time.now;
        this.jumpTimerP2 = this.time.now;
        this.atackTime = 1000; //ms
        this.stunTime = 200; //ms
        this.jumpTime = 1000;
        this.randomPlat;
        this.winner;

        //CONEXION WEB
        this.serverTimeout = 5000;
        this.pinged = false;
        this.localReady = false;
        this.onlineReady = false;

        //AUDIO
        this.gameBGM = this.sound.add('GAME_AUDIO');
        this.gameoverSFX = this.sound.add('GAMEOVER_AUDIO');
        this.gongSFX = this.sound.add('GONG_SFX');
        this.littleGongSFX = this.sound.add('LITTLE_GONG_SFX');
        this.punchSFX = this.sound.add('PUNCH_SFX', { volume: 0.3 });
        this.jumpSFX = this.sound.add('JUMP_SFX', { volume: 0.3 });
        this.samuraiSFX = this.sound.add('SAMURAI_SFX');

        //FONDO DEL JUEGO
        // this.bg1 = this.add.tileSprite(0, 0, game.config.width, game.config.height, 'BG1');
        // this.bg1.setOrigin(0, 0);  //SE CAMBIA EL ORIGEN A LA ESQUINA SUPERIOR IZQ
        // this.bg1.setScrollFactor(0);
        // this.bg1.setScale(1.75, 1.75);
        // this.bg2 = this.add.tileSprite(0, 0, game.config.width, game.config.height, 'BG2');
        // this.bg2.setOrigin(0, 0);  //SE CAMBIA EL ORIGEN A LA ESQUINA SUPERIOR IZQ
        // this.bg2.setScrollFactor(0);
        // this.bg2.setScale(1, 1);
        this.bgcalero = this.add.tileSprite(0, 0, game.config.width, game.config.height, 'BGCALERO')
        this.bgcalero.setOrigin(1, 1);  //SE CAMBIA EL ORIGEN A LA ESQUINA SUPERIOR IZQ
        this.bgcalero.setScrollFactor(0);

        //SUELO ESTATICO
        this.suelo = this.physics.add.staticGroup();
        this.suelo.create(0, 736, 'ROAD').setScale(5, 0.001).refreshBody(); //INICIALIZACION SUELO

        //PLATAFORMAS
        this.platforms = this.physics.add.group({
            allowGravity: false,
            immovable: true,
        });

        //JUGADOR 1-----------------------------------------------------------------------------------------------------
        this.player1 = this.physics.add.sprite(600, 550 + 86, 'P1');    //INICIALIZACION J1
        this.player1.setScale(0.15, 0.15);                              //ESCALADO J1
        this.player1.setVelocityX(0);
        this.player1.setVelocityY(0);

        this.animsP1key;
        this.animsP1frames;
        this.animsP1frameRate;
        this.animsP1repeat;

        //ANIMACIONES JUGADOR 1
        this.anims.create({
            key: 'P1_anim',
            frames: this.anims.generateFrameNumbers('P1'),
            frameRate: 20,
            repeat: -1
        });
        this.anims.create({//ANIMACION SPRITE J1
            key: 'P1_stand',
            frames: [{ key: 'P1', frame: 3 }],
            frameRate: 20,
        });

        this.player1.play('P1_stand');


        //JUGADOR 2-----------------------------------------------------------------------------------------------------
        this.player2 = this.physics.add.sprite(650, 550 + 86, 'P2');    //INICIALIZACION J2
        this.player2.setScale(0.15, 0.15);                              //ESCALADO J2`
        this.player2.setVelocityX(0);
        this.player2.setVelocityY(0);

        this.animsP2key;
        this.animsP2frames;
        this.animsP2frameRate;
        this.animsP2repeat;

        //ANIMACIONES JUGADOR 2
        this.anims.create({
            key: 'P2_anim',
            frames: this.anims.generateFrameNumbers('P2'),
            frameRate: 20,
            repeat: -1
        });
        this.anims.create({//ANIMACION SPRITE J1
            key: 'P2_stand',
            frames: [{ key: 'P2', frame: 3 }],
            frameRate: 20,
        });
        this.player2.play('P2_stand');

        //this.animP1 = this.anims.get('P1_anim');
        //this.animP2 = this.anims.get('P2_anim');
        this.animP1 = 0;
        this.animP2 = 0;
        this.flipP1 = 0;
        this.flipP2 = 0;
        /*
        0 -> stand
        1 -> move
        0 -> no flip
        1 -> si flip
        */

        //SAMURAI
        this.samurai = this.physics.add.sprite(100, 545 + 86, 'SAMURAI');  //INICIALIZACION SAMURAI
        this.samurai.setScale(0.15, 0.15);                          //ESCALADO SAMURA

        //NOODLES
        this.noodles = this.add.sprite(1000, 684.2, 'NOODLES');
        this.noodles.setScale(0.5, 0.5);
        this.hasNoodles = 0;
        this.noodlesHolder = this.physics.add.sprite(1000, 684.2, 'NOODLES');
        this.noodlesHolder.setScale(0.5, 0.5);
        this.noodlesHolder.setVisible(false);

        //PowerUps
        this.powerUps = this.physics.add.group();

        //EL TODO MITICO
        this.elTodoMitico = this.add.sprite(0, 0, 'ELTODOMITICO');
        this.elTodoMitico.setOrigin(0, 0);
        this.elTodoMitico.setDepth(15);
        this.elTodoMitico.setVisible(false);

        //TECLAS
        this.wDown = false;
        this.aDown = false;
        this.sDown = false;
        this.dDown = false;
        this.eDown = false;
        this.upDown = false;
        this.leftDown = false;
        this.downDown = false;
        this.rightDown = false;
        this.enterDown = false;

        console.log("online: " + online + "\njugador: " + jugador + "\nsevidor: "  + server + "\nsemilla: " + seed + "\nstompClient: " + stompClient) + "\nsocket: " + socket;

        // CONTROLES JUGADOR 1 ------------------------------------------------------------------------------
        if (!online || jugador == 0) {

            if(online){
                this.add.text(0, 0, 'You are player 1 (blue), use wasd keys to move!', {
                    fontFamily: 'japaneseFont',
                    fontSize: '30px',
                    color: 'blue',
                    backgroundColor : 'black'
                })
            }
            this.keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W, false);
            this.keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A, false);
            this.keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S, false);
            this.keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D, false);
            this.keyE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E, false);

            this.keyW.on('down', function () { this.wDown = true }, this);
            this.keyA.on('down', function () { this.aDown = true }, this);
            this.keyS.on('down', function () { this.sDown = true }, this);
            this.keyD.on('down', function () { this.dDown = true }, this);
            this.keyE.on('down', function () { this.eDown = true }, this);

            this.keyW.on('up', function () { this.wDown = false }, this);
            this.keyA.on('up', function () { this.aDown = false }, this);
            this.keyS.on('up', function () { this.sDown = false }, this);
            this.keyD.on('up', function () { this.dDown = false }, this);
            this.keyE.on('up', function () { this.eDown = false }, this);
        }

        // CONTROLES JUGADOR 2 ------------------------------------------------------------------------------
        if (!online || jugador == 1) {
            if(online){
                this.add.text(0, 0, 'You are player 2 (green), use arrow keys to move!', {
                    fontFamily: 'japaneseFont',
                    fontSize: '30px',
                    color: 'green', 
                    backgroundColor: 'black'
                })
            }
            this.keyUP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP, false);
            this.keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT, false);
            this.keyDOWN = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN, false);
            this.keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT, false);
            this.keyENTER = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER, false);

            this.keyUP.on('down', function () { this.upDown = true }, this);
            this.keyLEFT.on('down', function () { this.leftDown = true }, this);
            this.keyDOWN.on('down', function () { this.downDown = true }, this);
            this.keyRIGHT.on('down', function () { this.rightDown = true }, this);
            this.keyENTER.on('down', function () { this.enterDown = true }, this);

            this.keyUP.on('up', function () { this.upDown = false }, this);
            this.keyLEFT.on('up', function () { this.leftDown = false }, this);
            this.keyDOWN.on('up', function () { this.downDown = false }, this);
            this.keyRIGHT.on('up', function () { this.rightDown = false }, this);
            this.keyENTER.on('up', function () { this.enterDown = false }, this);
        }

        //Colisiones con los límites del canvas
        this.player1.setCollideWorldBounds(true);
        this.player2.setCollideWorldBounds(true);
        this.samurai.setCollideWorldBounds(true);
        this.noodlesHolder.setCollideWorldBounds(true);

        //COLISIONES CON SUELO
        this.physics.add.collider(this.samurai, this.suelo);
        this.physics.add.collider(this.player2, this.suelo);
        this.physics.add.collider(this.player1, this.suelo);
        this.physics.add.collider(this.powerUps, this.suelo);
        this.physics.add.collider(this.noodlesHolder, this.suelo);

        //COLISIONES ENTRE ELEMENTOS
        this.physics.add.overlap(this.player1, this.samurai, this.gameOverP1, null, this);
        this.physics.add.overlap(this.player2, this.samurai, this.gameOverP2, null, this);
        this.physics.add.collider(this.noodlesHolder, this.samurai, this.badEnding, null, this);
        this.physics.add.collider(this.player1, this.powerUps, this.powerUpTodoMitico, null, this);
        this.physics.add.collider(this.player2, this.powerUps, this.powerUpTodoMitico, null, this);
        this.physics.add.collider(this.samurai, this.powerUps, this.powerUpTodoMitico, null, this);
        this.physics.add.collider(this.player1, this.noodlesHolder, this.takeNoodles1, null, this);
        this.physics.add.collider(this.player2, this.noodlesHolder, this.takeNoodles2, null, this);
        this.physics.add.overlap(this.player1, this.player2, this.playersCrush, null, this)
        this.physics.add.collider(this.player1, this.platforms);
        this.physics.add.collider(this.player2, this.platforms);
        this.physics.add.collider(this.powerUps, this.platforms);
        this.physics.add.overlap(this.samurai, this.platforms, this.destruirPlataforma, null, this);

        this.doomyText = this.add.text(config.width / 2, config.height / 2, 'xd?', { font: '64px japaneseFont' });
        this.doomyText.setVisible(false);

        this.readyTitleCall = this.time.delayedCall(1000, this.readyTitle, [], this);
        this.startGameCall = this.time.delayedCall(5000, this.startGame, [], this);

        /*
        if(jugador == 1){
            this.onlinePlayer = {positionX: this.player2.x,
                positionY: this.player2.y,
                speedX: 0,
                speedY: 0,
                //attacking: false,
                //saltando: false,
                player: ""};
        }

        if(jugador == 0){
            this.onlinePlayer = {positionX: this.player1.x,
                positionY: this.player1.y,
                speedX: 0,
                speedY: 0,
                //attacking: false,
                //saltando: false,
                player: ""};
        }*/
        //this.boolOnlineAtacking = false;
        //this.boolOnlineJumping = false;

        if (online) {
            this.intervaloMensajes = window.setInterval(this.bucleMensajes.bind(this), 100);
            stompClient.subscribe('/topic/gameId/' + server, this.onMessageReceived.bind(this), { id: nick });
            this.intervaloServidor = window.setInterval(this.checkServer.bind(this), this.serverTimeout);

        }
    }

    checkServer(){
        if(this.pinged==false){
            this.restartGame();
            this.scene.start('DISCONNECTION_SCENE_KEY');
        }else{
            this.pinged = false;
        }
    }

    bucleMensajes() {
        //console.log("MENSAJE;" + this.player1.x + " " +  this.player1.y + " " +  this.player1.velocityX + " " +  this.player1.velocityY)
        if (jugador == 0) {
            this.sendMessage(this.player1.x, this.player1.y, this.player1.body.velocity.x, this.player1.body.velocity.y, this.animP1, this.flipP1);
        }

        if (jugador == 1) {
            this.sendMessage(this.player2.x, this.player2.y, this.player2.body.velocity.x, this.player2.body.velocity.y, this.animP2, this.flipP2);
        }

    }

    update() {
        /*if(!this.localReady || !this.onlineReady){
            //this.EnviarSincronizacion();
            console.log("esperando");
        }
        else */
        if (!this.gameOver && this.startGameBool) {
            //ACTUALIZAR BARRA DE PROGRESO
            //this.progressBarText.setText(this.progressBarText + this.progressBar.getProgress().toString().substr(0, 4));

            this.graphics.fillStyle(0xff5757, 1);
            this.graphics.fillRect(0, 10, 1000 * this.progressBar.getProgress(), 20);

            this.movePlayers();
            // this.bg1.tilePositionX += this.fondoSpeed1; //MOVIMIENTO CONSTANTE DEL FONDO
            // this.bg2.tilePositionX += this.fondoSpeed2; //MOVIMIENTO CONSTANTE DEL FONDO
            this.bgcalero.tilePositionX += this.fondoSpeed1;
            /*
            if(this.powerUpSpawner <= this.time.now){
                this.powerUpSpawner+=10000;
                this.todoMitico = this.powerUps.create(1375, 550, 'powerup');
                this.todoMitico.setScale(0.15, 0.15);
                this.todoMitico.setVelocityX(-this.worldSpeed);
                //this.todoMitico.setCollideWorldBounds(true);
                
            }
            */
            var childs = [];
            var contador = 0;
            this.platforms.children.iterate(function (child) {

                if (child.x <= 0) {
                    childs[contador] = child;
                    contador++;
                }


            });
            for (var i = 0; i < contador; i++) {
                childs[i].destroy();
            }

        } else {
            this.gameBGM.stop();
        }
    }

    movePlayers() {

        if (!this.p1Jump) {
            if (this.jumpTimerP1 <= this.time.now) {
                this.p1Jump = true;
            }
        }

        if (!this.p2Jump) {
            if (this.jumpTimerP2 <= this.time.now) {
                this.p2Jump = true;
            }
        }
        //MOVIMIENTOS DEL JUGADOR 1 (NINJA AZUL)------------------------------------------

        if (this.p1Moving) {
            if (this.wDown && this.player1.body.touching.down && this.p1Jump) {
                this.jumpSFX.play();
                this.player1.setVelocityY(-this.jumpSpeed);
                this.p1Jump = false;
                this.jumpTimerP1 = this.time.now + this.jumpTime;
            } else if (this.aDown) {
                this.player1.setVelocityX(-(this.playerSpeed + this.worldSpeed));
                this.player1.play('P1_anim', true);
                this.player1.setFlip(true, false)
                this.animP1 = 1;
                this.flipP1 = 1;
            } else if (this.sDown) {
                this.player1.play('P1_stand', true);
                this.player1.setVelocityX(-this.worldSpeed);
                this.animP1 = 0;
            } else if (this.dDown) {

                if (this.player1.x > this.player2.x) {
                    this.player1.setVelocityX(this.playerSpeed - this.worldSpeed);
                } else {
                    this.player1.setVelocityX(this.fastSpeed - this.worldSpeed);
                }
                this.player1.play('P1_anim', true);
                this.player1.setFlip(false, false)
                this.animP1 = 1;
                this.flipP1 = 0;
            } else if(!online || jugador == 0){
                this.player1.play('P1_stand', true);
                this.player1.setVelocityX(-this.worldSpeed);
                this.animP1 = 0;
            }
            //this.sendMessage(this.player1.x, this.player1.y, this.player1.velocityX, this.player1.velocityY, false, false)
            /*this.animsP1key = this.anims.getCurrentKey();
            this.animsP1frames = this.anims.getTotalFrames();
            this.animsP1frameRate = this.anims.frameRate;
            this.animsP1repeat = this.anims.getRepeat();*/
        } else {
            //console.log(this.temporizadorP1);
            if (this.time.now > this.timerP1) {
                this.reactivateP1();
            }
        }

        //MOVIMIENTOS DEL JUGADOR 2 (NINJA VERDE) ------------------------------------------
        if (this.p2Moving) {
            if (this.upDown && this.player2.body.touching.down && this.p2Jump) {
                this.jumpSFX.play();
                this.player2.setVelocityY(-this.jumpSpeed);
                this.p2Jump = false;
                this.jumpTimerP2 = this.time.now + this.jumpTime;
            } else if (this.leftDown) {
                this.player2.setVelocityX(-(this.playerSpeed + this.worldSpeed));
                this.player2.play('P2_anim', true);
                this.player2.setFlip(true, false)
                this.animP2 = 1;
                this.flipP2 = 1;
            } else if (this.downDown) {
                this.player2.play('P2_stand', true);
                this.player2.setVelocityX(-this.worldSpeed);
                this.animP2 = 0;
            } else if (this.rightDown) {

                if (this.player1.x > this.player2.x) {
                    this.player2.setVelocityX(this.fastSpeed - this.worldSpeed);
                } else {
                    this.player2.setVelocityX(this.playerSpeed - this.worldSpeed);
                }
                this.player2.play('P2_anim', true);
                this.player2.setFlip(false, false);
                this.animP2 = 1;
                this.flipP2 = 0;
            } else if(!online || jugador==1){
                this.player2.play('P2_stand', true);
                this.player2.setVelocityX(-this.worldSpeed);
                this.animP2 = 0;
            }
            //this.sendMessage(this.player2.x, this.player2.y, this.player2.velocityX, this.player2.velocityY, false, false);
            /*this.animsP2key = this.anims.getCurrentKey();
            this.animsP2frames = this.anims.getTotalFrames();
            this.animsP2frameRate = this.anims.frameRate;
            this.animsP2repeat = this.anims.getRepeat();*/
        } else {
            //console.log(this.temporizadorP2);
            if (this.time.now > this.timerP2) {
                this.reactivateP2();
            }
        }


        if (this.hasNoodles == 0) {
            //console.log(this.noodlesHolder.y);
            this.noodlesHolder.setVelocityX(-this.worldSpeed);
            this.noodles.x = this.noodlesHolder.x;
            this.noodles.y = this.noodlesHolder.y;

        } else if (this.hasNoodles == 1) {
            this.noodles.x = this.player1.x + 20;
            this.noodles.y = this.player1.y - 140;

        } else if (this.hasNoodles == 2) {
            this.noodles.x = this.player2.x + 20;
            this.noodles.y = this.player2.y - 140;
        }

    }

    gameOverP1() {
        //Los jugadores ya no pueden moverse

        //console.log('gameOverP1 FUNCIONA');

        //this.P2Winner = new ResumeScene();
        //this.P2Winner.setWinnerText(2);

        this.physics.pause();
        this.gameOver = true;                                                   //Fin del juego

        //Ponemos animaciones de un solo frame para que el jugador no se siga moviendo
        this.player2.play('P2_stand');
        this.player1.play('P1_stand');
        this.animP2 = 0;
        this.animP1 = 0;
        this.gameoverSFX.play();

        //this.restartGame();
        this.winner = 2;
        /*if(online){
            this.EscenaFinalOnline(this.winner);
        }*/
        this.VictoryHandler(this.winner);
    }

    gameOverP2() {
        //console.log('gameOverP2 FUNCIONA');

        //this.P1Winner = new ResumeScene();
        //this.P1Winner.setWinnerText(1);

        //Los jugadores ya no pueden moverse
        this.physics.pause();
        this.gameOver = true;

        //Ponemos animaciones de un solo frame para que el jugador no se siga moviendo
        this.player2.play('P2_stand');
        this.player1.play('P1_stand');
        this.animP2 = 0;
        this.animP1 = 0;
        this.gameoverSFX.play();

        this.winner = 1;
        /*if(online){
            this.EscenaFinalOnline(this.winner);
        }*/
        this.VictoryHandler(this.winner);
    }

    //FUNCION PARA EL TEXTO READY DEL PRINCIPIO
    readyTitle() {
        //console.log("READY?");
        this.readyText = this.add.text(config.width / 2, config.height / 2, 'READY?', { font: '192px japaneseFont' });
        this.readyText.setStroke('#ff5757', 16);
        // Phaser.Display.Align.In.Center(this.readyText, this.bg1);
        Phaser.Display.Align.In.Center(this.readyText, this.bgcalero);
        this.littleGongSFX.play();
        this.setTextCall = this.time.delayedCall(1000, this.setTitle, [], this);
    }

    //FUNCION PARA EL TEXTO SET DEL PRINCIPIO
    setTitle() {
        //console.log("SET?");
        this.readyText.setVisible(false);
        this.setText = this.add.text(config.width / 2, config.height / 2, 'SET?', { font: '192px japaneseFont' });
        this.setText.setStroke('#ff5757', 16);
        // Phaser.Display.Align.In.Center(this.setText, this.bg1);
        Phaser.Display.Align.In.Center(this.setText, this.bgcalero);
        this.littleGongSFX.play();
        this.goTextCall = this.time.delayedCall(1000, this.goTitle, [], this);
    }

    //FUNCION PARA EL TEXTO GO DEL PRINCIPIO
    goTitle() {
        //console.log("GO!");
        this.gongSFX.play();
        this.setText.setVisible(false);
        this.goText = this.add.text(config.width / 2, config.height / 2, 'GO!', { font: '192px japaneseFont' });
        this.goText.setStroke('#ff5757', 16);
        // Phaser.Display.Align.In.Center(this.goText, this.bg1);
        Phaser.Display.Align.In.Center(this.goText, this.bgcalero);
        //this.EnviarSincronizacion();
    }

    startGame() {
        if(online){
            this.EnviarSincronizacion();
        }else{
            this.startGameReal();
        }
    }

    startGameReal() {
        //console.log('startGame FUNCIONA');

        this.goText.setVisible(false);

        //BARRA DE PROGRESO
        this.progressBar = this.time.addEvent({ delay: 60000 });
        this.progressStartBarText = this.add.text(32, 32, 'START', { font: '32px japaneseFont' });
        this.progressStartBarText.setStroke('#ff5757', 8);
        this.progressFinishBarText = this.add.text(1200, 32, 'FINISH', { font: '32px japaneseFont' });
        this.progressFinishBarText.setStroke('#ff5757', 8);
        this.progressBarBorder = this.add.rectangle(680, 52, 1000, 20, 0xffffff);
        this.graphics = this.add.graphics({ x: 180, y: 32 });

        //CONFIGURACIÓN INICIAL DEL AUDIO
        this.gameBGM.play();
        this.startGameBool = true;
        this.powerUpSpawner = this.time.now;
        this.timedPlatforms = this.time.addEvent({ delay: this.platformSpawnSpeed, callback: this.createPlatform, callbackScope: this, loop: true });
        this.timedStartPowerUp = this.time.delayedCall(240, this.StartPowerUp, [], this);
        this.timedWaitForFinishLine = this.time.delayedCall(60000, this.waitForFinishLine, [], this);

        this.spawnObjects = true;
    }

    StartPowerUp() {
        this.timedPowerups = this.time.addEvent({ delay: this.powerupSpawnSpeed, callback: this.createPowerup, callbackScope: this, loop: true });
    }

    takeNoodles1() {
        //console.log("1 cogio los noodles")
        this.hasNoodles = 1;
        this.noodlesHolder.destroy();
    }

    takeNoodles2() {
        //console.log("2 cogio los noodles")
        this.hasNoodles = 2;
        this.noodlesHolder.destroy();
    }

    playersCrush() {
        if (this.startGameBool) {
            if (!this.p2canAtack) {
                if (this.attackTimerP2 <= this.time.now) {
                    this.p2canAtack = true;
                }
            }
            if (!this.p1canAtack) {
                if (this.attackTimerP1 <= this.time.now) {
                    this.p1canAtack = true;
                }
            }

            if (this.enterDown && this.p2canAtack) {
                this.golpearJugador(1);
                if (online)
                    this.sendGolpe();
                /*
                this.punchSFX.play();
                if (this.hasNoodles == 1) {
                    this.hasNoodles = 2;
                }

                if (this.player2.x > this.player1.x) {
                    this.player1.setVelocityX(-700);
                } else {
                    this.player1.setVelocityX(700);
                }
                this.player1.play('P1_stand', true);
                this.timerP1 = this.time.now + this.stunTime;
                this.p1Moving = false;

                this.attackTimerP2 = this.time.now + this.atackTime;
                this.p2canAtack = false;
                //console.log(this.timerP1);*/

            } else if (this.eDown && this.p1canAtack) {
                this.golpearJugador(0);
                if (online)
                    this.sendGolpe();
                /*
                this.punchSFX.play();
                if (this.hasNoodles == 2) {
                    this.hasNoodles = 1;
                }
                if (this.player2.x > this.player1.x) {
                    this.player2.setVelocityX(700);
                } else {
                    this.player2.setVelocityX(-700);
                }
                this.player2.play('P2_stand', true);
                this.timerP2 = this.time.now + this.stunTime;
                this.p2Moving = false;

                this.attackTimerP1 = this.time.now + this.atackTime;
                this.p1canAtack = false;
                //console.log(this.timerP2);*/
            }
        }
    }
    reactivateP1() {
        //console.log("p1 reactivado");
        this.p1Moving = true;
    }
    reactivateP2() {
        //console.log("p2 reactivado");
        this.p2Moving = true;
    }

    badEnding() {
        //console.log('bad gameOver FUNCIONA');

        //Los jugadores ya no pueden moverse
        this.physics.pause();
        this.gameOver = true;

        //Ponemos animaciones de un solo frame para que el jugador no se siga moviendo
        this.player2.play('P2_stand');
        this.player1.play('P1_stand');
        this.animP2 = 0;
        this.animP1 = 0;
        this.gameoverSFX.play();

        this.winner = 3;
        /*if(online){
            this.EscenaFinalOnline(this.winner);
        }*/
        this.VictoryHandler(this.winner);
    }

    destruirPlataforma(samurai, platafroma) {
        //console.log("destruyendo platadormas");
        platafroma.destroy();
    }

    todomiticoWait(player, powerup) {
        //this.scene.resume('GAME_SCENE_KEY');
        this.elTodoMitico.setVisible(false);
        this.punchSFX.play();

        if (player == this.player1) {
            this.p2Moving = false;
            this.player2.setVelocityX(-1000);
            this.timerP2 = this.time.now + this.stunTime;

            //console.log(this.timerP2);

        } else if (player == this.player2) {
            this.p1Moving = false;
            this.player1.setVelocityX(-1000);
            this.timerP1 = this.time.now + this.stunTime;

            //console.log(this.timerP2);
        } else {
            this.player2.setVelocityX(-1000);
            this.timerP2 = this.time.now + this.stunTime;
            this.p2Moving = false;
            this.player1.setVelocityX(-1000);
            this.timerP1 = this.time.now + this.stunTime;
            this.p1Moving = false;
        }

    }

    powerUpTodoMitico(player, powerup) {
        //this.scene.pause('GAME_SCENE_KEY');
        powerup.destroy();
        this.elTodoMitico.setVisible(true);
        this.samuraiSFX.play();
        this.time.delayedCall(300, this.todomiticoWait, [player, powerup], this);
    }

    createPlatform() {
        if (this.spawnObjects) {
            let random = this.randomNumber();

            //console.log(random);
            let randomPlat;
            switch (random) {
                case 0:
                    //console.log("Plataforma 0 creada");
                    let plat1 = this.platforms.create(1600, 800 - 200 + 86, 'OBSTACLE');
                    plat1.setVelocityX(-this.worldSpeed);
                    plat1.setOrigin(0, 0);
                    this.randomPlat = 0;
                    break;
                case 1:
                    //console.log("Plataforma 1 creada");
                    let plat2 = this.platforms.create(1600, 700 - 200 + 86, 'OBSTACLE');
                    plat2.setVelocityX(-this.worldSpeed);
                    this.randomPlat = 1;
                    plat2.setOrigin(0, 0);
                    break;
                case 2:
                    //console.log("Plataforma 2 creada");
                    let plat3 = this.platforms.create(1600, 600 - 200 + 86, 'OBSTACLE');
                    plat3.setVelocityX(-this.worldSpeed);
                    this.randomPlat = 2;
                    plat3.setOrigin(0, 0);
                    break;
                case 3:
                    //console.log("Plataforma 3 creada");
                    let plat4 = this.platforms.create(1600, 500 - 200 + 86, 'OBSTACLE');
                    plat4.setVelocityX(-this.worldSpeed);
                    this.randomPlat = 3;
                    plat4.setOrigin(0, 0);
                    break;
                case 4:
                    //console.log("Plataforma 4 creada");
                    let plat5 = this.platforms.create(1600, 400 - 200 + 86, 'OBSTACLE');
                    plat5.setVelocityX(-this.worldSpeed);
                    this.randomPlat = 4;
                    plat5.setOrigin(0, 0);
                    break;
            }
            return randomPlat;
        }
    }

    random() {
        var x = Math.sin(seed++) * 10000;
        return x - Math.floor(x);
    }

    randomNumber() {

        //console.log("randomNumber FUNCIONA");
        let random2 = Math.floor(this.random() * 5);
        //console.log(random2);
        return random2;
    }

    createPowerup() {
        if (this.spawnObjects) {
            switch (this.randomPlat) {
                case 0:
                    //console.log("Powerup 0 creada");

                    let power0 = this.powerUps.create(1600, 800 - 200 + 86, 'POWERUP');

                    power0.setScale(0.1, 0.1);
                    power0.y = power0.y - power0.height * 0.1 - 1;
                    power0.setVelocityX(-this.worldSpeed);

                    //console.log(power0.height);
                    break;
                case 1:
                    //console.log("Powerup 1 creada");
                    let power1 = this.powerUps.create(1600, 700 - 200 + 86, 'POWERUP');


                    power1.setScale(0.1, 0.1);
                    power1.y = power1.y - power1.height * 0.1 - 1;
                    power1.setVelocityX(-this.worldSpeed);

                    //console.log(power1.height);
                    break;
                case 2:
                    //console.log("Powerup 2 creada");
                    let power2 = this.powerUps.create(1600, 600 - 200 + 86, 'POWERUP');


                    power2.setScale(0.1, 0.1);
                    power2.y = power2.y - power2.height * 0.1 - 1;
                    power2.setVelocityX(-this.worldSpeed);

                    //console.log(power2.height);
                    break;
                case 3:
                    //console.log("Powerup 3 creada");
                    let power3 = this.powerUps.create(1600, 500 - 200 + 86, 'POWERUP');
                    power3.setScale(0.1, 0.1);
                    power3.y = power3.y - power3.height * 0.1 - 1;
                    power3.setVelocityX(-this.worldSpeed);
                    //console.log(power3.height);
                    break;
                case 4:
                    //console.log("Powerup 4 creada");
                    let power4 = this.powerUps.create(1600, 400 - 200 + 86, 'POWERUP');
                    power4.setScale(0.1, 0.1);
                    power4.y = power4.y - power4.height * 0.1 - 1;
                    power4.setVelocityX(-this.worldSpeed);
                    //console.log(power4.height);
                    break;
            }

        }
    }

    waitForFinishLine() {
        this.spawnObjects = false;
        this.timedCreateFinishLine = this.time.delayedCall(5000, this.createFinishLine, [], this);
    }

    createFinishLine() {
        if (this.startGameBool) {
            //console.log("createFinishLine FUNCIONA");

            this.samurai.setVelocityX(this.worldSpeed);
            this.finishLine = this.physics.add.sprite(1550, 200, 'FINISHLINE');
            this.finishLine.setScale(1, 1);
            this.physics.add.collider(this.finishLine, this.suelo);
            this.finishLine.setCollideWorldBounds(true);
            //his.finishLine.setVelocityX(-this.worldSpeed);
            this.physics.add.overlap(this.player1, this.finishLine, this.decideWinner, null, this);
            this.physics.add.overlap(this.player2, this.finishLine, this.decideWinner, null, this);
            this.worldSpeed = 0;
            this.fondoSpeed2 = 0;
            this.fondoSpeed1 = 0;
            this.platforms.children.iterate(function (child) {

                child.setVelocityX(0);
            });
        }

    }

    decideWinner(player, finishLine) {
        if ((player == this.player1) && (this.hasNoodles == 1)) {
            this.physics.pause();
            this.gameOver = true;                                                   //Fin del juego

            //Ponemos animaciones de un solo frame para que el jugador no se siga moviendo
            this.player2.play('P2_stand');
            this.player1.play('P1_stand');
            this.animP2 = 0;
            this.animP1 = 0;
            this.gameoverSFX.play();
            this.winner = 1;
            /*if(online){
                this.EscenaFinalOnline(this.winner);
            }*/
            this.VictoryHandler(this.winner);
        }
        else if ((player == this.player2) && (this.hasNoodles == 2)) {
                this.physics.pause();
            this.gameOver = true;                                                   //Fin del juego

            //Ponemos animaciones de un solo frame para que el jugador no se siga moviendo
            this.player2.play('P2_stand');
            this.player1.play('P1_stand');
            this.animP2 = 0;
            this.animP1 = 0;
            this.gameoverSFX.play();
            this.winner = 2;
            /*if(online){
                this.EscenaFinalOnline(this.winner);
            }*/
            this.VictoryHandler(this.winner);
        }
    }

    sendMessage(positionX, positionY, speedX, speedY/*, attacking, saltando*/, animPlayer, flip) {

        var info = {
            positionX: positionX,
            positionY: positionY,
            speedX: speedX,
            speedY: speedY,
            anim: animPlayer,
            flip: flip
        }
        var infoTxt = JSON.stringify(info)
        var chatMessage = {
            name: "movimiento",
            player: nick,
            info: infoTxt
            /*positionX: positionX,
            positionY: positionY,
            speedX: speedX,
            speedY: speedY,
            attacking: attacking,
            saltando: saltando,
            player: nick*/
        };
        stompClient.send("/app/playing.send/" + server, {}, JSON.stringify(chatMessage));
    }

    sendGolpe() {
        //var info = 1;
        //if(jugador == 1){
        //    info = 0;
        //}
        var chatMessage = {
            name: "golpe",
            player: nick,
            info: jugador
        };
        stompClient.send("/app/playing.send/" + server, {}, JSON.stringify(chatMessage));
    }

    onMessageReceived(message) {
        var messageObj = JSON.parse(message.body);
      
        //this.boolOnlineAtacking = messageObj.attacking;
        //this.boolOnlineJumping = messageObj.saltando;
        if (nick != messageObj.player) {
            this.pinged = true;
            switch (messageObj.name) {
                case "movimiento":
                    this.actualizarJugadorOnline(jugador, messageObj.info);
                    break;
                case "golpe":
                    this.golpearJugador(parseInt(messageObj.info));
                    break;
                case "victoria":
                    //this.EscenaFinalOnline(parseInt(messageObj.info));
                    this.VictoryHandler(messageObj.info);
                    break;
                case "sync":
                    this.RecibirSincronizacion();
                    break;
            }
        }
    }

    golpearJugador(playerJ) {

        if (playerJ == 0) {
            this.punchSFX.play();
            if (this.hasNoodles == 2) {
                this.hasNoodles = 1;
            }
            if (this.player2.x > this.player1.x) {
                this.player2.setVelocityX(700);
            } else {
                this.player2.setVelocityX(-700);
            }
            this.player2.play('P2_stand', true);
            this.animP2 = 0;
            this.timerP2 = this.time.now + this.stunTime;
            this.p2Moving = false;

            this.attackTimerP1 = this.time.now + this.atackTime;
            this.p1canAtack = false;
        } else {
            this.punchSFX.play();
            if (this.hasNoodles == 1) {
                this.hasNoodles = 2;
            }

            if (this.player2.x > this.player1.x) {
                this.player1.setVelocityX(-700);
            } else {
                this.player1.setVelocityX(700);
            }
            this.player1.play('P1_stand', true);
            this.animP1 = 0;
            this.timerP1 = this.time.now + this.stunTime;
            this.p1Moving = false;

            this.attackTimerP2 = this.time.now + this.atackTime;
            this.p2canAtack = false;
        }
    }

    actualizarJugadorOnline(player, messageInfo) {
        var objInfo = JSON.parse(messageInfo);
        //var info = messageInfo.split("%");
        var txtP;
        var playerOnline;
        if (player == 0) {
            playerOnline = this.player2;
            txtP = 'P2';
        } else {
            playerOnline = this.player1;
            txtP = 'P1';
        }
        playerOnline.x = objInfo.positionX//parseFloat(info[0]);
        playerOnline.y = objInfo.positionY//parseFloat(info[1]);
        playerOnline.setVelocityX(objInfo.speedX/*parseFloat(info[2])*/);
        playerOnline.setVelocityY(objInfo.speedY/*parseFloat(info[3])*/);
        switch (objInfo.anim) {
            case 0:
                playerOnline.play(txtP + '_stand', true);
                break;
            case 1:
                playerOnline.play(txtP + '_anim', true);
                break;
        }
        switch (objInfo.flip) {
            case 0:
                playerOnline.setFlip(false, false);
                break;
            case 1:
                playerOnline.setFlip(true, false)
                break;
        }
    }

    EscenaFinalOnline(ganador){
        //console.log("enviando victoria");
        var chatMessage = {
            name: "victoria",
            player: nick,
            info: ganador
        };
        stompClient.send("/app/playing.send/" + server, {}, JSON.stringify(chatMessage));
    }

    
    EnviarSincronizacion(){
        console.log("ready");
        this.localReady = true;
        if(this.onlineReady){
            this.localReady = false;
            this.onlineReady = false;
            this.startGameReal();
        }
        var chatMessage={
            name: "sync",
            player: nick,
            info: "ready"
        }
        stompClient.send("/app/playing.send/" + server, {}, JSON.stringify(chatMessage));
    }

    RecibirSincronizacion(){
        console.log("started");
        this.onlineReady = true;
        if(this.localReady){
            this.localReady = false;
            this.onlineReady = false;
            this.startGameReal();
        }
    }

    VictoryHandler(ganador){
        if(online){
            this.EscenaFinalOnline(ganador);
        }
        this.restartGame();

        switch(ganador){
            case 1:
                this.scene.start('WINNER_P1_SCENE');
                break;
            
            case 2:
                this.scene.start('WINNER_P2_SCENE');
                break;

            case 3:
                this.scene.start('BADENDING_SCENE_KEY');
                break;
        }
    }

    restartGame(){
        if(online){

            conexionEstablished = false;
            clearInterval(this.intervaloMensajes);
            clearInterval(this.intervaloServidor);
            //stompClient.unsuscribe(nick);
            stompClient.unsubscribe(nick);
            stompClient.disconnect();

        }
        stompClient = null;
        socket = null;
        jugador = -1;
        server = -1;
        online = false;
        seed = 1;
    }

    resetKeys(){
        try{
            this.keyW.removeAllListeners();
            this.keyA.removeAllListeners();     
            this.keyS.removeAllListeners();   
            this.keyD.removeAllListeners();
            this.keyE.removeAllListeners();

            this.keyW.remove();
            this.keyA.remove();     
            this.keyS.remove();   
            this.keyD.remove();
            this.keyE.remove();
        }catch(a){
            //console.log(a);
        }

        try{

            this.keyUP.removeAllListeners();
            this.keyLEFT.removeAllListeners();
            this.keyDOWN.removeAllListeners();
            this.keyRIGHT.removeAllListeners();
            this.keyENTER.removeAllListeners();

            this.keyUP.remove();
            this.keyLEFT.remove();
            this.keyDOWN.remove();
            this.keyRIGHT.remove();
            this.keyENTER.remove();
        }catch(a){
           // console.log(a);
        }
    }
}