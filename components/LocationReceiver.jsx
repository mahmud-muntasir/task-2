'use client';

import { useSignalR } from '../hooks/useSignalR';
import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: '/leaflet/images/marker.svg',
  iconUrl: '/leaflet/images/marker.svg'
});

function MapUpdater({ position }) {
  const map = useMap();

  useEffect(() => {
    if (position && position.length === 2) {
      map.panTo(position);
    }
  }, [position, map]);

  return null;
}

export default function LocationReceiver() {
  const { receivedLocation } = useSignalR();
  const [position, setPosition] = useState([25.73736464, 90.3644747]);

  useEffect(() => {
    if (
      receivedLocation &&
      typeof receivedLocation.lat === 'number' &&
      typeof receivedLocation.lon === 'number' &&
      (receivedLocation.lat !== position[0] || receivedLocation.lon !== position[1])
    ) {
      setPosition([receivedLocation.lat, receivedLocation.lon]);
    }
  }, [receivedLocation, position]);


  return (
    <div style={{ height: '100vh', width: '100%' }}>
      <MapContainer center={position} zoom={13} style={{ height: '100%', width: '100%' }}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <Marker position={position}>
          <Popup>
            {receivedLocation?.userName || 'Unknown User'}
            <br />
            Lat: {position[0].toFixed(6)}
            <br />
            Lon: {position[1].toFixed(6)}
          </Popup>
        </Marker>
        <MapUpdater position={position} />
      </MapContainer>
    </div>
  );
}