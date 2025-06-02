import "@fortawesome/fontawesome-free/css/all.min.css";
import React, { useState } from 'react';
import 'leaflet/dist/leaflet.css';  // import CSS
import MapComponent from './Component/MapComponent';
import './index.css'

function App() {
  const [destination, setDestination] = useState("");

  const handleSearch = () => {
    if (destination.trim()) {
      alert(`Searching for: ${destination}`);
      // can input further navigation logic here
    }
  };

  return(
  <>
    {/* background */}
    <div className="bg-white min-h-screen font-sans">
    
    {/* navigation frame*/}
    <header className="sticky top-0 bg-blue-800 shadow-md z-40">
      <div className="container mx-auto px-5 py-4 flex justify-between items-center">
        {/* title */}        {/* BUG! will be block by input bar if scree is nearrow*/}
        <h1 className="text-xl font-bold text-white">CDE Map</h1>
        {/* input frame + search button*/}
        <div className="absolute top-15 left-1/2 transform -translate-x-1/2 w-11/12 max-w-xl shadow-lg flex items-center space-x-2">
          <input
            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-800"
            type="text"
            placeholder="Your Destination"
            value={destination}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setDestination(e.target.value)}/>
          <button
            onClick={handleSearch}
            className="bg-blue-500 hover:bg-blue-400 text-white px-4 py-2 rounded-lg transition-colors touch-manipulation active:scale-95">
          <i className="fa-solid fa-magnifying-glass"></i>
          </button>
        </div>
      </div>
    </header>

      {/* menu button */}
      <div className="absolute bottom-6 right-6 flex flex-col space-y-3 z-10">
        <button id="menuBtn" className="w-12 h-12 rounded-full bg-white shadow-lg flex items-center justify-center hover:bg-gray-100 transition-colors touch-manipulation active:scale-95">
          <i className="fa-solid fa-bars text-xl"></i>
        </button>
       
      </div>

      {/* CDE map leaflet */}
      <MapComponent />
    </div>
    </>
  );
}

export default App;
