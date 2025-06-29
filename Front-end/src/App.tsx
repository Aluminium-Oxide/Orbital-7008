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
    {/* background */}
    <div className="bg-white min-h-screen font-sans">
    
    {/* navigation frame*/}
    <header className="sticky top-0 bg-blue-800 shadow-md z-40">
      <div className="container mx-auto px-5 py-0">
        {/* title */}
        <div className="flex justify-left py-3 px-6">
        <h1 className="text-xl font-bold text-white">CDE Map</h1>
        </div>
          </div>
    </header>

        {/* input frame + search button*/}
        <div className=" bg-blue-400 w-full shadow-md">
        <div className="grid grid-cols-4 gap-5 pl-5 pr-8 py-3">
          <label htmlFor="building" className="text-white text-xl font-medium mb-1 flex justify-center items-center">
          Destination:
        </label>
        {/*building selection*/}
          <select
            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-800"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}>
            <option value="" disabled> Block </option>
            <option value="EA">EA</option>
            <option value="E1">E1</option>
            <option value="E2">E2</option>
            <option value="E2">E3</option>
          </select>
          {/*floor selection*/}
          <select
            value = {currentFloor}
            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-800"
            onChange={(e) => setCurrentFloor(e.target.value)}>
            <option value="" disabled> Floor </option>
            <option value="L1">L1</option>
            <option value="L2">L2</option>
            <option value="L3">L3</option>
            <option value="L4">L4</option>
          </select>
          {/*room selection*/}
          <select
            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-800"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}>
            <option value="" disabled> Room </option>
            <option value="01">01</option>
            <option value="02">02</option>
            <option value="03">03</option>
            <option value="04">04</option>
          </select>
        </div>
        </div>



      {/* menu button */}
      <div className="absolute bottom-6 right-6 flex flex-col space-y-3 z-10">
        <button id="menuBtn" className="w-12 h-12 z-20 rounded-full bg-white shadow-lg flex items-center justify-center hover:bg-gray-100 transition-colors touch-manipulation active:scale-95">
          <i className="fa-solid fa-bars text-xl"></i>
        </button>
       
      </div>

      {/* CDE map leaflet */}
      <MapComponent 
      destination={destination}
      currentFloor={currentFloor}/>
    </div>
    </>
  );
}

export default App;
