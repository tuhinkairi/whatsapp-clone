// for socket io connection

//version is matter here so please chack the version

//*io.on/.emit() is a function
const io = require('socket.io')(80) // any port

const users = {};

//creating a socket.io server it attach it self with https instanse.
// it listen incoming events 

//io= a instance it listen all socket connection and do ferther setps to what we wanna do with it
io.on('connection', socket => {
    
    socket.on('new-user-joined', name => {// it accept user join event
        console.log('new user', name)
        users[socket.id] = name; // it will join the user name and insert it in a object 

        socket.broadcast.emit('user-joined', name) // then it will broadcast a message to all other people a new message
    });

    // if get any new message then we again broadcast a message and make receive it to every one with its name and message
    socket.on('send', message => {
        socket.broadcast.emit('receive', { name: users[socket.id] , message: message})
    });

    socket.on('disconnect', name=>{
        socket.broadcast.emit('left',users[socket.id])
        delete users[socket.id]
    })
})

