let particu =[];
let button, button2;
let si=true;
// The statements in the setup() function
// execute once when the program begins
function setup() {
  // createCanvas must be the first statement
  createCanvas(window.innerWidth, window.innerHeight);
  const partciu = Math.floor(window.innerWidth/10)
  button = document.getElementById('boton')
  button.onclick = InitPaus;
  for (let i = 0; i < partciu; i++) {

       particu.push(new Particula);
  }
}

function draw() {
    background(52);


    particu.forEach((p, index) => {
        if (si) {
            p.actu();
        }
        p.dibujo();
        p.conexion(particu.slice(index))
    });
}

function InitPaus (){
    if (si) {
        si=false;
        button.textContent="▶️"
    }
    else
    {
        si=true;
        button.textContent="⏸️"
    }
}

class Particula{
    constructor(){
        this.pos = createVector(random(width),random(height));
        this.size = 10;
        this.vel = createVector(random(-0.5, 0.5), random(-0.5, 0.8))
    }

    dibujo(){
        fill('rgba(241, 48, 48, 0.5)')
        noStroke()
        circle(this.pos.x, this.pos.y, this.size)
    }

    actu(){
        this.pos.add(this.vel)
        this.filo();
    }

    filo(){
        if (this.pos.x<0 || this.pos.x>width) {
            this.vel.x *=-1;
        }
        if (this.pos.y<0 || this.pos.y>height) {
            this.vel.y *=-1;
        }
    }

    conexion(particula){
        particula.forEach(particu =>{
            const d = dist( this.pos.x, this.pos.y, particu.pos.x, particu.pos.y)
            if (d<120) {
                stroke(241, 48, 48)
                line(this.pos.x, this.pos.y, particu.pos.x, particu.pos.y)
            }
        })
    }
}