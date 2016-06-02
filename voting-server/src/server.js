import Server from 'socket.io';

/**
 * Creates a socket.io server
 * And bounds regular HTTP server to port 8090
 * @return {[type]} [description]
 */
export default function startServer() {
    const io = new Server().attach(8100)
}
