var express=require("express");
var app=express();
app.use(express.static("public"));
app.set("view engine","ejs");
app.set("views","./views");
var server=  require("http").Server(app);
var io=require("socket.io")(server);
server.listen(5000);
io.on("connection",(socket)=>{
    console.log("Having new connection.."+ socket.id);
    socket.on("disconnect",()=>{
        console.log(socket.id+"has been disconnected");
    });
    socket.on("Client-Send-Server",(data)=>{
        console.log(socket.id + "Sending.."+ data);
        io.sockets.emit("Server-Send-Client","Hello from server");
    });
});



require("./routes/client")(app);