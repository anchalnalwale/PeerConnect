// import React, { useCallback, useEffect, useState } from 'react'
// import ReactPlayer from 'react-player'
// import { useSocket } from '../context/SocketProvider'
// import peer from '../service/peer'

// const Room = () => {

//     const socket = useSocket();
//     const [remoteSocketId, setRemoteSocketId] = useState(null);
//     const [myStream, setMyStream] = useState();
//     const [remoteStream, setRemoteStream] = useState();

//     const handleUserJoined = useCallback(({ email, id }) => {
//         console.log(`Email ${email} joined room`);
//         setRemoteSocketId(id)
//     }, []);

//     const handleCallUser = useCallback(async () => {
//         const stream = await navigator.mediaDevices.getUserMedia({
//             audio: true,
//             video: true,
//         });
//         const offer = await peer.getOffer();
//         socket.emit("user:call", { to: remoteSocketId, offer });
//         setMyStream(stream)
//     }, [remoteSocketId, socket]);

//     const handleIncommingCall = useCallback(async ({ from, offer }) => {
//         setRemoteSocketId(from);
//         const stream = await navigator.mediaDevices.getUserMedia({
//             audio: true,
//             video: true,
//         });
//         setMyStream(stream);
//         console.log(`Incomming Call`, from, offer);
//         const ans = await peer.getAnswer(offer);
//         socket.emit("call:accepted", { to: from, ans });
//     }, [socket]);

//     const sendStreams = useCallback(() => {
//         if (myStream) {
//             for (const track of myStream.getTracks()) {
//                 peer.peer.addTrack(track, myStream);
//             }
//         }
//     }, [myStream]);

//     const handleCallAccepted = useCallback(({ from, ans }) => {
//         peer.setLocalDescription(ans)
//         console.log("Call Accepted!");
//         sendStreams();
//     }, [sendStreams]);

//     const handleNegoNeeded = useCallback(async () => {
//         const offer = await peer.getOffer();
//         socket.emit("peer:nego:needed", { offer, to: remoteSocketId });
//     }, []);

//     const handleNegoNeedFinal = useCallback(async ({ ans }) => {
//         await peer.setLocalDescription(ans)
//     }, []);

//     useEffect(() => {
//         peer.peer.addEventListener('negotiationneeded', handleNegoNeeded)
//         return () => {
//             peer.peer.removeEventListener("negotiationneeded", handleNegoNeeded);
//         };
//     }, [handleNegoNeeded]);

//     const handleNegoNeedIncoming = useCallback(async ({ from, offer }) => {
//         const ans = await peer.getAnswer(offer);
//         socket.emit("peer:nego:done", { to: from, ans });
//     }, [socket]);

//     useEffect(() => {
//         peer.peer.addEventListener('track', async ev => {
//             const remoteStream = ev.streams[0];
//             if (remoteStream) {
//                 console.log("✅ Remote stream received:", remoteStream);
//                 setRemoteStream(remoteStream);
//             } 
//             else 
//             {
//                 console.warn("⚠️ No remote stream found in 'track' event");
//             }
//         });
//     }, [])

//     useEffect(() => {
//         socket.on("user:joined", handleUserJoined);
//         socket.on("incomming:call", handleIncommingCall);
//         socket.on("call:accepted", handleCallAccepted);
//         socket.on("peer:nego:needed", handleNegoNeedIncoming);
//         socket.on("peer:nego:final", handleNegoNeedFinal);
//         return () => {
//             socket.off("user:joined", handleUserJoined)
//             socket.off("incomming:call", handleIncommingCall)
//             socket.off("call:accepted", handleCallAccepted)
//             socket.off("peer:nego:needed", handleNegoNeedIncoming);
//             socket.off("peer:nego:final", handleNegoNeedFinal);
//         }
//     }, [socket, handleUserJoined, handleIncommingCall, handleCallAccepted, handleNegoNeedIncoming, handleNegoNeedFinal]);

//     return (
//         <div>
//             <h1>Room Page</h1>
//             <h4>{remoteSocketId ? 'Connected' : 'No one in room'}</h4>
//             {myStream && <button onClick={sendStreams}>Send Stream</button>}
//             {remoteSocketId && <button onClick={handleCallUser}>CALL</button>}

//             {myStream && (
//                 <>
//                     <h1>My Stream</h1>
//                     <video
//                         playsInline
//                         autoPlay
//                         muted
//                         height="300"
//                         width="500"
//                         ref={(videoRef) => {
//                             if (videoRef) {
//                                 videoRef.srcObject = myStream;
//                             }
//                         }}
//                     />
//                 </>
//             )}

