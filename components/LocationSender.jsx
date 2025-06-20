'use client';

import { useEffect, useState } from 'react';
import { useSignalR } from '../hooks/useSignalR';
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { MdCelebration } from "react-icons/md";

export default function LocationSender() {
  const { sendLocation } = useSignalR();
  const [location, setLocation] = useState({ lat: null, lon: null });
  const userName = 'muntasirr.mahmudd@gmail.com';

  useEffect(() => {
    if (!navigator.geolocation) {
      alert('Geolocation is not supported by your browser');
      return;
    }

    const watchId = navigator.geolocation.watchPosition(
      (position) => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;
        setLocation({ lat, lon });
        sendLocation(lat, lon, userName);
      },
      (error) => {
        console.error('Error getting position:', error);
      },
      {
        enableHighAccuracy: true,
        maximumAge: 1000,
        timeout: 5000,
      }
    );

    return () => {
      navigator.geolocation.clearWatch(watchId);
    };
  }, [sendLocation]);

  const handleResend = () => {
    if (location.lat && location.lon) {
      sendLocation(location.lat, location.lon, userName);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="p-8 min-h-[200px] bg-neutral-900 border border-neutral-800 shadow rounded-xl">
        <h3 className="text-2xl font-bold text-center mb-2 text-white">
          Sharing your real GPS location
        </h3>
        <div className='h-[250px] flex items-center justify-center'>
          {location.lat && location.lon ? (
            <div className='flex flex-col items-center gap-2'>
              <MdCelebration className='text-6xl mb-4' />
              <p className='text-center text-xl text-white'>You have successfully shared your location</p>
              <p className='text-center text-xs text-neutral-600'>
                Lat : {location.lat.toFixed(6)} Lon : {location.lon.toFixed(6)}
              </p>
              <button
                onClick={handleResend}
                className='px-6 py-2 cursor-pointer text-sm border border-neutral-700 bg-neutral-950 rounded-md mt-4 hover:bg-neutral-800 transition'
              >
                Resend
              </button>
            </div>
          ) : (
            <AiOutlineLoading3Quarters className='animate-spin text-2xl text-neutral-500' />
          )}
        </div>
      </div>
    </div>
  );
}