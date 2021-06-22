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

// Level One

const canvasOne = document.getElementById("levelOneCanvas");
let ctxOne = canvasOne.getContext("2d");

// Task 1
// "Lives" --> DOM
// Counter that counts points --> DOM
// Start Level 1 Button

// Timer One
let timerCountOne = 60;
let timerOne = document.querySelector("#timerOne");
timerOne.innerHTML = `${timerCountOne} seconds left`;
const intervalIdOne = setInterval(() => {
  timerCountOne--;
  timerOne.innerHTML = `${timerCountOne} seconds left`;
  if (timerCountOne == 0) {
    clearInterval(intervalIdOne);
    timerOne.innerHTML = `Time has run out!`;
  }
}, 1000);

// Task 2
// Canvas
// Background that moves --> image looping
// Class Player needed: Mouth
// Control via Arrows
// Class Counterpart = Masks, Virus
// "Obstacles" = Virus --> How do they move?
// "Points" = Masks

// Task 3
// Start Game Function Game Logic (collect points etc.)

function startLevelOne() {}

// Set Timeout 3 seconds needed where nothing in the game moves anymore, before going to inofScreentwo
// Add Class Hidden to Level One to get to Info Screen Two - You loose or next level? = Section mit class hidden
// Add "You collected XX masks in infoScreenTwo"

// Info Screen Two

document.querySelector(".infoTwoButton").addEventListener("click", () => {
  document.getElementById("infoTwo").classList.add("hidden");
  document.getElementById("levelTwo").classList.remove("hidden");
});

// Level Two

const canvasTwo = document.getElementById("levelTwoCanvas");
let ctxTwo = canvasTwo.getContext("2d");

// Timer Two
let timerCountTwo = 60;
let timerTwo = document.querySelector("#timerTwo");
timerTwo.innerHTML = `${timerCountTwo} seconds left`;
const intervalIdTwo = setInterval(() => {
  timerCountTwo--;
  timerOne.innerHTML = `${timerCountTwo} seconds left`;
  if (timerCountTwo == 0) {
    clearInterval(intervalIdTwo);
    timerTwo.innerHTML = `Time has run out!`;
  }
}, 1000);

// Counter that counts points --> Same as Level 1
// "Lives" --> Same as Level 1

// Canvas
// Background --> Same as Level 1 (maybe different image)
// Class Player = Mouth --> Same as Level 1
// Control via Arrows --> Same as Level 1
// Class Counterpart: Virus, Masks, Needles, "Querdenker" --> Querdenker, Needles as an addition
// Masks = more points --> Same as Level 1
// Virus, Querdenker (quicker than virus) = costs a live --> Same as Level 1
// Needles = You need at least two to win --> New as an addition

// You loose = Section mit class hidden

// You won! = Section mit class hidden - add "You collected XX masks!"
// Highscore for Mask Points
