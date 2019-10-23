const {mongoose} = require('./../server/db/mongosse');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');
var {ObjectID} = require('mongodb');

var id = '5dadc9371ab8700f567af09b';

if(!ObjectID.isValid(id)){
	console.log('Invalid ID');
}

// Todo.findById(id).then((res)=>{
// 	console.log(JSON.stringify(res, undefined, 2));
// });

// Todo.findOne({
// 	_id : id
// }).then((res)=>{
// 	console.log(JSON.stringify(res, undefined, 2));
// });

// Todo.find({
// 	_id : id
// }).then((res)=>{
// 	console.log(JSON.stringify(res, undefined, 2));
// });

User.findById(id).then((user)=>{
	if(!user)
		return console.log('User not found.');
	console.log(JSON.stringify(user, undefined, 2));
}).catch((e)=>{
	console.log('Something went wrong', e);
});