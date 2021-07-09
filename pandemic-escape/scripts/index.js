// Start Screen

document.querySelector(".startButton").addEventListener("click", () => {
  document.getElementById("home").classList.add("hidden");
  document.getElementById("infoOne").classList.remove("hidden");
});

// Game Over Screen

document.querySelector(".gameOverButton").addEventListener("click", () => {
  gameFrames = 0;
  lives = 3;
  masks = [];
  viruses = [];
  document.getElementById("gameOver").classList.add("hidden");
  document.getElementById("home").classList.remove("hidden");
});

function switchToInfoTwo() {
  document.getElementById("levelOne").classList.add("hidden");
  document.getElementById("infoTwo").classList.remove("hidden");
}
function switchToWin() {
  document.getElementById("levelTwo").classList.add("hidden");
  document.getElementById("win").classList.remove("hidden");
  document.getElementById("finishScreen").innerHTML = `${counterCount}`;
}

// Play again Button at Win Screen

document.querySelector(".winButton").addEventListener("click", () => {
  document.getElementById("win").classList.add("hidden");
  document.getElementById("home").classList.remove("hidden");
});

// Level one Canvas

const canvasOne = document.getElementById("canvasOne");
let ctxOne = canvasOne.getContext("2d");

// Level two Canvas

const canvasTwo = document.getElementById("canvasTwo");
let ctxTwo = canvasTwo.getContext("2d");

// Sound

let goodSound = new Audio("./audio/good.mp3");
let badSound = new Audio("./audio/bad.mp3");

// Lives Function

function switchToGameOver() {
  const levelOne = document.getElementById("levelOne");
  const levelTwo = document.getElementById("levelTwo");

  if (!levelOne.classList.contains("hidden")) {
    levelOne.classList.add("hidden");
  } else if (!levelTwo.classList.contains("hidden")) {
    levelTwo.classList.add("hidden");
  }

  document.getElementById("gameOver").classList.remove("hidden");
  timerRunOut = 0;
  crossArr = [];
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

function initializeTimer(count, timerDiv) {
  let timerCount = count;
  timerDiv.innerHTML = `${timerCount} seconds left`;
  const intervalId = setInterval(() => {
    timerCount--;
    timerDiv.innerHTML = `${timerCount} seconds left`;
    if (timerCount == 0 || timerRunOut == 0) {
      clearInterval(intervalId);
      timerDiv.innerHTML = `Time has run out!`;

      if (!document.getElementById("levelOne").classList.contains("hidden")) {
        timerRunOut = 0;
        setTimeout(switchToInfoTwo, 4000);
      } else if (
        !document.getElementById("levelTwo").classList.contains("hidden")
      ) {
        timerRunOut = 0;
        setTimeout(switchToWin, 4000);
      }
    }
  }, 1000);
  return timerCount;
}

function startTimer(count, timerDiv) {
  timerDiv.innerHTML = `You start at ${count} seconds.`;
}

// Countdown Circles Function

function initializeCountdown(waitingDiv) {
  let circle = `<img class="circlesImg" src="./images/wait.png"></img>`;
  const circlesArr = [];
  for (let i = 1; i <= 3; i++) {
    circlesArr.push(circle);
  }
  let circles = circlesArr.join(" ");
  waitingDiv.innerHTML = `<p>30 seconds start in<br> ${circles} </p>`;
}

function showCountdown(circles, crosses) {
  circles.classList.remove("hidden");
  crosses.classList.remove("hidden");
}

let countdownOne = 0;

function runCountdown(insertDiv) {
  let countdownId = setInterval(() => {
    addCross(insertDiv);
    updateCross(insertDiv);
    countdownOne++;
    if (countdownOne === 3) {
      clearInterval(countdownId);
    }
  }, 1000);
}

let crossArr = [];

function addCross() {
  let cross = `<img class="crossImg" src="./images/cross.png".></img>`;
  crossArr.push(cross);
}

function updateCross(crossDiv) {
  let crosses = crossArr.join(" ");
  crossDiv.innerHTML = crosses;
}

function hideCountdownOne() {
  document.getElementById("waitingOne").classList.add("hidden");
  document.getElementById("crossOne").classList.add("hidden");
}

function hideCountdownTwo() {
  document.getElementById("waitingTwo").classList.add("hidden");
  document.getElementById("crossTwo").classList.add("hidden");
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
        goodSound.play();
        console.log("danger");
      } else if (theOneObstacle.danger == false) {
        updateCounter();
        badSound.play();
        console.log("no danger");
      }
    }
  }
}

