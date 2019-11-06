const bcrypt = require('bcryptjs');

var password = 'mypass123';
// bcrypt.genSalt(10, (err, salt)=>{

// 	bcrypt.hash(password, salt, (err, hash) => {
// 		console.log(hash);
// 	});
// });

var hash = '$2a$10$bf31OYIk5S.29AwqfJ/LBOGS./7H.v1BADSO2lEHeziv4qSRTSoZu';

bcrypt.compare(password, hash, (err, res)=>{

	console.log(res);
	

});

