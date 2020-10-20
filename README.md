# Noodletaker
La temática del juego es "Japón moderno mezclado con figuras del Japón antiguo"

**Integrantes del grupo**:
1. **NOMBRE:** Ismael Jiménez Martínez | **CORREO:** i.jimenezm.2018@alumnos.urjc.es | **USUARIO:** _gossipxbabylon_
2. **NOMBRE:** Juan Antonio Calero Crespo | **CORREO:** ja.calero.2017@alumnos.urjc.es | **USUARIO:** 
3. **NOMBRE:** Manuel Abarca Crespo | **CORREO:** m.abarca.2018@alumnos.urjc.es | **USUARIO:** _dakeXd_
4. **NOMBRE:** Elena Pontijas Martín | **CORREO:** e.pontijas.2018@alumnos.urjc.es | **USUARIO:** _miniponti_

**Trello**: https://trello.com/b/f4JpxO8a


# GAME DESIGN DOCUMENT

### 1.- Introducción
#### 1.1.- Concepto principal
 NoodleTaker es un juego ambientado en el Japón actual. Un samurái repartidor de noodles está haciendo sus repartos cuando dos ninjas enemigos aparecen para robarle los pedidos y así quedarse ellos con el dinero. Estos dos ninjas compiten el uno contra el otro para llegar a la meta mientras al mismo tiempo escapan del samurái que los persigue para castigarlos.
  
#### 1.2.- Características principales
1. Jugabilidad sencilla: el planteamiento de NoodleTaker y sus mecánicas hace que sea sencillo de entender y jugar para cualquier público.
2. Competitividad: NoodleTaker pone a dos jugadores a probar sus habilidades de capacidad de reacción para así superar los obstáculos del juego y conseguir la victoria frente al otro.
3. Rejugabilidad: por su competitividad, su corta duración y la rivalidad que surge entre los jugadores tras jugar las partidas, el juego es altamente rejugable.
4. Dinamismo: la velocidad y los reflejos son un elemento muy importante en el juego, lo que genera dinámicas rápidas y precisas.
5. Número de jugadores: 2
6. Plataforma: PC

#### 1.3.- Género
Runner: el jugador se mueve constantemente por un mapa avanzando de manera horizontal mientras esquiva distintos obstáculos y recoge diversos objetos para ayudarle a avanzar.

#### 1.4.- Propósito y público específico
El principal propósito de NoodleTaker es conseguir que los jugadores vivan una  experiencia competitiva, pero divertida. Es un juego casual y como tal atraerá a personas de todas las edades que quieran pasar un buen rato con algún amigo, gracias al apartado multijugador. 

#### 1.5.- Licencia
___CC BY-NC-SA (Reconocimiento-NoComercial-CompartirIgual).___

Esta licencia permite a otras personas, mezclar, adaptar y construir a partir del proyecto no comercialmente, siempre que se nos acredite y se publique bajo la misma licencia.

### 2.- Mecánicas del juego
#### 2.1.- Tipo de cámara
__Cámara neutra__: La cámara toma una perspectiva lateral, perpendicular a la dirección en la que los jugadores se mueven (es decir, la cámara está apuntando hacia delante según la perspectiva del jugador y los personaje se mueven de izquierda a derecha). Se asemeja a las cámaras usadas para los videojuegos “Super Mario Bros” y “Hollow Knight” o de categoría “plataforma”. 

#### 2.2.- Controles
* Offline (desde un mismo ordenador)
	* Jugador 1 usa las teclas WASD
		* W = Saltar.
		* A = Moverse a la izquierda.
		* S = Agacharse.
		* D = Moverse a la derecha.
		* Barra Espaciadora = Atacar.
	* Jugador 2 usa las flechas
		* ↑ = Saltar.
		* ← = Moverse a la izquierda
		* ↓ = Agacharse.	
		* → = Moverse a la derecha.
		* Tecla Ctrl = Atacar.
* Online
	* W = Saltar
	* A = Moverse a la izquierda
	* S = Agacharse
	* D = Moverse a la derecha.
	* Barra Espaciadora = Atacar.

#### 2.3.- Puntuación
Solo existe una puntuación como tal en las fases de bonificación, donde se utilizará para definir qué jugador de los dos gana al otro y por tanto recibe la bonificación. Dicha fase ocurrirá a la mitad del nivel.
Sin embargo, se trata de una carrera hasta una meta, y el jugador que vaya por delante del otro es el que tiene el tazón de noodles

#### 2.4.- Jugabilidad
* **Movimiento de los jugadores**: la jugabilidad se basa en un espacio en dos dimensiones en el que se puede avanzar horizontalmente a la vez que verticalmente, creando un entorno similar al de los juegos plataformas.

* **Movimiento de la cámara**: La cámara del juego se mueve constantemente, hasta que uno de los jugadores llegue al final o pierda en medio de la partida (bien porque el samurái le atrapa o uno de los obstáculos le impide avanzar).

