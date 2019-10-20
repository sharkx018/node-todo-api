const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (error, db)=>{
	if(error){
		console.log("Unable to connect to database");
	}else{
		console.log('Connected!!!');
	}

	//----------------------------------------------------------------
//
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

	//----------------------------------------------------------------

	// db.collection('User').find().count().then((count)=>{
	// 	console.log('Total document: '+count);
	// }, (err)=>{
	// 	console.log('Unable to count the documents');
	// });

	// db.collection('User').find({
	// 	name:'Mukul Verma'
	// }).toArray().then((docs)=>{
	// 	console.log(JSON.stringify(docs, undefined, 2));
	// }, (err)=>{
	// 	console.log('Unable to print the documents');
	// });

	//----------------------------------------------------------------
	// db.collection('User').deleteMany({name:'Mukul Verma'}).then((result)=>{
	// 	console.log(result);
	// });

	// db.collection('User').findOneAndDelete({
	// 	_id: new ObjectID('5dab811ccb91e7579dd9de06')
	// }).then((result)=>{
	// 	console.log(result);
	// });

	//----------------------------------------------------------------

	db.collection('User').findOneAndUpdate({
	 _id: new ObjectID('5dab812ecb91e7579dd9de0e')
	},{
			$set:{ name:'Goldy Singh' },
			$inc:{ age:-4 }
		},
		{returnOriginal: false}

		).then((result)=>{
			console.log(result);
		});




	//db.close();

});