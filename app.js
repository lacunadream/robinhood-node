// Modules
var request = require('request');
var fs = require('fs');

// Import
var api = require('./robinhood');

// Sample API call
var r = new api
r.get_quote('NFLX')


