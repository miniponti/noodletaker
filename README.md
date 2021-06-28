# Noodletaker
La temática del juego es "Japón moderno mezclado con figuras del Japón feudal"

**Integrantes del grupo**:
|           NOMBRE           |              CORREO             |     USUARIO    |
|:--------------------------:|:-------------------------------:|:--------------:|
|    Manuel Abarca Crespo    |  m.abarca.2018@alumnos.urjc.es  |     dakeXd     |
| Juan Antonio Calero Crespo |  ja.calero.2017@alumnos.urjc.es |     C4lipo     |
|   Ismael Jiménez Martínez  | i.jimenezm.2018@alumnos.urjc.es | gossipxbabylon |
|    Elena Pontijas Martín   | e.pontijas.2018@alumnos.urjc.es |    miniponti   |


### 1.- Introducción
#### 1.1.- Concepto principal
NoodleTaker es un juego ambientado en el Japón actual. Un samurái repartidor de fideos persigue a dos ninjas enemigos que aparecen para robarle los pedidos y así quedarse ellos con el dinero. Estos dos ninjas compiten el uno contra el otro para llegar a la meta mientras al mismo tiempo escapan del samurái que los persigue para castigarlos.
  
#### 1.2.- Características principales
1. Jugabilidad sencilla
2. Competitividad
3. Rejugabilidad
4. Dinamismo
5. Número de jugadores: 2
6. Plataforma: PC (Windows, Mac, Linux)

#### 1.3.- Género
Runner: el jugador se mueve constantemente por un mapa avanzando de manera horizontal mientras esquiva distintos obstáculos y recoge diversos objetos para ayudarle a avanzar.

#### 1.4.- Propósito y público específico
El principal propósito de NoodleTaker es conseguir que los jugadores vivan una  experiencia competitiva, pero divertida. Es un juego casual y como tal atraerá a personas de todas las edades que quieran pasar un buen rato con algún amigo, gracias al apartado multijugador. 

#### 1.5.- Licencia
___CC BY-NC-SA (Reconocimiento-NoComercial-CompartirIgual).___

Esta licencia permite a otras personas, mezclar, adaptar y construir a partir del proyecto no comercialmente, siempre que se nos acredite y se publique bajo la misma licencia.

### 2.- Mecánicas del juego
#### 2.1.- Tipo de cámara
__Cámara neutra__: La cámara toma una perspectiva lateral, perpendicular a la dirección en la que los jugadores se mueven (es decir, la cámara está apuntando hacia delante según la perspectiva del usuario y los personajes se mueven de izquierda a derecha). Se asemeja a las cámaras usadas en los videojuegos “Super Mario Bros” y “Hollow Knight”.

#### 2.2.- Controles

* Jugador 1 usa las teclas WASD
	* W = Saltar.
	* A = Moverse a la izquierda.
	* D = Moverse a la derecha.
	* E = Atacar y robar noodles.
* Jugador 2 usa las flechas
	* ↑ = Saltar.
	* ← = Moverse a la izquierda
	* → = Moverse a la derecha.
	* Tecla Enter = Atacar y robar noodles.

<img src="https://github.com/miniponti/noodletaker/blob/main/Noodletaker/Mensajes2/src/main/resources/static/assets/interface/CONTROLS_MENU.png" width="50%" height="50%">

#### 2.3.- Jugabilidad
* **Movimiento de los jugadores**: la jugabilidad se basa en un espacio de dos dimensiones en el que se puede avanzar horizontal y verticalmente, creando un entorno similar al de los juegos de plataformas.

* **Movimiento de la cámara**: La cámara del juego se mueve constantemente, hasta que la barra de progreso llegue al final o pierda en medio de la partida (bien porque el samurái le atrapa o porque uno de los obstáculos le impide avanzar).

* **Plataformas y obstáculos**: a medida que avanza la partida, van surgiendo plataformas que intentarán empujar a los jugadores hacia el samurái y que deben esquivar o interactuar con ella para continuar jugando.

* **Atacar**: Los dos jugadores pueden atacarse entre sí, si se pulsa la correspondiente tecla de ataque y si un jugador entra en contacto con el otro. El efecto del ataque es robarle los noodles al otro jugador y empujarle.

#### 2.4.- Niveles
Sólo hay un nivel en todo el juego:

* Se plantea un nivel estándar en el que los jugadores deben esquivar los obstáculos hasta que uno de los jugadores pierda o lleguen al final del recorrido.

* Cuando se haya finalizado este nivel, se habrá acabado la partida y por tanto se mostrarán los resultados.

#### 2.5.- Condiciones de victoria
Es una única partida en la que se decide el ganador. Un jugador sale victorioso de un nivel cuando:

* El otro jugador es capturado por el samurái que persigue a ambos.

* Cuando se llega al final del recorrido, el ninja que posea el tazón de noodles, es el ganador.

#### 2.6.- Obstáculos
* **Plataformas**: Las plataformas son el único obstáculo del juego, aparecen por la derecha de la pantalla y van hacia el jugador de derecha a izquierda (siguiendo el autoscroll del nivel) y se esquivan saltando sobre ellas o yendo por debajo (si es posible).

#### 2.7.- Habilidades
* **Sumashu (Smash)**: si un jugador toca esta habilidad, en la pantalla se muestra un mensaje de emergencia y, a continuación, sale un personaje llamado Todo Mítico que le da un golpe al ninja controlado por el otro jugador y lo empuja hacia atrás.

#### 2.8.- Guía
En la pantalla del título, se le da la opción al jugador de pulsar un botón que muestre un pequeño tutorial para que los jugadores entiendan desde el principio cuál es su objetivo, cuáles son los controles para interactuar con el juego y cuáles son las condiciones de victoria y de derrota.

<img src="https://github.com/miniponti/noodletaker/blob/main/Noodletaker/Mensajes2/src/main/resources/static/assets/interface/TUTORIAL_1.png" width="50%" height="50%">

<img src="https://github.com/miniponti/noodletaker/blob/main/Noodletaker/Mensajes2/src/main/resources/static/assets/interface/TUTORIAL_2.png" width="50%" height="50%">

### 3.- Estados del juego
NoodleTaker consta de los siguientes estados:
* **Menú de inicio:** es lo primero que ve el jugador al arrancar el juego. Consta de dos botones para empezar una partida tanto offline ("OFFLINE"), como online ("ONLINE"). Además se ha incorporado uno para el tutorial ("HOW TO PLAY"), otro para saber cuáles son los controles ("CONTROLS") y por último uno para silenciar o desilenciar el audio.

* **Matchmaking:** tras pulsar el botón "ONLINE", los jugadores son dirigidos a una escena en la que se espera la conexión de otro jugador. Una vez conectado, se procede a comenzar la partida.

* **Partida empezada:** tras haber pulsado el botón correspondiente, los jugadores ya pueden comenzar a jugar.

* **Menú de fin de juego:** aparece cuando se ha superado el nivel y ya se ha establecido el ganador, o la condición de derrota ha dado lugar.

<img src="https://github.com/miniponti/noodletaker/blob/main/Noodletaker/Mensajes2/src/main/resources/static/assets/interface/DIAGRAMA.png" width="75%" height="75%">
	
### 4.- Arte
#### 4.1.- Interfaz
* **Pantalla de inicio**

<img src="https://github.com/miniponti/noodletaker/blob/main/Noodletaker/Mensajes2/src/main/resources/static/assets/interface/scenes/STARTSCENE.PNG" width="50%" height="50%">

* **Pantalla de chat**

<img src="https://github.com/miniponti/noodletaker/blob/main/Noodletaker/Mensajes2/src/main/resources/static/assets/interface/scenes/CHAT_SCENE.png" width="50%" height="50%">

* **Pantalla de matchmaking:** aparece cuando el jugador ha pulsado el botón "ONLINE" y está a la espera de otro jugador.

<img src="https://github.com/miniponti/noodletaker/blob/main/Noodletaker/Mensajes2/src/main/resources/static/assets/interface/scenes/MATCHMAKING_SCENE.png" width="50%" height="50%">

* **Durante el juego:** una vez arranca la partida, el menú de inicio desaparece y en la pantalla aparece una barra de progresión de nivel. Ésta se encuentra en la parte superior de la pantalla e indica a los jugadores lo que llevan recorrido de nivel y cuánto les falta para terminar. Comienza siendo un rectángulo vacío, pero que cuanto más avanza la partida, más se va llenando. Cuando está totalmente llena significa que se ha llegado al final.

