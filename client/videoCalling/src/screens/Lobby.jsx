// import React, { useCallback, useState, useEffect } from 'react'
// import { useSocket } from '../context/SocketProvider';
// import { data } from 'react-router';
// import { useNavigate } from 'react-router'

// const Lobby = () => {
//   const [email, setEmail] = useState("");
//   const [room, setRoom] = useState("");

//   const socket = useSocket();
//   const navigate = useNavigate();

//   const handleSubmitForm = useCallback(
//     (e) => {
//       e.preventDefault();
//       socket.emit("room:join", { email, room });
//     },
//     [email, room, socket]
//   );

//   const handleJoinRoom = useCallback((data) => {
//     const { email, room } = data;
//     navigate(`/room/${room}`);
//   },
//     [navigate]
//   );

//   useEffect(() => {
//     socket.on("room:join", handleJoinRoom);
//     return () => {
//       socket.off('room:join', handleJoinRoom);
//     }
//   }, [socket]);

//   return (
//     <div>
//       <h1>Lobby</h1>
//       <form onSubmit={handleSubmitForm}>
//         <label htmlFor='email'>Email ID</label>
//         <input type="email" id='email' value={email} onChange={(e) => setEmail(e.target.value)} />
//         <br />
//         <label htmlFor='room'>Room Number</label>
//         <input type="text" id='room' value={room} onChange={(e) => setRoom(e.target.value)} />
//         <br />
//         <button>Join</button>
//       </form>
//     </div>
//   )
// };

// export default Lobby



import React, { useCallback, useState, useEffect } from 'react'
import { useSocket } from '../context/SocketProvider';
import { useNavigate } from 'react-router'

const Lobby = () => {
  const [email, setEmail] = useState("");
  const [room, setRoom] = useState("");

  const socket = useSocket();
  const navigate = useNavigate();

  const handleSubmitForm = useCallback(
    (e) => {
      e.preventDefault();
      socket.emit("room:join", { email, room });
    },
    [email, room, socket]
  );

  const handleJoinRoom = useCallback((data) => {
    const { email, room } = data;
    navigate(`/room/${room}`);
  },
    [navigate]
  );

  useEffect(() => {
    socket.on("room:join", handleJoinRoom);
    return () => {
      socket.off('room:join', handleJoinRoom);
    }
  }, [socket, handleJoinRoom]); // Added handleJoinRoom to dependency array for useEffect to avoid lint warnings

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 to-indigo-800 flex items-center justify-center p-4 sm:p-6">
      <div className="bg-white p-8 rounded-lg shadow-2xl w-full max-w-md sm:p-10">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-center text-gray-800 mb-8 tracking-tight">
          Join the Video Call
        </h1>
        <form onSubmit={handleSubmitForm} className="space-y-6">
          <div>
            <label htmlFor='email' className="block text-lg font-medium text-gray-700 mb-2">
              Email ID
            </label>
            <input
              type="email"
              id='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-base text-gray-900 placeholder-gray-400 focus:outline-none transition duration-150 ease-in-out"
              placeholder="Enter your email"
              required
            />
          </div>

          <div>
            <label htmlFor='room' className="block text-lg font-medium text-gray-700 mb-2">
              Room Number
            </label>
            <input
              type="text"
              id='room'
              value={room}
              onChange={(e) => setRoom(e.target.value)}
              className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-base text-gray-900 placeholder-gray-400 focus:outline-none transition duration-150 ease-in-out"
              placeholder="Enter room code"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-lg font-semibold text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-200 ease-in-out transform hover:-translate-y-0.5"
          >
            Join
          </button>
        </form>
      </div>
    </div>
  )
};

export default Lobby;