import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

function HomePage() {
  useEffect(() => {
    // Adding gradient background animation effect
    const handleMouseMove = (e) => {
      const x = e.clientX / window.innerWidth;
      const y = e.clientY / window.innerHeight;
      
      document.documentElement.style.setProperty('--mouse-x', x.toString());
      document.documentElement.style.setProperty('--mouse-y', y.toString());
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };
  
  return (
    <div className="min-h-screen bg-black bg-gradient-to-br from-gray-900 to-black bg-opacity-95 text-white relative overflow-hidden">
      {/* Animated background gradient */}
      <div className="absolute inset-0 bg-gradient-radial from-blue-400/10 via-transparent to-transparent opacity-50" 
           style={{ 
             background: 'radial-gradient(circle at calc(var(--mouse-x, 0.5) * 100%) calc(var(--mouse-y, 0.5) * 100%), rgba(56, 189, 248, 0.15), transparent 40%)'
           }} />
      
      {/* Subtle grid pattern */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNNTkuNSA2MGgtNTlWLjVoNTl6IiBmaWxsPSJub25lIiBzdHJva2U9InJnYmEoMTAwLCAxMTYsIDEzOSwgMC4xKSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9zdmc+')] opacity-20" />

      <div className="container mx-auto py-16 px-4 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-cyan-300">
            I.R.I.S. Assistant System
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Advanced technology designed to help visually impaired users navigate 
            their surroundings safely with real-time feedback and caretaker monitoring capabilities.
          </p>
        </motion.div>
        
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto"
        >
          <FeatureCard 
            title="Live Video Feed" 
            description="View real-time camera feed from the I.R.I.S. device with enhanced object recognition."
            link="/live-feed"
            icon="camera"
          />
          <FeatureCard 
            title="Location Tracking" 
            description="Monitor the current location of the user on an interactive map with precision tracking."
            link="/location"
            icon="map"
          />
          <FeatureCard 
            title="Smart Alerts" 
            description="Get instant notifications for potential falls or emergencies with AI-powered detection."
            link="/fall-detection"
            icon="alert"
          />
        </motion.div>
      </div>
    </div>
  );
}

const iconComponents = {
  camera: () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-10 h-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z" />
      <circle cx="12" cy="13" r="3" />
    </svg>
  ),
  map: () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-10 h-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6" />
      <line x1="8" y1="2" x2="8" y2="18" />
      <line x1="16" y1="6" x2="16" y2="22" />
    </svg>
  ),
  alert: () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-10 h-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
      <line x1="12" y1="9" x2="12" y2="13" />
      <line x1="12" y1="17" x2="12.01" y2="17" />
    </svg>
  )
};

function FeatureCard({ title, description, link, icon }) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 }
      }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      whileHover={{ 
        y: -8, 
        boxShadow: "0 15px 30px -10px rgba(56, 189, 248, 0.3)",
        scale: 1.02
      }}
      className="h-full"
    >
      <Link to={link} className="block h-full">
        <div className="backdrop-blur-md bg-gray-900/60 rounded-2xl p-8 h-full border border-gray-800 hover:border-blue-400 transition-colors flex flex-col">
          <div className="bg-gradient-to-br from-blue-500/20 to-cyan-500/20 p-4 rounded-xl mb-6 w-16 h-16 flex items-center justify-center text-blue-400">
            {iconComponents[icon]()}
          </div>
          <h2 className="text-2xl font-bold mb-3 text-white">{title}</h2>
          <p className="text-gray-300 flex-grow">{description}</p>
          
          <div className="mt-6 text-blue-400 flex items-center group">
            <span className="mr-2">Explore</span>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 transform group-hover:translate-x-1 transition-transform" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

export default HomePage;