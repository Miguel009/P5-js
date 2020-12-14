/*variable general*/
var wave, button, isPlaying=true, slider;
var env;
function setup() {
    createCanvas(100,100);
    /*COn esta funcion estamos viendo como funciona la frecucnecia del sonido */
    wave = new p5.Oscillator();
    env  = new p5.Env();

    env.setADSR(0.5, 1, 0.7, 0.5);
    env.setRange(1, 0);

    /*aqui lo que decimos es que queremos que tenga una forma senoidal */
    wave.setType('sine');
    wave.start();
    wave.amp(env);
    wave.freq(200);
    button = createButton("Sonar/Pausar");
    slider = createSlider(100, 1200, 440);
    button.mousePressed(toggle);

}
function draw() {
    if (!isPlaying) {
        background(125, 0, 0);
        env.setADSR(0.5, 1, 0.7, 0.5);

    }else
    {
        background(0);
    }

}

function toggle(){
    env.play();
    /*aqui inicializamos el osilador con una frecuencia de 440 y una amplitud de 0.3 */
    if (isPlaying) {
        isPlaying = false;
        wave.start();
    }
    else
    {
        //aqui detenemos el osilador 
     isPlaying = true;
     wave.stop();
    }

}