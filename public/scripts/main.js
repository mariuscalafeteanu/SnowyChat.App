//importing particle.js
particlesJS.load('bg', '../particles/snow.json');

//stopping form from submitting if fields are empty
const nameInput = document.querySelector('.name-input');
const roomCodeInput = document.querySelector('.code-input');

const createRoomBtn = document.querySelector('.create-room');
const joinRoomBtn = document.querySelector('.join-room');

const checkFields = () => {
  if (nameInput.value === '' || roomCodeInput.value === '') {
    event.preventDefault();
    throw new Error('You must complete both fields!');
  }
}