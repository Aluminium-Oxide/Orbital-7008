import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet'; //delete {map} cuz we just use Mapcontainer in react-leaflet
import 'leaflet/dist/leaflet.css';
import { useMapEvents, MapContainer, ImageOverlay, Marker, Popup } from 'react-leaflet';

// coordinateds of the picures 
const PixelProjection = {
  project: (latlng: L.LatLng) => L.point(latlng.lng, latlng.lat),
  unproject: (point: L.Point) => L.latLng(point.y, point.x),
};

const PixelCRS = L.Util.extend({}, L.CRS.Simple, {
  code: 'PixelCRS',
  projection: PixelProjection,
  transformation: new L.Transformation(1, 0, 1, 0),
  scale: (zoom: number) => Math.pow(2, zoom),
  zoom: (scale: number) => Math.log(scale) / Math.LN2,
  distance: (p1: L.LatLng, p2: L.LatLng) => {
    const dx = p2.lng - p1.lng;
    const dy = p2.lat - p1.lat;
    return Math.sqrt(dx * dx + dy * dy);
  },
  infinite: true,
});

// See coordinates-updated
function Coordinates() {
  useMapEvents({
    click(e){const{lat,lng} = e.latlng;     //get latitude and longitude
      const x = lng; const y = lat; console.log(x, y);}});   
    return null;}

type Building = {
  id: number;
  name: string;
  x: number;
  y: number;
};

const Icon = (name: string): L.DivIcon => {
  return L.divIcon({
    className: 'building-label', 
    html: `
      <div class="relative building-label flex items-center justify-center">
        <div class= "bg-purple-300 text-black px-2 py-1 rounded shadow text-xs border border-gray-400 hover:bg-purple-200 cursor-pointer whitespace-nowrap active:scale-95">
          ${name}
        </div>
      </div>`,
    iconSize: [100, 30],
    iconAnchor: [50, 15], 
  });
};

// 建筑
const buildings = [
  {id: 0, name: "EA", x: 356, y: 116},
  {id: 1, name: "E1", x: 520, y: 900},
  {id: 2, name: "E2", x: 594, y: 610},
  {id: 3, name: "E3", x: 819, y: 582},
  {id: 4, name: "E4", x: 872, y: 947},
  {id: 5, name: "E5", x: 1126, y: 1220},
  {id: 6, name: "E6", x: 1389, y: 703},
  {id: 7, name: "E7", x: 1537, y: 955},
  {id: 8, name: "E8", x: 1149, y: 723},
  {id: 9, name: "E1A", x: 364, y: 600},
  {id: 10, name: "E2A", x: 663, y: 874},
  {id: 11, name: "E3A", x: 644, y: 200},
  {id: 12, name: "E4A", x: 1218, y: 963},
  {id: 13, name: "SDE1", x: 316, y: 1523},
  {id: 14, name: "SDE2", x: 536, y: 1559},
  {id: 15, name: "SDE3", x: 276, y: 1243},
  {id: 16, name: "SDE4", x: 160, y: 1727},
  {id: 17, name: "Techno", x: 697, y: 1239},
  {id: 18, name: "T-Lab", x: 957, y: 452},
  {id: 19, name: "EW1", x: 381, y: 1013},
];

const MapComponent = () => {
  const mapRef = useRef<L.Map | null>(null);
  const [selectedBuilding, setSelectedBuilding] = useState<Building | null>(null);
  const mapWidth = 1707; // 底图宽度（像素）
  const mapHeight = 1889; // 底图高度（像素）

  // 计算初始视图，确保地图完整显示
  const initialZoom = Math.min(
    Math.log2(window.innerWidth / mapWidth),
    Math.log2(window.innerHeight / mapHeight)
  );

useEffect(() => {
    const map = mapRef.current;
    if (!map) return;
}, []);

  // 关闭弹窗
  const closePopup = () => {
    setSelectedBuilding(null);
  };

 return (
    <div className="relative h-[90vh] w-full base-map-container">
      <MapContainer
        ref={mapRef as any}
        crs={PixelCRS}
        center={[mapHeight / 2, mapWidth / 2]}
        zoom={initialZoom}
        maxZoom={2}
        minZoom={initialZoom - 2}
        style={{ height: '100%', width: '100%', zIndex: '1' }}>

        {/* base map  */}
        <ImageOverlay
          url="/CDEmap.png"
          bounds={[[0, 0], [mapHeight, mapWidth]]}
          interactive={true}
          />

        {/* Add Coordinates */}
        <Coordinates />
        
 
        {buildings.map(building => (
          <Marker
            key={building.id}
            position={[building.y, building.x]}
            icon={Icon(building.name)}
            eventHandlers={{
              click: () => setSelectedBuilding(building)
            }}
          >
            <Popup maxWidth={500}>
              <div className="text-center">
                <h2 className="font-semibold mb-2">Block {building.name}</h2>
                <img
                src={`/building-images/${building.name}.png`}
                alt={building.name}
                className="max-w-full object-contain" />
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>

      {/* selectedBuilding && (
        //<div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center z-50">
          //<div className="bg-white rounded-lg shadow-lg max-w-[90%] max-h-[90%] p-4 relative z-50">
            //<button
              //className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 text-lg font-bold"
              //</div>onClick={closePopup}>×
            //</button>
            //<h2 className="text-lg font-semibold mb-2 text-center">Block {selectedBuilding.name} </h2>
            //<img
              //src={`/building-images/${selectedBuilding.name}.png`}
              //alt={selectedBuilding.name}
              //className="max-w-full object-contain mx-auto"/>
          //</div>
        //</div>
) */}
    </div>
  );
};

export default MapComponent;    