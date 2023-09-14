const io = require("socket.io")(8900, {
    cors: {
        origin: ["http://localhost:3000"],
    },
});

let users = [];
let groupMessages = [];

function addUser (userToken, socketId) {
   if (!users.some(user => user.userToken === userToken)) {
        users.push({ userToken, socketId });
   }
}

function removeUser (socketId) {
    users = users.filter(user => user.socketId !== socketId) 
}

function getUser () {
    return users.find(user => user.userToken === userToken)
}

function setMessages (messages) {
    for (const message of messages) {
        if (!groupMessages.find((groupMessage) => groupMessage._id === message._id)) {
            groupMessages.push({...message, isFinished: true});
        }
    }
}

function addMessage (message, isFinished) {
    let newGroupMessages = [];

    if (!isFinished) {
        groupMessages.push({...message, isFinished: false});
        newGroupMessages = groupMessages;
    } else {
        for (let i = 0; i < groupMessages.length; i++) {
            const groupMessage = groupMessages[i];

            if (groupMessage._id === "1" && !groupMessage.isFinished) {
                newGroupMessages.push({...message, isFinished: true});
            } else {
                newGroupMessages.push(groupMessage);
            }
        }
    }

    return newGroupMessages;
}

function deleteMessage (messageID) {
    let newGroupMessages = [];

    for (let i = 0; i < groupMessages.length; i++) {
        const groupMessage = groupMessages[i];

        if (groupMessage._id === messageID) {
            newGroupMessages.push({...groupMessage, messageContent: "Message has been deleted", messageAttachments: []});
        } else {
            newGroupMessages.push(groupMessage);
        }
    }

    return newGroupMessages;
}

io.on('connection', (socket) => {
    console.log(`user connected with id ${socket.id}`);

    socket.on('addUser', (userToken) => {
        addUser(userToken, socket.id);
    });

    socket.on('joinRoom', (roomID) => {
        socket.join(roomID);
    });

    socket.on('setGroupMessages', (messages) => {
        setMessages(messages);
        socket.emit('getMessages', groupMessages);
    });

    socket.on('sendMessage', ({message, isFinished}) => {
        groupMessages = addMessage(message, isFinished);
        socket.to(message.groupID).emit('getMessages', groupMessages);
    });

    socket.on('deleteMessage', ({messageID, groupID}) => {
        groupMessages = deleteMessage(messageID);
        socket.to(groupID).emit("getMessages", groupMessages);
    });

    socket.on("disconnect", () => {
        console.log(`user disconnect with id ${socket.id}`);
        removeUser(socket.id);
    });
});
