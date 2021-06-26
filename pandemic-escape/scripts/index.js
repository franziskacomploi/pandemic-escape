// Start Screen

document.querySelector(".startButton").addEventListener("click", () => {
  document.getElementById("home").classList.add("hidden");
  document.getElementById("infoOne").classList.remove("hidden");
});

// Info Screen One

document.querySelector(".infoOneButton").addEventListener("click", () => {
  document.getElementById("infoOne").classList.add("hidden");
  document.getElementById("levelOne").classList.remove("hidden");
  // eventually Countdown to startGame
  startLevelOne();
});

// Info Screen Two

document.querySelector(".infoTwoButton").addEventListener("click", () => {
  document.getElementById("infoTwo").classList.add("hidden");
  document.getElementById("levelTwo").classList.remove("hidden");
});

// Lives Function

function initializeLives(lives, livesDiv) {
  const heartsArr = [];
  for (let i = 1; i <= lives; i++) {
    heartsArr.push(`<img class="heartImg" src="./images/heart.png"></img>`);
  }
  let hearts = heartsArr.join(" ");
  livesDiv.innerHTML = `You have ${hearts} left.`;
}

function updateLives(lives, livesDiv) {
  lives--;
  livesDiv.innerHTML = `You have ${lives} left.`;
}

// Timer Function
function switchToInfoTwo(){
  document.getElementById("levelOne").classList.add("hidden");
  document.getElementById("infoTwo").classList.remove("hidden");
}
function switchToWin(){
  document.getElementById("levelTwo").classList.add("hidden");
  document.getElementById("win").classList.remove("hidden");
}

// function stopLevelOne(intervalId, timerCount){
//   if (timerCount == 0) {
//     clearInterval(intervalId);
//     setTimeout(switchToInfoTwo, 3000);
//   }
//   if (lives == 0) {
//     document.getElementById("levelOne").classList.add("hidden");
//     document.getElementById("gameOver").classList.remove("hidden");
//   }
// }

function initializeTimer(count, timerDiv, level) {
  let timerCount = count;
  timerDiv.innerHTML = `${timerCount} seconds left`;
  const intervalId = setInterval(() => {
    timerCount--;
    timerDiv.innerHTML = `${timerCount} seconds left`;
    if (timerCount == 0) {
      clearInterval(intervalId);
      timerDiv.innerHTML = `Time has run out!`;
      console.log(level);
      if (level == 1) {
        setTimeout(switchToInfoTwo, 3000);
      } else {
        setTimeout(switchToWin, 3000);
      }
    }
  }, 1000);
  return timerCount;
}




// Counter Function

function initializeCounter(count, counterDiv) {
  counterDiv.innerHTML = `You have: ${count} points.`;
}

function updateCounter(count, counterDiv) {
  count++;
  counterDiv.innerHTML = `You have: ${count} points.`;
}

// Test Position of Player and Obstacle

let testPosition = (player, obstacleArr) => {
  let playerleft = player.x;
  let playertop = player.y;
  let playerright = player.x + player.width;
  let playerbottom = player.y + player.height;

  let position;

  for (let i = 0; i < obstacleArr.length; i++) {
    let obsleft = obstacleArr[i].x;
    let obstop = obstacleArr[i].y;
    let obsright = obstacleArr[i].x + obstacleArr[i].width;
    let obsbottom = obstacleArr[i].y + obstacleArr[i].height;

    if (
      playerleft > obsright ||
      playertop > obsbottom ||
      playerright < obsleft ||
      playerbottom < obstop
    ) {
      position;
    } else {
      position = obstacleArr[i];
    }
  }
  return position;
};

// Test Danger Level One

function testDanger(player, obstacleArr) {
  let position = testPosition(player, obstacleArr);
  let positionNumber = obstacleArr.indexOf(position);
  obstacleArr.splice(positionNumber, 1);

  if (position.danger = true) {
    updateLives();
  } else if (position.danger = false) {
    updateCounter();
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
}
let player = new Player(0, 240);

// Obstacle
class Obstacle {
  constructor(danger) {
    this.x = 700;
    this.y = Math.floor(Math.random() * 500);
    this.vx = -4;
    this.width = 60;
    this.height = 60;
    this.img = new Image();
    this.danger = danger;
  }
  draw() {
    ctxOne.drawImage(this.img, this.x, this.y, this.width, this.height);
  }
}

// Mask
let masks = [];

class Mask extends Obstacle {
  constructor(danger) {
    super(danger);
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
  constructor(danger) {
    super(danger);
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
};

// Start Game
function startLevelOne() {
  let level = 1;
  // Timer One
  const timerOne = document.querySelector("#timerOne");
  let timerCount = initializeTimer(10, timerOne, level);

  // Counter One
  const counterOne = document.querySelector("#counterOne");
  initializeCounter(0, counterOne);

  // Lives Level One
  const livesOne = document.querySelector("#livesOne");
  initializeLives(3, livesOne);

  // Playground
  let intervalIdOne = setInterval(() => {
    ctxOne.clearRect(0, 0, 700, 500);

    // Background
    bg.move();
    bg.drawBg();

    // Player Image
    player.drawPlayer();

    createMasks();
    updateMasks();

    createVirus();
    updateVirus();

    gameFrames++;
  }, 20);
 
}

// Set Timeout 3 seconds needed where nothing in the game moves anymore, before going to inofScreentwo
// Add Class Hidden to Level One to get to Info Screen Two - You loose or next level? = Section mit class hidden

// Level Two
// Info Screen Two

// document.querySelector(".infoTwoButton").addEventListener('click', () => {
//     document.getElementById('infoTwo').classList.add('hidden');
//     document.getElementById('levelTwo').classList.remove('hidden');
// })

// const canvasTwo = document.getElementById("levelTwoCanvas");
// let ctxTwo = canvasTwo.getContext("2d");

function startLevelTwo() {
  let level = 2;
  // Timer
  const timerTwo = document.querySelector("#timerTwo");
  initializeTimer(60, timerTwo, level);

  // Counter
  const counterTwo = document.querySelector("#counterTwo");
  initializeCounter(0, counterTwo);

  // Lives Level Two
  const livesTwo = document.querySelector("#livesTwo");
  initializeLives(3, livesTwo);
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
