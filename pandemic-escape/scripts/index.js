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

function updateLivesOne() {
  livesLevelOne--;
  livesOne.innerHTML = `You have ${livesLevelOne} left.`;
}

// Timer Function

function initializeTimer(count, timerDiv) {
  let timerCount = count;
  timerDiv.innerHTML = `${timerCount} seconds left`;
  const intervalId = setInterval(() => {
    timerCount--;
    timerDiv.innerHTML = `${timerCount} seconds left`;
    if (timerCount == 0) {
      clearInterval(intervalId);
      timerDiv.innerHTML = `Time has run out!`;
    }
  }, 1000);
}

// Counter Function

function initializeCounter(count, counterDiv) {
  counterDiv.innerHTML = `You have: ${count} points.`;
}

function updateCounter(count, counterDiv) {
  count++;
  counterDiv.innerHTML = `You have: ${count} points.`;
}

// Level One

const canvasOne = document.getElementById("levelOneCanvas");
let ctxOne = canvasOne.getContext("2d");

function startLevelOne() {
  // Timer One
  const timerOne = document.querySelector("#timerOne");
  initializeTimer(60, timerOne);

  // Counter One
  const counterOne = document.querySelector("#counterOne");
  initializeCounter(0, counterOne);

  // Lives Level One
  const livesOne = document.querySelector("#livesOne");
  initializeLives(3, livesOne);
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

// Level Two

const canvasTwo = document.getElementById("levelTwoCanvas");
let ctxTwo = canvasTwo.getContext("2d");

function startLevelTwo() {
  // Timer One
  const timerTwo = document.querySelector("#timerTwo");
  initializeTimer(60, timerTwo);

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

// You won! = Section mit class hidden - add "You collected XX masks!"
// Highscore for Mask Points
