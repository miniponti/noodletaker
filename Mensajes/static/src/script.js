var serverId;
var playerId;
var timer;
var conexion = false;
$(document).ready(function () {
    
    
    $("#conectarse").click(function () {
        startConexion();
    })
    $("#desconectarse").click(function () {
        endConexion();
    })
   
    $("#sendButton").click(function () {
        postMessage();
    })
})

function startConexion(){
    if(!conexion){
        var message = $("#nick").val();
        $.ajax({
            method: "POST",
            url: "http://localhost:8080/",
            data: JSON.stringify(message),
            processData: false,
            headers: {
                "Content-Type": "application/json"
            }
        }).done(function(data){   
            if(data.salaId==null || data.salaId == undefined){
                $('#info').empty();
                $("#info").append("<p> Jugador ya conectado </p>" );
                conexion = false;
            }else{
            serverId = data.salaId;
            playerId = data.id;
            console.log("Server id" + serverId + " Player id:" + playerId);
            timer = setInterval(function(){
                ping();
            },1000);
            conexion = true;
            }
        })

        
    }
}

function endConexion(){
    if(conexion){
        clearInterval(timer);
        conexion = false;
        $('#jugadores').empty();
        $('#jugadores').append("<p>Desconectado<p>");
        $('#info').empty();
    }
}
function postMessage() {
    var d = new Date();
    var n = d.toLocaleTimeString();
    if(conexion){
    var message = $("#messageInput").val();
    var mensaje = {
        autor: "" + playerId + "", 
        fecha: n,
        texto: message
    }
    $.ajax({
        method: "POST",
        url: "http://localhost:8080/" + serverId,
        data: JSON.stringify(mensaje),
        processData: false,
        headers: {
            "Content-Type": "application/json"
        }
    })
   // $('#info').append("<div>" + message + "</div>");
    console.log("Item created: " + JSON.stringify(mensaje));
    }
}

function ping(){
    //console.log("ping");
    $.ajax({
        url:"http://localhost:8080/" + serverId + "/" + playerId,
    }).done(function(data){   
        $('#jugadores').empty();
        $('#jugadores').append("<p>Jugadores Conectados: " + data.jugadores.length + "</p>");
        for(var i = 0; i<data.jugadores.length;i++){
            $("#jugadores").append("<p>"+data.jugadores[i]+ "</p>");
        }
        $('#info').empty();
        for(var i = 0; i<data.mensajes.length;i++){
            var dato = data.mensajes[i];
            $("#info").append("<p>"+dato.autor+"[" + dato.fecha+"]: " + dato.texto+ "</p>")
        }
    })
    
}



