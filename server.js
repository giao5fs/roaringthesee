var express = require("express");
const Binance = require('node-binance-api');
var fs = require("fs");
var app = express();
app.set("view engine", "ejs"); //because of having web
app.set("views","./views"); //layout folder
app.use(express.static("public")); //static patch for Jquery, CSS
var server = require("http").Server(app); //config server which attach socket io
var io = require("socket.io")(server, {
	cors:{
		origin: '*',
	}
});
app.io = io;
server.listen(3000);

io.on("connection",(socket)=>{
    console.log("New Connection" + socket.id);
});

loadConfigFile("./config.json");

function loadConfigFile(file){
    var obj;
    fs.readFile(file,"utf-8", (err,data)=>{
        if (err) throw err;
        obj=JSON.parse(data);
        require("./routes/client")(app,obj);
        const binance = new Binance().options({
            APIKEY: obj.API,
            APISECRET: obj.KEY
          });
        binance.futuresMiniTickerStream( 'BTCUSDT', (data)=>{
            //console.log(data);
            app.io.sockets.emit("btc", data.close);

        } );

        binance.futuresMiniTickerStream( 'MATICUSDT', (data)=>{
            //console.log(data.close);
            app.io.sockets.emit("matic", data.close);

        } );

        binance.futuresMiniTickerStream( 'ADAUSDT', (data)=>{
            //console.log(data.close);
            app.io.sockets.emit("ada", data.close);

        } );

    });

   
}

