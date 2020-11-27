import { useEffect, useRef, useState } from "react";
import io from "socket.io-client";

const EVENT_GetData = "getData"; // Name of the event
const SOCKET_SERVER_URL = "http://localhost:3001";

export const useGetData = () => {
  const [coinsInfo, setCoinsInfo] = useState({}); // Sent and received messages
  const socketRef = useRef();
  useEffect(() => {
    socketRef.current = io.connect(SOCKET_SERVER_URL, {
      transports: ["websocket"],
    });
    socketRef.current.on(EVENT_GetData, (coinsInfo) => {
      setCoinsInfo(coinsInfo);
    });
    return () => {
      socketRef.current.disconnect();
    };
  }, []);
  // console.log(coinsInfo);
  return coinsInfo;
};
