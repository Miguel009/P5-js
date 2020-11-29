/*variable general*/
var song;
var wave;
var sliderVolume;
var SliderRate;
var SliderPan;
var button, button2, buttonSalto;
var fft;
var frecuencias=[];
var w;

function setup() {
    createCanvas(400, 400);
    colorMode(HSB);
	/*se carga la cancion  creamos una funcion de slider para controlar el volumen*/
	//song = loadSound("music/Trueno.mp3", load) esto se hace cuando se sabe que esta cargada la pista manda a llamar una funcion la cual en este caso carga la cancion;
    song = loadSound("music/wrld.mp3", cargado);
    /*se esta utilizando una funcion de p5 que nos permite ver las frecuencias de un audio y se le puede dar parametros como smoth que va del 0 a 0.9 que hace una media de los datos
    y el otro numero es la cantidad de detalle que deseamos en lineas por asi decirlo */
    fft = new p5.FFT(0.7, 32);
    /*definimos donde van a estar separadas las lineas en nuestro dibujho en la clase draw */
    w=width/32;
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
	background(0);
	/*aqui lo que nos permite es ver el tiempo en el que se esta*/
	//background(song.currentTime()*10, 0, 255);
	if (song.isPlaying()) {
		song.setVolume(sliderVolume.value());
		/*FUNCION QUE MANEJA EL LADO ADONDE SE ESCUCHA MAS*/
		song.pan(SliderPan.value());
		/*FUNCION QUE MANEJA SI VA MAS RAPIDO O MAS LENTO*/
		song.rate(SliderRate.value());
        /*En este pedazo de codigo lo que estamos haciendo es agarrar las Frecuencias y luego se colocan en pequqeños rectangulos con un espaciado de 2 pixeles el valor tambien esta entre 0 y 256
        el de la frecuencia del sonido es por eso que el map esta de esa manera */
        var spectro = fft.analyze();
		for (let i = 0; i < spectro.length; i++) {
            var amplit = spectro[i];
            var y = map(amplit, 0, 256, height, 0);
            fill(32-i, 255, 255);
            rect(i*w, y, w-2, height-y);
            
        }

	}
	/*Aqui lo que estamos haciendo es ver la amplitud de la onda que genera el sonido de la cancion y con diame lo que vamos a hacer es mapearla como sabemos que el sonido va de 0 a 1 entonces
	van a ser valores entre 10 y 200 */
	//var diame = map(vol, 0, 1, 10, 200);
}