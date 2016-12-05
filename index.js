var urlencode = require('urlencode');
var VK = require('vkapi');
var circles = 1; //Action repeat
//Dont modify
var vkAuth = require('vk-auth')(3087106, 'notify,friends,photos,audio,video,docs,notes,pages,status,offers,questions,wall,groups,messages,email,notifications,stats,ads,market,offline');
var vk = new VK({
	'appID' : 3087106,
	'appSecret' : '2frnUP9AmRWciMet5p52',
	'mode' : 'oauth'
});
//Dont modify End


var logins = [
				'login1',
				'login2',
				'etclogins'
				];
var passwords = [
				'password_fromlogin1',
				'password_fromlogin2',
				'etcloginspasswords'
					];
var tokens = [] //Token array

	if(logins.length == passwords.length){
		for (i = 0; i < logins.length; i++) {
			vkAuth.authorize(logins[i], passwords[i], function(err, tokenParams) {
				if(err){
					console.log(err)
				}else{
					console.log('['+tokenParams['user_id']+'] Token: '+tokenParams['access_token']+'\n');
					tokens.push(tokenParams['access_token']);
				}
			}); 
		}
	}else{
		console.log('Logins != Passwords')
	}

setTimeout(function() { 
	for (i = 0; i < tokens.length*circles; i++) {
		act(tokens[i], i)
	}
}, 2000*logins.length);


//Action
function act(tfa, i){
	vk.setToken( { token : tfa });
	vk.request('gifts.send', {user_ids : 257606849, guid : i+6+10007+73994, message : urlencode('Your message. \n\n'), privacy : 1, gift_id : 803}, function(_o) {
		console.log(_o);
	});
}