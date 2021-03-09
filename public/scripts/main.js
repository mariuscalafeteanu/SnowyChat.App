const socket = io();

//importing particle.js
particlesJS.load('bg', '../particles/snow.json');

//stopping form from submitting if fields are empty
const nameInput = document.querySelector('.name-input');
const roomCodeInput = document.querySelector('.code-input');

const createRoomBtn = document.querySelector('.create-room');
const joinRoomBtn = document.querySelector('.join-room');

//checking if fields are empty or not
const checkFields = () => {
  if (nameInput.value === '' || roomCodeInput.value === '') {
    event.preventDefault();
    alert('You must complete both fields!');
  }
}


createRoomBtn.addEventListener('click', () => {
  checkFields();
  // socket.emit('create-room', roomCodeInput.value);
})

joinRoomBtn.addEventListener('click', () => {
  checkFields();
});