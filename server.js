var express = require('express')
    , http = require('http');
//make sure you keep this order
var app = express();
var server = http.createServer(app);
var io = require('socket.io')(server);
const {v4:uuidV4} = require('uuid');


app.set('view engine','ejs');
app.use(express.static('public'));


app.get('/', (req, res)=>{
    res.redirect(`/${uuidV4()}`);
})

app.get('/:room', (req, res)=>{
  //  console.log(req.params.room);
    res.render('room', {roomId: req.params.room})
})

io.on('connection', socket => {

    socket.on('join-room', (roomId, userId) => {
        socket.join(roomId);
    socket.to(roomId).broadcast.emit('user-connected', userId)
    socket.to(roomId).broadcast.emit('user-disconnected', userId);

    })

})








server.listen(3000);
