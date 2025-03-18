import React, { useState } from 'react';
import MediaPlayer from './components/MediaPlayer';

function App() {
  const [mediaType, setMediaType] = useState<'video' | 'audio'>('video');
  const [mediaSource, setMediaSource] = useState({
    video: "https://test-videos.co.uk/vids/bigbuckbunny/mp4/h264/360/Big_Buck_Bunny_360_10s_1MB.mp4",
    audio: "https://www2.cs.uic.edu/~i101/SoundFiles/BabyElephantWalk60.wav",
    videoTitle: "Big Buck Bunny",
    audioTitle: "Baby Elephant Walk"
  });

  const handleFileUpload = (file: File) => {
    const url = URL.createObjectURL(file);
    if (mediaType === 'video') {
      setMediaSource(prev => ({
        ...prev,
        video: url,
        videoTitle: file.name
      }));
    } else {
      setMediaSource(prev => ({
        ...prev,
        audio: url,
        audioTitle: file.name
      }));
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-3xl mx-auto space-y-8">
        <div className="flex justify-center space-x-4">
          <button
            onClick={() => setMediaType('video')}
            className={`px-4 py-2 rounded-lg ${
              mediaType === 'video'
                ? 'bg-blue-500 text-white'
                : 'bg-white text-gray-700 hover:bg-gray-50'
            }`}
          >
            Video Player
          </button>
          <button
            onClick={() => setMediaType('audio')}
            className={`px-4 py-2 rounded-lg ${
              mediaType === 'audio'
                ? 'bg-blue-500 text-white'
                : 'bg-white text-gray-700 hover:bg-gray-50'
            }`}
          >
            Audio Player
          </button>
        </div>

        <MediaPlayer
          type={mediaType}
          src={mediaType === 'video' ? mediaSource.video : mediaSource.audio}
          title={mediaType === 'video' ? mediaSource.videoTitle : mediaSource.audioTitle}
          onFileUpload={handleFileUpload}
        />
      </div>
    </div>
  );
}

export default App;