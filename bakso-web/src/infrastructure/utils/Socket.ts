import { io, Socket } from 'socket.io-client';
import dotenv from 'dotenv';

dotenv.config();

const CORE_URL = process.env.REACT_APP_CORE_URL;
const PORT = process.env.REACT_APP_PORT;

const url = `${CORE_URL}:${PORT}`;

class SocketWrapper {
    private socket: Socket;
    private static instance: SocketWrapper;

    constructor(url: string, options = {}) {
        if (SocketWrapper.instance) {
            this.socket = SocketWrapper.instance.getSocket();
            return SocketWrapper.instance;
        }
        SocketWrapper.instance = this;
        this.socket = io(url, options);
    }

    static getInstance() {
        if (!SocketWrapper.instance) {
            SocketWrapper.instance = new SocketWrapper(url);
        }
        return SocketWrapper.instance;
    }

    getSocket() {
        return this.socket;
    }

    connect(url: string, options = {}) {
        this.socket = io(url, options);
        return this.socket;
    }

    disconnect() {
        if (this.socket) {
            this.socket.disconnect();
        }
    }

    on(event: any, callback: any) {
        if (this.socket) {
            this.socket.on(event, callback);
        } else {
            console.error('Socket is not connected');
        }
    }

    off(event: any, callback: any) {
        if (this.socket) {
            this.socket.off(event, callback);
        } else {
            console.error('Socket is not connected');
        }
    }
}

const socketWrapper = SocketWrapper.getInstance();
export default socketWrapper;