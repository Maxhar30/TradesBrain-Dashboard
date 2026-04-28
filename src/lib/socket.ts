import { io, type Socket } from "socket.io-client";
import { getAuthToken } from "@/lib/cookies";

const SOCKET_URL =
  process.env.NEXT_PUBLIC_SOCKET_URL ?? "https://ws.tradesbrain.io";

let socket: Socket | null = null;

export function getSocket(): Socket {
  if (!socket) {
    socket = io(SOCKET_URL, {
      autoConnect: false,
      auth: { token: getAuthToken() },
      transports: ["websocket"],
    });
  }
  return socket;
}

export function disconnectSocket() {
  if (socket?.connected) {
    socket.disconnect();
  }
  socket = null;
}
