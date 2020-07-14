let count = 0;
let y = 900 / 2;
let x = 500 / 2;
let player;
let speed = 8;
let germs = [];
let lanes = [];
let playing;
let lane;

function preload() {
  font = loadFont("OptimusPrinceps.ttf");
}

function setup() {
  playing = true;
  createCanvas(800, 500);
  textSize(50);
  textFont(font);
  player = createSprite(x, y, 50, 50);
  player.shapeColor = color("green");
  generateLanes();
  generateGerms();
  //   score();
}

function draw() {
  background(220);
  fill("red");
  checkCollision();
  drawSprites();
  checkBounds();
  updateScore();
}

function keyPressed() {
  if (keyIsDown(UP_ARROW)) {
    player.velocity.y = -speed;
  } else if (keyIsDown(DOWN_ARROW)) {
    player.velocity.y = speed;
  }
  if (keyIsDown(LEFT_ARROW)) {
    player.velocity.x = -speed;
  } else if (keyIsDown(RIGHT_ARROW)) {
    player.velocity.x = speed;
  }
  return false; // prevent any default behavior
}

function keyReleased() {
  if (keyIsDown(UP_ARROW) || keyIsDown(DOWN_ARROW)) {
    player.velocity.x = 0;
    return;
  } else if (keyIsDown(LEFT_ARROW) || keyIsDown(RIGHT_ARROW)) {
    player.velocity.y = 0;
    return;
  } else {
    player.velocity.y = 0;
    player.velocity.x = 0;
  }
  return false; // prevent any default behavior
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

function generateLanes() {
  lane = 25;
  for (i = 0; i < 10; i++) {
    lanes[i] = createSprite(775, lane, 50, 50);
    lanes[i].shapeColor = "white";
    lane += 50;
    lanes[i] = lane;
  }
  console.log(lanes);
}

function generateGerms() {
  setInterval(function () {
    let chosen = Math.round(Math.random() * (10 - -1) + -1);
    console.log(Math.round(chosen));
    enemy = createSprite(775, lanes[chosen], 50, 50);
    enemy.velocity.x = -2;
    enemy.shapeColor = "white";
    germs.push(enemy);
    count++;
  }, 800);
}

function checkCollision() {
  germs.forEach(function (germ) {
    germ.collide(player, explosion);
  });
}

function explosion(spr, obs) {
  lanes = [];
  drawWords(width / 2 - 120, height / 2, "YOU DIED", "red");
  textSize(25);
  restart = drawWords(width / 2 - 55, height / 2 + 35, "Play again", "red");
  noLoop();
}

function checkBounds() {
  if (player.position.x < 25) {
    player.position.x = 25;
  } else if (player.position.x > 775) {
    player.position.x = 755;
  } else if (player.position.y < 25) {
    player.position.y = 25;
  } else if (player.position.y > 475) {
    player.position.y = 475;
  }
}

function updateScore() {
  drawWords(20, height - 20, count, "black");
}
