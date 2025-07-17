import React, { useCallback, useEffect, useState} from 'react'
import ReactPlayer from 'react-player'
import { useSocket } from '../context/SocketProvider'
import peer from '../service/peer'

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
            video: true,
        });
        const offer = await peer.getOffer();
        socket.emit("user:call", {to: remoteSocketId, offer});
        setMyStream(stream)
    }, [remoteSocketId, socket]);

    const handleIncommingCall = useCallback(async({from, offer}) => {
        setRemoteSocketId(from);
        const stream = await navigator.mediaDevices.getUserMedia({
            audio: true,
            video: true,
        });
        setMystream(stream);
        console.log(`Incomming Call`, from, offer);
        const ans = await peer.getAnswer(offer);
        socket.emit("call:accepted", {to: from, ans});
    }, [socket]);

    useEffect(() => {
        socket.on("user:joined", handleUserJoined);
        socket.on("incomming: call", handleIncommingCall);
        return () => {
            socket.off("user:joined", handleUserJoined)
            socket.off("incomming:call", handleIncommingCall)
        }
    }, [socket,handleUserJoined,handleIncommingCall]);


  return (
    <div>
        <h1>Room Page</h1>
        <h4>{remoteSocketId ? 'Connected' : 'No one in room'}</h4>
        {remoteSocketId && <button onClick={handleCallUser}>CALL</button>}
        {myStream && (
            <>
              <h1>My Stream</h1>
              <ReactPlayer
              playing 
              muted 
              height="100px" 
              width="200px"  
              url={myStream}
              />
            </>
        )}
    </div>
  )
};

export default Room