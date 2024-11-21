
import { Server } from 'socket.io';

const ALLOWED_ORIGINS = ['https://alim.center', `http://localhost`];

const io = new Server({
    cors: {
        origin: ALLOWED_ORIGINS,
    }
});

export const initializeSocket = () => {
    io.on('connection', (socket) => {
        console.log('A user connected');

        socket.on('join', (role) => {
            if (role === 'seller' || role === 'customer') {
                socket.join(role + 's');
                console.log(`User joined ${role}s room`);
            }
        });

        socket.on('disconnect', () => {
            console.log('User disconnected');
        });
    });

    return io;
};

export const getIO = () => {
    if (!io) {
        throw new Error('Socket.IO has not been initialized. Please call initializeSocket first.');
    }
    return io;
};