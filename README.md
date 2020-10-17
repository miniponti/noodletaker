# Noodletaker
La temática del juego es "Japón moderno mezclado con figuras del Japón antiguo"

**Integrantes del grupo**:
1. Ismael Jiménez Martínez · i.jimenezm.2018@alumnos.urjc.es · _gossipxbabylon_
2. Juan Antonio Calero Crespo · ja.calero.2017@alumnos.urjc.es · 
3. Manuel Abarca Crespo · m.abarca.2018@alumnos.urjc.es · _dakeXd_
4. Elena Pontijas Martín · e.pontijas.2018@alumnos.urjc.es · _miniponti_

**Trello**: https://trello.com/b/f4JpxO8a


# GAME DESIGN DOCUMENT

### 1.- Introducción
#### 1.- Concepto principal
 NoodleTaker es un juego ambientado en el Japón actual. Un samurái repartidor de noodles está haciendo sus repartos cuando dos ninjas enemigos aparecen para robarle los pedidos y así quedarse ellos con el dinero. Estos dos ninjas compiten el uno contra el otro para llegar a la meta mientras al mismo tiempo escapan del samurái que los persigue para castigarlos.
  
  2. Características principales
  	1. Jugabilidad sencilla: el planteamiento de NoodleTaker y sus mecánicas hace que sea sencillo de entender y jugar para cualquier público.
    	2. Competitividad: NoodleTaker pone a dos jugadores a probar sus habilidades de capacidad de reacción para así superar los obstáculos del juego y conseguir la victoria frente al otro.
    	3. Rejugabilidad: por su competitividad, su corta duración y la rivalidad que surge entre los jugadores tras jugar las partidas, el juego es altamente rejugable.
    	4. Dinamismo: la velocidad y los reflejos son un elemento muy importante en el juego, lo que genera dinámicas rápidas y precisas.
    	5. Número de jugadores: 2
    	6. No se implementa un sistema de guardado y carga.

Género
Runner: el jugador se mueve constantemente por un mapa avanzando de manera horizontal mientras esquiva distintos obstáculos y recoge diversos objetos para ayudarle a avanzar.

Propósito y público específico
El principal propósito de NoodleTaker es conseguir que los jugadores vivan una  experiencia competitiva, pero divertida. Es un juego casual y como tal atraerá a personas de todas las edades que quieran pasar un buen rato con algún amigo, gracias al apartado multijugador. 
Plataforma 
PC (Windows, Mac, Linux).
Licencia
	CC BY-NC-SA (Reconocimiento-NoComercial-CompartirIgual).
Esta licencia permite a otras personas, mezclar, adaptar y construir a partir del proyecto no comercialmente, siempre que se nos acredite y se publique bajo la misma licencia.
Mecánicas del juego
Tipo de cámara
Cámara neutra: La cámara toma una perspectiva lateral, perpendicular a la dirección en la que los jugadores se mueven (es decir, la cámara está apuntando hacia delante según la perspectiva del jugador y los personaje se mueven de izquierda a derecha). Se asemeja a las cámaras usadas para los videojuegos “Super Mario Bros” y “Hollow Knight” o de categoría “plataforma”. 
Controles
Offline (desde un mismo ordenador)
Jugador 1 usa las teclas WASD
W = Saltar.
A = Moverse a la izquierda.
S = Agacharse.
D = Moverse a la derecha.
Barra Espaciadora = Atacar.
Jugador 2 usa las flechas
↑ = Saltar.
← = Moverse a la izquierda
↓ = Agacharse.
→ = Moverse a la derecha.
Tecla Ctrl = Atacar.
Online
W = Saltar
A = Moverse a la izquierda
S = Agacharse
D = Moverse a la derecha.
Barra Espaciadora = Atacar.

Puntuación
Solo existe una puntuación como tal en las fases de bonificación, donde se utilizará para definir qué jugador de los dos gana al otro y por tanto recibe la bonificación.
Sin embargo, se trata de una carrera hasta una meta, y el jugador que vaya por delante del otro es el que tiene el tazón de noodles.
Jugabilidad
Movimiento de los jugadores: la jugabilidad se basa en un espacio en dos dimensiones en el que se puede avanzar horizontalmente a la vez que verticalmente, creando un entorno similar al de los juegos plataformas.

Movimiento de la cámara: La cámara del juego se mueve constantemente, hasta que uno de los jugadores llegue al final o pierda en medio de la partida (bien porque el samurái le atrapa o uno de los obstáculos le impide avanzar).

Obstáculos y peligros: a medida que avanza la partida, van surgiendo distintos obstáculos que los jugadores deben esquivar para seguir adelante, como hoyos en el suelo o bloques que vienen por la parte derecha y deben saltar o agacharse para esquivarlos.