* **Obstáculos y peligros**: a medida que avanza la partida, van surgiendo distintos obstáculos que los jugadores deben esquivar para seguir adelante, como hoyos en el suelo o bloques que vienen por la parte derecha y deben saltar o agacharse para esquivarlos.

* **Atacar**: Los dos jugadores pueden atacarse entre sí, si se pulsa la correspondiente tecla de ataque y un jugador entre en contacto con el otro, el efecto del ataque es la ralentización de movimiento del otro jugador durante 1 segundo (aproximadamente, este valor está pendiente de pruebas).

#### 2.5.- Niveles
El sistema de niveles se basa en una secuencia de escenarios (el nivel es en ningún caso seleccionable) que se van sucediendo de la siguiente forma:

* Al principio del juego se plantea un nivel estándar en el que los jugadores deben esquivar los obstáculos hasta que uno de los jugadores pierda.

* Si ninguno de los jugadores ha perdido llegada la mitad de duración del  nivel se activará una fase de bonificación, en la que cualquiera de los jugadores puede conseguir una ventaja sobre el otro (por ejemplo, velocidad o paralizar al otro jugador 1 segundo).

* Una vez terminado el primer nivel, se accede al siguiente con una estética visual y posición de obstáculos diferente al anterior. 

* Cuando se hayan finalizado todos los niveles, se habrá acabado la partida y por tanto se mostrarán los resultados

* Esta sucesión de niveles entre plataformas y zona de bonificación constituye la tónica general del juego.

#### 2.6.- Condiciones de victoria
Es una partida al mejor de tres. Durante tres niveles (tres escenarios) los jugadores compiten, y el que logre sacar dos victorias primero gana la partida.
Un jugador sale victorioso de un nivel cuando:

* El otro jugador es capturado por el samurái que persigue a ambos (debido a la reducción de velocidad al no esquivar obstáculos con éxito o al ser atacada por el otro jugador).

* Uno de los jugadores falla al esquivar un obstáculo que conlleva una derrota instantánea (caer en un hueco en el suelo en el mapa por ejemplo).

* Consigue llegar al final del recorrido primero; al final de cada escenario hay una marca que indica la meta, el primero que la cruce se lleva la victoria del nivel

#### 2.7.- Intensidad
La intensidad viene marcada por el ritmo de la canción del propio nivel. Al principio el ritmo es lento, pero a medida que el juego progresa, aumenta y por tanto el escenario se desliza de derecha a izquierda cada vez más rápido, hasta que llegue al límite de máxima velocidad.

#### 2.8.- Obstáculos
Los obstáculos se dividen en varios grupos en función de la forma de esquivarlos:
* **Plataformas**: Las plataformas son el obstáculo más común del juego, aparecen por la derecha de la pantalla y van hacia el jugador de derecha a izquierda (siguiendo el autoscroll del nivel), son de diferentes tamaños y se esquivan saltando sobre ellas o yendo por debajo (si es posible).
* **Trampas en el suelo**: Zonas en el suelo en el que el terreno está infestado de “pinchos” que ralentizan al jugador. Se esquivan saltando sobre ellas en el momento correcto.
* **Huecos en el suelo**: Zonas en las que el suelo desaparece dejando un hueco vacío.Se pueden esquivar con un salto y si se cae un jugador, pierde automáticamente la partida.

#### 2.9.- Habilidades
Las distintas habilidades o Power Ups aparecen aleatoriamente por la parte derecha de la pantalla, y se activan automáticamente cuando uno de los jugadores entra en contacto con ellas:
* **Sumashu (Smash)**: si un jugador toca esta habilidad, en la pantalla se muestra un mensaje de emergencia y a continuación sale un personaje llamado Todo Mítico que le da un puñetazo al ninja controlado por el otro jugador y lo paralice durante, aproximadamente, 2 segundos (pendiente de pruebas).
* **Zaguárudo (The world)**: cuando un jugador obtiene esta habilidad, se muestra un mensaje de alerta

#### 2.10.- Recursos limitados
El único recurso limitado del juego es el bol de noodles que indica el jugador que va ganando.

#### 2.11.- Primeros minutos
Al arrancar el texto, y darle al botón de empezar, se muestra un pequeño tutorial para que los jugadores entiendan desde el principio cuál es su objetivo, cuáles son los controles para interactuar con el juego y cuáles son las condiciones de victoria y de derrota.

### 3.- Estados del juego
NoodleTaker consta de los siguientes estados:
	* **Menú de inicio:** es lo primero que ve el jugador al arrancar el juego. Consta de un botón, el cual si se pulsa y los dos jugadores están disponibles, comienza la 		partida.
	* **Partida empezada:** tras pulsar el botón de comienzo, los jugadores ya pueden comenzar a usar los controles.
	* **Menú de siguiente nivel:** aparece cuando se ha completado uno de los escenarios y en él se muestra la puntuación de cada jugador y un botón para pasar al siguiente 	escenario.
	* **Menú de fin de juego:** aparece cuando se han superado los tres niveles y ya hay un ganador decidido.
	
