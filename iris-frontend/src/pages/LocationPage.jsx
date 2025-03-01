import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { motion } from "framer-motion";

// Custom marker icon (fix for missing default Leaflet marker)
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

const customIcon = new L.Icon({
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
});

// Animate the marker with a pulsing effect
const PulsingMarker = ({ position }) => {
  const [isPulsing, setIsPulsing] = useState(true);
  const map = useMap();
  
  useEffect(() => {
    map.flyTo(position, 15, {
      animate: true,
      duration: 2
    });
    
    const interval = setInterval(() => {
      setIsPulsing(prev => !prev);
    }, 2000);
    
    return () => clearInterval(interval);
  }, []);
  
  return (
    <Marker 
      position={position} 
      icon={customIcon}
      eventHandlers={{
        click: () => {
          map.flyTo(position, 17, {
            animate: true,
            duration: 1
          });
        },
      }}
    >
      <Popup className="custom-popup">
        <div className="text-gray-800">
          <strong>Current Location</strong>
          <p>GTBIT, New Delhi</p>
          <p className="text-xs text-blue-600 mt-1">Last updated: Just now</p>
        </div>
      </Popup>
      {isPulsing && (
        <div className="pulse-ring"></div>
      )}
    </Marker>
  );
};

function LocationPage() {
  const gtbitLocation = { lat: 28.63124591867972, lng: 77.11646628104138 }; // GTBIT, Delhi
  const [locationHistory, setLocationHistory] = useState([
    { time: "11:42 AM", address: "GTBIT Campus" },
    { time: "11:30 AM", address: "Rajouri Garden Metro Station" },
    { time: "11:15 AM", address: "Pacific Mall" },
    { time: "10:45 AM", address: "Subhash Nagar" }
  ]);
  
  // Added weather data
  const [weatherData, setWeatherData] = useState({
    temperature: "28°C",
    condition: "Partly Cloudy",
    humidity: "65%",
    windSpeed: "12 km/h"
  });
  
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { type: "spring", stiffness: 100 }
    }
  };

  return (
    <div className="min-h-screen bg-black bg-gradient-to-br from-gray-900 to-black text-white relative">
      {/* Subtle background grid pattern */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNNTkuNSA2MGgtNTlWLjVoNTl6IiBmaWxsPSJub25lIiBzdHJva2U9InJnYmEoMTAwLCAxMTYsIDEzOSwgMC4xKSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9zdmc+')] opacity-10" />
      
      {/* Animated blue gradient accent */}
      <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-blue-500/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-1/4 h-1/4 bg-cyan-500/10 rounded-full blur-3xl"></div>
      
      <div className="container mx-auto py-6 px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex items-center mb-6"
        >
          <div className="mr-4 bg-blue-500/20 p-3 rounded-lg">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </div>
          <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-cyan-300">User's Location</h1>
        </motion.div>

        <div className="flex flex-col md:flex-row gap-6">
          {/* Left side - Map and stats below */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible" 
            className="w-full md:w-2/3 flex flex-col gap-6"
          >
            {/* Map Section */}
            <motion.div 
              variants={itemVariants}
              className="backdrop-blur-sm bg-gray-900/60 rounded-2xl overflow-hidden border border-gray-800 shadow-xl"
            >
              <div className="p-4 border-b border-gray-800 flex justify-between items-center">
                <div className="flex items-center">
                  <div className="w-2 h-2 rounded-full bg-green-500 mr-2"></div>
                  <span className="text-sm text-green-400">Live Tracking</span>
                </div>
                <div className="flex space-x-2">
                  <button className="bg-gray-800 hover:bg-gray-700 p-2 rounded-lg text-sm">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5v-4m0 4h-4m4 0l-5-5" />
                    </svg>
                  </button>
                  <button className="bg-gray-800 hover:bg-gray-700 p-2 rounded-lg text-sm">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  </button>
                </div>
              </div>
              <MapContainer
                center={[gtbitLocation.lat, gtbitLocation.lng]}
                zoom={15}
                className="h-96 w-full"
                zoomControl={false}
                style={{ background: '#1a1a1a' }}
              >
                <TileLayer
                  url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
                />
                <PulsingMarker position={[gtbitLocation.lat, gtbitLocation.lng]} />
              </MapContainer>
              
              {/* Nearby points of interest section */}
              <div className="p-4 border-t border-gray-800">
                <h3 className="text-sm text-blue-400 font-medium mb-3 flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  </svg>
                  Nearby Points of Interest
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                  {[
                    { name: "Pacific Mall", distance: "0.8 km", icon: "🛍️" },
                    { name: "Rajouri Garden Metro", distance: "1.2 km", icon: "🚇" },
                    { name: "District Park", distance: "1.5 km", icon: "🌳" },
                    { name: "TDI Mall", distance: "2.3 km", icon: "🏬" }
                  ].map((poi, index) => (
                    <motion.div
                      key={index}
                      whileHover={{ scale: 1.05 }}
                      className="bg-gray-800/50 rounded-lg p-2 flex flex-col items-center justify-center text-center"
                    >
                      <div className="text-xl mb-1">{poi.icon}</div>
                      <div className="text-xs font-medium">{poi.name}</div>
                      <div className="text-xs text-gray-400">{poi.distance}</div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Weather and Travel Stats in a flex row - MOVED HERE */}
            <div className="flex flex-col md:flex-row gap-6">
              {/* Weather Information */}
              <motion.div 
                variants={itemVariants}
                className="backdrop-blur-sm bg-gray-900/60 rounded-2xl p-6 border border-gray-800 shadow-lg flex-1"
              >
                <h2 className="text-xl font-bold mb-4 flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
                  </svg>
                  Weather at Location
                </h2>
                <div className="flex items-center mb-4">
                  <div className="text-4xl mr-4">⛅</div>
                  <div>
                    <div className="text-2xl font-bold">{weatherData.temperature}</div>
                    <div className="text-sm text-gray-400">{weatherData.condition}</div>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <motion.div 
                    whileHover={{ scale: 1.03 }}
                    className="bg-gray-800/70 p-3 rounded-xl flex items-center"
                  >
                    <div className="text-lg mr-2 text-blue-300">💧</div>
                    <div>
                      <p className="text-xs text-gray-400">Humidity</p>
                      <p className="text-sm">{weatherData.humidity}</p>
                    </div>
                  </motion.div>
                  <motion.div 
                    whileHover={{ scale: 1.03 }}
                    className="bg-gray-800/70 p-3 rounded-xl flex items-center"
                  >
                    <div className="text-lg mr-2 text-blue-300">💨</div>
                    <div>
                      <p className="text-xs text-gray-400">Wind</p>
                      <p className="text-sm">{weatherData.windSpeed}</p>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
              
              {/* Travel Stats */}
              <motion.div 
                variants={itemVariants}
                className="backdrop-blur-sm bg-gray-900/60 rounded-2xl p-6 border border-gray-800 shadow-lg flex-1"
              >
                <h2 className="text-xl font-bold mb-4 flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                  Travel Stats Today
                </h2>
                <div className="grid grid-cols-2 gap-3 mb-4">
                  <motion.div 
                    whileHover={{ scale: 1.03 }}
                    className="bg-gray-800/70 p-3 rounded-xl"
                  >
                    <p className="text-xs text-gray-400">Distance</p>
                    <p className="text-xl font-bold text-blue-300">5.2 km</p>
                  </motion.div>
                  <motion.div 
                    whileHover={{ scale: 1.03 }}
                    className="bg-gray-800/70 p-3 rounded-xl"
                  >
                    <p className="text-xs text-gray-400">Time Active</p>
                    <p className="text-xl font-bold text-blue-300">42 min</p>
                  </motion.div>
                </div>
                
                <div className="w-full bg-gray-800 h-2 rounded-full overflow-hidden">
                  <div className="bg-gradient-to-r from-blue-500 to-cyan-400 h-full rounded-full" style={{ width: '65%' }}></div>
                </div>
                <p className="text-xs text-gray-400 mt-2 text-center">65% of daily activity goal</p>
              </motion.div>
            </div>
          </motion.div>

          {/* Right Side - Location Details and History */}
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="w-full md:w-1/3 flex flex-col gap-6"
          >
            {/* Location Details Section */}
            <motion.div 
              variants={itemVariants}
              className="backdrop-blur-sm bg-gray-900/60 rounded-2xl p-6 border border-gray-800 shadow-lg"
            >
              <h2 className="text-xl font-bold mb-4 text-blue-400">Location Details</h2>

              <motion.div 
                variants={itemVariants}
                className="mb-6"
              >
                <h3 className="text-gray-400 text-sm mb-2 flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                  </svg>
                  Coordinates
                </h3>
                <div className="grid grid-cols-2 gap-2">
                  <motion.div 
                    whileHover={{ scale: 1.02 }}
                    className="bg-gray-800 p-3 rounded-xl"
                  >
                    <p className="text-xs text-gray-400">Latitude</p>
                    <p className="font-mono text-blue-300">{gtbitLocation.lat}</p>
                  </motion.div>
                  <motion.div 
                    whileHover={{ scale: 1.02 }}
                    className="bg-gray-800 p-3 rounded-xl"
                  >
                    <p className="text-xs text-gray-400">Longitude</p>
                    <p className="font-mono text-blue-300">{gtbitLocation.lng}</p>
                  </motion.div>
                </div>
              </motion.div>

              <motion.div 
                variants={itemVariants}
                className="mb-6"
              >
                <h3 className="text-gray-400 text-sm mb-2 flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                  </svg>
                  Address
                </h3>
                <motion.div 
                  whileHover={{ scale: 1.02 }}
                  className="bg-gray-800 p-3 rounded-xl"
                >
                  <p className="text-sm">Guru Tegh Bahadur Institute of Technology</p>
                  <p className="text-sm text-gray-400">G-8 Area, Rajouri Garden, New Delhi, India</p>
                </motion.div>
              </motion.div>

              <motion.div variants={itemVariants}>
                <h3 className="text-gray-400 text-sm mb-2 flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                  </svg>
                  Actions
                </h3>
                <div className="grid grid-cols-2 gap-2">
                  <motion.a
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.98 }}
                    href={`https://www.google.com/maps?q=${gtbitLocation.lat},${gtbitLocation.lng}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-xl text-sm text-center flex items-center justify-center"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4" />
                    </svg>
                    Navigate
                  </motion.a>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.98 }}
                    className="bg-gray-700 hover:bg-gray-600 text-white px-3 py-2 rounded-xl text-sm flex items-center justify-center"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                    </svg>
                    Share
                  </motion.button>
                </div>
              </motion.div>
            </motion.div>
            
            {/* Location History */}
            <motion.div 
              variants={itemVariants}
              className="backdrop-blur-sm bg-gray-900/60 rounded-2xl p-6 border border-gray-800 shadow-lg"
            >
              <h2 className="text-xl font-bold mb-4 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Location History
              </h2>
              <div className="space-y-2">
                {locationHistory.map((item, index) => (
                  <motion.div 
                    key={index}
                    whileHover={{ scale: 1.02, x: 5 }}
                    className="flex items-center p-2 hover:bg-gray-800/50 rounded-lg"
                  >
                    <div className="w-2 h-2 rounded-full bg-blue-500 mr-3"></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">{item.address}</p>
                    </div>
                    <p className="text-xs text-gray-400">{item.time}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
      
      {/* Custom CSS for pulsing effect */}
      <style jsx global>{`
        .leaflet-container {
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
        }
        
        .custom-popup .leaflet-popup-content-wrapper {
          background: rgba(30, 41, 59, 0.95);
          color: #fff;
          border-radius: 12px;
          backdrop-filter: blur(4px);
        }
        
        .custom-popup .leaflet-popup-tip {
          background: rgba(30, 41, 59, 0.95);
        }
        
        .pulse-ring {
          border: 3px solid rgba(56, 189, 248, 0.6);
          background: rgba(56, 189, 248, 0.3);
          animation: pulse 1.5s cubic-bezier(0.455, 0.03, 0.515, 0.955) infinite;
          border-radius: 50%;
          height: 40px;
          width: 40px;
          position: absolute;
          left: -20px;
          top: -20px;
          opacity: 0;
          z-index: 999;
        }
        
        @keyframes pulse {
          0% {
            transform: scale(0.1);
            opacity: 0;
          }
          50% {
            opacity: 1;
          }
          100% {
            transform: scale(1.2);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
}

export default LocationPage;