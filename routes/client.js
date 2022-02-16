module.exports= function(app,obj){
    app.get("/", function(req, res){
        //res.send("Hello"+ obj.KEY);
        res.render("master");
    });
}
