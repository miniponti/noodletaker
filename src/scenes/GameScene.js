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
        this.load.audio("GONG_SFX", "assets/audio/GONG.mp3");
        this.load.audio("LITTLE_GONG_SFX", "assets/audio/littleGONG.mp3");
    }

    create() {
        //AUDIO
        this.gameBGM = this.sound.add("GAME_AUDIO");
        this.gameoverSFX = this.sound.add("GAMEOVER_AUDIO");
        this.gongSFX = this.sound.add("GONG_SFX");
        this.littleGongSFX = this.sound.add("LITTLE_GONG_SFX");

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

        this.doomyText = this.add.text(config.width / 2, config.height / 2, 'xd?', { font: '64px japaneseFont' });
        this.doomyText.setVisible(false);

        this.readyTitleCall = this.time.delayedCall(1000, this.readyTitle, [], this);
        this.startGameCall = this.time.delayedCall(5000, this.startGame, [], this);

        //Variables
        this.playerSpeed = 200;
        this.worldSpeed = 100;
        this.jumpSpeed = 400;
        this.gameOver = false;
        this.startGameBool = false;
        //this.P1Winner;
        //this.P2Winner;
    }

    update() {
        if (!this.gameOver && this.startGameBool) {
            //ACTUALIZAR BARRA DE PROGRESO
            //this.progressBarText.setText(this.progressBarText + this.progressBar.getProgress().toString().substr(0, 4));
            this.progressBarText.setText('Progress made: ');
            this.graphics.fillStyle(0x697bbc, 1);
            this.graphics.fillRect(0, 16, 1000 * this.progressBar.getProgress(), 8);

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
        } else {
            this.player1.setVelocityX(-100);
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
        } else {
            this.player2.setVelocityX(-100);
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
        
        this.scene.start('resumenScene');
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

    readyTitle(){
        console.log("READY?");
        this.readyText = this.add.text(config.width / 2, config.height / 2, 'READY?', { font: '192px japaneseFont' });
        this.readyText.setStroke('#ff5757', 16);
        Phaser.Display.Align.In.Center(this.readyText, this.bg);
        this.littleGongSFX.play();
        this.setTextCall = this.time.delayedCall(1000, this.setTitle, [], this);
    }

    setTitle(){
        console.log("SET?");
        this.readyText.setVisible(false);
        this.setText = this.add.text(config.width / 2, config.height / 2, 'SET?', { font: '192px japaneseFont' });
        this.setText.setStroke('#ff5757', 16);
        Phaser.Display.Align.In.Center(this.setText, this.bg);
        this.littleGongSFX.play();
        this.goTextCall = this.time.delayedCall(1000, this.goTitle, [], this);
    }

    goTitle(){
        console.log("GO!");
        this.gongSFX.play();
        this.setText.setVisible(false);
        this.goText = this.add.text(config.width / 2, config.height / 2, 'GO!', { font: '192px japaneseFont' });
        this.goText.setStroke('#ff5757', 16);
        Phaser.Display.Align.In.Center(this.goText, this.bg);
    }

    startGame() {
        console.log("startGame FUNCIONA");
        this.goText.setVisible(false);

        //BARRA DE PROGRESO
        this.progressBar = this.time.addEvent({delay: 60000});
        this.progressBarText = this.add.text(32, 32, { font: '10px japaneseFont' });
        this.progressBarBorder = this.add.rectangle(740, 40, 1020, 16, 0xff5757);
        //Phaser.Display.Align.In.Center(this.progressBarBorder, this.progressBar);

        this.hsv = Phaser.Display.Color.HSVColorWheel();
        this.graphics = this.add.graphics({ x: 240, y: 20 });
        //CONFIGURACIÓN INICIAL DEL AUDIO

        this.gameBGM.play();
        this.startGameBool = true;
        //this.timedPlatforms = this.time.addEvent({delay: 3000, callback: this.createPlatform, callbackScope: this, loop: true});
        this.timedFinishLine = this.time.delayedCall(60000, this.createFinishLine, [], this);
        //this.finishLineTimer = this.add.text(32, 64);
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
}