//             {remoteStream && (
//                 <>
//                     <h2>Remote Video</h2>
//                     <video
//                         playsInline
//                         autoPlay
//                         height="200"
//                         width="300"
//                         ref={(videoRef) => {
//                             if (videoRef) {
//                                 videoRef.srcObject = remoteStream;
//                             }
//                         }}
//                     />
//                 </>
//             )}
//         </div>
//     );
// };

// export default Room;


// import React, { useCallback, useEffect, useState } from 'react'
// import ReactPlayer from 'react-player'
// import { useSocket } from '../context/SocketProvider'
// import peer from '../service/peer'

// const Room = () => {
//     const socket = useSocket();
//     const [remoteSocketId, setRemoteSocketId] = useState(null);
//     const [myStream, setMyStream] = useState();
//     const [remoteStream, setRemoteStream] = useState();

//     const handleUserJoined = useCallback(({ email, id }) => {
//         console.log(`Email ${email} joined room`);
//         setRemoteSocketId(id)
//     }, []);

//     const handleCallUser = useCallback(async () => {
//         const stream = await navigator.mediaDevices.getUserMedia({
//             audio: true,
//             video: true,
//         });
//         const offer = await peer.getOffer();
//         socket.emit("user:call", { to: remoteSocketId, offer });
//         setMyStream(stream)
//     }, [remoteSocketId, socket]);

//     const handleIncommingCall = useCallback(async ({ from, offer }) => {
//         setRemoteSocketId(from);
//         const stream = await navigator.mediaDevices.getUserMedia({
//             audio: true,
//             video: true,
//         });
//         setMyStream(stream);
//         console.log(`Incomming Call`, from, offer);
//         const ans = await peer.getAnswer(offer);
//         socket.emit("call:accepted", { to: from, ans });
//     }, [socket]);

//     const sendStreams = useCallback(() => {
//         if (myStream) {
//             for (const track of myStream.getTracks()) {
//                 peer.peer.addTrack(track, myStream);
//             }
//         }
//     }, [myStream]);

//     const handleCallAccepted = useCallback(({ from, ans }) => {
//         peer.setLocalDescription(ans)
//         console.log("Call Accepted!");
//         sendStreams();
//     }, [sendStreams]);

//     const handleNegoNeeded = useCallback(async () => {
//         const offer = await peer.getOffer();
//         socket.emit("peer:nego:needed", { offer, to: remoteSocketId });
//     }, [remoteSocketId, socket]); // Added dependencies

//     const handleNegoNeedFinal = useCallback(async ({ ans }) => {
//         await peer.setLocalDescription(ans)
//     }, []);

//     useEffect(() => {
//         peer.peer.addEventListener('negotiationneeded', handleNegoNeeded)
//         return () => {
//             peer.peer.removeEventListener("negotiationneeded", handleNegoNeeded);
//         };
//     }, [handleNegoNeeded]);

//     const handleNegoNeedIncoming = useCallback(async ({ from, offer }) => {
//         const ans = await peer.getAnswer(offer);
//         socket.emit("peer:nego:done", { to: from, ans });
//     }, [socket]);

//     useEffect(() => {
//         peer.peer.addEventListener('track', async ev => {
//             const remoteStream = ev.streams[0];
//             if (remoteStream) {
//                 console.log("✅ Remote stream received:", remoteStream);
//                 setRemoteStream(remoteStream);
//             } else {
//                 console.warn("⚠️ No remote stream found in 'track' event");
//             }
//         });
//     }, [])

//     useEffect(() => {
//         socket.on("user:joined", handleUserJoined);
//         socket.on("incomming:call", handleIncommingCall);
//         socket.on("call:accepted", handleCallAccepted);
//         socket.on("peer:nego:needed", handleNegoNeedIncoming);
//         socket.on("peer:nego:final", handleNegoNeedFinal);

//         return () => {
//             socket.off("user:joined", handleUserJoined)
//             socket.off("incomming:call", handleIncommingCall)
//             socket.off("call:accepted", handleCallAccepted)
//             socket.off("peer:nego:needed", handleNegoNeedIncoming);
//             socket.off("peer:nego:final", handleNegoNeedFinal);
//         }
//     }, [socket, handleUserJoined, handleIncommingCall, handleCallAccepted, handleNegoNeedIncoming, handleNegoNeedFinal]);

//     return (
//         <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center p-4">
//             <h1 className="text-4xl font-extrabold mb-6 text-center text-indigo-400">
//                 Room
//             </h1>

//             <div className="mb-8 text-center">
//                 <h4 className="text-xl font-medium text-gray-300">
//                     {remoteSocketId ? (
//                         <span className="text-green-400">Connected to a peer!</span>
//                     ) : (
//                         <span className="text-red-400">No one in room yet...</span>
//                     )}
//                 </h4>
//             </div>

