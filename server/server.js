var {mongoose} = require('./db/mongosse.js');
var {Todo} = require('./models/todo.js');
var {User} = require('./models/user.js');
const {ObjectID} = require('mongodb');
const {authenticate} = require('./middleware/middleware');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const _ = require('lodash');

const express = require('express');
const bodyParser = require('body-parser');

var port = process.env.PORT || 3000;

var app = express();
app.use(bodyParser.json());

app.post('/todo',authenticate,  (req, res)=>{ //Adding a todo

	//console.log(req.body);
	var tt = new Todo({
		text:req.body.text,
		_creator: req.user._id
	});
	tt.save().then((doc)=>{
		res.send(doc);
	}, (e)=>{
		res.status(400).send(e);
	});

});
app.get('/todo',authenticate, (req, res)=>{ // Listing all the todos

	Todo.find({
		_creator: req.user._id
	}).then((todo)=>{
		res.send({todo});
	},(e)=>{
		res.status(400).send(e);
	});

});

app.get('/todo/:id',authenticate,  (req, res)=>{ // Listing a todo by id as argument
	var id = req.params.id;

	if(!ObjectID.isValid(id)){
		res.status(404).send('');
	}
	Todo.findOne({
		_id: id,
		_creator: req.user._id
	}).then((todo)=>{
		if(!todo){
			res.status(404).send('No todo found');
		}else{
			res.send(JSON.stringify(todo, undefined, 2));
		}

	}).catch((e)=>{
		res.status(400).send(' ');

	});
});

app.delete('/todo/:id',authenticate,  (req, res)=>{

	var id  = req.params.id;
	if(!ObjectID.isValid(id))
	{
		return res.status(404).send('');
	}
	Todo.findOneAndRemove({
		_id:id,
		_creator: req.user._id
	}).then((todo)=>{
		if(!todo)
		{
			res.status(404).send('No Such Todo.');
		}else
			res.send(JSON.stringify(todo, undefined, 2));
	}).catch((e)=>{
		res.status(400).send('');
	});

});

app.patch('/todo/:id',authenticate, (req, res) => {

	var id = req.params.id;
	if(!ObjectID.isValid(id))
	{
		return res.status(404).send('Invalid ID');
	}
	var body = _.pick(req.body, ['text', 'completed']);

	if(_.isBoolean(body.completed) && body.completed){
		body.completedAt = new Date().getTime();
	}else{
		body.completed = false;
		body.completedAt = null;
	}

	Todo.findOneAndUpdate({_id:id, _creator:req.user._id}, {$set:body}, {new: true}).then((todo) => {
		if(!todo){
			res.status(404).send('No Such Todo');
			
		}else{
			res.send({todo});
		}
	}).catch((e) => {
		res.status(400).send( );
	});

});

app.post('/users', (req, res)=>{

	var body = _.pick(req.body, ['email', 'password']);
	var user = new User(body);

	user.save().then((user)=>{
		return user.generateAuthToken();
	}).then((token) => {
			res.header('x-auth', token).send(user);
		})
	.catch((e)=>{
		res.status(404).send(e);
	});

});



app.get('/users/me', authenticate, (req, res) => {

		res.send(req.user);

});



app.post('/users/login', (req, res) => {
	
	var ee = req.body.email;
	var jj = req.body.password;
	//res.send( ee );

	User.findByCredentials(ee, jj).then((user)=>{
		return user.generateAuthToken().then((token) => {
			res.header('x-auth',token).send(user);
		});
	}).catch((e)=>{
		res.status(401).send(e);
	});

	//DOUBT Why this code is not working.
	// User.findByCredentials(ee, jj).then((user)=>{
	// 	return user.generateAuthToken();
	// }).then((token) => {
	// 		res.header('x-auth', token).send(user);
	// 	})
	// .catch((e)=>{
	// 	res.status(404).send(e);
	// });

});

app.delete('/users/me/token', authenticate, (req, res) => {

	req.user.removeToken(req.token).then(()=>{
		res.status(200).send();
	}, (e)=>{
		res.status(401).send();
	});

});



app.listen(3000, ()=>{
	console.log('Server is running in port '+port);
});