<img src="https://github.com/miniponti/noodletaker/blob/main/Noodletaker/Mensajes2/src/main/resources/static/assets/interface/scenes/GAME_SCENE.png" width="50%" height="50%">

* **Pantalla de fin de juego:** aparece cuando ninguno de los jugadores han cogido el bol de fideos, por tanto el samurái gana.

<img src="https://github.com/miniponti/noodletaker/blob/main/Noodletaker/Mensajes2/src/main/resources/static/assets/interface/scenes/BAD_ENDING.png" width="50%" height="50%">

* **Pantalla de nivel completado:** sale cuando se ha completado el nivel, bien sea porque un jugador ha llegado al final de la meta o bien porque los obstáculos le han impedido seguir jugando. Cuando esto ocurre, aparece quién es el ganador del nivel y un botón patra reiniciar la partida.

<img src="https://github.com/miniponti/noodletaker/blob/main/Noodletaker/Mensajes2/src/main/resources/static/assets/interface/scenes/P1_WINS.png" width="50%" height="50%">
<img src="https://github.com/miniponti/noodletaker/blob/main/Noodletaker/Mensajes2/src/main/resources/static/assets/interface/scenes/P2_WINS.png" width="50%" height="50%">

* **Pantalla de desconexión:** sale cuando uno de los jugadores se ha desconectado.

<img src="https://github.com/miniponti/noodletaker/blob/main/Noodletaker/Mensajes2/src/main/resources/static/assets/interface/scenes/DISCONNECTION.png" width="50%" height="50%">

* **Pantalla de desconexión del servidor:** sale cuando se ha perdido la conexión con el servidor.

<img src="https://github.com/miniponti/noodletaker/blob/main/Noodletaker/Mensajes2/src/main/resources/static/assets/interface/scenes/LOST_CONNECTION.png" width="50%" height="50%">

#### 4.2.- Personajes
* Jugables
	* Ninja 1
	
	<img src="https://github.com/miniponti/noodletaker/blob/main/Noodletaker/Mensajes2/src/main/resources/static/assets/sprites/BLUE_SPRITESHEET.png" width="50%" height="50%">
	
	* Ninja 2
	<img src="https://github.com/miniponti/noodletaker/blob/main/Noodletaker/Mensajes2/src/main/resources/static/assets/sprites/GREEN_SPRITESHEET.png" width="50%" height="50%">
	
* No jugables
	* Samurai
	<img src="https://github.com/miniponti/noodletaker/blob/main/Noodletaker/Mensajes2/src/main/resources/static/assets/sprites/samurai.png" width="25%" height="25%">
	
	* El Todo Mítico
	<img src="https://github.com/miniponti/noodletaker/blob/main/Noodletaker/Mensajes2/src/main/resources/static/assets/sprites/ETM.png" width="50%" height="50%">
	
#### 4.3.- Objetos
Aparecen a lo largo del escenario de manera “semialeatoria” (tendrán unas posiciones determinadas en las que podrán o no aparecer), son de un solo uso y se utilizan en el momento en el que un jugador entra en contacto con la imagen que representa al objeto, afectando al otro jugador (si son perjudiciales) o al jugador que los obtiene (si son beneficiosos) . 
Debido a que los objetos que se han diseñado se basan en un sistema de “invocaciones” a ayudantes, éstos se mostrarán en pantalla para ambos jugadores antes de hacer efecto en el mismo. De esta forma el jugador que es afectado se puede preparar ante el ataque inminente según el tipo de objeto que haya obtenido el rival.

#### 4.4.- Escenarios
Hay un único escenario divido en dos capas para usar el efecto de parallax scrolling.

* **Fondo** El fondo es dinamico conforme el avance del nivel.
<img src="https://github.com/miniponti/noodletaker/blob/main/Noodletaker/Mensajes2/src/main/resources/static/assets/sprites/Background2.png" width="75%" height="75%">
	
* **Plataformas** Las plataformas irán apareciendo por la parte derecha del nivel y se moverán hacia la izquierda conforme los personajes se muevan por el escenario.

### 5.- Diagrama de clases
<img src="https://github.com/miniponti/noodletaker/blob/main/Noodletaker/Mensajes2/src/main/resources/static/assets/interface/DiagramaDeClases.jpg" width="75%" height="75%">

### 6.- Gestion de cliente/servidor - Sala de chat
El servidor está formado por una sala principal que almacena una lista de jugadores conectados y un registro de mensajes almacenado en un txt en memoria local (este txt tiene el nombre de la ID de su sala). 