Atacar: Los dos jugadores pueden atacarse entre sí, si se pulsa la correspondiente tecla de ataque y un jugador entre en contacto con el otro, el efecto del ataque es la ralentización de movimiento del otro jugador durante 1 segundo (aproximadamente, este valor está pendiente de pruebas).

Niveles
El sistema de niveles se basa en una secuencia de escenarios (el nivel es en ningún caso seleccionable) que se van sucediendo de la siguiente forma. Al principio del juego se plantea un nivel estándar en el que los jugadores deben esquivar los obstáculos al ritmo de la música hasta que uno de los jugadores pierda o dicha canción se acabe, si esto ocurre sin que ninguno de los jugadores haya perdido se activará una fase de bonificación, en la que cualquiera de los jugadores puede conseguir una ventaja sobre el otro, tras finalizar la fase de bonificación se accede al nivel dos, con una estética visual y canción diferente a la del nivel uno y dificultad creciente con respecto al nivel anterior. Esta sucesión de niveles entre nivel de plataformas y nivel de bonificación constituye la tónica general del juego.
Condiciones de victoria
Un jugador saldrá victorioso del juego cuando el otro jugador sea capturado por el samurái que persigue a ambos (debido a la reducción de velocidad al no esquivar obstáculos con éxito o al ser atacada por el otro jugador) o bien cuando uno de los jugadores falle al esquivar un obstáculo que conlleve una derrota instantánea (caer en un hueco en el suelo en el mapa por ejemplo).
Intensidad
La intensidad viene marcada por el ritmo de la canción del propio nivel. Al principio el ritmo es lento, pero a medida que el juego progresa, aumenta y por tanto el escenario se deslizará de derecha a izquierda cada vez más rápido, hasta que llegue al límite de máxima velocidad.
Obstáculos
Los obstáculos se dividen en varios grupos en función de la forma de esquivarlos:
Plataformas: Las plataformas son el obstáculo más común del juego, aparecen por la derecha de la pantalla y van hacia el jugador de derecha a izquierda (siguiendo el autoscroll del nivel), son de diferentes tamaños y se esquivan saltando sobre ellas o yendo por debajo (si es posible).
Trampas en el suelo: Zonas en el suelo en el que el terreno está infestado de “pinchos” que ralentizan al jugador. Se esquivan saltando sobre ellas en el momento correcto.
Huecos en el suelo: Zonas en las que el suelo desaparece dejando un hueco vacío.Se pueden esquivar con un salto y si se cae un jugador, pierde automáticamente la partida.

Habilidades
Las distintas habilidades o Power Ups aparecen aleatoriamente por la parte derecha de la pantalla, y se activan automáticamente cuando uno de los jugadores entra en contacto con ellas.
Sumashu (Smash): si un jugador toca esta habilidad, en la pantalla se muestra un mensaje de emergencia y a continuación sale un personaje llamado Todo Mítico que le da un puñetazo al ninja controlado por el otro jugador y lo paralice durante, aproximadamente, 2 segundos (pendiente de pruebas).
Zaguárudo (The world): cuando un jugador obtiene esta habilidad, se muestra un mensaje de alerta
Recursos limitados
El único recurso limitado del juego es el bol de noodles que indica el jugador que va ganando.

Primeros minutos


Estados del juego

Arte
Interfaz

Personajes
Jugables
Ninja 1
Ninja 2
No jugables
Samurai
El Todo Mítico
Dionisio
Objetos

Escenarios
Fondos
Plataformas


Aspectos técnicos del juego

Marketing
Se irán publicando los avances en el juego a través de las diferentes redes sociales creadas para este. 

Dependiendo de la popularidad que este adquiera a través de ella procederemos a dos planes, el primero es si él juego no adquiere una popularidad relevante será anunciar su publicación una vez llegue el momento, seguramente con algún incentivo para favorecer su extensión por redes sociales, y será publicado gratuitamente en plataformas de juegos indies como “Itch.io”, con opción a donaciones.

Como segundo plan y si él juego adquiere cierta popularidad, se realizará un kickstarter en él que se intentará alcanzar los 100 euros que se requiere para publicarlos en steam, utilizando una campaña de publicidad más agresiva en redes sociales.

Planes para el futuro


Una floripondia (Une fleur): sale “Nico nico ni”y aparece una mano que frena al otro ninja
La tarada (Yuno Gasai): aparece por detrás y se lleva al ninja a vete tú a saber para qué
Nuru-nuru-nuru-nuru (Koro-Sensei): Aparece “Kokoro-Sensei” y ralentiza con un tentáculo.
