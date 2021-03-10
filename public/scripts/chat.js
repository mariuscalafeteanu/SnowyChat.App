//importing particle.js
particlesJS.load('bg', '../particles/snow.json');

//socket init
const socket = io();

//variables
const roomTitle = document.querySelector('.code-output');
const sendMessageBtn = document.querySelector('.send-message');
const leaveRoomBtn = document.querySelector('.leave-room');

//query strings
const urlParams = new URLSearchParams(window.location.search);
const roomName = urlParams.get('room');
const userName = urlParams.get('name');


const joinRoom = () => {
    socket.emit('join-room', roomName);
    roomTitle.innerText = roomName;
}


const leaveRoom = () => {
    socket.emit('leave-room', roomName);
    window.location.replace('/');
}


window.addEventListener('load', joinRoom); //joining room
leaveRoomBtn.addEventListener('click', leaveRoom); //leaving room


//sending message
const sendMessage = () => {
    const messageInput = document.querySelector('.message-input')
    const message = messageInput.value; 

    if (messageInput.value === '') {
        alert('The message input is empty!');
        return;
    } else {
        socket.emit('message', message, roomName, userName);
        messageInput.value = '';
    }
}


sendMessageBtn.addEventListener('click', sendMessage);


socket.on('send-message', (message, user) => {
    const output = document.querySelector('.output');
    output.innerHTML += 
    `<div class="message">
        <p>${user}: <span>${message}</span></p>
    </div>`
});