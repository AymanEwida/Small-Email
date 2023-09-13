const io = require("socket.io")(8900, {
    cors: {
        origin: ["http://localhost:3000"],
    },
});

let users = [];

const addUser = (userToken, socketId) => {
   if (!users.some(user => user.userToken === userToken)) {
        users.push({ userToken, socketId });
   }
}

const removeUser = (socketId) => {
    users = users.filter(user => user.socketId !== socketId) 
}

const getUser = () => {
    return users.find(user => user.userToken === userToken)
}

io.on('connection', (socket) => {
    console.log(`user connected with id ${socket.id}`);

    socket.on('addUser', (userToken) => {
        addUser(userToken, socket.id);
    });

    socket.on('joinRoom', (roomID) => {
        socket.join(roomID);
    });

    socket.on('sendMessage', (message) => {
        socket.to(message.groupID).emit('getMessage', message);
    });

    socket.on("disconnect", () => {
        console.log(`user disconnect with id ${socket.id}`);
        removeUser(socket.id);
    })
});
