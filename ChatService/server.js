/* const express = require('express')
    , http = require('http')
    , dotenv = require('dotenv')
    , hashMap = require('hashmap')
    , morgan = require('morgan');
const { Socket } = require('node:dgram');

let app = express();
app.set('port',process.env.PORT || 8080);

//middleware
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({extended:true}))
    
let server = http.createServer(app);
let io = require('socket.io')(server);

//import schema variables
//add routes

let clients = new hashMap(); //online users
 io.use(async (socket, next) => {
try{
    // check to see if this user exists
    let user = await //find user
    if (user) {
        clients.set(socket.id, (user._id).toString())
        console.log(clients)
        await //update last seen
        return next();
    }
    else{
        console.log("user does not exist");
    }
    }
    catch(e){
        console.log(e);
    }

 })
io.on('connection',(socket)=>{

    console.log(`${socket} connected : ${socket.id}`);

    //event room join
    socket.on('join',async room=>{
        //android devices passes "room id" parameter and join the room
        socket.join(room);
    })

    //new message send
    socket.on('message_detection', async data=>{

    })

    //remove from room
    socket.on('disconnect',async ()=>{
        
    })

}); */