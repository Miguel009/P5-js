/*variable general*/
var wave, button, isPlaying=true, slider;
var env;
function setup() {
    createCanvas(100,100);
    /*COn esta funcion estamos viendo como funciona la frecucnecia del sonido */
    wave = new p5.Oscillator();
    env  = new p5.Env();

    env.setADSR(0.5, 0.25, 0.5, 0.1);
    env.setRange(0.8, 0);

    /*aqui lo que decimos es que queremos que tenga una forma senoidal */
    wave.setType('sine');
    wave.start();
    wave.amp(env);
    wave.freq(440);
    button = createButton("Sonar/Pausar");
    slider = createSlider(100, 1200, 440);
    button.mousePressed(toggle);

}
function draw() {
    if (!isPlaying) {
        background(125, 0, 0);
        //wave.freq(slider.value());

    }else
    {
        background(0);
    }

}

function toggle(){
    env.play();
    /*aqui inicializamos el osilador con una frecuencia de 440 y una amplitud de 0.3 */
   /* if (isPlaying) {
        isPlaying = false;
        wave.start();
        wave.amp(0.3);
        wave.freq(440);
    }
    else
    {
        aqui detenemos el osilador 
     isPlaying = true;
     wave.stop();
    }*/

}