import Link from 'next/link';

export default function Home() {
  return (
    <div className="flex flex-col gap-8 items-center justify-center min-h-screen">
      <h1 className="text-4xl font-black text-center text-white">
        Welcome to real time location sharing application
      </h1>
      <div className="flex items-center justify-center gap-4">
        <Link
          className="text-base px-6 py-2 bg-neutral-900 rounded-md border border-neutral-800"
          href={'/sender'}
          target="_blank"
          rel="noopener noreferrer"
        >
          Send
        </Link>
        <Link
          className="text-base px-6 py-2 bg-neutral-900 rounded-md border border-neutral-800"
          href={'/receiver'}
          target="_blank"
          rel="noopener noreferrer"
        >
          Receive
        </Link>
      </div>
    </div>
  );
}