### 4.- Arte
#### 4.1.- Interfaz
* **Pantalla de inicio:** al arrancar el juego y antes de empezar a poder jugar, aparece un menú de inicio en el que hay un botón que pone “Comenzar”, el cual si se pulsa, los jugadores ya pueden jugar.
![](concept art/inicio.png)
* **Durante el juego:** una vez arranca la partida, el menú de inicio desaparece y en la pantalla aparece una barra de progresión de nivel. Esta se encuentra en la esquina superior izquierda de la pantalla e indica a los jugadores lo que llevan recorrido de nivel y cuánto les falta para terminar. Comienza siendo un rectángulo vacío, pero que cuanto más avanza más se va llenando. Cuando está totalmente llena significa que se ha llegado al final.

* **Pantalla de fin de juego:** aparece cuando se han superado los 3 niveles. En esta parte hay un botón que dice “Revancha”, lo cual significa que si los dos jugadores siguen disponible, vuelven a empezar una nueva partida y deben recorrer los tres niveles de nuevo con las puntuaciones al estado inicial (cero puntos cada uno).
Pantalla de nivel completado: sale cuando se ha completado el nivel, bien sea porque un jugador ha llegado al final de la meta o bien porque los obstáculos le hayan impedido seguir jugando. Cuando esto ocurra, aparecen las puntuaciones de los jugadores (según los escenarios que hayan completado cada uno), un botón para avanzar al siguiente escenario y otro botón que permite a los jugadores abandonar la partida.

#### 4.2.- Personajes
* Jugables
	* Ninja 1
	* Ninja 2
* No jugables
	* Samurai
	* El Todo Mítico
	* Dionisio
	
#### 4.3.- Objetos
Se basan en objetos que aparecen a lo largo del escenario de manera “semialeatoria” (tendrán unas posiciones determinadas en las que podrán o no aparecer), son de un solo uso y se utilizan en el momento en el que un jugador entra en contacto con la imagen que representa al objeto, afectando al otro jugador (si son perjudiciales) o al jugador que los obtiene (si son beneficiosos) . 
Debido a que los objetos que se han diseñado se basan en un sistema de “invocaciones” a ayudantes, estos se mostrarán en pantalla para ambos jugadores antes de hacer efecto en el mismo. De esta forma el jugador que es afectado se puede preparar ante el ataque inminente según el tipo de objeto que haya obtenido el rival.

#### 4.4.- Escenarios
Se pretende hacer como mínimo dos escenarios que estén basados en diferentes sitios de Japón, un pueblo típico japonés (barrio residencial) de día y una gran ciudad de noche, por donde el samurái perseguirá a los dos ninjas para recuperar su amado tazón de noodles. Se ha decidido hacer estos dos estilos tan opuestos para dar un poco de colorido y variabilidad al juego visualmente ya que aunque las mecánicas sean simples es favorable que se vea como algo más intenso de lo que a priori pueda parecer.

* **Fondos** Los fondos serán dinámicos conforme el nivel avance, pero no serán acordes a la aparición de las plataformas a lo largo del nivel (parallax mapping).
	
* **Plataformas** Las plataformas irán apareciendo por la parte derecha del nivel y se moverán hacia la izquierda conforme los personajes se muevan por el escenario. Estas quedarán acordes al tema del escenario y se diferenciarán bien las partes tangibles en las que el jugador puede posicionarse y las que no.

### 5.- Marketing
Se irán publicando los avances en el juego a través de las diferentes redes sociales creadas para este. 

Dependiendo de la popularidad que este adquiera a través de ella procederemos a dos planes, el primero es si él juego no adquiere una popularidad relevante será anunciar su publicación una vez llegue el momento, seguramente con algún incentivo para favorecer su extensión por redes sociales, y será publicado gratuitamente en plataformas de juegos indies como “Itch.io”, con opción a donaciones.

Como segundo plan y si él juego adquiere cierta popularidad, se realizará un kickstarter en él que se intentará alcanzar los 100 euros que se requiere para publicarlos en steam, utilizando una campaña de publicidad más agresiva en redes sociales.

### 6.- Planes para el futuro

*  **Nuevas habilidades:**
	* **Una floripondia (Une fleur)**: sale “Nico nico ni”y aparece una mano que frena al otro ninja
	* **La tarada (Yuno Gasai)**: aparece por detrás y se lleva al ninja a vete tú a saber para qué
	* **Nuru-nuru-nuru-nuru (Koro-Sensei)**: Aparece “Kokoro-Sensei” y ralentiza con un tentáculo.
* Adaptar y lanzar NoodleTaker para dispositivos móviles (Android y iOS).
