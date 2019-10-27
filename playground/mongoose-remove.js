const {mongoose} = require('./../server/db/mongosse');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');
var {ObjectID} = require('mongodb');

// REMOVE

if(!ObjectID.isValid(id)){
	console.log('Invalid ID');
}

Todo.remove({}).then((todo)=>{
	
	if(!todo)
	{
		return res.status(404).send(todo);
	}
	res.send(todo);

}).catch((e)=>{
	res.status(400).send();
});

Todo.findOneAndRemove({
	_id:id

}).then((res)=>{
	console.log(res);

});


Todo.findByIdAndRemove(id).then((res)=>{
	console.log(res);
});
