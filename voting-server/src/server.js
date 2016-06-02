import Server from 'socket.io';

/**
 * Creates a socket.io server
 * And bounds regular HTTP server to port 8090
 * And publishes state over all clients
 * @return {[type]} [description]
 */
export default function startServer(store) {
    const io = new Server().attach(8100)

    //subscribe a listener to the store that reads the current state
    //turns into a plain JS object and emits it as a state event on the io server
    //Result: JSON-serialized snapshot of a state that sent over all active io connections
    store.subscribe(
        () => io.emit('state', store.getState().toJS())
    )

    //When new connection occurs, client receives current state
    io.on('connection', (socket) => {
        socket.emit('state', store.getState().toJS())
        //able to receive updates from them.
        //When update. Clients emit action events
        //that feed into Redux store. and moves to next state
        socket.on('action', store.dispatch.bind(store))
    })
}
