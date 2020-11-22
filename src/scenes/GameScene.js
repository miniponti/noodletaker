class GameScene extends Phaser.Scene {

    constructor() {
        super({key : 'juegoEscena'});
    }

    init() {

    };

    preload() {
        this.load.image('fondo', 'assets/fff.png');
    }

    create() {
        var bg = this.add.sprite(0,0,'fondo');
        bg.setOrigin(0,0);

    }

    update() {

    }


    end() {

    }

}
