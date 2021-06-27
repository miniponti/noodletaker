var conexionEstablished = false;
var pingPongTimer;
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
        this.pongV = true;
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
        stompClient.connect({}, this.onConnected.bind(this), this.onError.bind(this));
        
        //JSON.stringify({sender: username, id: 1234});
       // stompClient.send("/game/search", {}, JSON.stringify({'name': "Dake"}));
       // stompClient.send("/game/search", {}, JSON.stringify({'name': "Dake"}));
    }
    
    onConnected(){
        stompClient.subscribe('/topic/searching', onMessage , { id: nick});
        var chatMessage = {
            name: "conexion",
            player: nick,
            info: nick
        };
        stompClient.subscribe('/topic/searching/' + nick,  this.ping.bind(this), {id: nick+'a'});
        pingPongTimer = window.setInterval(this.pong.bind(this), 500);
        stompClient.send("/app/search", {}, JSON.stringify(chatMessage)); 
        
    }

    onError(){
        console.log("Ha habido un error en la conexion");
        this.scene.start('TITLE_SCENE_KEY');
    }

    pong(){
        console.log("pong")
        if(this.pongV){
            stompClient.send('/app/ping/' + nick, {}, true);
            this.pongV = false;
        }else{
            clearInterval(pingPongTimer);
            stompClient.disconnect();
            this.scene.start('TITLE_SCENE_KEY');
        }
    }

    ping(message){
        console.log("ping")
        this.pongV = true;
    }
}

function onMessage(message){
    console.log("Mensaje recibido:" + message.body)
    if(message.body!="waiting"){
        var ids = message.body.split("%");
        if(ids[0]==nick){
            clearInterval(pingPongTimer);
            jugador = 0;
            server = ids[2];
            stompClient.unsubscribe( nick);
            stompClient.unsubscribe( nick+'a');
            seed = ids[3];
            //console.log("Pasando a escena de juego");
            //this.scene.start('GAME_SCENE_KEY');
            //this.titleBGM.stop();
            conexionEstablished = true;
        }
        if(ids[1]==nick){
            clearInterval(pingPongTimer);
            jugador = 1;
            server = ids[2];
            stompClient.unsubscribe( nick);
            stompClient.unsubscribe( nick+1);
            seed = ids[3];
            //console.log("Pasando a escena de juego");
            //this.scene.start('GAME_SCENE_KEY');
            //this.titleBGM.stop();
            conexionEstablished = true;
        }
    }
    //var message = JSON.parse(payload.body); para convertir a objeto
}