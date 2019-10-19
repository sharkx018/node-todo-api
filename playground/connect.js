const mongoclient = require('mongodb').MongoClient;

mongoclient.connect('mongodb://localhost:27017/TodoApp', (error, db)=>{
	if(error){
		console.log("Unable to connect to database");
	}else{
		console.log('Connected!!!');
	}

	// db.collection('Todo').insertOne({
	// 	text:"This is record",
	// 	completed:true

	// 	},
	// 	(error, result)=>{
	// 		if(error){
	// 			console.log('Unable to insert into the database');
	// 		}else{
	// 			console.log(JSON.stringify(result.ops, undefined, 2));
	// 		}

	// });

	// db.collection('User').insertOne({
	// 	name:"Mukul Verma",
	// 	age:21,
	// 	location:"Patna"
	// }, (error, result)=>{
	// 	if(error){
	// 		console.log('Unable to insert the document');

	// 	}else{
	// 		console.log(JSON.stringify(result.ops, undefined, 2));
	// 	}
	// });

	// db.collection('User').find().count().then((count)=>{
	// 	console.log('Total document: '+count);
	// }, (err)=>{
	// 	console.log('Unable to count the documents');
	// });

	db.collection('User').find({
		name:'Mukul Verma'
	}).toArray().then((docs)=>{
		console.log(JSON.stringify(docs, undefined, 2));
	}, (err)=>{
		console.log('Unable to print the documents');
	});




	//db.close();

});