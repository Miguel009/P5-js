/*variable general*/
var song;
var wave;
var sliderVolume;
var SliderRate;
var SliderPan;
var button, button2, buttonSalto;
var amplitud;
var frecuencias=[];

function setup() {
	createCanvas(500, 500);
	/*se carga la cancion  creamos una funcion de slider para controlar el volumen*/
	//song = loadSound("music/Trueno.mp3", load) esto se hace cuando se sabe que esta cargada la pista manda a llamar una funcion la cual en este caso carga la cancion;
	song = loadSound("music/NF.mp3", cargado);
	amplitud = new p5.Amplitude();
	//Aqui le decimos que queremos trabajar los angulos como radianes
	angleMode(DEGREES);

}

function cargado(){
	button = createButton("Reproducir");
	button2 = createButton("Parar");
	buttonSalto = createButton("Saltar");
	button.mousePressed(cambioEstado);
	button2.mousePressed(parar);
	buttonSalto.mousePressed(jumpSong);
	/*numero que esta entre 0 y 1*/
	sliderVolume = createSlider(0, 1, 0.5, 0.01);
	//velocidad de loa cancion
	SliderRate= createSlider(0, 3, 1, 0.01);
	/*maneja a que direccion se escucha mas la cancion*/
	SliderPan = createSlider(-1, 1, 0, 0.01);
	/*con esta funcion podemos añadir una funcion a una cantidad especifica de tiempo que lleve la cancion */
	song.addCue(5, changeBack);
}
/*Aqui estamos llamando a la funcion que va a hacer que pare la cancion para que cuando se reprodusca empiece desde el incio y esa es la diferencia con pause ya que esta la deja en donde se quedo
y stop la detiene completamente */
function parar(){
	button.html("Reproducir");
	song.stop();
}

function changeBack(){
	background(255,0,0);
}

function cambioEstado(){
	/*Is Playing nos permite verificar si la cancion esta sonando o no y lo que hacemos es que al boton que le damos play entonce cambie texto a pausar si esta sonando y  sino pues utilizando 
	la funcion pause lo que hacemos es pausar la cancion y se coloca el texto reproducir*/
	if (!song.isPlaying()) {
		song.play();
		button.html("Pausar");
	}
	else
	{
		song.pause();
		button.html("Reproducir");
	}
}

function jumpSong(){
	/*devuelve la duracion de la cancion en segundos*/
	var len = song.duration();
	song.jump(len/2);
}
function draw() {
	background(51);
	/*aqui lo que nos permite es ver el tiempo en el que se esta*/
	//background(song.currentTime()*10, 0, 255);
	if (song.isPlaying()) {
		song.setVolume(sliderVolume.value());
		/*FUNCION QUE MANEJA EL LADO ADONDE SE ESCUCHA MAS*/
		song.pan(SliderPan.value());
		/*FUNCION QUE MANEJA SI VA MAS RAPIDO O MAS LENTO*/
		song.rate(SliderRate.value());

		
		/*En este pedazo de codigo lo que estamos haciendo es agarrar la amplitud del sonido y que luego esta se muestre en forma de una graficia bien sencilla */
		var vol = amplitud.getLevel();
		frecuencias.push(vol);
		stroke(255);
		noFill();
		translate(width/2, height/2);
		beginShape();
		for (let i = 0; i < frecuencias.length; i++) {
			var r=map(frecuencias[i], 0, 1, 10, 400);
			var x = r * cos(i);
			var y = r*sin(i); 
			vertex(x, y);
		}
		/*for (let i = 0; i < frecuencias.length; i++) {
			var y = map(frecuencias[i], 0, 1, height, 0);
			vertex(i, y);
			
		}*/
		endShape();
		/*aqui decimos que si el lenght de frecuencia aumenta entonces vamos a quitar uno y seguir adelante*/
		if (frecuencias.length>360) {
			frecuencias.splice(0,1);
		}
	}
	/*Aqui lo que estamos haciendo es ver la amplitud de la onda que genera el sonido de la cancion y con diame lo que vamos a hacer es mapearla como sabemos que el sonido va de 0 a 1 entonces
	van a ser valores entre 10 y 200 */
	//var diame = map(vol, 0, 1, 10, 200);
}