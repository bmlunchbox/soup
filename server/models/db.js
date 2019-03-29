var mysql = require('mysql');

var connection = mysql.createConnection({
		host: 'mydbinstance.crbdkprtbk8k.us-east-2.rds.amazonaws.com',
		port: '3306',
		user: 'masterUsername',
		password: 'mypassword'
});

connection.connect((err) => {
	if (err) {
		console.log("failed");
		throw err;
	}
	console.log("success");
});

module.exports = connection;