const {SHA256} = require('crypto-js');


const jw = require('jsonwebtoken');

var data = {
	id : 4
};



var token = jw.sign(data, '123abc');

console.log(token);

var decoded = jw.verify(token, '123abc');
console.log(decoded);


// var message = 'I am writting this message';

// var hash = SHA256(message).toString();
// console.log(hash);

// var data = {
// 	id : 4
// };

// var token = {
// 	data,
// 	hash: SHA256(JSON.stringify(data)).toString() + 'hello'
// }




// var reshash = SHA256(JSON.stringify(token.data)).toString() + 'hello';

// if(reshash === token.hash)
// {
// 	console.log('Original');
// } else{
// 	console.log('Contaminated');
// }


