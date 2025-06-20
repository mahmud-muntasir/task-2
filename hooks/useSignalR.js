'use client';

import { useEffect, useRef, useState } from 'react';
import * as signalR from '@microsoft/signalr';

export function useSignalR() {
  const connectionRef = useRef(null);
  const [receivedLocation, setReceivedLocation] = useState(null);

  useEffect(() => {
    const connection = new signalR.HubConnectionBuilder()
      .withUrl(process.env.NEXT_PUBLIC_SIGNALR_HUB_URL)
      .withAutomaticReconnect()
      .build();

    connection
      .start()
      .then(() => {
        console.log('Connected to SignalR');
        connection.on('ReceiveLatLon', (payload) => {
          setReceivedLocation(payload);
        });
      })
      .catch(console.error);

    connectionRef.current = connection;

    return () => {
      connection.stop();
    };
  }, []);

  const sendLocation = (lat, lon, userName) => {
    if (connectionRef.current?.state === signalR.HubConnectionState.Connected) {
      connectionRef.current.invoke('SendLatLon', lat, lon, userName).catch(console.error);
    }
  };

  return { sendLocation, receivedLocation };
}