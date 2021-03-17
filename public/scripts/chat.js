//importing particle.js
particlesJS.load('bg', '../particles/snow.json');

//socket init
const socket = io();


const output = document.querySelector('.output');

//variables
const roomTitle = document.querySelector('.room-name-output');
const messageInput = document.querySelector('.message-input')
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
    socket.emit('user-joined', msg, roomName);
});

socket.on('welcome-message', data => {
    output.innerHTML += data;
});


//joining and leaving room
const joinRoom = () => {
    socket.emit('join-room', roomName, userName);
    roomTitle.innerText = roomName;
}

const leaveRoom = () => {

    const msg = 
    `<div class="message">
        <p>${userName}: <span>left this room. (${roomName})</span></p>
    </div>`;

    socket.emit('user-left', msg, roomName, userName);
    socket.emit('leave-room', roomName, userName);
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


//sending the message on keydown "enter"
messageInput.addEventListener('keydown', e => {
    if (e.keyCode==13) {
        sendMessage();
    }
})

socket.on('send-message', (message, user) => {
    output.innerHTML += 
    `<div class="message">
        <p>${user}: <span>${message}</span></p>
    </div>`;

    //scrolling at the newest message on each "send"
    output.scrollTop = output.scrollHeight;

});