import { io } from "socket.io-client"

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL

export const initSocket = (roomId, username, roomPassword) => {
    const socket = io(BACKEND_URL, {
        reconnectionAttempts: 5,
        query: {
            roomId,
            username,
            roomPassword,
        },
    });

    socket.on('room_join_error', (error) => {
        console.error('Room join error:', error);
    });

    return socket;
}
