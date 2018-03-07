var actions = require('../actions')
var changefeeds = require('./changefeeds')
var express = require('express')
var app = express()
var r = require('rethinkdb')

r.connect({ db: 'nativestarter' }).then(function(connection) {
    console.log('\nconnected to RethinkDB: nativestarter\n')

    var ioServer = app.listen(process.env.PORT || 1234, listen);
    var io = require('socket.io')(ioServer);

    function listen() {
        var host = ioServer.address().address;
        var port = ioServer.address().port;
        console.log('socket.io listening at http://' + host + ':' + port);
    }

	io.sockets.on('connection', function (socket) {

        socket.on(actions.UPDATE_USER_INST, function(newUserInst) {
            try {
                r.table('user').get(newUserInst.id).update(newUserInst).run(connection);
            }
            catch(err) {
                r.table('user').insert(newUserInst).run(connection);
            }
        })

        /*
        RethinkDB changefeed
        */
        r.table('user').changes({ includeInitial: true, squash: true }).run(connection).then(changefeeds.changefeeds(socket));
	});
})
.error(function(error) {
	console.log('Error connecting to RethinkDB!\n',error);
});
