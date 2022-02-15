import React, { useState, useEffect, useRef, createContext } from "react";
import { io } from "socket.io-client";
import Peer from "simple-peer";

const SocketContext = createContext();

//dev url
const socket = io("http://localhost:3333");

//prod url
//const socket = io('server-url')

const ContextProvider = ({ children }) => {
	//state
	const [callAccepted, setCallAccepted] = useState(false);
	const [callEnded, setCallEnded] = useState(false);
	const [call, setCall] = useState({});
	const [stream, setStream] = useState(null);
	const [name, setName] = useState("");
	const [me, setMe] = useState("");

	//ref
	const myVideo = useRef();
	const otherUserVideo = useRef();
	const connectionRef = useRef();

	//on mounting
	useEffect(() => {
		//ask for permission to use mic and cam
		navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then((currentStream) => {
			setStream(currentStream);
			myVideo.current.srcObject = currentStream;
		});

		//set me
		socket.on("me", (id) => setMe(id));

		//setCall in case of receiving a call
		socket.on("callUser", ({ from, signal, name: callerName }) => {
			setCall({ isReceivingCall: true, from, signal, name: callerName });
		});
	}, []);

	const answerCall = () => {
		setCallAccepted(true);
        //instantiate a new Peer instance.
        //initiator: false as we answer a call. we didn't initiate it 
		const peer = new Peer({ initiator: false, trickle: false, stream });
		peer.on("signal", (signal) => {
			socket.emit("answerCall", { signal, to: call.from });
		});
		peer.on("stream", (currentStream) => {
			otherUserVideo.current.srcObject = currentStream;
		});
		console.log(call)
		peer.signal(call.signal);

		connectionRef.current = peer;
	};

	const callUser = (id) => {
		
        const peer = new Peer({initiator: true, trickle: false, stream})

        peer.on('signal', signal => {
            socket.emit('callUser', {signal, userToCall: id, from: me, name})
        })
        peer.on('stream', currentStream => {
            otherUserVideo.current = currentStream
        })

        socket.on('callAccepted', signal => {
            setCallAccepted(true)

            peer.signal(signal)
        })

        connectionRef.current = peer
    };

	const endCall = () => {
        setCallEnded(true)
        connectionRef.current.destroy()
        window.location.reload()
    };

    return (
        <SocketContext.Provider value={{
            callAccepted,
            callEnded,
            call,
            stream,
            name,
            setName,
            me,
            answerCall,
            callUser, 
            endCall,
			myVideo,
			otherUserVideo
        }}>
            {children}
        </SocketContext.Provider>
    )
};

export { ContextProvider, SocketContext };
