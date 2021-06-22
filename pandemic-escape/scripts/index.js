// Start Screen

document.querySelector(".startButton").addEventListener('click', () => {
document.getElementById('home').classList.add('hidden');
document.getElementById('infoOne').classList.remove('hidden');
});

// Info Screen One 

document.querySelector(".infoOneButton").addEventListener('click', () => {
    document.getElementById('infoOne').classList.add('hidden');
    document.getElementById('levelOne').classList.remove('hidden');

});

// Level One

const canvasOne = document.getElementById("levelOneCanvas");
let ctxOne = canvasOne.getContext("2d");


// Add Class Hidden to Level One to get to Info Screen Two - You loos or win?

// Info Screen Two

document.querySelector(".infoTwoButton").addEventListener('click', () => {
    document.getElementById('infoTwo').classList.add('hidden');
    document.getElementById('levelTwo').classList.remove('hidden');
})

// Level Two 

const canvasTwo = document.getElementById("levelTwoCanvas");
let ctxTwo = canvasTwo.getContext("2d");