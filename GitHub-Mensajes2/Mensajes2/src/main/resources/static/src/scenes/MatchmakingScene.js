class MatchmakingScene extends Phaser.Scene {

    constructor() {
        super('MATCHMAKING_SCENE_KEY');
    }

    preload(){
        this.load.image('MATCHMAKING', 'assets/sprites/matchmaking.png');
    }

    create(){
        this.bg = this.add.sprite(0, 0, 'MATCHMAKING').setOrigin(0,0);
        //console.log("create matchmaking");
    }

    update(){

    }

}