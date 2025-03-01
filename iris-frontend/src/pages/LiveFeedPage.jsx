import React, { useState, useEffect, useRef } from 'react';

function LiveFeedPage() {
  const [isConnected, setIsConnected] = useState(false);
  const videoRef = useRef(null);
  const streamRef = useRef(null);

  useEffect(() => {
    async function startCamera() {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
        streamRef.current = stream;
        setIsConnected(true);
      } catch (error) {
        console.error('Error accessing webcam:', error);
        setIsConnected(false);
      }
    }

    startCamera();

    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-6">Live Video Feed</h1>

      <div className="bg-gray-800 rounded-lg p-4 max-w-4xl mx-auto">
        {isConnected ? (
          <div className="aspect-video bg-black flex items-center justify-center relative rounded-md overflow-hidden">
            <video ref={videoRef} autoPlay playsInline className="w-full h-full object-cover" />

            {/* Status indicator */}
            <div className="absolute top-4 right-4 flex items-center">
              <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
              <span className="text-sm text-green-400">Live</span>
            </div>
          </div>
        ) : (
          <div className="aspect-video bg-gray-900 flex items-center justify-center rounded-md">
            <p className="text-gray-500">Connecting to camera...</p>
          </div>
        )}

        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-gray-700 p-4 rounded-md">
            <h3 className="font-medium mb-2">Device Information</h3>
            <p className="text-sm text-gray-300">Camera Status: {isConnected ? 'Connected' : 'Connecting...'}</p>
          </div>
          <div className="bg-gray-700 p-4 rounded-md">
            <h3 className="font-medium mb-2">Stream Controls</h3>
            <div className="flex gap-2">
              <button className="bg-gray-600 hover:bg-gray-500 text-white px-3 py-1 rounded text-sm">
                Take Screenshot
              </button>
              <button className="bg-gray-600 hover:bg-gray-500 text-white px-3 py-1 rounded text-sm">
                Settings
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LiveFeedPage;
