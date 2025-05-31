import { useState } from "react";
import "@fortawesome/fontawesome-free/css/all.min.css";
import 'leaflet/dist/leaflet.css';
import { MapContainer, TileLayer } from "react-leaflet";


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
    <div className="bg-gradient-to-r from-cyan-100 to-indigo-100 min-h-screen font-sans">

      {/* navigation frame at top, dark blue */}
      <header className="sticky top-0 bg-blue-800 shadow-md z-40">
        <div className="container mx-auto px-5 py-3 flex justify-between items-center">
          <h1 className="text-xl font-bold text-white">CDE map</h1>
          <button id="menuBtn" className="text-white">
            <i className="fa-solid fa-bars text-xl"></i>
          </button>
        </div>
      </header>
    {/* image of CDE map */}
    <div className="h-[50vh] flex justify-center items-end" style={{ transform: 'translateY(250px)' }}>
      <img src="/CDEmap.jpg" alt="CDE Map" style={{ width: '450px', height: '450px' }}/>
    </div>

    {/* input frame + search button，middle high */}
    <div className="absolute top-32 left-1/2 transform -translate-x-1/2 w-11/12 max-w-xl rounded-xl bg-white p-3 shadow-lg flex items-center space-x-2">
      <input
          className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-800"
          type="text"
          placeholder="Your Destination"
          value={destination}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setDestination(e.target.value)}
        />
        <button
          onClick={handleSearch}
          className="bg-blue-800 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors touch-manipulation active:scale-95"
        >
          <i className="fa-solid fa-magnifying-glass"></i>
        </button>
      </div>

      {/* + - buttons */}
      <div className="absolute bottom-6 right-6 flex flex-col space-y-3 z-10">
        <button className="w-12 h-12 rounded-full bg-white shadow-lg flex items-center justify-center hover:bg-gray-100">
          <i className="fa-solid fa-plus text-dark"></i>
        </button>
        <button className="w-12 h-12 rounded-full bg-white shadow-lg flex items-center justify-center hover:bg-gray-100">
          <i className="fa-solid fa-minus text-dark"></i>
        </button>
      </div>
    </div>
    </>
  );
}


export default App;
