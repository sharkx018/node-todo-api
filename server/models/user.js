var mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const _ = require('lodash');
const bcrypt = require('bcryptjs');

var UserSchema = new mongoose.Schema({
	email:{
		type: String,
		trim: true,
		required:true,
		minlength:1,
		unique:true,
		validate:{
			validator:(txt) => {
				return validator.isEmail(txt);
			},
			message:(p) => p.value + " is not valid email"
		}
	},
	password:{
		type: String,
		require: true,
		minlength: 6
	},
	tokens:[{
		access:{
			type:String,
			require:true
		},
		token:{
			type:String,
			require: true
		}
	}]
});

UserSchema.methods.generateAuthToken = function(){
	var user = this;
	var access = 'auth';
	var token = jwt.sign({ _id:user._id.toHexString(), access}, process.env.JWT_SECRET).toString();
	user.tokens = user.tokens.concat([{access, token}]);

	return user.save().then(()=>{
		return token;
	});
};

UserSchema.methods.removeToken = function(token){
	var user = this;
	return user.update({
		$pull:{
			tokens:{
				token
			}
		}
	});
};

UserSchema.statics.findByToken =  function(token){

	var User = this;
	var decoded;

	

	try {
		decoded = jwt.verify(token, process.env.JWT_SECRET);
	}catch(e){
		return Promise.reject();
	 }

	return User.findOne({
		_id: decoded._id,
		'tokens.access':'auth',
		'tokens.token':token
	});

};	

UserSchema.statics.findByCredentials =function(ee, jj){

	var User = this;
	return User.findOne({
		email:ee
	}).then((user)=>{
		if(!user)
		{
			return Promise.reject();
		}

		return new Promise((resolve, reject)=>{
			bcrypt.compare(jj, user.password, (err, result) => {
				if(result){
					resolve (user);
					
				}else{
					reject();
				}
			});

		});

		
	});

	// User.findOne({
	// 	email:ee,
	// }).then((user) => {

	// 	bcrypt.compare(jj, user.password, (err, result) => {
	// 		if(result){
	// 			var o ={
					
	// 			};
				
	// 		}else{
	// 			res.status(404).send('Pass Invalid! ');
	// 		}
	// 	});
		

	// }).catch((e)=>{
		
	// });


};

UserSchema.pre('save', function(next){
	var user = this;

	if(user.isModified('password'))
	{
		bcrypt.genSalt(10, (err, salt)=>{

			bcrypt.hash(user.password, salt, (err, hash) => {
				user.password = hash;
				next();
			});
		});

		
		
	}
	else
	{
		next();
	}
	//next();
	//--
	// bcrypt.genSalt(10, (err, salt)=>{

	// 	bcrypt.hash(user.password, salt, (err, hash) => {
	// 		user.password = hash;
	// 		next();
	// 	});
	// });
	// if(user.isModified('password'))
	// {
	// 	user.password = 'Changed';
	// 	next();
	// }
	

	// next();

});

UserSchema.methods.toJSON = function(){

	var obj = this.toObject();
	var ext = _.pick(obj, ['_id', 'email']);
	return ext;

};


var User = mongoose.model('User', UserSchema);

module.exports = {User};






