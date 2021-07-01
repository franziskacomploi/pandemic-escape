// Start Screen

document.querySelector(".startButton").addEventListener("click", () => {
  document.getElementById("home").classList.add("hidden");
  document.getElementById("infoOne").classList.remove("hidden");
});

// Info Screen One

document.querySelector(".infoOneButton").addEventListener("click", () => {
  document.getElementById("infoOne").classList.add("hidden");
  document.getElementById("levelOne").classList.remove("hidden");
  gameFrames = 0;
  timerRunOut = 1;
  lives = 3;
  counterCount = 0;

  player.resetPlayer(0,240);

  startLevelOne();
});

// Game Over Screen

document.querySelector(".gameOverButton").addEventListener("click", () => {
  document.getElementById("gameOver").classList.add("hidden");
  document.getElementById("home").classList.remove("hidden");
});

// Lives Function
function switchToGameOver() {
  document.getElementById("levelOne").classList.add("hidden");
  document.getElementById("gameOver").classList.remove("hidden");
  timerRunOut = 0;
}

function initializeLives(lives, livesDiv) {
  const heartsArr = [];
  for (let i = 1; i <= lives; i++) {
    heartsArr.push(`<img class="heartImg" src="./images/heart.png"></img>`);
  }
  let hearts = heartsArr.join(" ");
  livesDiv.innerHTML = `You have ${hearts} left.`;
  if (heartsArr.length == 0) {
    switchToGameOver();
  }
}

function updateLives() {
  lives--;
}

// Timer Function
function switchToInfoTwo() {
  document.getElementById("levelOne").classList.add("hidden");
  document.getElementById("infoTwo").classList.remove("hidden");
}
function switchToWin() {
  document.getElementById("levelTwo").classList.add("hidden");
  document.getElementById("win").classList.remove("hidden");
}

function initializeTimer(count, timerDiv, level) {
  let timerCount = count;
  timerDiv.innerHTML = `${timerCount} seconds left`;
  const intervalId = setInterval(() => {
    timerCount--;
    timerDiv.innerHTML = `${timerCount} seconds left`;
    if (timerCount == 0) {
      clearInterval(intervalId);
      timerDiv.innerHTML = `Time has run out!`;

      if (!document.getElementById("levelOne").classList.contains("hidden")) {
        timerRunOut = 0;
        setTimeout(switchToInfoTwo, 4000);
      } else if (!document.getElementById("levelTwo").classList.contains("hidden")) {
        setTimeout(switchToWin, 4000);
      }
    }
  }, 1000);
  return timerCount;
}

function startTimer(count, timerDiv) {
  timerDiv.innerHTML = `You start at ${count} seconds.`;
}

// Timer Run Out

function timeRunOut(interval) {
  if (timerRunOut == 0) {
    clearInterval(interval);
  }
}

// Counter Function

function initializeCounter(count, counterDiv) {
  counterDiv.innerHTML = `You have: ${count} points.`;
}

function updateCounter() {
  counterCount++;
}

// Test Position of Player and Obstacle

let intersect = (obj1, obj2) => {
  let obj1left = obj1.x;
  let obj1top = obj1.y;
  let obj1right = obj1.x + obj1.width;
  let obj1bottom = obj1.y + obj1.height;
  let obj2left = obj2.x;
  let obj2top = obj2.y;
  let obj2right = obj2.x + obj2.width;
  let obj2bottom = obj2.y + obj2.height;
  return !(
    obj1left > obj2right ||
    obj1top > obj2bottom ||
    obj1right < obj2left ||
    obj1bottom < obj2top
  );
};

// Test Danger

function testDanger(player, obstacleArr) {
  for (let i = 0; i < obstacleArr.length; i++) {
    if (intersect(player, obstacleArr[i])) {
      let theOneObstacle = obstacleArr.splice(i, 1)[0];
      if (theOneObstacle.danger == true) {
        updateLives();
        console.log("danger");
      } else if (theOneObstacle.danger == false) {
        updateCounter();
        console.log("no danger");
      }
    }
  }
}

// Level One

const canvasOne = document.getElementById("levelOneCanvas");
let ctxOne = canvasOne.getContext("2d");

// Background
class Background {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.width = canvasOne.width;
    this.height = canvasOne.height;
    this.img = new Image();
    this.img.src = "./images/gameBg.jpeg";
    this.speed = -2;
  }
  drawBg() {
    ctxOne.drawImage(this.img, this.x, this.y, this.width, this.height);
    ctxOne.drawImage(
      this.img,
      this.x + canvasOne.width,
      this.y,
      this.width,
      this.height
    );
  }
  move() {
    this.x += this.speed;
    this.x %= canvasOne.width;
  }
}
let bg = new Background(0, 0);

// Player
class Player {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.width = 50;
    this.height = 50;
    this.img = new Image();
    this.img.src = "./images/player.jpeg";
  }
  drawPlayer() {
    ctxOne.drawImage(this.img, this.x, this.y, this.width, this.height);
  }

  resetPlayer(x,y) {
this.x = x;
this.y = y;
  }
}
let player = new Player(0, 240);

