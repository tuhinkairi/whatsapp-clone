// this is for clint side 

// setting the server
const socket = io('http://127.0.0.1:80');

const form = document.getElementById('send');
const setdate = document.getElementById('date')
const send_message = document.getElementById('imessage') // targeting the send message box
const showmessage = document.querySelector('.container') // targeting where we wanna show the message (parent container)
const btn = document.getElementById('btn')
const audio1 = new Audio('static/audio/wpn.mp3')
const audio2 = new Audio('static/audio/ting.mp3')
const date = new Date()



setdate.addEventListener(onload, () => {
    setdate.innerHTML = `<p>You joined the chat on \n ${date.getHours()}:${date.getMinutes()} - ${date.getDate()}/${date.getMonth()}/${date.getYear()}</p>`
})

const append = (message, position) => {
    const container = document.createElement('div')
    container.innerHTML = `<p>${message}</p> `//here we creat a new element that can hold our message
    container.classList.add('message');  //adding classes for the new html components
    container.classList.add(position);
    //now adding new created elements to the parent container
    showmessage.append(container);
    if (position == 'text-right') {

        audio1.play();
    }
    else {
        audio2.play()
    }
    showmessage.scrollTop = showmessage.scrollHeight
}
//  now sending the new message
form.addEventListener('submit', (e) => {
    e.preventDefault();
    // now taking the value of the input of current user
    const msg = send_message.value;
    if(msg==''){
        btn.classList.add('disable')
    }
    else{
        append(`you : ${msg}`, 'text-right');
        socket.emit('send', msg)
        send_message.value = ''
    }
})

verify = () => {
    const name = prompt('Enter your Name to Join the chat')
    if (name == '') {
        return verify()
    }
    else {

        setdate.innerHTML = `<p><b>You</b> joined the chat on \n <b>${date.getHours()}:${date.getMinutes()} - ${date.getDate()}/${date.getMonth()}/${date.getYear()}</b></p>`
        setdate.classList.add('text-center')
        setdate.classList.add('start-notice')

        socket.emit('new-user-joined', name)

        socket.on('user-joined', name => {
            append(`<b>${name}</b> joined the chat on \n <b>${date.getHours()}:${date.getMinutes()} - ${date.getDate()}/${date.getMonth()}/${date.getYear()}</b>`, 'text-center')
        })

        // here we send a json file for the data
        socket.on('receive', udata => {
            append(`${udata.name} : ${udata.message}`, 'text-left')
        })
        // here we show a message when the user is left the chat
        socket.on('left', name => {
            append(`<b>${name}</b> left the chat`, 'text-center')
        })


    }
}
verify()