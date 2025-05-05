import React, { useEffect, useState, useRef } from 'react';
import { Player } from '@remotion/player';
import { TravelStoryVideo, TravelStoryComposition } from '@/components/TravelStoryVideo';
import { Button } from './ui/button';
import { toast } from 'sonner';

export const VideoExport = ({ elements, onClose }) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [videoUrl, setVideoUrl] = useState(null);
  const [isDownloading, setIsDownloading] = useState(false);
  const playerRef = useRef(null);

  const handleGenerateVideo = async () => {
    setIsGenerating(true);
    try {
      setVideoUrl('preview');
      toast.success('Video preview generated!');
    } catch (error) {
      console.error('Error generating video:', error);
      toast.error('Failed to generate video. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleDownload = async () => {
    if (!playerRef.current) return;

    setIsDownloading(true);
    try {
      // Get the current frame as a data URL
      const canvas = await playerRef.current.getCanvas();
      const dataUrl = canvas.toDataURL('image/png');
      
      // Create a download link
      const a = document.createElement('a');
      a.href = dataUrl;
      a.download = `travel-story-${Date.now()}.png`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);

      toast.success('Image downloaded successfully!');
    } catch (error) {
      console.error('Error downloading image:', error);
      toast.error('Failed to download image. Please try again.');
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-2xl w-full">
        <h2 className="text-2xl font-bold mb-4">Export Options</h2>
        
        <div className="space-y-4">
          <div className="border rounded-lg p-4">
            <h3 className="text-lg font-semibold mb-2">Generate Travel Video</h3>
            <p className="text-gray-600 mb-4">
              Create a beautiful 5-10 second video montage of your travel story.
            </p>

            {videoUrl === 'preview' ? (
              <div className="space-y-4">
                <div className="aspect-video bg-gray-100 rounded-lg overflow-hidden">
                  <Player
                    ref={playerRef}
                    component={TravelStoryVideo}
                    inputProps={{ elements }}
                    durationInFrames={TravelStoryComposition.durationInFrames}
                    compositionWidth={TravelStoryComposition.width}
                    compositionHeight={TravelStoryComposition.height}
                    fps={TravelStoryComposition.fps}
                    style={{
                      width: '100%',
                      height: '100%',
                    }}
                    controls
                  />
                </div>
                <Button
                  onClick={handleDownload}
                  disabled={isDownloading}
                  className="w-full"
                >
                  {isDownloading ? 'Downloading...' : 'Download Image'}
                </Button>
              </div>
            ) : (
              <Button
                onClick={handleGenerateVideo}
                disabled={isGenerating}
                className="w-full"
              >
                {isGenerating ? 'Generating...' : 'Generate Video'}
              </Button>
            )}
          </div>

          <div className="border rounded-lg p-4">
            <h3 className="text-lg font-semibold mb-2">Export as PDF</h3>
            <p className="text-gray-600 mb-4">
              Save your travel story as a PDF document.
            </p>
            <Button
              onClick={() => {
                onClose();
              }}
              className="w-full"
            >
              Export PDF
            </Button>
          </div>
        </div>

        <Button
          variant="outline"
          onClick={onClose}
          className="mt-4 w-full"
        >
          Close
        </Button>
      </div>
    </div>
  );
}; 