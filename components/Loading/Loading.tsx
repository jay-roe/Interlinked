import ImageOptimized from '../ImageOptimized/ImageOptimized';
import loadingGif from './LoadingGif.gif';

export default function LoadingScreen() {
  return (
    <div className="flex items-center justify-center">
      <ImageOptimized
        placeholder="empty"
        width={50}
        height={50}
        className="m-10 inline w-1/5"
        src={loadingGif}
        alt="Loading..."
      />
    </div>
  );
}
