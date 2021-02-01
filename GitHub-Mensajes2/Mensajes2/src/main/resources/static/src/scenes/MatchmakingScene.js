var conexionEstablished = false;
class MatchmakingScene extends Phaser.Scene {

    constructor() {
        super('MATCHMAKING_SCENE_KEY');
    }

    preload(){
        this.load.image('MATCHMAKING', 'assets/sprites/matchmaking.png');
    }

    create(){
        this.bg = this.add.sprite(0, 0, 'MATCHMAKING').setOrigin(0,0);
        this.conexion();
    }

    update(){
        if(conexionEstablished){
            console.log("Pasando a escena de juego");
            this.scene.start('GAME_SCENE_KEY');
        }
    }

    conexion(){
        socket = new SockJS('/ws');
        stompClient = Stomp.over(socket);
        stompClient.connect({}, this.onConnected, this.onError);
        
        //JSON.stringify({sender: username, id: 1234});
       // stompClient.send("/game/search", {}, JSON.stringify({'name': "Dake"}));
       // stompClient.send("/game/search", {}, JSON.stringify({'name': "Dake"}));
    }
    
    onConnected(){
        stompClient.subscribe('/topic/searching', onMessage , { id: nick});
        var chatMessage = {
            positionX: 0,
            positionY: 0,
            speedX: 0,
            speedY: 0,
            attacking: false,
            saltando: false,
            player: nick
        };
        stompClient.send("/app/search", {}, JSON.stringify(chatMessage)); 
        
    }

    onError(){
        console.log("Ha habido un error en la conexion");
    }
    
    
    

    

}

function onMessage(message){
    console.log("Mensaje recibido:" + message.body)
    if(message.body!="waiting"){
        var ids = message.body.split("%");
        if(ids[0]==nick){
            jugador = 0;
            server = ids[2];
            stompClient.unsubscribe( nick);
            //console.log("Pasando a escena de juego");
            //this.scene.start('GAME_SCENE_KEY');
            //this.titleBGM.stop();
            conexionEstablished = true;
        }
        if(ids[1]==nick){
            jugador = 1;
            server = ids[2];
            stompClient.unsubscribe( nick);
            //console.log("Pasando a escena de juego");
            //this.scene.start('GAME_SCENE_KEY');
            //this.titleBGM.stop();
            conexionEstablished = true;
        }
    }
    //var message = JSON.parse(payload.body); para convertir a objeto
}