// Obstacle
class Obstacle {
  constructor() {
    this.x = 700;
    this.y = Math.floor(Math.random() * 500);
    this.vx = -4;
    this.width = 60;
    this.height = 60;
    this.img = new Image();
    this.danger = false;
  }
  draw() {
    ctxOne.drawImage(this.img, this.x, this.y, this.width, this.height);
  }
}

// Mask
let masks = [];
class Mask extends Obstacle {
  constructor() {
    super();
    this.danger = false;
    this.img.src = "./images/mask.png";
  }
}
function createMasks() {
  if (gameFrames % 180 === 0) {
    masks.push(new Mask());
  }
}
function updateMasks() {
  for (let i = 0; i < masks.length; i++) {
    masks[i].x += masks[i].vx;
    masks[i].draw();
  }
}

// Virus
let viruses = [];
class Virus extends Obstacle {
  constructor() {
    super();
    this.danger = true;
    this.img.src = "./images/virus.png";
    this.vx = -6;
  }
}
function createVirus() {
  if (gameFrames % 150 === 0) {
    viruses.push(new Virus());
  }
}
function updateVirus() {
  for (let i = 0; i < viruses.length; i++) {
    viruses[i].x += viruses[i].vx;
    viruses[i].draw();
  }
}

let gameFrames = 0;
let timerRunOut = 1;
let lives = 3;
let counterCount = 0;

// Keys
document.onkeydown = function (e) {
  //left
  if (e.keyCode === 37) {
    if (player.x > 0 && player.x < 621) {
      player.x -= 20;
    }
  }
  //right
  if (e.keyCode === 39) {
    if (player.x >= 0 && player.x < 620) {
      player.x += 20;
    }
  }
  //up
  if (e.keyCode === 38) {
    if (player.y > 0 && player.y < 500) {
      player.y -= 20;
    }
  }
  //down
  if (e.keyCode === 40) {
    if (player.y >= 0 && player.y < 449) {
      player.y += 20;
    }
  }
  event.preventDefault();
};

// Start Game
function startLevelOne() {
  let level = 1;
  // Timer One
  const timerOne = document.querySelector("#timerOne");
  initializeCounter(counterCount, counterOne);
  initializeLives(lives, livesOne);
  startTimer(20, timerOne);

  setTimeout(function () {
    initializeTimer(20, timerOne, level);

    // Playground
    let intervalIdOne = setInterval(() => {
      ctxOne.clearRect(0, 0, 700, 500);

      // Counter One
      const counterOne = document.querySelector("#counterOne");
      initializeCounter(counterCount, counterOne);

      // Lives Level One
      const livesOne = document.querySelector("#livesOne");
      initializeLives(lives, livesOne);

      // Background
      bg.move();
      bg.drawBg();

      // Player Image
      player.drawPlayer();

      createMasks();
      updateMasks();

      createVirus();
      updateVirus();

      testDanger(player, masks);
      testDanger(player, viruses);

      timeRunOut(intervalIdOne);
      gameFrames++;
    }, 20);
  }, 3000);

  bg.drawBg();
  player.drawPlayer();
}

// Level Two
// Info Screen Two

document.querySelector(".infoTwoButton").addEventListener('click', () => {
    document.getElementById('infoTwo').classList.add('hidden');
    document.getElementById('levelTwo').classList.remove('hidden');

    gameFrames = 0;
    timerRunOut = 1;
    lives = 3;
  
    startLevelTwo();
})


function startLevelTwo() {
   level = 2;


  // Timer
  const timerTwo = document.querySelector("#timerTwo");
  initializeCounter(counterCount, counterTwo);
  initializeLives(lives, livesTwo);
  startTimer(60, timerTwo);

setTimeout(() => {

  initializeTimer(60, timerTwo);

let intervalIdTwo = setInterval(() => {

  // Counter
  const counterTwo = document.querySelector("#counterTwo");
  initializeCounter(counterCount, counterTwo);

  // Lives Level Two
  const livesTwo = document.querySelector("#livesTwo");
  initializeLives(lives, livesTwo);



  
  timeRunOut(intervalIdTwo);
  gameFrames++;
  },20)

}, 3000);

}

// Canvas
// Background --> Same as Level 1 (maybe different image)
// Class Player = Mouth --> Same as Level 1
// Control via Arrows --> Same as Level 1
// Class Counterpart: Virus, Masks, Needles, "Querdenker" --> Querdenker, Needles as an addition
// Masks = more points --> Same as Level 1
// Virus, Querdenker (quicker than virus) = costs a live --> Same as Level 1
// Needles = You need at least two to win --> New as an addition

// You loose = Section mit class hidden

// You won! = Section mit class hidden
// Add "You collected XX masks."
// Highscore for Mask Points