// Keys

function keyControl(event, player) {
  //left
  if (event.keyCode === 37) {
    if (player.x > 0 && player.x < 621) {
      player.x -= 20;
    }
  }
  //right
  if (event.keyCode === 39) {
    if (player.x >= 0 && player.x < 620) {
      player.x += 20;
    }
  }
  //up
  if (event.keyCode === 38) {
    if (player.y > 0 && player.y < 500) {
      player.y -= 20;
    }
  }
  //down
  if (event.keyCode === 40) {
    if (player.y >= 0 && player.y < 449) {
      player.y += 20;
    }
  }
  event.preventDefault();
}

// Background
class Background {
  constructor(x, y, canvas, ctx) {
    this.canvas = canvas;
    this.ctx = ctx;
    this.x = x;
    this.y = y;
    this.width = canvas.width;
    this.height = canvas.height;
    this.img = new Image();
    this.img.src = "./images/playground.png";
    this.speed = -2;
  }
  drawBg() {
    this.ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    this.ctx.drawImage(
      this.img,
      this.x + this.canvas.width,
      this.y,
      this.width,
      this.height
    );
  }
  move() {
    this.x += this.speed;
    this.x %= this.canvas.width;
  }
}

let bgOne = new Background(0, 0, canvasOne, ctxOne);
let bgTwo = new Background(0, 0, canvasTwo, ctxTwo);

// Player
class Player {
  constructor(x, y, ctx) {
    this.ctx = ctx;
    this.x = x;
    this.y = y;
    this.width = 50;
    this.height = 50;
    this.img = new Image();
    this.img.src = "./images/player.png";
  }
  drawPlayer() {
    this.ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
  }

  resetPlayer(x, y) {
    this.x = x;
    this.y = y;
  }
}

let playerOne = new Player(0, 240, ctxOne);
let playerTwo = new Player(0, 240, ctxTwo);

// Obstacle
class Obstacle {
  constructor(ctx) {
    this.ctx = ctx;
    this.x = 700;
    this.y = Math.floor(Math.random() * 500);
    this.vx = -4;
    this.width = 60;
    this.height = 60;
    this.img = new Image();
    this.danger = false;
  }
  draw() {
    this.ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
  }
}

// Mask
let masks = [];
class Mask extends Obstacle {
  constructor(ctx) {
    super(ctx);
    this.danger = false;
    this.img.src = "./images/mask.png";
  }
}
function createMasks(ctx) {
  if (gameFrames % 170 === 0) {
    masks.push(new Mask(ctx));
  }
}
function updateMasks() {
  for (let i = 0; i < masks.length; i++) {
    masks[i].x += masks[i].vx;
    masks[i].draw();
  }
}

// Injection
let injections = [];
class Injection extends Obstacle {
  constructor(ctx) {
    super(ctx);
    this.danger = false;
    this.img.src = "./images/injection.png";
    this.vx = -4;
  }
}
function createInjections(ctx) {
  if (gameFrames % 250 === 0) {
    injections.push(new Injection(ctx));
  }
}
function updateInjections() {
  for (let i = 0; i < injections.length; i++) {
    injections[i].x += injections[i].vx;
    injections[i].draw();
  }
}

// Virus
let viruses = [];
class Virus extends Obstacle {
  constructor(ctx) {
    super(ctx);
    this.danger = true;
    this.img.src = "./images/virus.png";
    this.vx = -6;
  }
}
function createVirus(ctx) {
  if (gameFrames % 140 === 0) {
    viruses.push(new Virus(ctx));
  }
}
function updateVirus() {
  for (let i = 0; i < viruses.length; i++) {
    viruses[i].x += viruses[i].vx;
    viruses[i].draw();
  }
}

