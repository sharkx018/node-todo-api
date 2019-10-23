var {mongoose} = require('./db/mongosse.js');
var {Todo} = require('./models/todo.js');
var {User} = require('./models/user.js');
const {ObjectID} = require('mongodb');

const express = require('express');
const bodyParser = require('body-parser');

var app = express();
app.use(bodyParser.json());
app.post('/todo', (req, res)=>{

	console.log(req.body);
	var tt = new Todo({
		text:req.body.text
	});
	tt.save().then((doc)=>{
		res.send(doc);
	}, (e)=>{
		res.status(400).send(e);
	});

});
app.get('/todo', (req, res)=>{

	Todo.find().then((todo)=>{
		res.send({todo});
	},(e)=>{
		res.status(400).send(e);
	});

});

app.get('/todo/:id', (req, res)=>{
	var id = req.params.id;

	if(!ObjectID.isValid(id)){
		res.status(404).send('');
	}
	Todo.findById(id).then((todo)=>{
		if(!todo){
			res.status(404).send('No todo found');
		}else{
			res.send(JSON.stringify(todo, undefined, 2));
		}

	}).catch((e)=>{
		res.status(400).send(' ');

	});
});



app.listen(3000, ()=>{
	console.log('Server is running in port 3000');
});





