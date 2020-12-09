<<<<<<< Updated upstream
class GameScene extends Phaser.Scene {

    constructor() {
        super("GAME_SCENE_KEY");
    }

    init() {

    }

    preload() {
        //CARGA DE TODAS LAS IMAGENES
        this.load.image('fondo', 'assets/sprites/IMG_0008.png');
        this.load.image('suelo', 'assets/sprites/plataforma.png');
        this.load.image('obstaculo', 'assets/sprites/plataforma.png');
        this.load.image('meta', 'assets/sprites/plataforma.png');

        //Carga de las animaciones, indicando el ancho y alto de cada sprite dentro del sprite sheet
        this.load.spritesheet('j1', 'assets/sprites/BLUE_SPRITESHEET.png', {
            frameWidth: 697,
            frameHeight: 1004
        });
        this.load.spritesheet('j2', 'assets/sprites/GREEN_SPRITESHEET.png', {
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
        
        //AUDIO
        this.load.audio("GAME_AUDIO","assets/audio/GAME_BGM.mp3");
        this.load.audio("GAMEOVER_AUDIO","assets/audio/gameover.mp3");
    }

    create() {
        //AUDIO
        this.gameBGM = this.sound.add("GAME_AUDIO");
        this.gameoverSFX = this.sound.add("GAMEOVER_AUDIO");

        
        //FONDO DEL JUEGO
        this.bg = this.add.tileSprite(0, 0, game.config.width, game.config.height, 'fondo');
        this.bg.setOrigin(0, 0);  //SE CAMBIA EL ORIGEN A LA ESQUINA SUPERIOR IZQ

        //SUELO ESTATICO
        this.suelo = this.physics.add.staticGroup();
        this.suelo.create(0, 750, 'suelo').setScale(2).refreshBody(); //INICIALIZACION SUELO

        //JUGADOR 1-----------------------------------------------------------------------------------------------------
        this.player1 = this.physics.add.sprite(600, 550, 'j1');  //INICIALIZACION J1
        this.player1.setScale(0.15, 0.15);                        //ESCALADO J1

        //ANIMACIONES JUGADOR 1
        this.anims.create({
            key: "j1_anim",
            frames: this.anims.generateFrameNumbers("j1"),
            frameRate: 20,
            repeat: -1
        });
        this.anims.create({//ANIMACION SPRITE J1
            key: "j1_stand",
            frames: [{key: 'j1', frame: 3}],
            frameRate: 20,
        });
        this.player1.play("j1_stand");
        //this.player1.setVelocityX(-100);

        //JUGADOR 2-----------------------------------------------------------------------------------------------------
        this.player2 = this.physics.add.sprite(650, 550, 'j2');  //INICIALIZACION J2
        this.player2.setScale(0.15, 0.15);                        //ESCALADO J2

        //ANIMACIONES JUGADOR 2
        this.anims.create({
            key: "j2_anim",
            frames: this.anims.generateFrameNumbers("j2"),
            frameRate: 20,
            repeat: -1
        });
        this.anims.create({//ANIMACION SPRITE J1
            key: "j2_stand",
            frames: [{key: 'j2', frame: 3}],
            frameRate: 20,
        });
        this.player2.play("j2_stand");
        //this.player2.setVelocityX(-100);

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
        this.physics.add.collider(this.player1, this.powerUps);
        this.physics.add.collider(this.player2, this.powerUps);

        this.time.delayedCall(3000, this.startGame, [], this);
        //this.startGameTimer = this.add.text(32, 32);

        //Variables
        this.playerSpeed = 200;
        this.worldSpeed = 100;
        this.jumpSpeed = 400;
        this.gameOver = false;
        this.startGameBool = false;
        this.P1Winner = false;
        this.P2Winner = false;
    }

    update() {
        if (!this.gameOver && this.startGameBool) {
            this.movePlayers();
            this.bg.tilePositionX += 3; //MOVIMIENTO CONSTANTE DEL FONDO
        }
        else{
            this.gameBGM.stop();
        }
    }

    movePlayers() {

        //MOVIMIENTOS DEL JUGADOR 1 (NINJA AZUL)
        if (this.keyW.isDown && this.player1.body.touching.down) {
            this.player1.setVelocityY(-this.jumpSpeed);
        } else if (this.keyA.isDown) {
            this.player1.setVelocityX(-(this.playerSpeed + this.worldSpeed));
            this.player1.play("j1_anim", true);
            this.player1.setFlip(true, false)
        } else if (this.keyS.isDown) {
            this.player1.play("j1_stand", true);
            this.player1.setVelocityX(-this.worldSpeed);
        } else if (this.keyD.isDown) {
            this.player1.setVelocityX(this.playerSpeed);
            this.player1.play("j1_anim", true);
            this.player1.setFlip(false, false)
        }

        //MOVIMIENTOS DEL JUGADOR 2 (NINJA VERDE)
        if (this.keyUP.isDown && this.player2.body.touching.down) {
            this.player2.setVelocityY(-this.jumpSpeed);
        } else if (this.keyLEFT.isDown) {
            this.player2.setVelocityX(-(this.playerSpeed + this.worldSpeed));
            this.player2.play("j2_anim", true);
            this.player2.setFlip(true, false)
        } else if (this.keyDOWN.isDown) {
            this.player2.play("j2_stand", true);
            this.player2.setVelocityX(-this.worldSpeed);
        } else if (this.keyRIGHT.isDown) {
            this.player2.setVelocityX(this.playerSpeed);
            this.player2.play("j2_anim", true);
            this.player2.setFlip(false, false)
        }

    }

    gameOverP1() {
        //Los jugadores ya no pueden moverse
        console.log("gameOverP1 FUNCIONA");

        //this.P1Winner = true;
        //setWinnerText(2);

        this.physics.pause();
        this.gameOver = true;                                                   //Fin del juego

        //Ponemos animaciones de un solo frame para que el jugador no se siga moviendo
        this.player2.play("j2_stand");
        this.player1.play("j1_stand");
        this.gameoverSFX.play();
        
        this.scene.start('resumenScene');
    }

    gameOverP2() {
        console.log("gameOverP2 FUNCIONA");

        //this.P1Winner = true;
        //setWinnerText(1);
        //Los jugadores ya no pueden moverse
        this.physics.pause();
        this.gameOver = true;

        //Ponemos animaciones de un solo frame para que el jugador no se siga moviendo
        this.player2.play("j2_stand");
        this.player1.play("j1_stand");
        this.gameoverSFX.play();
        
        this.scene.start('resumenScene');
    }

    createFinishLine()
    {
        if (this.startGameBool) {
            console.log("createFinishLine FUNCIONA");
            this.finishLine = this.physics.add.sprite(1400, 200, 'meta');
            this.finishLine.setScale(0.01, 7.5);
            this.physics.add.collider(this.finishLine, this.suelo);
            this.finishLine.setVelocityX(-100);
            this.physics.add.collider(this.player1, this.finishLine, this.gameOverP2, null, this);
            this.physics.add.collider(this.player2, this.finishLine, this.gameOverP1, null, this);
        }

    }
    /*
    createPlatform()
    {
        if (this.startGameBool) {
            console.log("createPlatform FUNCIONA");
            this.platforms = this.physics.add.group({
                allowGravity: false,
                immovable: true
            });
            this.platforms.create(1600, 200, 'obstaculo');
            this.platforms.create(1500, 300, 'obstaculo');
            this.platforms.create(1400, 400, 'obstaculo');
            this.platforms.create(1300, 500, 'obstaculo');
            this.platforms.create(1200, 600, 'obstaculo');
            this.platforms.setVelocityX(-400);
            //this.platforms.setScale(0.1, 0,1);
            this.physics.add.collider(this.player1, this.platforms);
            this.physics.add.collider(this.player2, this.platforms);
        }
    }
    */
    startGame() {
        console.log("startGame FUNCIONA");

        //CONFIGURACIÓN INICIAL DEL AUDIO

        this.gameBGM.play();
        this.startGameBool = true;
        //this.timedPlatforms = this.time.addEvent({delay: 3000, callback: this.createPlatform, callbackScope: this, loop: true});
        this.timedFinishLine = this.time.delayedCall(3000, this.createFinishLine, [], this);
        this.finishLineTimer = this.add.text(32, 64);
    }
}
=======
class GameScene extends Phaser.Scene {

    constructor() {
        super("GAME_SCENE_KEY");
    }

    init() {

    }

    preload() {
        //CARGA DE TODAS LAS IMAGENES
        //this.load.image('fondo', 'assets/sprites/IMG_0008.png');
        this.load.image('bg1', 'assets/sprites/Background1.png');
        this.load.image('bg2', 'assets/sprites/Background2.png');
        this.load.image('suelo', 'assets/sprites/plataforma.png');
        this.load.image('obstaculo', 'assets/sprites/PLATFORM2.png');
        this.load.image('meta', 'assets/sprites/plataforma.png');
        this.load.image('noodles', 'assets/sprites/NOODLECUP.png');

        //Carga de las animaciones, indicando el ancho y alto de cada sprite dentro del sprite sheet
        this.load.spritesheet('j1', 'assets/sprites/BLUE_SPRITESHEET.png', {
            frameWidth: 697,
            frameHeight: 1004
        });
        this.load.spritesheet('j2', 'assets/sprites/GREEN_SPRITESHEET.png', {
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
        
        //AUDIO
        this.load.audio("GAME_AUDIO","assets/audio/GAME_BGM.mp3");
        this.load.audio("GAMEOVER_AUDIO","assets/audio/gameover.mp3");
        this.load.audio("GONG_SFX", "assets/audio/GONG.mp3");
        this.load.audio("LITTLE_GONG_SFX", "assets/audio/littleGONG.mp3");
        this.load.audio("PUNCH_SFX", "assets/audio/PUNCH.mp3");
        this.load.audio("JUMP_SFX", "assets/audio/JUMP.mp3");
    }

    create() {

        //Variables
        this.playerSpeed = 200;
        this.worldSpeed = 100;
        this.jumpSpeed = 400;
        this.gameOver = false;
        this.startGameBool = false;
        this.p1Moving = true;
        this.p2Moving = true;
        this.temporizadorP1 = this.time.now;
        this.temporizadorP2 = this.time.now;
        this.p1canAtack = true;
        this.p2canAtack = true;
        this.temporizadorAtack1 = this.time.now;
        this.temporizadorAtack2 = this.time.now;
        this.atackTime = 1000; //ms
        this.stunTime = 200; //ms
        this.powerUpSpawner = 0;
        //AUDIO
        this.gameBGM = this.sound.add("GAME_AUDIO");
        this.gameoverSFX = this.sound.add("GAMEOVER_AUDIO");
        this.gongSFX = this.sound.add("GONG_SFX");
        this.littleGongSFX = this.sound.add("LITTLE_GONG_SFX");
        this.punchSFX = this.sound.add("PUNCH_SFX", {volume: 0.3});
        this.jumpSFX = this.sound.add("JUMP_SFX", {volume: 0.3});

        //FONDO DEL JUEGO
        this.bg1 = this.add.tileSprite(0, 0, game.config.width, game.config.height, 'bg1');
        this.bg1.setOrigin(0, 0);  //SE CAMBIA EL ORIGEN A LA ESQUINA SUPERIOR IZQ
        this.bg1.setScrollFactor(0);
        this.bg2 = this.add.tileSprite(0, 0, game.config.width, game.config.height, 'bg2');
        this.bg2.setOrigin(0, 0);  //SE CAMBIA EL ORIGEN A LA ESQUINA SUPERIOR IZQ
        this.bg2.setScrollFactor(0);

        //SUELO ESTATICO
        this.suelo = this.physics.add.staticGroup();
        this.suelo.create(0, 750, 'suelo').setScale(2).refreshBody(); //INICIALIZACION SUELO

        //JUGADOR 1-----------------------------------------------------------------------------------------------------
        this.player1 = this.physics.add.sprite(600, 550, 'j1');  //INICIALIZACION J1
        this.player1.setScale(0.15, 0.15);                        //ESCALADO J1

        //ANIMACIONES JUGADOR 1
        this.anims.create({
            key: "j1_anim",
            frames: this.anims.generateFrameNumbers("j1"),
            frameRate: 20,
            repeat: -1
        });
        this.anims.create({//ANIMACION SPRITE J1
            key: "j1_stand",
            frames: [{key: 'j1', frame: 3}],
            frameRate: 20,
        });
        this.player1.play("j1_stand");


        //JUGADOR 2-----------------------------------------------------------------------------------------------------
        this.player2 = this.physics.add.sprite(650, 550, 'j2');  //INICIALIZACION J2
        this.player2.setScale(0.15, 0.15);                        //ESCALADO J2

        //ANIMACIONES JUGADOR 2
        this.anims.create({
            key: "j2_anim",
            frames: this.anims.generateFrameNumbers("j2"),
            frameRate: 20,
            repeat: -1
        });
        this.anims.create({//ANIMACION SPRITE J1
            key: "j2_stand",
            frames: [{key: 'j2', frame: 3}],
            frameRate: 20,
        });
        this.player2.play("j2_stand");
       

        //SAMURAI
        this.samurai = this.physics.add.sprite(100, 545, 'samurai');  //INICIALIZACION SAMURAI
        this.samurai.setScale(0.15, 0.15);                          //ESCALADO SAMURA

        //NOODLES
        this.noodles = this.add.sprite(1000, 618.65, 'noodles');
        this.noodles.setScale(0.5, 0.5);
        this.hasNoodles = 0;
        this.noodlesHolder = this.physics.add.sprite(1000, 618.65, 'noodles');
        this.noodlesHolder.setScale(0.15, 0.15);
        this.noodlesHolder.setVisible(false);
        
        //PowerUps
        this.powerUps = this.physics.add.group();

        //El todo mitico
        
        //TECLAS
        this.keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        this.keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        this.keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        this.keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        this.keyUP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
        this.keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        this.keyDOWN = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);
        this.keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        this.keyE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E);
        this.keyENTER = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);

        //Colisiones con los límites del canvas
        this.player1.setCollideWorldBounds(true);
        this.player2.setCollideWorldBounds(true);
        this.samurai.setCollideWorldBounds(true);

        //COLISIONES CON SUELO
        this.physics.add.collider(this.samurai, this.suelo);
        this.physics.add.collider(this.player2, this.suelo);
        this.physics.add.collider(this.player1, this.suelo);
        this.physics.add.collider(this.powerUps, this.suelo);
        this.physics.add.collider(this.noodlesHolder, this.suelo);

        //COLISIONES ENTRE ELEMENTOS
        this.physics.add.collider(this.player1, this.samurai, this.gameOverP1, null, this);
        this.physics.add.collider(this.player2, this.samurai, this.gameOverP2, null, this);
        this.physics.add.collider(this.noodlesHolder, this.samurai, this.badEnding, null, this);
        this.physics.add.collider(this.player1, this.powerUps, this.powerUpTodoMitico, null, this);
        this.physics.add.collider(this.player2, this.powerUps, this.powerUpTodoMitico, null, this);
        this.physics.add.collider(this.samurai, this.powerUps, this.powerUpTodoMitico, null, this);
        this.physics.add.collider(this.player1, this.noodlesHolder, this.takeNoodles1, null, this);
        this.physics.add.collider(this.player2, this.noodlesHolder, this.takeNoodles2, null, this);
        this.physics.add.overlap(this.player1, this.player2, this.playersCrush, null, this)

        this.doomyText = this.add.text(config.width / 2, config.height / 2, 'xd?', { font: '64px japaneseFont' });
        this.doomyText.setVisible(false);

        this.readyTitleCall = this.time.delayedCall(1000, this.readyTitle, [], this);
        this.startGameCall = this.time.delayedCall(5000, this.startGame, [], this);
    }

    update() {
        if (!this.gameOver && this.startGameBool) {
            //ACTUALIZAR BARRA DE PROGRESO
            //this.progressBarText.setText(this.progressBarText + this.progressBar.getProgress().toString().substr(0, 4));
            
            this.graphics.fillStyle(0xff5757, 1);
            this.graphics.fillRect(0, 10, 1000 * this.progressBar.getProgress(), 20);

            this.movePlayers();
            this.bg1.tilePositionX += 2; //MOVIMIENTO CONSTANTE DEL FONDO
            this.bg2.tilePositionX += 5; //MOVIMIENTO CONSTANTE DEL FONDO

            if(this.powerUpSpawner <= this.time.now){
                this.powerUpSpawner+=10000;
                this.todoMitico = this.powerUps.create(1300, 550, 'powerup');
                this.todoMitico.setScale(0.15, 0.15);
                this.todoMitico.setVelocityX(-this.worldSpeed);
                this.todoMitico.setCollideWorldBounds(true);
                
            }
        } else {
            this.gameBGM.stop();
        }
    }

    movePlayers() {

       
        //MOVIMIENTOS DEL JUGADOR 1 (NINJA AZUL)
        if(this.p1Moving){
            if (this.keyW.isDown && this.player1.body.touching.down) {
                this.jumpSFX.play();
                this.player1.setVelocityY(-this.jumpSpeed);
            } else if (this.keyA.isDown) {
                this.player1.setVelocityX(-(this.playerSpeed + this.worldSpeed));
                this.player1.play("j1_anim", true);
                this.player1.setFlip(true, false)
            } else if (this.keyS.isDown) {
                this.player1.play("j1_stand", true);
                this.player1.setVelocityX(-this.worldSpeed);
            } else if (this.keyD.isDown) {
                this.player1.setVelocityX(this.playerSpeed);
                this.player1.play("j1_anim", true);
                this.player1.setFlip(false, false)
            } else {
                this.player1.play("j1_stand", true);
                this.player1.setVelocityX(-this.worldSpeed);
            }
        }else{
            //console.log(this.temporizadorP1);
            if(this.time.now> this.temporizadorP1){
                this.reactivateP1();
            }
        }

        //MOVIMIENTOS DEL JUGADOR 2 (NINJA VERDE)
        if(this.p2Moving){
            if (this.keyUP.isDown && this.player2.body.touching.down) {
                this.jumpSFX.play();
                this.player2.setVelocityY(-this.jumpSpeed);
            } else if (this.keyLEFT.isDown) {
                this.player2.setVelocityX(-(this.playerSpeed + this.worldSpeed));
                this.player2.play("j2_anim", true);
                this.player2.setFlip(true, false)
            } else if (this.keyDOWN.isDown) {
                this.player2.play("j2_stand", true);
                this.player2.setVelocityX(-this.worldSpeed);
            } else if (this.keyRIGHT.isDown) {
                this.player2.setVelocityX(this.playerSpeed);
                this.player2.play("j2_anim", true);
                this.player2.setFlip(false, false)
            } else {
                this.player2.play("j2_stand", true);
                this.player2.setVelocityX(-this.worldSpeed);
            }
        }else{
            //console.log(this.temporizadorP2);
            if(this.time.now> this.temporizadorP2){
                this.reactivateP2();
            }
        }  

        if(this.hasNoodles==0){
            this.noodlesHolder.setVelocityX(-this.worldSpeed);
            this.noodles.x = this.noodlesHolder.x;
            this.noodles.y = this.noodlesHolder.y;

        }else if(this.hasNoodles==1){
            this.noodles.x = this.player1.x;
            this.noodles.y = this.player1.y -100;
        }else if(this.hasNoodles==2){
            this.noodles.x = this.player2.x;
            this.noodles.y = this.player2.y -100;
        }

    }

    gameOverP1() {
        //Los jugadores ya no pueden moverse
        console.log("gameOverP1 FUNCIONA");

        //this.P2Winner = new ResumeScene();
        //this.P2Winner.setWinnerText(2);

        this.physics.pause();
        this.gameOver = true;                                                   //Fin del juego

        //Ponemos animaciones de un solo frame para que el jugador no se siga moviendo
        this.player2.play("j2_stand");
        this.player1.play("j1_stand");
        this.gameoverSFX.play();
        
        this.scene.start('WINNER_P2_SCENE');
    }

    gameOverP2() {
        console.log("gameOverP2 FUNCIONA");

        //this.P1Winner = new ResumeScene();
        //this.P1Winner.setWinnerText(1);

        //Los jugadores ya no pueden moverse
        this.physics.pause();
        this.gameOver = true;

        //Ponemos animaciones de un solo frame para que el jugador no se siga moviendo
        this.player2.play("j2_stand");
        this.player1.play("j1_stand");
        this.gameoverSFX.play();
        
        this.scene.start('WINNER_P1_SCENE');
    }

    readyTitle(){
        //console.log("READY?");
        this.readyText = this.add.text(config.width / 2, config.height / 2, 'READY?', { font: '192px japaneseFont' });
        this.readyText.setStroke('#ff5757', 16);
        Phaser.Display.Align.In.Center(this.readyText, this.bg1);
        this.littleGongSFX.play();
        this.setTextCall = this.time.delayedCall(1000, this.setTitle, [], this);
    }

    setTitle(){
        //console.log("SET?");
        this.readyText.setVisible(false);
        this.setText = this.add.text(config.width / 2, config.height / 2, 'SET?', { font: '192px japaneseFont' });
        this.setText.setStroke('#ff5757', 16);
        Phaser.Display.Align.In.Center(this.setText, this.bg1);
        this.littleGongSFX.play();
        this.goTextCall = this.time.delayedCall(1000, this.goTitle, [], this);
    }

    goTitle(){
        //console.log("GO!");
        this.gongSFX.play();
        this.setText.setVisible(false);
        this.goText = this.add.text(config.width / 2, config.height / 2, 'GO!', { font: '192px japaneseFont' });
        this.goText.setStroke('#ff5757', 16);
        Phaser.Display.Align.In.Center(this.goText, this.bg1);
    }

    startGame() {
        console.log("startGame FUNCIONA");
        this.goText.setVisible(false);

        //BARRA DE PROGRESO
        this.progressBar = this.time.addEvent({delay: 60000});
        this.progressStartBarText = this.add.text(32, 32, 'START',{ font: '32px japaneseFont' });
        this.progressStartBarText.setStroke('#ff5757', 8);
        this.progressFinishBarText = this.add.text(1200, 32, 'FINISH',{ font: '32px japaneseFont' });
        this.progressFinishBarText.setStroke('#ff5757', 8);
        this.progressBarBorder = this.add.rectangle(680, 52, 1000, 20, 0xffffff);
        this.graphics = this.add.graphics({ x: 180, y: 32 });

        //CONFIGURACIÓN INICIAL DEL AUDIO
        this.gameBGM.play();
        this.startGameBool = true;
        this.powerUpSpawner = this.time.now;
        this.timedPlatforms = this.time.addEvent({delay: 2000, callback: this.createPlatform, callbackScope: this, loop: true});
        this.timedDecideWinner = this.time.delayedCall(60000, this.decideWinner, [], this);
    }

    takeNoodles1(){
            console.log("1 cogio los noodles")
            this.hasNoodles = 1;
            this.noodlesHolder.destroy();
    }
    takeNoodles2(){
        console.log("2 cogio los noodles")
        this.hasNoodles = 2;
        this.noodlesHolder.destroy();
    }


    playersCrush(){
        if(this.startGameBool){

            if(!this.p2canAtack){
                if(this.temporizadorAtack2<=this.time.now){
                    this.p2canAtack = true;
                }
            }
            if(!this.p1canAtack){
                if(this.temporizadorAtack1<=this.time.now){
                    this.p1canAtack = true;
                }
            }

            if(this.keyENTER.isDown && this.p2canAtack){
                this.punchSFX.play();
                if( this.hasNoodles==1){
                    this.hasNoodles = 2;
                }

                if(this.player2.x > this.player1.x){
                    this.player1.setVelocityX(-700);
                } else {
                    this.player1.setVelocityX(700);
                }
                this.player1.play("j1_stand", true);
                this.temporizadorP1 = this.time.now + this.stunTime;
                this.p1Moving = false;

                this.temporizadorAtack2 = this.time.now + this.atackTime;
                this.p2canAtack = false;
                console.log(this.temporizadorP1);
            }else if(this.keyE.isDown && this.p1canAtack){
                this.punchSFX.play();
                if( this.hasNoodles==2){
                    this.hasNoodles = 1;
                }
                if(this.player2.x > this.player1.x){
                    this.player2.setVelocityX(700);
                } else {
                    this.player2.setVelocityX(-700);
                }
                this.player2.play("j2_stand", true);
                this.temporizadorP2 = this.time.now + this.stunTime;
                this.p2Moving = false;
                
                this.temporizadorAtack1 = this.time.now + this.atackTime;
                this.p1canAtack = false;
                console.log(this.temporizadorP2);
            }
        }
    }
    reactivateP1(){
        console.log("p1 reactivado");
        this.p1Moving = true;
    }
    reactivateP2(){
        console.log("p2 reactivado");
        this.p2Moving = true;
    }
    
    badEnding(){
        console.log("bad gameOver FUNCIONA");

        //this.P1Winner = new ResumeScene();
        //this.P1Winner.setWinnerText(1);

        //Los jugadores ya no pueden moverse
        this.physics.pause();
        this.gameOver = true;

        //Ponemos animaciones de un solo frame para que el jugador no se siga moviendo
        this.player2.play("j2_stand");
        this.player1.play("j1_stand");
        this.gameoverSFX.play();
        
        this.scene.start('resumenScene');
    }

    powerUpTodoMitico(player, powerup){
        this.punchSFX.play();
        if(player == this.player1){
            this.player2.setVelocityX(-1000);
            this.temporizadorP2 = this.time.now + this.stunTime;
            this.p2Moving = false;
            console.log(this.temporizadorP2);
           
        }else if (player == this.player2){
            this.player1.setVelocityX(-1000);
            this.temporizadorP1 = this.time.now + this.stunTime;
            this.p1Moving = false;
            console.log(this.temporizadorP2);
        }else{
            this.player2.setVelocityX(-1000);
            this.temporizadorP2 = this.time.now + this.stunTime;
            this.p2Moving = false;
            this.player1.setVelocityX(-1000);
            this.temporizadorP1 = this.time.now + this.stunTime;
            this.p1Moving = false;
        }
        powerup.destroy();
    }
    
   
    createPlatform()
    {
        if (this.startGameBool) {
            console.log("createPlatform FUNCIONA");
            this.platforms = this.physics.add.group({
                allowGravity: false,
                immovable: true
            });
            /*
            for(let i = 0; i<5; i++){
                var plat = this.platforms.create(1600, 200 + i*100, 'obstaculo');
                plat.setVelocityX(-this.worldSpeed);
                //plat.setScale(0.2,0.1);
            }*/
            
            let random = this.randomNumber();
            console.log(random);
            switch(random){
                case 0:
                    console.log("Plataforma 0 creada");
                    let plat1 = this.platforms.create(1600, 200, 'obstaculo');
                    plat1.setVelocityX(-500);
                    //plat1.setScale(0.2,0.1);
                    break;
                case 1:
                    console.log("Plataforma 1 creada");
                    let plat2 = this.platforms.create(1600, 300, 'obstaculo');
                    plat2.setVelocityX(-500);
                    //plat2.setScale(0.2,0.1);
                    break;
                case 2:
                    console.log("Plataforma 2 creada");
                    let plat3 = this.platforms.create(1600, 400, 'obstaculo');
                    plat3.setVelocityX(-500);
                    //plat3.setScale(0.2,0.1);
                    break;
                case 3:
                    console.log("Plataforma 3 creada");
                    let plat4 = this.platforms.create(1600, 500, 'obstaculo');
                    plat4.setVelocityX(-500);
                    //plat4.setScale(0.2,0.1);
                    break;
                case 4:
                    console.log("Plataforma 4 creada");
                    let plat5 = this.platforms.create(1600, 600, 'obstaculo');
                    plat5.setVelocityX(-500);
                    //plat5.setScale(0.2,0.3);
                    break;

                default:
                    let plat6 = this.platforms.create(1600, 300, 'obstaculo');
                    plat6.setVelocityX(-500);
                    break;
            }
            
            this.physics.add.collider(this.player1, this.platforms);
            this.physics.add.collider(this.player2, this.platforms);
        }
    }

    randomNumber(){
        console.log("randomNumber FUNCIONA");
        let random2 = Math.random() * (0 - 5) + 5;
        console.log(random2);
        return random2;
    }

    decideWinner()
    {
        this.physics.pause();
        this.gameOver = true;                                                   //Fin del juego

        //Ponemos animaciones de un solo frame para que el jugador no se siga moviendo
        this.player2.play("j2_stand");
        this.player1.play("j1_stand");
        this.gameoverSFX.play();
        if(this.hasNoodles = 1){
            this.scene.start('WINNER_P1_SCENE');
        } else if(this.hasNoodles = 2){
            this.scene.start('WINNER_P2_SCENE');
        }
    }
}
>>>>>>> Stashed changes
