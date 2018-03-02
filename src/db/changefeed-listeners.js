/*
RethinkDB changefeed changefeedListeners
handles redux action dispathes
*/
import * as doctypes from '../db/doctypes'
import * as actions from '../actions'
import * as reduxActions from '../actions/main'
import io from 'socket.io-client';
const socket = io.connect('http://localhost:1234')

function dispatchRedux(changefeedType, store, object) {
    store.dispatch(reduxActions.updateUserInst(object))
}

export default function(store) {

    socket.on('changefeed_' + actions.INSERT_OBJECT, (object) => {
        dispatchRedux('insert', store, object)
    })

	socket.on('changefeed_' + actions.EDIT_OBJECT, function (object) {
        dispatchRedux('edit', store, object)
	});

	socket.on('changefeed_' + actions.DELETE_OBJECT, function (object) {
        dispatchRedux('delete',store, object)
	});
}
