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

function updateLivesOne(lives, livesDiv) {
  lives--;
  livesDiv.innerHTML = `You have ${lives} left.`;
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
let bg = new Background(0,0);



// Player
class Player {
  constructor(x, y, width, height) {
      this.x = x;
      this.y = y;
      this.width = width;
      this.height = height;
      this.img = new Image();
      this.img.src = "./images/player.jpeg";
  }
  drawPlayer() {
      ctxOne.drawImage(this.img, this.x, this.y, 50, (50/this.width)*this.height);
  }
}
let player = new Player(0, 240, 10, 10);



// Obstacle 
class Obstacle {
  constructor(img, danger) {
    this.x = 700;
    this.y = Math.floor(Math.random()*500);
    this.vx = -5;
    this.width = 50;
    this.height = (50/this.width)*this.height;
    this.img = img;
    this.danger = danger
  }
  draw(){
    ctxOne.drawImage(this.img, this.x, this.y, this.width, this.height);
  }

}

// Mask /// is adding masks to the array but not to the screen yet
let masks = [];
const maskImg = new Image();
maskImg.src = "./images/mask.png";

class Mask extends Obstacle {
  constructor() {
    super(maskImg, false);
  }
};
function createMasks(){
  if (gameFrames % 180 === 0){
    console.log(masks)
    masks.push(new Mask());
  };
};
function updateMasks(){
  for (let i=0; i < masks.length; i++) {
    masks[i].x += masks[i].vx;
    masks[i].draw();
  }
}

// // Virus
// let viruses = [];
// const virusImg = new Image();
// virusImg.src = "./imgages/virus.png"

// class Virus extends Obstacle {
//   constructor() {
//     super(virusImg, true);
//   }
// };
// function createVirus(){
//   if (gameFrames % 180 === 0){
//     viruses.push(new Virus());
//   };
// };
// function updateMasks(){
//   for (let i=0; i < viruses.length; i++) {
//     console.log("drawing virus", gameFrames)
//     viruses[i].x += viruses[i].vy;
//     viruses[i].draw();
//   }
// }





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
        if (player.y >=0 && player.y < 449) {
            player.y += 20;
        }
    }
};


// Start Game
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

    // Playground
    setInterval(() => {
        ctxOne.clearRect(0, 0, 700, 500);

        // Background
        bg.move();
        bg.drawBg();

        // Player Image
        player.drawPlayer();

        createMasks();
        updateMasks();

        // createVirus();
        // updateVirus();

        gameFrames++;
    }, 20);
}




// Class Counterpart = Masks, Virus
// "Obstacles" = Virus --> How do they move?
// "Points" = Masks
// Start Game Function Game Logic (collect points etc.)

// Set Timeout 3 seconds needed where nothing in the game moves anymore, before going to inofScreentwo
// Add Class Hidden to Level One to get to Info Screen Two - You loose or next level? = Section mit class hidden
// Add "You collected XX masks in infoScreenTwo"

// Level Two
// Info Screen Two

// document.querySelector(".infoTwoButton").addEventListener('click', () => {
//     document.getElementById('infoTwo').classList.add('hidden');
//     document.getElementById('levelTwo').classList.remove('hidden');
// })

// // Level Two 

// const canvasTwo = document.getElementById("levelTwoCanvas");
// let ctxTwo = canvasTwo.getContext("2d");

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
