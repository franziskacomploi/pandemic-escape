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

function startLevelOne() {
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

  // Counter Two
  let countOne = 0;
  let counterOne = document.querySelector("#counterOne");
  counterOne.innerHTML = `You have: ${countOne} points.`;
  function updateCounterOne() {
    countOne++;
    counterOne.innerHTML = `You have: ${countOne} points.`;
  }

  // Lives Level One

  let livesLevelOne = 3;
  let livesOne = document.querySelector("#livesOne");
  livesOne.innerHTML = `You have ${livesLevelOne} left.`;
  function updateLivesOne() {
    livesLevelOne--;
    livesOne.innerHTML = `You have ${livesLevelOne} left.`;
  }
}

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

function startLevelTwo() {
  // Timer Two
  let timerCountTwo = 60;
  let timerTwo = document.querySelector("#timerTwo");
  timerTwo.innerHTML = `${timerCountTwo} seconds left`;
  const intervalIdTwo = setInterval(() => {
    timerCountTwo--;
    timerTwo.innerHTML = `${timerCountTwo} seconds left`;
    if (timerCountTwo == 0) {
      clearInterval(intervalIdTwo);
      timerTwo.innerHTML = `Time has run out!`;
    }
  }, 1000);

  // Counter Two
  let countTwo = 0;
  let counterTwo = document.querySelector("#counterTwo");
  counterTwo.innerHTML = `You have: ${countTwo} points.`;
  function updateCounterTwo() {
    countTwo++;
    counterTwo.innerHTML = `You have: ${countTwo} points.`;
  }

  // Lives Level Two

  let livesLevelTwo = 3;
  let livesTwo = document.querySelector("#livesTwo");
  livesTwo.innerHTML = `You have ${livesLevelTwo} left.`;
  function updateLivesTwo() {
    livesLevelTwo--;
    livesTwo.innerHTML = `You have ${livesLevelTwo} left.`;
  }
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

// You won! = Section mit class hidden - add "You collected XX masks!"
// Highscore for Mask Points
