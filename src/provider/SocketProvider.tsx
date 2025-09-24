'use client'

import { useAuth } from '@/modules/auth'
import { useGetConnection } from '@/services/notification'
import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react'
import { io, Socket } from 'socket.io-client'

type SocketContextValue = Socket | null

const SocketContext = createContext<SocketContextValue>(null)

export const SocketProvider = ({ children }: PropsWithChildren) => {
  const { user } = useAuth()

  const { data: connection } = useGetConnection({
    user_id: user?.id?.toString() || '',
    user_name: user?.fullname || '',
  })

  const socketRef = useRef<Socket | null>(null)
  const [socketState, setSocketState] = useState<Socket | null>(null)

  useEffect(() => {
    if (socketRef.current || !connection) return

    const createdSocket = io(connection.sever, {
      extraHeaders: { auth: connection.data },
    })

    createdSocket.on('connect', () => {
      console.log('[connect success]', createdSocket)

      createdSocket.emit('connectedData', {
        user_id: user?.id?.toString(),
        user_name: user?.fullname,
      })
    })

    console.log('[connect]', createdSocket)

    socketRef.current = createdSocket
    setSocketState(createdSocket)

    return () => {
      // Keep socket alive across components; do not disconnect here
      createdSocket.disconnect()
    }
  }, [connection, user?.id, user?.fullname])

  const value = useMemo(() => socketState, [socketState])

  return (
    <SocketContext.Provider value={value}>{children}</SocketContext.Provider>
  )
}

export const useSocketContext = (): Socket | null => {
  return useContext(SocketContext)
}
