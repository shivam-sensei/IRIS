import React, { useState, useEffect } from 'react';

function FallDetectionPage() {
  const [alertStatus, setAlertStatus] = useState('normal');
  const [activityLog, setActivityLog] = useState([
    { message: 'Device activated', status: 'normal', time: '9:30 AM' },
    { message: 'User standing still for 2 minutes', status: 'normal', time: '10:15 AM' },
    { message: 'Normal walking detected', status: 'normal', time: '10:24 AM' }
  ]);

  useEffect(() => {
    const handleMouseMove = (e) => {
      const x = e.clientX / window.innerWidth;
      const y = e.clientY / window.innerHeight;
      
      document.documentElement.style.setProperty('--mouse-x', x.toString());
      document.documentElement.style.setProperty('--mouse-y', y.toString());
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const triggerAlert = (status) => {
    setAlertStatus(status);
    
    const newEntry = {
      message: status === 'normal' ? 'Normal activity resumed' :
               status === 'warning' ? 'Unusual movement pattern detected' :
               'Fall detected! Immediate attention required!',
      status,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    
    setActivityLog((prev) => [newEntry, ...prev].slice(0, 5));
  };

  return (
    <div className="min-h-screen bg-black bg-gradient-to-br from-gray-900 to-black bg-opacity-95 text-white relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-radial from-blue-400/10 via-transparent to-transparent opacity-50" 
           style={{ 
             background: 'radial-gradient(circle at calc(var(--mouse-x, 0.5) * 100%) calc(var(--mouse-y, 0.5) * 100%), rgba(56, 189, 248, 0.15), transparent 40%)'
           }} />
      
      <div className="container mx-auto py-8 px-4 relative z-10">
        <h1 className="text-3xl font-bold mb-6">Fall Detection & Alerts</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <div className={`p-6 rounded-lg mb-6 ${
              alertStatus === 'normal' ? 'bg-green-900 bg-opacity-30 border border-green-700' :
              alertStatus === 'warning' ? 'bg-yellow-900 bg-opacity-30 border border-yellow-700' :
              'bg-red-900 bg-opacity-50 border border-red-700 animate-pulse'
            }`}>
              <div className="flex items-start mb-4">
                <div className={`w-4 h-4 rounded-full mt-1 mr-3 ${
                  alertStatus === 'normal' ? 'bg-green-500' :
                  alertStatus === 'warning' ? 'bg-yellow-500' :
                  'bg-red-500'
                }`}></div>
                <div>
                  <h2 className="text-xl font-bold">
                    {alertStatus === 'normal' ? 'Status: Normal' :
                     alertStatus === 'warning' ? 'Status: Unusual Movement Detected' :
                     'ALERT: Fall Detected!'}
                  </h2>
                  <p className="text-gray-300 mt-1">
                    {alertStatus === 'normal' ? 'No issues detected. User is moving normally.' :
                     alertStatus === 'warning' ? 'User movement pattern is irregular. Monitoring closely.' :
                     'Possible fall detected. Immediate attention may be required.'}
                  </p>
                </div>
              </div>
              
              {alertStatus === 'alert' && (
                <div className="bg-red-900 bg-opacity-30 p-4 rounded-md">
                  <h3 className="font-bold mb-2">Emergency Response</h3>
                  <div className="flex gap-2">
                    <button className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded">Call Emergency</button>
                    <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded">Contact User</button>
                    <button className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded" onClick={() => setAlertStatus('normal')}>Dismiss Alert</button>
                  </div>
                </div>
              )}
            </div>

            <div className="mt-10 bg-gray-900 p-6 rounded-lg flex flex-col">
          <h2 className="text-xl font-bold mb-4">Recent Activity</h2>
          <ul className="space-y-2">
            {activityLog.map((entry, index) => (
              <li key={index} className="flex items-center text-gray-300">
                <span className={`w-3 h-3 rounded-full mr-2 ${
                  entry.status === 'normal' ? 'bg-green-500' :
                  entry.status === 'warning' ? 'bg-yellow-500' :
                  'bg-red-500'
                }`}></span>
                {entry.message} <span className="ml-auto">{entry.time}</span>
              </li>
            ))}
          </ul>
        </div>
          </div>
          
          <div>
            <div className="bg-gray-800 rounded-lg p-6">
              <h2 className="text-xl font-bold mb-4">Simulation Controls</h2>
              <div className="space-y-2">
                <button className="w-full bg-green-700 hover:bg-green-800 text-white p-2 rounded" onClick={() => triggerAlert('normal')}>Simulate Normal Activity</button>
                <button className="w-full bg-yellow-700 hover:bg-yellow-800 text-white p-2 rounded" onClick={() => triggerAlert('warning')}>Simulate Warning Event</button>
                <button className="w-full bg-red-700 hover:bg-red-800 text-white p-2 rounded" onClick={() => triggerAlert('alert')}>Simulate Fall Detection</button>
              </div>
            </div>
          </div>
        </div>
        

      </div>
    </div>
  );
}

export default FallDetectionPage;
