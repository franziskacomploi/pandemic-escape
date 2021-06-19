// Start Screen Interaction

let startScreen = document.getElementById('home');
let startButton = document.querySelector(".startButton");

let infoOneScreen = document.getElementById('infoOne');

startButton.addEventListener('click', () => {
startScreen.classList.add('hidden');
infoOneScreen.classList.remove('hidden');
})



