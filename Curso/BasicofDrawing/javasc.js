let y = 100;

// The statements in the setup() function
// execute once when the program begins
function setup() {
  // createCanvas must be the first statement
  createCanvas(400, 400);
}

function draw() {
  /* x, y, widht, height*/
  rect(150, 150, 75, 150);
  circle(187.5, 112, 75);
  fill(179, 50, 68);
  quad(100, 251, 86, 20, 69, 63, 30, 76);
}