'use client';

import loadingGif from './loadingGif.gif';

export default function LoadingScreen() {
  return (
    <div className="flex items-center justify-center">
      <img
        className="m-10 inline w-1/5"
        src={loadingGif.src}
        alt="Loading..."
      />
    </div>
  );
}