//             <div className="flex flex-col md:flex-row gap-8 w-full max-w-6xl justify-center items-center">
//                 {/* My Stream Section */}
//                 {myStream && (
//                     <div className="bg-gray-800 rounded-lg shadow-xl p-4 flex flex-col items-center w-full md:w-1/2 lg:w-2/5">
//                         <h2 className="text-2xl font-semibold mb-4 text-indigo-300">My Stream</h2>
//                         <div className="relative w-full aspect-video bg-black rounded-md overflow-hidden border border-indigo-500">
//                             <video
//                                 playsInline
//                                 autoPlay
//                                 muted
//                                 className="w-full h-full object-cover"
//                                 ref={(videoRef) => {
//                                     if (videoRef) {
//                                         videoRef.srcObject = myStream;
//                                     }
//                                 }}
//                             />
//                         </div>
//                         <div className="mt-4 flex gap-4">
//                             {!remoteSocketId && (
//                                 <button
//                                     onClick={sendStreams}
//                                     className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded-md transition duration-200 ease-in-out transform hover:scale-105"
//                                 >
//                                     Share My Stream
//                                 </button>
//                             )}
//                             {remoteSocketId && (
//                                 <button
//                                     onClick={handleCallUser}
//                                     className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-md transition duration-200 ease-in-out transform hover:scale-105"
//                                 >
//                                     Call Peer
//                                 </button>
//                             )}
//                         </div>
//                     </div>
//                 )}

//                 {/* Remote Stream Section */}
//                 {remoteStream && (
//                     <div className="bg-gray-800 rounded-lg shadow-xl p-4 flex flex-col items-center w-full md:w-1/2 lg:w-2/5">
//                         <h2 className="text-2xl font-semibold mb-4 text-indigo-300">Remote Stream</h2>
//                         <div className="relative w-full aspect-video bg-black rounded-md overflow-hidden border border-purple-500">
//                             <video
//                                 playsInline
//                                 autoPlay
//                                 className="w-full h-full object-cover"
//                                 ref={(videoRef) => {
//                                     if (videoRef) {
//                                         videoRef.srcObject = remoteStream;
//                                     }
//                                 }}
//                             />
//                         </div>
//                         {/* You might add controls for remote stream here if needed */}
//                     </div>
//                 )}
//             </div>
//             {!myStream && !remoteStream && (
//                 <p className="text-gray-400 text-lg mt-8">
//                     Waiting for streams to start or for a peer to join...
//                 </p>
//             )}
//         </div>
//     );
// };

// export default Room;



import React, { useCallback, useEffect, useState } from 'react'
import ReactPlayer from 'react-player'
import { useSocket } from '../context/SocketProvider'
import peer from '../service/peer'

