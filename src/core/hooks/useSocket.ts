// hooks/useSocket.ts
import { Socket } from 'socket.io-client'
import { useSocketContext } from '@/provider/SocketProvider'

export function useSocket(): Socket | null {
  const socket = useSocketContext()
  return socket
}
