import React, { useCallback, useEffect, useState} from 'react'
import ReactPlayer from 'react-player'
import { useSocket } from '../context/SocketProvider'

const Room = () => {

    const socket = useSocket();
    const [remoteSocketId, setRemoteSocketId] = useState(null);
    const [myStream, setMystream] = useState()

    const handleUserJoined = useCallback(({email,id}) => {
        console.log(`Email ${email} joined room`);
        setRemoteSocketId(id)
    },[]);

    const handleCallUser = useCallback(async () => {
        const stream = await navigator.mediaDevices.getUserMedia({
            audio: true,
            video: true
        });

        setMystream(stream)
    }, []);

    useEffect(() => {
        socket.on('user:joined', handleUserJoined);
        return () => {
            socket.off('user:joined', handleUserJoined)
        }
    }, [socket, handleUserJoined]);

  return (
    <div>
        <h1>Room Page</h1>
        <h4>{remoteSocketId ? 'Connected' : 'No one in room'}</h4>
        {remoteSocketId && <button onClick={handleCallUser}>CALL</button>}
        {myStream && <ReactPlayer playing muted height="300px" width="500px"  url={myStream}/>}
    </div>
  )
}

export default Room