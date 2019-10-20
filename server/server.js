var mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/TodoApp');

var Todo = mongoose.model('Todo', {
	text:{
		type:{
			String
		}
	},
	completed:{
		type:{
			Boolean
		}
	}, 
	completedAt:{
		type:{
			Number
		}
	}
});

// var newTodo = new Todo({
// 	text:'Cook Dinner'
// });

// newTodo.save().then((result)=>{
// 	console.log(result);
// },(e)=>{
// 	console.log(e);
// });


var toto = new Todo({

	text:'fuck the gf',
	completed:false,
	njn:6942,
	


});
toto.save().then((res)=>{
	console.log(JSON.stringify(res, undefined, 2));
}, (e)=>{
	console.log(e);
});





