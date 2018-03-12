var actions = require('../actions')
var changefeeds = require('./changefeeds')
var express = require('express')
var app = express()
var r = require('rethinkdb')
var config = require('config')

var ioServer = app.listen(process.env.PORT || config.get('nativestarter.socketPort'), function() {
    var host = config.get('nativestarter.host')
    var port = ioServer.address().port;
    console.log('socket.io listening at http://' + host + ':' + port);
});
var io = require('socket.io')(ioServer, {pingTimeout: 1})

r.connect({
    host: config.get('nativestarter.host'),
    port: config.get('nativestarter.dbPort'),
    db: config.get('nativestarter.db')
}).then(function(connection) {

	io.sockets.on('connection', function (socket) {

        socket.on(actions.UPDATE_USER_INST, function(newUserInst) {
            console.log('client trigger\n',newUserInst)
            try {
                r.table(config.get('nativestarter.table')).get(newUserInst.id).update(newUserInst).run(connection);
            }
            catch(err) {
                r.table(config.get('nativestarter.table')).insert(newUserInst).run(connection);
            }
        })

        /*
        RethinkDB changefeed
        */
        r.table(config.get('nativestarter.table')).changes({ includeInitial: true, squash: true }).run(connection).then(changefeeds.changefeeds(socket));
	});
})
.error(function(error) {
	console.log('Error connecting to RethinkDB!\n',error);
});
