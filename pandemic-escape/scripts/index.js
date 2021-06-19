// Start Screen Interaction

let startScreen = document.getElementById('home');
let startButton = document.querySelector(".startButton");

startButton.addEventListener('click', () => {
startScreen.classList.add('hidden');
})