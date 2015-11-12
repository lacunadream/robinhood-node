var https = require('https');
var fs = require('fs');
var request = require('request');
var Q = require('q');

exports = module.exports = Robinhood; 

	var header = {
	    "Accept": "*/*",
        "Accept-Encoding": "gzip, deflate",
        "Accept-Language": "en;q=1, fr;q=0.9, de;q=0.8, ja;q=0.7, nl;q=0.6, it;q=0.5",
        "Content-Type": "application/x-www-form-urlencoded; charset=utf-8",
        "X-Robinhood-API-Version": "1.0.0",
        "Connection": "keep-alive",
        "User-Agent": "Robinhood/823 (iPhone; iOS 7.1.2; Scale/2.00)"
	};


function Robinhood() {
	// endpoints
	endpoints = {
    "accounts": "https://api.robinhood.com/accounts",
    "ach_deposit_schedules": "https://api.robinhood.com/ach/deposit_schedules/",
    "ach_iav_auth": "https://api.robinhood.com/ach/iav/auth/",
    "ach_relationships": "https://api.robinhood.com/ach/relationships/",
    "ach_transfers": "https://api.robinhood.com/ach/transfers/",
    "applications": "https://api.robinhood.com/applications/",
    "dividends": "https://api.robinhood.com/dividends/",
    "document_requests": "https://api.robinhood.com/upload/document_requests/",
    "edocuments": "https://api.robinhood.com/documents/",
    "instruments": "https://api.robinhood.com/instruments/",
    "login": "https://api.robinhood.com/api-token-auth/",
    "margin_upgrades": "https://api.robinhood.com/margin/upgrades/",
    "markets": "https://api.robinhood.com/markets/",
    "notifications": "https://api.robinhood.com/notifications/",
    "notifications/devices": "https://api.robinhood.com/notifications/devices/",
    "orders": "https://api.robinhood.com/orders/",
    "password_reset": "https://api.robinhood.com/password_reset/request/",
    "quotes": "https://api.robinhood.com/quotes/",
    "user": "https://api.robinhood.com/user/",
    "user/additional_info": "https://api.robinhood.com/user/additional_info/",
    "user/basic_info": "https://api.robinhood.com/user/basic_info/",
    "user/employment": "https://api.robinhood.com/user/employment/",
    "user/investment_profile": "https://api.robinhood.com/user/investment_profile/",
    "watchlists": "https://api.robinhood.com/watchlists/"
    };

	var keyarray = fs.readFileSync(__dirname + '/auth.txt').toString().split(',');
	var username = keyarray[0];
	console.log(username)	
	var password = keyarray[1];
	console.log(password)

	login(username, password)

	//header['Authorization'] = 'Token ' + login(username, password);	
	


	function login(username, password) {
		// var deferred = Q.defer();
		var x = "";
		var options = {
			url: endpoints.login, 
			headers: header,
			method: 'post',
			body: "username=" + username + "&password=" + password
		};
		function record(x) {
			header['Authorization'] = 'Token ' + x;
			console.log(header.Authorization)
		}
		function handleReq(error, response, body) {
			if (error) {
				console.log(error)
				return x
			} else {
				zzz = JSON.parse(response.body)
				x = zzz["token"]
				record(x)
			}
		}
/*		request(options, function(error, response) {
			if(response) {
				zzz = JSON.parse(response.body)
			}
				x = zzz["token"]
				console.log(typeof(x))
				console.log(x)
				console.log(options)
				return x
				//deferred.resolve(text);

			} else {
				// console.log(response);
				console.log(error);
				//deferred.reject(new Error(error));
		});*/
		request(options,handleReq) 

		
		 	
	};

	// this.get_quote = function(symbol) {
	// 	data = "symbols=" + symbol;
	// 	var options = {
	// 		url: endpoints.quotes + data,
	// 		headers: header,
	// 		method: 'get'
	// 	};
	// 	request(options, function(response, error) {
	// 		if (error) {
	// 			console.log(error);
	// 		} else {
	// 			console.log(response);
	// 			console.log(response.text);
	// 		}
	// 	})
	// }
		// request(options, function(response) {
		// 	if response.statusCode == 200 {
		// 		console.log(response);
		// 		return response.results;
		// 	} else {
		// 		return response.text;
		// 	}
		// });

}

Robinhood.prototype.get_quote = function(symbol) {
	data = "?symbols=" + symbol;

	var options = {
		url: endpoints.quotes + data,
		headers: header,
		method: 'get'
	};
	request(options, function(error, response) {
		if (error) {
			console.log('error')
			console.log(response.text);
			
		} else {
			parse = JSON.parse(response.body)
			console.log(parse.results);
			console.log(typeof(parse.results))
			console.log(response.statusCode);
			console.log(options)
			return parse.results

		}
	})
}

Robinhood.prototype.order_details = function(order_ID) {
	var options = {
		url: endpoints.orders + order_ID + "/",
		headers: header,
		method: 'get'
	};
	request(options, function(error, response) {
		if (response.statusCode == 200) {
			
			//console.log(response.statusCode)
			parsed = JSON.parse(response.body)
			console.log(parsed)
			return 'parsed'
		} else {
			console.log('Order details encountered an error' + response.text)
			console.log(response.statusCode)
		}

	})
}

// Robinhood.prototype.list_orders = function() {
// 	var options = {
// 		url: Robinhood.endpoints.orders, 
// 		headers: header,
// 		method: 'get'
// 	};	
// 	request(options, function(response) {
// 		if response.statusCode == 200 {}
// 	})
// }



// var rh = new Robinhood;
// rh.whatever

// Robinhood.endpoints = {};
// Robinhood.endpoints['accounts'] = 'https://api.robinhood.com/accounts';
// Robinhood.endpoints['ach_deposit_schedules'] = 'https://api.robinhood.com/ach/deposit_schedules/';
// Robinhood.endpoints.login = 'https://api.robinhood.com/api-token-auth/';
// Robinhood.endpoints.quotes = 'https://api.robinhood.com/quotes/';
// Robinhood.endpoints.orders = 'https://api.robinhood.com/orders/';

