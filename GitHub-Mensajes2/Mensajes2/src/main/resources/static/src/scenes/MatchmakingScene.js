class MatchmakingScene extends Phaser.Scene {

    constructor() {
        super('MATCHMAKING_SCENE_KEY');
    }

    create(){
        document.getElementById('matchmaking').style.display = 'block';
    }

}