/*variable general*/
var bubble;
var bubble2;
var bubble3;
var bubble4;
function setup() {
    createCanvas(window.innerWidth,window.innerHeight);
    angleMode(DEGREES);
    /*bubble = new bubbles(50);
    bubble2 = new bubbles(45);
    bubble3 = new bubbles(40);
    bubble4 = new bubbles(35);*/
    bubble = new bubbles(40);
    bubble2 = new bubbles(40);
    bubble3 = new bubbles(40);
    bubble4 = new bubbles(40);
}
function draw() {
    /*translate usado para el uso de movimiento rrueda y para el movimiento seno */
    translate(width/2, height/2);
    background(51)
    /*bubble4.dibujo('rgb(52,168,83)')
    bubble4.movimientoSeno(2.5)
    bubble3.dibujo('rgb(251,188,5)')
    bubble3.movimientoSeno(3)
    bubble2.dibujo('rgb(66,133,244)')
    bubble2.movimientoSeno(3.5)
    bubble.dibujo('rgb(234,67,53)')
    bubble.movimientoSeno(4)*/
    bubble4.dibujo('rgb(52,168,83)')
    bubble4.movimientoRueda(100, 0)
    bubble3.dibujo('rgb(251,188,5)')
    bubble3.movimientoRueda(150, 1)
    bubble2.dibujo('rgb(66,133,244)')
    bubble2.movimientoRueda(200, 1.5)
    bubble.dibujo('rgb(234,67,53)')
    bubble.movimientoRueda(250, 2)

    /*bubble3.dibujo('#d0e8f2')
    bubble3.movimientoX(1)
    bubble2.dibujo('#79a3b1')
    bubble2.movimientoNY(1)
    bubble.dibujo('#456268')
    bubble.movimientoNX(1)*/



}


class bubbles  {
    constructor(radio, dista)
    {
        this.defaultR = radio;
        this.radio = radio;
        this.dista = 1;
        //Posicion para iniciar el mov seno y mov rueda
        this.posy=0;
        this.posx=0;
        //Posicion para el de movimiento normal
        /*this.posy=innerHeight;
        this.posx=radio;*/
        /*this.posy = innerHeight/2;
        this.posx = innerWidth/2*/
        this.velocidadX = 1;
        this.velocidadY = 1;
        console.log(this.posy+";: "+innerHeight/2)
    }

    dibujo(color) {
        noStroke()
        fill(color)
        ellipse(this.posx, this.posy, this.radio)
    }
    movimientoSeno(velocidad)
    {
        this.posx = this.posx+(velocidad*this.velocidadX);
        this.posy = Math.floor(100*sin(this.posx));
        if(bubble.posx<-innerWidth/2 || bubble.posx > innerWidth/2 ){
            this.velocidadX *= -1;
            this.posx=bubble.posx;
            this.posy=bubble.posy;
        }
    }

    movimiento(velocidad){
        this.posx = this.posx+(velocidad*this.velocidadX);
        this.posy = this.posy-(velocidad*this.velocidadY);
        if(this.posx<this.radio || this.posx > 200 ){
            this.velocidadX *= -1;
        }
        if(this.posy<0 || this.posy > innerHeight ){
            this.velocidadY *= -1;
            this.posx= this.radio;
            this.posy = innerHeight;
        }
    }
    movimientoY(velocidad){
        this.posy = this.posy-(velocidad*this.velocidadY);
        if(Math.floor(this.posy)%100==0)
        {
            this.radio *=1.3
        }
        if(this.posy<100.5|| this.posy > innerHeight/2 ){
            this.posy=innerHeight/2;
            this.radio = this.defaultR;
        }
    }
    movimientoX(velocidad){
        this.posx = this.posx+(velocidad*this.velocidadX);
        if(Math.floor(this.posx)%100==0)
        {
            this.radio *=1.3
        }
        if(this.posx<innerWidth/2|| this.posx > innerWidth-100 ){
            this.posx=innerWidth/2;
            this.radio = this.defaultR;
        }
    }
    movimientoNY(velocidad){
        this.posy = this.posy+(velocidad*this.velocidadY);
        if(Math.ceil(this.posy)%100==0)
        {
            this.radio *=1.3
        }
        if(this.posy<innerHeight/2|| this.posy > innerHeight-100 ){
            this.posy=innerHeight/2;
            this.radio = this.defaultR;
        }
    }
    movimientoNX(velocidad){
        this.posx = this.posx-(velocidad*this.velocidadX);
        if(Math.floor(this.posx)%100==0)
        {
            this.radio *=1.3
        }
        if(this.posx<100|| this.posx > innerWidth/2 ){
            this.posx=innerWidth/2;
            this.radio = this.defaultR;
        }
    }
    movimientoRueda(radio, vel){
        if(vel!=0)
        {
            this.posx = radio*cos(this.dista*vel);
            this.posy = radio*sin(this.dista*vel);
            if(this.posx<0 )
            {
                this.dista+=0.75;
            }
            else
            {
                this.dista+=1;
            }
        }
    }

}