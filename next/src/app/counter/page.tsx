"use client";

import { Running } from "@/types/model";
import { useEffect, useState } from "react";

import socketIOClient from "socket.io-client";
const ENDPOINT = "http://192.168.1.8:8000";

export default function Test() {
  const [data, setData] = useState<Running>({
    totalCount: 0,
    from: new Date(),
    to: new Date(),
    speed: 0,
    seconds: 0,
  });

  useEffect(() => {
    const socket = socketIOClient(ENDPOINT);
    socket.on("receiveMessage", (res: Running) => {
      setData(res);
    });
    // CLEAN UP THE EFFECT
    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <div className="grid place-content-center min-w-screen min-h-screen">
      <div className="grid gap-4 place-items-center">
        <p className="text-2xl">{data.totalCount} 回</p>
        <p className="text-2xl">{data.speed.toPrecision(3)} km/h</p>
        <pre className="text-xs">{JSON.stringify(data, null, 2)}</pre>
      </div>
    </div>
  );
}