const Room = () => {
    const socket = useSocket();
    const [remoteSocketId, setRemoteSocketId] = useState(null);
    const [myStream, setMyStream] = useState();
    const [remoteStream, setRemoteStream] = useState();

    const handleUserJoined = useCallback(({ email, id }) => {
        console.log(`Email ${email} joined room`);
        setRemoteSocketId(id)
    }, []);

    const handleCallUser = useCallback(async () => {
        const stream = await navigator.mediaDevices.getUserMedia({
            audio: true,
            video: true,
        });
        const offer = await peer.getOffer();
        socket.emit("user:call", { to: remoteSocketId, offer });
        setMyStream(stream)
    }, [remoteSocketId, socket]);

    const handleIncommingCall = useCallback(async ({ from, offer }) => {
        setRemoteSocketId(from);
        const stream = await navigator.mediaDevices.getUserMedia({
            audio: true,
            video: true,
        });
        setMyStream(stream);
        console.log(`Incomming Call`, from, offer);
        const ans = await peer.getAnswer(offer);
        socket.emit("call:accepted", { to: from, ans });
    }, [socket]);

    const sendStreams = useCallback(() => {
        if (myStream) {
            for (const track of myStream.getTracks()) {
                peer.peer.addTrack(track, myStream);
            }
        }
    }, [myStream]);

    const handleCallAccepted = useCallback(({ from, ans }) => {
        peer.setLocalDescription(ans)
        console.log("Call Accepted!");
        sendStreams();
    }, [sendStreams]);

    const handleNegoNeeded = useCallback(async () => {
        const offer = await peer.getOffer();
        socket.emit("peer:nego:needed", { offer, to: remoteSocketId });
    }, [remoteSocketId, socket]);

    const handleNegoNeedFinal = useCallback(async ({ ans }) => {
        await peer.setLocalDescription(ans)
    }, []);

    useEffect(() => {
        peer.peer.addEventListener('negotiationneeded', handleNegoNeeded)
        return () => {
            peer.peer.removeEventListener("negotiationneeded", handleNegoNeeded);
        };
    }, [handleNegoNeeded]);

    const handleNegoNeedIncoming = useCallback(async ({ from, offer }) => {
        const ans = await peer.getAnswer(offer);
        socket.emit("peer:nego:done", { to: from, ans });
    }, [socket]);

    useEffect(() => {
        peer.peer.addEventListener('track', async ev => {
            const remoteStream = ev.streams[0];
            if (remoteStream) {
                console.log("✅ Remote stream received:", remoteStream);
                setRemoteStream(remoteStream);
            } else {
                console.warn("⚠️ No remote stream found in 'track' event");
            }
        });
    }, [])

    useEffect(() => {
        socket.on("user:joined", handleUserJoined);
        socket.on("incomming:call", handleIncommingCall);
        socket.on("call:accepted", handleCallAccepted);
        socket.on("peer:nego:needed", handleNegoNeedIncoming);
        socket.on("peer:nego:final", handleNegoNeedFinal);

        return () => {
            socket.off("user:joined", handleUserJoined)
            socket.off("incomming:call", handleIncommingCall)
            socket.off("call:accepted", handleCallAccepted)
            socket.off("peer:nego:needed", handleNegoNeedIncoming);
            socket.off("peer:nego:final", handleNegoNeedFinal);
        }
    }, [socket, handleUserJoined, handleIncommingCall, handleCallAccepted, handleNegoNeedIncoming, handleNegoNeedFinal]);

    return (
        <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center p-4">
            <h1 className="text-4xl font-extrabold mb-6 text-center text-indigo-400">
                Room
            </h1>

            <div className="mb-8 text-center">
                <h4 className="text-xl font-medium text-gray-300">
                    {remoteSocketId ? (
                        <span className="text-green-400">Connected to a peer!</span>
                    ) : (
                        <span className="text-red-400">No one in room yet...</span>
                    )}
                </h4>
            </div>

            {/* Controls Section: Moved here for better visibility and logical grouping */}
            <div className="flex gap-4 mb-8 justify-center">
                {myStream && remoteSocketId && (
                    <button
                        onClick={sendStreams}
                        className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded-md transition duration-200 ease-in-out transform hover:scale-105"
                    >
                        Send My Stream
                    </button>
                )}
                {remoteSocketId && (
                    <button
                        onClick={handleCallUser}
                        className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-md transition duration-200 ease-in-out transform hover:scale-105"
                    >
                        Call Peer
                    </button>
                )}
            </div>

            <div className="flex flex-col md:flex-row gap-8 w-full max-w-6xl justify-center items-center">
                {/* My Stream Section */}
                {myStream && (
                    <div className="bg-gray-800 rounded-lg shadow-xl p-4 flex flex-col items-center w-full md:w-1/2 lg:w-2/5">
                        <h2 className="text-2xl font-semibold mb-4 text-indigo-300">My Stream</h2>
                        <div className="relative w-full aspect-video bg-black rounded-md overflow-hidden border border-indigo-500">
                            <video
                                playsInline
                                autoPlay
                                muted
                                className="w-full h-full object-cover"
                                ref={(videoRef) => {
                                    if (videoRef) {
                                        videoRef.srcObject = myStream;
                                    }
                                }}
                            />
                        </div>
                    </div>
                )}

                {/* Remote Stream Section */}
                {remoteStream && (
                    <div className="bg-gray-800 rounded-lg shadow-xl p-4 flex flex-col items-center w-full md:w-1/2 lg:w-2/5">
                        <h2 className="text-2xl font-semibold mb-4 text-indigo-300">Remote Stream</h2>
                        <div className="relative w-full aspect-video bg-black rounded-md overflow-hidden border border-purple-500">
                            <video
                                playsInline
                                autoPlay
                                className="w-full h-full object-cover"
                                ref={(videoRef) => {
                                    if (videoRef) {
                                        videoRef.srcObject = remoteStream;
                                    }
                                }}
                            />
                        </div>
                    </div>
                )}
            </div>
            {!myStream && !remoteStream && !remoteSocketId && (
                <p className="text-gray-400 text-lg mt-8">
                    Waiting for another peer to join...
                </p>
            )}
            {!myStream && remoteSocketId && !remoteStream && (
                <p className="text-gray-400 text-lg mt-8">
                    Peer joined! Click "Call Peer" to initiate the call.
                </p>
            )}
        </div>
    );
};

export default Room;