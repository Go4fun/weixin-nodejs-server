// author : zhangbing
// time : 2013-10-07
// 验证是否微信过来的post请求，以connect中间件的方式

var token = 'echoinfo';
var crypto = require('crypto');

module.exports = function(){

	return function(req, res, next){

		var numOnce = req.query.nonce || '';
		var timeStamp = req.query.timestamp || '';
		var signature = req.query.signature || '';
		
		var tempArr = [token, numOnce, timeStamp];
		tempArr.sort();
		var tempStr = tempArr.join('');

		var shasum = crypto.createHash('sha1');
		shasum.update(tempStr);
		tempStr = shasum.digest('hex');

		if(tempStr === signature){
			next();
		}else{

			console.log('weixin api server auth failed');
			return next('weixin api server auth failde');
		}
	};
};
