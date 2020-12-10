class GameScene extends Phaser.Scene {

    constructor() {
        super('GAME_SCENE_KEY');
    }

    init() {

    }

    preload() {
        //CARGA DE TODAS LAS IMAGENES
        this.load.image('BG1', 'assets/sprites/Background1.png');
        this.load.image('BG2', 'assets/sprites/Background3.png');
        this.load.image('ROAD', 'assets/sprites/plataforma.png');
        this.load.image('OBSTACLE', 'assets/sprites/PLATFORM2.png');
        this.load.image('FINISHLINE', 'assets/sprites/plataforma.png');
        this.load.image('NOODLES', 'assets/sprites/NOODLECUP.png');
        this.load.image('ELTODOMITICO','assets/sprites/ETM.png');

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
        this.load.audio('GAME_AUDIO','assets/audio/GAME_BGM.mp3');
        this.load.audio('GAMEOVER_AUDIO','assets/audio/gameover.mp3');
        this.load.audio('GONG_SFX', 'assets/audio/GONG.mp3');
        this.load.audio('LITTLE_GONG_SFX', 'assets/audio/littleGONG.mp3');
        this.load.audio('PUNCH_SFX', 'assets/audio/PUNCH.mp3');
        this.load.audio('JUMP_SFX', 'assets/audio/JUMP.mp3');
        this.load.audio('SAMURAI_SFX','assets/audio/samuraiDEAD.mp3');
    }

    create() {
        //VARIABLES GLOBALES
        this.playerSpeed = 300;
        this.worldSpeed = 270;
        this.jumpSpeed = 450;
        this.platformSpawnSpeed = 1500;
        this.powerupSpawnSpeed = 6000;
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


        //AUDIO
        this.gameBGM = this.sound.add('GAME_AUDIO');
        this.gameoverSFX = this.sound.add('GAMEOVER_AUDIO');
        this.gongSFX = this.sound.add('GONG_SFX');
        this.littleGongSFX = this.sound.add('LITTLE_GONG_SFX');
        this.punchSFX = this.sound.add('PUNCH_SFX', {volume: 0.3});
        this.jumpSFX = this.sound.add('JUMP_SFX', {volume: 0.3});
        this.samuraiSFX = this.sound.add('SAMURAI_SFX');

        //FONDO DEL JUEGO
        this.bg1 = this.add.tileSprite(0, 0, game.config.width, game.config.height, 'BG1');
        this.bg1.setOrigin(0, 0);  //SE CAMBIA EL ORIGEN A LA ESQUINA SUPERIOR IZQ
        this.bg1.setScrollFactor(0);
        this.bg1.setScale(1.5, 1.5);
        this.bg2 = this.add.tileSprite(0, 0, game.config.width, game.config.height, 'BG2');
        this.bg2.setOrigin(0, 0);  //SE CAMBIA EL ORIGEN A LA ESQUINA SUPERIOR IZQ
        this.bg2.setScrollFactor(0);
        this.bg2.setScale(3, 3);

        //SUELO ESTATICO
        this.suelo = this.physics.add.staticGroup();
        this.suelo.create(0, 750, 'ROAD').setScale(2).refreshBody(); //INICIALIZACION SUELO

        //PLATAFORMAS
        this.platforms = this.physics.add.group({
            allowGravity: false,
            immovable: true,
        });

        //JUGADOR 1-----------------------------------------------------------------------------------------------------
        this.player1 = this.physics.add.sprite(600, 550, 'P1');  //INICIALIZACION J1
        this.player1.setScale(0.15, 0.15);                        //ESCALADO J1

        //ANIMACIONES JUGADOR 1
        this.anims.create({
            key: 'P1_anim',
            frames: this.anims.generateFrameNumbers('P1'),
            frameRate: 20,
            repeat: -1
        });
        this.anims.create({//ANIMACION SPRITE J1
            key: 'P1_stand',
            frames: [{key: 'P1', frame: 3}],
            frameRate: 20,
        });
        this.player1.play('P1_stand');


        //JUGADOR 2-----------------------------------------------------------------------------------------------------
        this.player2 = this.physics.add.sprite(650, 550, 'P2');  //INICIALIZACION J2
        this.player2.setScale(0.15, 0.15);                        //ESCALADO J2

        //ANIMACIONES JUGADOR 2
        this.anims.create({
            key: 'P2_anim',
            frames: this.anims.generateFrameNumbers('P2'),
            frameRate: 20,
            repeat: -1
        });
        this.anims.create({//ANIMACION SPRITE J1
            key: 'P2_stand',
            frames: [{key: 'P2', frame: 3}],
            frameRate: 20,
        });
        this.player2.play('P2_stand');
       

        //SAMURAI
        this.samurai = this.physics.add.sprite(100, 545, 'SAMURAI');  //INICIALIZACION SAMURAI
        this.samurai.setScale(0.15, 0.15);                          //ESCALADO SAMURA

        //NOODLES
        this.noodles = this.add.sprite(1000, 598.25, 'NOODLES');    //INICIALIZACION FIDEOS
        this.noodles.setScale(0.5, 0.5);                            //ESCALADO DE FIDEOS
        this.hasNoodles = 0;
        this.noodlesHolder = this.physics.add.sprite(1000, 598.25, 'NOODLES');
        this.noodlesHolder.setScale(0.5, 0.5);
        this.noodlesHolder.setVisible(false);
        
        //PowerUps
        this.powerUps = this.physics.add.group();

        //EL TODO MITICO
        this.elTodoMitico = this.add.sprite(0,0,'ELTODOMITICO');
        this.elTodoMitico.setOrigin(0,0);
        this.elTodoMitico.setDepth(15);
        this.elTodoMitico.setVisible(false);
        
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
    }

    update() {
        if (!this.gameOver && this.startGameBool) {
            //ACTUALIZAR BARRA DE PROGRESO
            //this.progressBarText.setText(this.progressBarText + this.progressBar.getProgress().toString().substr(0, 4));
            
            this.graphics.fillStyle(0xff5757, 1);
            this.graphics.fillRect(0, 10, 1000 * this.progressBar.getProgress(), 20);

            this.movePlayers();
            this.bg1.tilePositionX += 2; //MOVIMIENTO CONSTANTE DEL FONDO
            this.bg2.tilePositionX += 3; //MOVIMIENTO CONSTANTE DEL FONDO
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

            if(child.x<=0){
                childs[contador] = child;
                contador++;
            }
            

        });
            for(var i = 0; i<contador; i++){
                childs[i].destroy();
            }

        } else {
            this.gameBGM.stop();
        }
    }

    movePlayers() {

        if(!this.p1Jump){
            if(this.jumpTimerP1<=this.time.now){
                this.p1Jump = true;
            }
        }
        if(!this.p2Jump){
            if(this.jumpTimerP2<=this.time.now){
                this.p2Jump = true;
            }
        }
        //MOVIMIENTOS DEL JUGADOR 1 (NINJA AZUL)
        if(this.p1Moving){
            if (this.keyW.isDown && this.player1.body.touching.down && this.p1Jump) {
                this.jumpSFX.play();
                this.player1.setVelocityY(-this.jumpSpeed);
                this.p1Jump = false;
                this.jumpTimerP1 = this.time.now+this.jumpTime;
            } else if (this.keyA.isDown) {
                this.player1.setVelocityX(-(this.playerSpeed + this.worldSpeed));
                this.player1.play('P1_anim', true);
                this.player1.setFlip(true, false)
            } else if (this.keyS.isDown) {
                this.player1.play('P1_stand', true);
                this.player1.setVelocityX(-this.worldSpeed);
            } else if (this.keyD.isDown) {
                this.player1.setVelocityX(this.playerSpeed);
                this.player1.play('P1_anim', true);
                this.player1.setFlip(false, false)
            } else {
                this.player1.play('P1_stand', true);
                this.player1.setVelocityX(-this.worldSpeed);
            }
        }else{
            //console.log(this.temporizadorP1);
            if(this.time.now> this.timerP1){
                this.reactivateP1();
            }
        }

        //MOVIMIENTOS DEL JUGADOR 2 (NINJA VERDE)
        if(this.p2Moving){
            if (this.keyUP.isDown && this.player2.body.touching.down && this.p2Jump) {
                this.jumpSFX.play();
                this.player2.setVelocityY(-this.jumpSpeed);
                this.p2Jump = false;
                this.jumpTimerP2 = this.time.now+this.jumpTime;
            } else if (this.keyLEFT.isDown) {
                this.player2.setVelocityX(-(this.playerSpeed + this.worldSpeed));
                this.player2.play('P2_anim', true);
                this.player2.setFlip(true, false)
            } else if (this.keyDOWN.isDown) {
                this.player2.play('P2_stand', true);
                this.player2.setVelocityX(-this.worldSpeed);
            } else if (this.keyRIGHT.isDown) {
                this.player2.setVelocityX(this.playerSpeed);
                this.player2.play('P2_anim', true);
                this.player2.setFlip(false, false)
            } else {
                this.player2.play('P2_stand', true);
                this.player2.setVelocityX(-this.worldSpeed);
            }
        }else{
            //console.log(this.temporizadorP2);
            if(this.time.now> this.timerP2){
                this.reactivateP2();
            }
        }  

        if(this.hasNoodles==0){
            console.log(this.noodlesHolder.y);
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
        console.log('gameOverP1 FUNCIONA');

        //this.P2Winner = new ResumeScene();
        //this.P2Winner.setWinnerText(2);

        this.physics.pause();
        this.gameOver = true;                                                   //Fin del juego

        //Ponemos animaciones de un solo frame para que el jugador no se siga moviendo
        this.player2.play('P2_stand');
        this.player1.play('P1_stand');
        this.gameoverSFX.play();
        
        this.scene.start('WINNER_P2_SCENE');
    }

    gameOverP2() {
        console.log('gameOverP2 FUNCIONA');

        //this.P1Winner = new ResumeScene();
        //this.P1Winner.setWinnerText(1);

        //Los jugadores ya no pueden moverse
        this.physics.pause();
        this.gameOver = true;

        //Ponemos animaciones de un solo frame para que el jugador no se siga moviendo
        this.player2.play('P2_stand');
        this.player1.play('P1_stand');
        this.gameoverSFX.play();
        
        this.scene.start('WINNER_P1_SCENE');
    }

    //FUNCION PARA EL TEXTO READY DEL PRINCIPIO
    readyTitle(){
        //console.log("READY?");
        this.readyText = this.add.text(config.width / 2, config.height / 2, 'READY?', { font: '192px japaneseFont' });
        this.readyText.setStroke('#ff5757', 16);
        Phaser.Display.Align.In.Center(this.readyText, this.bg1);
        this.littleGongSFX.play();
        this.setTextCall = this.time.delayedCall(1000, this.setTitle, [], this);
    }

    //FUNCION PARA EL TEXTO SET DEL PRINCIPIO
    setTitle(){
        //console.log("SET?");
        this.readyText.setVisible(false);
        this.setText = this.add.text(config.width / 2, config.height / 2, 'SET?', { font: '192px japaneseFont' });
        this.setText.setStroke('#ff5757', 16);
        Phaser.Display.Align.In.Center(this.setText, this.bg1);
        this.littleGongSFX.play();
        this.goTextCall = this.time.delayedCall(1000, this.goTitle, [], this);
    }

    //FUNCION PARA EL TEXTO GO DEL PRINCIPIO
    goTitle(){
        //console.log("GO!");
        this.gongSFX.play();
        this.setText.setVisible(false);
        this.goText = this.add.text(config.width / 2, config.height / 2, 'GO!', { font: '192px japaneseFont' });
        this.goText.setStroke('#ff5757', 16);
        Phaser.Display.Align.In.Center(this.goText, this.bg1);
    }

    startGame() {
        //console.log('startGame FUNCIONA');
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
        this.timedPlatforms = this.time.addEvent({delay: this.platformSpawnSpeed, callback: this.createPlatform, callbackScope: this, loop: true});
        this.timedStartPowerUp = this.time.delayedCall(240, this.StartPowerUp, [], this);
        this.timedDecideWinner = this.time.delayedCall(60000, this.decideWinner, [], this);
    }

    StartPowerUp(){
        this.timedPowerups = this.time.addEvent({delay: this.powerupSpawnSpeed, callback: this.createPowerup, callbackScope: this, loop: true});
    }

    takeNoodles1(){
        //console.log("1 cogio los noodles")
        this.hasNoodles = 1;
        this.noodlesHolder.destroy();
    }

    takeNoodles2(){
        //console.log("2 cogio los noodles")
        this.hasNoodles = 2;
        this.noodlesHolder.destroy();
    }

    playersCrush(){
        if(this.startGameBool){
            if(!this.p2canAtack){
                if(this.attackTimerP2<=this.time.now){
                    this.p2canAtack = true;
                }
            }
            if(!this.p1canAtack){
                if(this.attackTimerP1<=this.time.now){
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
                this.player1.play('P1_stand', true);
                this.timerP1 = this.time.now + this.stunTime;
                this.p1Moving = false;

                this.attackTimerP2 = this.time.now + this.atackTime;
                this.p2canAtack = false;
                console.log(this.timerP1);

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
                this.player2.play('P2_stand', true);
                this.timerP2 = this.time.now + this.stunTime;
                this.p2Moving = false;
                
                this.attackTimerP1 = this.time.now + this.atackTime;
                this.p1canAtack = false;
                console.log(this.timerP2);
            }
        }
    }
    reactivateP1(){
        //console.log("p1 reactivado");
        this.p1Moving = true;
    }
    reactivateP2(){
        //console.log("p2 reactivado");
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
        this.player2.play('P2_stand');
        this.player1.play('P1_stand');
        this.gameoverSFX.play();
        
        this.scene.start('resumenScene');
    }
    
    destruirPlataforma(samurai, platafroma){
        //console.log("destruyendo platadormas");
        platafroma.destroy();
    }

    todomiticoWait(player, powerup){
        //this.scene.resume('GAME_SCENE_KEY');
        this.elTodoMitico.setVisible(false);
        this.punchSFX.play();

        if(player == this.player1){
            this.player2.setVelocityX(-1000);
            this.timerP2 = this.time.now + this.stunTime;
            this.p2Moving = false;
            console.log(this.timerP2);
           
        }else if (player == this.player2){
            this.player1.setVelocityX(-1000);
            this.timerP1 = this.time.now + this.stunTime;
            this.p1Moving = false;
            console.log(this.timerP2);
        }else{
            this.player2.setVelocityX(-1000);
            this.timerP2 = this.time.now + this.stunTime;
            this.p2Moving = false;
            this.player1.setVelocityX(-1000);
            this.timerP1 = this.time.now + this.stunTime;
            this.p1Moving = false;
        }
        powerup.destroy();
    }

    powerUpTodoMitico(player, powerup){
        //this.scene.pause('GAME_SCENE_KEY');
        this.elTodoMitico.setVisible(true);
        this.samuraiSFX.play();
        this.time.delayedCall(300, this.todomiticoWait, [player, powerup], this);
    }
    
    createPlatform()
    {
<<<<<<< Updated upstream
        let random = this.randomNumber();
        //console.log(random);
        let randomPlat;
        switch(random){
            case 0:
                console.log("Plataforma 0 creada");
                let plat1 = this.platforms.create(1600, 600, 'obstacle');
                plat1.setVelocityX(-this.worldSpeed);
                plat1.setOrigin(0,0);
                this.randomPlat = 0;
                break;
            case 1:
                console.log("Plataforma 1 creada");
                let plat2 = this.platforms.create(1600, 500, 'obstacle');
                plat2.setVelocityX(-this.worldSpeed);
                this.randomPlat = 1;
                plat2.setOrigin(0,0);
                break;
            case 2:
                console.log("Plataforma 2 creada");
                let plat3 = this.platforms.create(1600, 400, 'obstacle');
                plat3.setVelocityX(-this.worldSpeed);
                this.randomPlat = 2;
                plat3.setOrigin(0,0);
                break;
            case 3:
                console.log("Plataforma 3 creada");
                let plat4 = this.platforms.create(1600, 300, 'obstacle');
                plat4.setVelocityX(-this.worldSpeed);
                this.randomPlat = 3;
                plat4.setOrigin(0,0);
                break;
            case 4:
                console.log("Plataforma 4 creada");
                let plat5 = this.platforms.create(1600, 200, 'obstacle');
                plat5.setVelocityX(-this.worldSpeed);
                this.randomPlat = 4;
                plat5.setOrigin(0,0);
                break;
        }

        return randomPlat;
=======
        if (this.spawnObjects){
            let random = this.randomNumber();
            //console.log(random);
            let randomPlat;
            switch(random){
                case 0:
                    console.log("Plataforma 0 creada");
                    let plat1 = this.platforms.create(1600, 600, 'OBSTACLE');
                    plat1.setVelocityX(-this.worldSpeed);
                    plat1.setOrigin(0,0);
                    this.randomPlat = 0;
                    break;
                case 1:
                    console.log("Plataforma 1 creada");
                    let plat2 = this.platforms.create(1600, 500, 'OBSTACLE');
                    plat2.setVelocityX(-this.worldSpeed);
                    this.randomPlat = 1;
                    plat2.setOrigin(0,0);
                    break;
                case 2:
                    console.log("Plataforma 2 creada");
                    let plat3 = this.platforms.create(1600, 400, 'OBSTACLE');
                    plat3.setVelocityX(-this.worldSpeed);
                    this.randomPlat = 2;
                    plat3.setOrigin(0,0);
                    break;
                case 3:
                    console.log("Plataforma 3 creada");
                    let plat4 = this.platforms.create(1600, 300, 'OBSTACLE');
                    plat4.setVelocityX(-this.worldSpeed);
                    this.randomPlat = 3;
                    plat4.setOrigin(0,0);
                    break;
                case 4:
                    console.log("Plataforma 4 creada");
                    let plat5 = this.platforms.create(1600, 200, 'OBSTACLE');
                    plat5.setVelocityX(-this.worldSpeed);
                    this.randomPlat = 4;
                    plat5.setOrigin(0,0);
                    break;
            }
            return randomPlat;
        }
>>>>>>> Stashed changes
    }

    randomNumber(){
        //console.log("randomNumber FUNCIONA");
        let random2 = Math.floor(Math.random() * 5);
        //console.log(random2);
        return random2;
    }

    createPowerup(){
<<<<<<< Updated upstream
        switch(this.randomPlat){
            case 0:
                console.log("Powerup 0 creada");
                let power0 = this.powerUps.create(1600, 600, 'powerup');
              
                power0.setScale(0.1, 0.1);
                power0.y = power0.y-power0.height*0.1 - 1;
                power0.setVelocityX(-this.worldSpeed);
                console.log(power0.height);
                break;
            case 1:
                console.log("Powerup 1 creada");
                let power1 = this.powerUps.create(1600, 500 , 'powerup');
                
                power1.setScale(0.1, 0.1);
                power1.y = power1.y-power1.height*0.1  - 1;
                power1.setVelocityX(-this.worldSpeed);
                console.log(power1.height);
                break;
            case 2:
                console.log("Powerup 2 creada");
                let power2 = this.powerUps.create(1600, 400, 'powerup');
               
                power2.setScale(0.1, 0.1);
                power2.y = power2.y-power2.height*0.1  - 1;
                power2.setVelocityX(-this.worldSpeed);
                console.log(power2.height);
                break;
            case 3:
                console.log("Powerup 3 creada");
                let power3 = this.powerUps.create(1600, 300, 'powerup');
                power3.setScale(0.1, 0.1);
                power3.y = power3.y-power3.height*0.1  - 1;
                power3.setVelocityX(-this.worldSpeed);
                console.log(power3.height);
                break;
            case 4:
                console.log("Powerup 4 creada");
                let power4 = this.powerUps.create(1600, 200, 'powerup');
                power4.setScale(0.1, 0.1);
                power4.y = power4.y-power4.height*0.1  - 1;
                power4.setVelocityX(-this.worldSpeed);
                console.log(power4.height);
                break;
=======
        if (this.spawnObjects){
            switch(this.randomPlat){
                case 0:
                    console.log("Powerup 0 creada");
                    let power0 = this.powerUps.create(1600, 600, 'POWERUP');
                  
                    power0.setScale(0.1, 0.1);
                    power0.y = power0.y-power0.height*0.1 - 1;
                    power0.setVelocityX(-this.worldSpeed);
                    console.log(power0.height);
                    break;
                case 1:
                    console.log("Powerup 1 creada");
                    let power1 = this.powerUps.create(1600, 500 , 'POWERUP');
                    
                    power1.setScale(0.1, 0.1);
                    power1.y = power1.y-power1.height*0.1  - 1;
                    power1.setVelocityX(-this.worldSpeed);
                    console.log(power1.height);
                    break;
                case 2:
                    console.log("Powerup 2 creada");
                    let power2 = this.powerUps.create(1600, 400, 'POWERUP');
                   
                    power2.setScale(0.1, 0.1);
                    power2.y = power2.y-power2.height*0.1  - 1;
                    power2.setVelocityX(-this.worldSpeed);
                    console.log(power2.height);
                    break;
                case 3:
                    console.log("Powerup 3 creada");
                    let power3 = this.powerUps.create(1600, 300, 'POWERUP');
                    power3.setScale(0.1, 0.1);
                    power3.y = power3.y-power3.height*0.1  - 1;
                    power3.setVelocityX(-this.worldSpeed);
                    console.log(power3.height);
                    break;
                case 4:
                    console.log("Powerup 4 creada");
                    let power4 = this.powerUps.create(1600, 200, 'POWERUP');
                    power4.setScale(0.1, 0.1);
                    power4.y = power4.y-power4.height*0.1  - 1;
                    power4.setVelocityX(-this.worldSpeed);
                    console.log(power4.height);
                    break;
            }
        }
    }

    waitForFinishLine(){
        this.spawnObjects = false;
        this.timedCreateFinishLine = this.time.delayedCall(5000, this.createFinishLine, [], this);
    }

    createFinishLine()
    {
        if (this.startGameBool) {
            console.log("createFinishLine FUNCIONA");
            this.finishLine = this.physics.add.sprite(1400, 200, 'FINISHLINE');
            this.finishLine.setScale(0.01, 7.5);
            this.physics.add.collider(this.finishLine, this.suelo);
            this.finishLine.setVelocityX(-100);
            this.physics.add.collider(this.player1, this.finishLine, this.decideWinner, null, this);
            this.physics.add.collider(this.player2, this.finishLine, this.decideWinner, null, this);
>>>>>>> Stashed changes
        }
        
    }

    decideWinner()
    {
        this.physics.pause();
        this.gameOver = true;                                                   //Fin del juego

        //Ponemos animaciones de un solo frame para que el jugador no se siga moviendo
        this.player2.play('P2_stand');
        this.player1.play('P1_stand');
        this.gameoverSFX.play();
        if(this.hasNoodles = 1){
            this.scene.start('WINNER_P2_SCENE');
        } else if(this.hasNoodles = 2){
            this.scene.start('WINNER_P1_SCENE');
        }
    }
}