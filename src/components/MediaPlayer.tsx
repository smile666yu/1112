import React, { useState, useRef } from 'react';
import { Play, Pause, Volume2, VolumeX, Maximize2, SkipBack, SkipForward, Upload } from 'lucide-react';

interface MediaPlayerProps {
  type: 'video' | 'audio';
  src: string;
  title: string;
  onFileUpload: (file: File) => void;
}

const MediaPlayer: React.FC<MediaPlayerProps> = ({ type, src, title, onFileUpload }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const mediaRef = useRef<HTMLVideoElement | HTMLAudioElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const togglePlay = () => {
    if (mediaRef.current) {
      if (isPlaying) {
        mediaRef.current.pause();
      } else {
        mediaRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (mediaRef.current) {
      mediaRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleFullscreen = () => {
    if (mediaRef.current && type === 'video') {
      if (document.fullscreenElement) {
        document.exitFullscreen();
      } else {
        mediaRef.current.requestFullscreen();
      }
    }
  };

  const skip = (seconds: number) => {
    if (mediaRef.current) {
      mediaRef.current.currentTime += seconds;
    }
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (
        (type === 'video' && file.type.startsWith('video/')) ||
        (type === 'audio' && file.type.startsWith('audio/'))
      ) {
        onFileUpload(file);
      } else {
        alert(`Please select a valid ${type} file`);
      }
    }
  };

  const triggerFileUpload = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="w-full max-w-3xl bg-white rounded-lg shadow-xl overflow-hidden">
      <div className="p-4 bg-gray-50 border-b flex justify-between items-center">
        <h2 className="text-lg font-semibold text-gray-800">{title}</h2>
        <div>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileUpload}
            accept={type === 'video' ? 'video/*' : 'audio/*'}
            className="hidden"
          />
          <button
            onClick={triggerFileUpload}
            className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
          >
            <Upload className="w-4 h-4" />
            Upload {type}
          </button>
        </div>
      </div>
      
      <div className="relative">
        {type === 'video' ? (
          <video
            ref={mediaRef as React.RefObject<HTMLVideoElement>}
            src={src}
            className="w-full aspect-video"
          />
        ) : (
          <div className="bg-gradient-to-r from-blue-500 to-purple-500 aspect-video flex items-center justify-center">
            <audio
              ref={mediaRef as React.RefObject<HTMLAudioElement>}
              src={src}
              className="hidden"
            />
            <div className="text-white text-6xl">
              🎵
            </div>
          </div>
        )}
      </div>

      <div className="p-4 bg-white">
        <div className="flex items-center justify-between space-x-4">
          <div className="flex items-center space-x-2">
            <button
              onClick={() => skip(-10)}
              className="p-2 hover:bg-gray-100 rounded-full transition"
            >
              <SkipBack className="w-5 h-5" />
            </button>
            
            <button
              onClick={togglePlay}
              className="p-3 bg-blue-500 hover:bg-blue-600 rounded-full text-white transition"
            >
              {isPlaying ? (
                <Pause className="w-6 h-6" />
              ) : (
                <Play className="w-6 h-6" />
              )}
            </button>
            
            <button
              onClick={() => skip(10)}
              className="p-2 hover:bg-gray-100 rounded-full transition"
            >
              <SkipForward className="w-5 h-5" />
            </button>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={toggleMute}
              className="p-2 hover:bg-gray-100 rounded-full transition"
            >
              {isMuted ? (
                <VolumeX className="w-5 h-5" />
              ) : (
                <Volume2 className="w-5 h-5" />
              )}
            </button>
            
            {type === 'video' && (
              <button
                onClick={handleFullscreen}
                className="p-2 hover:bg-gray-100 rounded-full transition"
              >
                <Maximize2 className="w-5 h-5" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MediaPlayer;