// Querdenker

let querdenker = [];
class Querdenker extends Obstacle {
  constructor(ctx) {
    super(ctx);
    this.danger = true;
    this.img.src = "./images/querdenker.png";
    this.vx = -8;
  }
}
function createQuerdenker(ctx) {
  if (gameFrames % 130 === 0) {
    querdenker.push(new Querdenker(ctx));
  }
}
function updateQuerdenker() {
  for (let i = 0; i < querdenker.length; i++) {
    querdenker[i].x += querdenker[i].vx;
    querdenker[i].draw();
  }
}

// Level One

document.querySelector(".infoOneButton").addEventListener("click", () => {
  document.getElementById("infoOne").classList.add("hidden");
  document.getElementById("levelOne").classList.remove("hidden");
  gameFrames = 0;
  timerRunOut = 1;
  lives = 3;
  counterCount = 0;
  countdownOne = 0;

  playerOne.resetPlayer(0, 240);

  startLevelOne();
});

let gameFrames = 0;
let timerRunOut = 1;
let lives = 3;
let counterCount = 0;

// Start Level One

function startLevelOne() {
  // Timer One
  const timerOne = document.querySelector("#timerOne");
  initializeCounter(counterCount, counterOne);
  initializeLives(lives, livesOne);
  startTimer(30, timerOne);

  document.onkeydown = function (e) {
    keyControl(e, playerOne);
  };
  
  showCountdown(waitingOne, crossOne);
  initializeCountdown(waitingOne);
  runCountdown(crossOne);

  setTimeout(function () {
    hideCountdownOne();

    initializeTimer(30, timerOne);

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
      bgOne.move();
      bgOne.drawBg();

      // Player Image
      playerOne.drawPlayer();

      createMasks(ctxOne);
      updateMasks();

      createVirus(ctxOne);
      updateVirus();

      testDanger(playerOne, masks);
      testDanger(playerOne, viruses);

      timeRunOut(intervalIdOne);
      gameFrames++;
    }, 20);
  }, 4000);

  bgOne.drawBg();
  playerOne.drawPlayer();
}

// Level Two

document.querySelector(".infoTwoButton").addEventListener("click", () => {
  document.getElementById("infoTwo").classList.add("hidden");
  document.getElementById("levelTwo").classList.remove("hidden");

  gameFrames = 0;
  timerRunOut = 1;
  lives = 3;
  masks = [];
  viruses = [];
  countdownOne = 0;
  crossArr = [];

  playerTwo.resetPlayer(0, 240);

  startLevelTwo();
});

// Start Level Two

function startLevelTwo() {
  // Timer
  const timerTwo = document.querySelector("#timerTwo");
  initializeCounter(counterCount, counterTwo);
  initializeLives(lives, livesTwo);
  startTimer(30, timerTwo);

  document.onkeydown = function (e) {
    keyControl(e, playerTwo);
  };

  showCountdown(waitingTwo, crossTwo);
  initializeCountdown(waitingTwo);
  runCountdown(crossTwo);

  setTimeout(() => {
    hideCountdownTwo();
    initializeTimer(30, timerTwo);

    let intervalIdTwo = setInterval(() => {
      // Counter
      const counterTwo = document.querySelector("#counterTwo");
      initializeCounter(counterCount, counterTwo);

      // Lives Level Two
      const livesTwo = document.querySelector("#livesTwo");
      initializeLives(lives, livesTwo);

      // Background
      bgTwo.move();
      bgTwo.drawBg();

      // Player Image
      playerTwo.drawPlayer();

      createMasks(ctxTwo);
      updateMasks();

      createInjections(ctxTwo);
      updateInjections();

      createVirus(ctxTwo);
      updateVirus();

      createQuerdenker(ctxTwo);
      updateQuerdenker();

      testDanger(playerTwo, masks);
      testDanger(playerTwo, injections);
      testDanger(playerTwo, viruses);
      testDanger(playerTwo, querdenker);

      timeRunOut(intervalIdTwo);
      gameFrames++;
    }, 20);
  }, 4000);
  bgTwo.drawBg();
  playerTwo.drawPlayer();
}
