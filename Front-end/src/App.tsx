import "@fortawesome/fontawesome-free/css/all.min.css";
import React, { useState } from 'react';
import 'leaflet/dist/leaflet.css';  // import CSS
import MapComponent from './Component/MapComponent';
import './index.css'
import './App.css'; // import custom styles

function App() {
  const [destination, setDestination] = useState("");
  const [currentFloor, setCurrentFloor] = useState("L1"); 
  const handleSearch = () => {
    if (destination.trim()) {
      console.log(`Searching for: ${destination}`);
    }
  };

  return(
  <>
    {/* navigation frame*/}
    <header className="fixed top-0 left-0 right-0 bg-blue-800 shadow-md z-50">
      <div className="container mx-auto px-5 py-0">
        {/* title */}
        <div className="flex justify-left py-3 px-6">
        <h1 className="text-xl font-bold text-white">CDE Map</h1>
        </div>
      </div>
    </header>

    {/* input frame + search button*/}
    <div className="fixed top-12  left-0 right-0 bg-blue-400 w-full shadow-md py-3 z-40 ">
      <div className="flex items-center pt-1 px-5">
        <label htmlFor="building" className="w-32 text-white text-xl font-medium mb-1 flex justify-center items-center">
          Destination:
        </label>
        <input
          className="flex-1 ml-5 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-800"
          value={destination}
          type = "text"
          onChange={(e) => setDestination(e.target.value)}>
        </input>
        <button
          onClick={handleSearch}
          className="w-15 mr-5 ml-5 bg-blue-500 hover:bg-blue-400 text-white px-4 py-2 rounded-lg transition-colors touch-manipulation active:scale-95">
          <i className="fa-solid fa-magnifying-glass"></i>
        </button>
      </div>
    </div>

 {/* background */}
    <div className="fixed top-28 left-0 right-0 bottom-20 bg-white z-10">
  {/* CDE map leaflet */}
      <div className = "h-full w-full">
        <MapComponent 
      destination={destination}
      currentFloor={currentFloor}
      />
      </div>
      </div>

      {/* menu button */}
      <div className="fixed bottom-6 right-6 flex flex-col space-y-3 z-10">
        <button id="menu" className="w-12 h-12 z-20 rounded-full bg-white shadow-lg flex items-center justify-center hover:bg-gray-100 transition-colors touch-manipulation active:scale-95">
          <i className="fa-solid fa-bars text-xl"></i>
        </button>
      </div>
    </>
  );
}

export default App;
