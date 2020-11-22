class GameScene extends Phaser.Scene {

    constructor() {
        super({key : "juegoEscena"});
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
        var bg = this.add.tileSprite(0,0,config.width,config.height,'fondo');   //INICIALIZACION FONDO
        bg.setOrigin(0,0);  //SE CAMBIA EL ORIGEN A LA ESQUINA SUPERIOR IZQ

        //SUELO CON COLLIDERS
        var ground = this.physics.add.image(0, 750, 'suelo');   //INICIALIZACION SUELO
        ground.setCollideWorldBounds(true);               //COLISIONES CON EL BORDE DEL "CANVAS"

        //JUGADOR 1
        var player1 = this.physics.add.sprite(400, 500, 'j1');  //INICIALIZACION J1
        player1.setScale(0.15,0.15);                            //ESCALADO J1
        this.physics.add.collider(player1, ground);             //COLISIONES CON SUELO

        //JUGADOR 2
        var player2 = this.physics.add.sprite(400, 500, 'j2');  //INICIALIZACION J2
        player2.setScale(0.15,0.15);                            //ESCALADO J2
        this.physics.add.collider(player2, ground);             //COLISIONES CON SUELO

        //SAMURAI
        var samurai = this.physics.add.sprite(20, 400, 'samurai');  //INICIALIZACION SAMURAI
        samurai.setScale(0.15, 0.15);                               //ESCALADO SAMURAI
        this.physics.add.collider(samurai, ground);                 //COLISIONES CON SUELO

        var cursors = this.input.keyboard.createCursorKeys();
        var keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        var keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        var keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);

        var platforms;
        var platformsSpeed;

        //var timedEvent;
        var counter;

        this.stopP1Bool = false;
        this.stopP2Bool = false;

    }

    update() {
        /*this.time.setText('Event.progress: ' + timedEvent.getProgress().toString().substr(0, 4));
        var movePos = 5;


        this.bg.tilePositionX += movePos;   //MOVIMIENTO DEL FONDO
        movePlayer(1);                      //LLAMADA A FUNCION PARA MOVER EL J1
        movePlayer(2);                      //LLAMADA A FUNCION PARA MOVER EL J2
        player1.setVelocityX(0);
        player2.setVelocityX(0);
        if (stopP1Bool === true) {
            player1.setVelocityY(0);

        } else if (stopP2Bool === true) {
            player2.setVelocityY(0);
        }*/
    }

    /*movePlayer(playerIndex) {
        var velocityY = 300;
        if (playerIndex === 1) {
            //Saltar
            //La tecla de salto es el cursor hacia arriba y se compruba si está pulsada.
            // También se verifica si el personaje está tocando el suelo, ya que de lo contrario podría saltar mientras está en el aire.
            // Si se cumplen estas dos condiciones, se aplica una velocidad vertical de 330 px/s.
            if (cursors.up.isDown && player1.body.touching.down)
            {
                player1.setVelocityY(-velocityY);
            }
        } else if (playerIndex === 2) {
            //La tecla de salto es el cursor hacia arriba y se compruba si está pulsada.
            // También se verifica si el personaje está tocando el suelo, ya que de lo contrario podría saltar mientras está en el aire.
            // Si se cumplen estas dos condiciones, se aplica una velocidad vertical de 330 px/s.
            if (keyW.isDown && player2.body.touching.down)
            {
                player2.setVelocityY(-velocityY);
            }
        }
    }*/

    /*gameOver(player){
        this.physics.pause();
        winner(player);
    }*/

    //FUNCION QUE PAUSA EL JUEGO Y DICE QUIEN HA GANADO
    /*winnner(player){
        this.physics.pause();
        if (player === 1){
            this.add.text(250, 300, 'PLAYER 1 WINS!', {
                fontSize: '32px',
                fill: '#000'
            });
        }
        else{
            this.add.text(250, 300, 'PLAYER 2 WINS!', {
                fontSize: '32px',
                fill: '#000'
            });
        }

    }*/

    /*stopPlayer(){
        this.stopP1Bool = true;
        powerUp.disableBody(true, true);
    }*/

    /*createFinishLine()
    {
        var finishLine = this.physics.add.sprite(1400, 350, 'finishLine');
        finishLine.setScale(0.05, 23);
        this.physics.add.collider(finishLine, ground);
        finishLine.setVelocityX(-50);
        this.physics.add.collider(player1, finishLine, winnerP1, null, this);
        this.physics.add.collider(player2, finishLine, winnerP2, null, this);
    }*/

    /*createPlatform()
    {
        this.platforms = this.physics.add.group({
            allowGravity: false,
            immovable: true
        });
        this.platforms.create(1600, 200, 'obstaculo');
        this.platforms.create(1300, 300, 'obstaculo');
        this.platforms.create(1200, 400, 'obstaculo');
        this.platforms.create(1100, 500, 'obstaculo');
        this.platforms.create(1000, 600, 'obstaculo');
        this.platforms.setVelocityX(-100);
        this.physics.add.collider(player1, this.platforms);
        this.physics.add.collider(player2, this.platforms);

    }*/


    end() {

    }

}
