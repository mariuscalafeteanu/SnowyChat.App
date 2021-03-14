//importing particle.js
particlesJS.load('bg', '../particles/snow.json');

//socket init
const socket = io();


const output = document.querySelector('.output');

//variables
const roomTitle = document.querySelector('.code-output');
const sendMessageBtn = document.querySelector('.send-message');
const leaveRoomBtn = document.querySelector('.leave-room');

//query strings
const urlParams = new URLSearchParams(window.location.search);
const roomName = urlParams.get('room');
const userName = urlParams.get('name');


//on connection - welcome message
socket.on('connect', () => {
    const msg =
    `<div class="message">
        <p>${userName} <span>joined this room. (${roomName})</span></p>
    </div>`
    socket.emit('user-joined', msg);
});

socket.on('welcome-message', data => {
    output.innerHTML += data;
});


//joining and leaving room
const joinRoom = () => {
    socket.emit('join-room', roomName);
    roomTitle.innerText = roomName;
}

const leaveRoom = () => {

    const msg = 
    `<div class="message">
        <p>${userName}: <span>left this room. (${roomName})</span></p>
    </div>`;

    socket.emit('user-left', msg);

    socket.emit('leave-room', roomName);
    window.location.replace('/');
}

//leaving room message
socket.on('leave-message', data => {
    output.innerHTML += data;
});

window.addEventListener('load', joinRoom);
leaveRoomBtn.addEventListener('click', leaveRoom); 


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
    output.innerHTML += 
    `<div class="message">
        <p>${user}: <span>${message}</span></p>
    </div>`
});