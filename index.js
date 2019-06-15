const express = require('express')
const app = express()
/*
const MongoClient = require('mongodb').MongoClient;

const url = 'mongodb://sysdba:masterkey123@ds141633.mlab.com:41633/sitexxx';
    MongoClient.connect(url, (err, client) => {
	if (err) return console.log(err)
	db = client.db('sitexxx')//nome do banco

	app.listen(3000, function(){
        console.log('O servidor esta na porta 3000')
    })
	
})*/

const MongoClient = require('mongodb').MongoClient;
const url = "mongodb://sysdba:masterkey123@ds141633.mlab.com:41633/sitexxx";

MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    dbo = db.db("sitexxx");
    const PORT = process.env.PORT || 3000
    app.listen(PORT, function(){
    console.log('O servidor esta na porta 3000')
    })  
});

app.get('/a', (req, res) =>{
    res.send('Ola n')
})

app.get('/positions/:ID',(req,res,next) =>{
	//var query = { id: "a42edee3-a2e7-44b5-b50d-8d872c4eceb5" };    
    var pid = req.params.ID;
    console.log(pid)
    var query = { id: pid};   
    dbo.collection("data").
    find(query).toArray(function(err, result) {
        console.log('1');
    if (err) throw err; 
    res.send(result)
  });  
})

app.get('/positions/',(req,res,next) =>{
	//var query = { id: "a42edee3-a2e7-44b5-b50d-8d872c4eceb5" };    

    var query = {};   
    dbo.collection("data").
    find(query).toArray(function(err, result) {
        console.log('1');
    if (err) throw err; 
    res.send(result)
  });  
})

app.get('/positions/:description/:full_time/:location',(req,res) =>{
	//var query = { id: "a42edee3-a2e7-44b5-b50d-8d872c4eceb5" };    
    var pdescription = req.params.description;
    var plocation    = req.params.location;
    var pfulltime    = req.params.full_time;
    console.log(pdescription);
    console.log(plocation);
    console.log(pfulltime);
    //console.log(pid)
    var query = { description: {$regex: pdescription, $options: 'i'},
                  location: {$regex: plocation, $options: 'i'},
                  type: {$regex: pfulltime, $options: 'i'}  
                };   
    //User.find(searchQuery, function(error, user) { if(error || user === null) { return res.status(500).send(error); } return res.status(200).send(user); }); 
    dbo.collection("data").
    find(//,, , $options: 'i' {type: pfulltime} {nome: { $regex: /a/ },
        query).toArray(function(err, result) {
        console.log('1');
    if (err) throw err; 
    res.send(result)
  });  
})