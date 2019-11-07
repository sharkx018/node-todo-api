var env = process.env.NODE_ENV || 'development';



if(env === 'development' || env === 'test')
{
	var config = require('./config.json');
	//console.log(Object.keys(config));
	var envconfig = config[env];

	Object.keys(envconfig).forEach((key)=>{
		process.env[key] = envconfig[key];
	});

}


// if(env === 'development' )
// {
// 	process.env.PORT = 3000;
// }else if(env === 'test'){
// 	process.env.PORT = 3000;
// }

//var port = process.env.PORT || 3000;

