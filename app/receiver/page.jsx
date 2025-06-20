"use client"

import dynamic from 'next/dynamic';
const LocationReceiver = dynamic(() => import('@/components/LocationReceiver'), {
  ssr: false,
});
// import LocationReceiver from '@/components/LocationReceiver';

export default function ReceiverPage() {
  return <LocationReceiver />;
}
