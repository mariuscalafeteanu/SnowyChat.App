//importing particle.js
particlesJS.load('bg', '../particles/snow.json');

//variables
const nameInput = document.querySelector('.name-input');
const joinRoomBtn = document.querySelector('.join-room');

//checking if fields are empty or not
const checkFields = () => {
  if (nameInput.value === '') {
    event.preventDefault();
    alert('You must enter your name!');
  }
}

joinRoomBtn.addEventListener('click', checkFields);