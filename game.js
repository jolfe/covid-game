let spr;
let storedVelocity = 5;
let obs;
let obsArr = [];
let timeout;
let restart;
let count = 0;
let lanes = [];

function preload() {
  font = loadFont("OptimusPrinceps.ttf");
  // img = loadImage('rat.png');
  // bg = loadImage('bg.png');
  // pipe = loadImage('pipe.png');
  // snake = loadImage('snake.png');
}

function setup() {
  createCanvas(800, 500);
  spr = createSprite(width / 4, height - 20, 40, 40);
  spr.shapeColor = color(255);
  textSize(50);
  textFont(font);
  score();
}

function draw() {
  background("GRAY");
  drawSprites();
  checkCollision();
  drawWords(20, height - 20, count, "white");
  if (spr.position.y < 25) {
    spr.velocity.y = 0;
  } else if (spr.position.y > 275) {
    spr.velocity.y = 0;
  }
}

function mousePressed() {
  window.location.reload();
}

function keyPressed() {
  generateSprites();
  console.log(spr.position.y);
  if ((key = " ")) {
    if (spr.velocity.y == 0 && spr.position.y < 40) {
      spr.velocity.y = 5;
    } else if (spr.velocity.y == 0 && spr.position.y <= 280) {
      spr.velocity.y = -5;
    } else {
      spr.velocity.y = -spr.velocity.y;
    }
  }
}

function explosion(spr, obs) {
  obsArr = [];
  drawWords(width / 2 - 120, height / 2, "YOU DIED", "red");
  textSize(25);
  restart = drawWords(width / 2 - 55, height / 2 + 35, "Play again", "red");
  noLoop();
}

function generateSprites(xSprite, ySprite) {
  if (randomX(1, 15) > 7) {
    xSprite = createSprite(width - 20, height - 20, 40, 40);
    xSprite.velocity.x = -5;
    xSprite.shapeColor = "red";
    obsArr.push(xSprite);
    console.log(obsArr);
  }

  randomX(1200, 8000);
  setTimeout(function () {
    ySprite = createSprite(width - 20, 20, 40, 40);
    ySprite.velocity.x = -5;
    ySprite.shapeColor = "red";
    obsArr.push(ySprite);
  }, timeout);
}

function checkCollision() {
  obsArr.forEach(function (obs) {
    obs.collide(spr, explosion);
  });
}

function randomX(min, max) {
  timeout = Math.random() * (max - min) + min;
  console.log(timeout);
  return timeout;
}

function drawWords(x, y, string, color) {
  fill(color);
  x = text(string, x, y);
}

function score() {
  window.setInterval(function () {
    count++;
  }, 1000);
}

function chooseLane(arr) {}