Los clientes se pueden conectar al servidor con una petición de tipo POST, en la que se incluye en el cuerpo de la petición el ID que va a tener el cliente dentro del servidor. 

El servidor enviará como respuesta un objeto de la clase Jugador, donde estarán incluídos como atributos la ID del jugador y la ID de la sala a la que se ha conectado. 

Una vez que un cliente esté conectado, tendrá que enviar una petición de tipo GET (un ping) constantemente indicando la ID del jugador y la ID de la sala a la que se hace, la cual enviará en el cuerpo de la respuesta un objeto con la lista de jugadores conectados a la sala y la lista de mensajes enviados en la sala. Si alguno de los clientes conectados no envía un ping en un tiempo determinado (2 segundos) se le desconectará de la sala, por lo cual no podrá enviar ni recibir mensajes de la sala hasta que se vuelva a conectar. Si un cliente intenta conectarse con la ID de un jugador ya conectado, el servidor devolverá null, que en el cliente se interpretará como que esa ID ya está registrada. 

Si el servidor no está conectado, el cliente interpretará los fallos en sus peticiones de GET o POST como que el servidor está offline.  

### 7.- Gestion de cliente/servidor - Juego Online
Para la gestion del multijugado real se ha usado websockets, que permitiran a los clientes subscribirse a un canal y recibir directamente los mensajes que se envien a el. Para lograr esto se ha empleado el protocolo STOMP, que proporciona un manejo sencillo y eficaz de mensajes simples. 

Se ha decidido usar un modelo de cliente autoritativo, donde los clientes informan al servidor de su estado y el cliente se encarga de comunicarle este a los demas, dejando al servidor con una funcionalidad de "eco", donde solo reenvia los mensajes que le llegan. Existira un canal para cada partida y los jugadores enviaran y recibiran mensajes en ese canal. 

Algo de lo que si se encarga el servidor es el matchmaking. Los clientes se subscribian a un canal de matchmaking y el servidor los ira metiendo en una lista segun lo hagan. Una vez que haya 2 o mas jugadores se enviara un mensaje con el id de sala asociada a ellos y se les eliminara de la lista. Los clientes se encargan de desubscribirse de este canal y subscribirse al canal de la sala que se les ha asociado. Para detectar desconexiones en este apartado, su usa un metodo de "ping-pong". El cliente envia cada poco un "ping" que el servidor recibe, marcando al jugador que lo ha recibido. Tras esto devuelve un "pong" al cliente. El cliente al recibirlo marcara que sigue conectado al servidor. Si el cliente intenta enviar un "ping" sin haber recibido el "pong" interpretara que se ha desconectado del servidor y se movera a una pantalla de desconexion. El servidor cada cierto tiempo ejecuta una funcion que elimina a todos los jugadores que no esten marcados, interpretando que se han desconectado, y desmarcara a todos los demas.

Respecto a la comunicación entre clientes, estos enviaran mensajes formados por 3 atributos, el tipo de mensaje, el usuario que lo envio y la información que contiene (como campo de texto). Esto permite enviar e interpretar todo tipo de mensajes sin una gran complicación. Lo más básico que sincronizan los clientes es su movimiento. Cada cliente envia cada pocos milisegundos un mensaje de tipo movimiento que contiene en la información un objeto JSON con su posicion, velocidad, y atributos de visualización (número de animación y flip). Al recibir un mensaje de este tipo, se aplicaran los cambios que corresponden al jugador contrario. 

Otros tipos de mensajes que se pueden encontrar son: 
* golpe: cuando un jugador golpea el otro se envia este mensaje para indicarle que ha recibido un golpe y tiene que desplazarse.
* victoria: si un jugador consigue llegar a cualquier escena de victoria, se envia un mensaje con el tipo de victoria conseguida para mostrarla tambien en el otro cliente
* sincronizacion: este tipo de mensaje se envia cuando un jugado esta listo para empezar. Cuando ambos jugadores han enviado y recibido este mensaje, se comienza el juego.

Los jugadores solo interpretan mensajes provenientes de jugadores distintos a ellos mismos. Si no reciben mensajes de otros jugadores en una cierta cantidad de tiempo, se interpretara que se han desconectado y se saldra a una pantalla de desconexión.
